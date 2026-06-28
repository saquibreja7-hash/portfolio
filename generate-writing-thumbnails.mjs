import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createWriteStream, existsSync, mkdirSync, readFileSync, readdirSync } from "fs";
import { basename, join } from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { execFileSync } from "child_process";

const BUCKET = "portfolio-assets";
const PREFIX = "04_Writing Samples/";
const THUMBNAIL_PREFIX = "04_Writing Samples/thumbnails/";
const LOCAL_DIR = "C:\\Users\\Media\\Desktop\\Personal\\03-Resources\\My Portfolio\\04_Writing Samples";
const WORK_DIR = "C:\\Users\\Media\\Desktop\\Personal\\01-Projects\\saquib-portfolio\\tmp\\writing-thumbnails";
const PDFTOPPM = "C:\\Users\\Media\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\native\\poppler\\Library\\bin\\pdftoppm.exe";

const client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

mkdirSync(WORK_DIR, { recursive: true });

function assertEnv(name) {
  if (!process.env[name]) throw new Error(`${name} is required`);
}

async function listPdfs() {
  const pdfs = [];
  let token;

  do {
    const response = await client.send(new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: PREFIX,
      MaxKeys: 1000,
      ContinuationToken: token,
    }));

    for (const object of response.Contents || []) {
      if (object.Key && object.Key.endsWith(".pdf")) pdfs.push(object.Key);
    }

    token = response.NextContinuationToken;
  } while (token);

  return pdfs;
}

async function downloadPdf(key, targetPath) {
  const response = await client.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
  const body = response.Body instanceof Readable ? response.Body : Readable.fromWeb(response.Body);
  await pipeline(body, createWriteStream(targetPath));
}

function firstPageOutput(prefix) {
  const expectedNames = [`${prefix}-1.png`, `${prefix}-01.png`];
  const existing = expectedNames.find((path) => existsSync(path));
  if (existing) return existing;

  const prefixName = basename(prefix);
  const fileName = readdirSync(WORK_DIR).find((name) => name.startsWith(`${prefixName}-`) && name.endsWith(".png"));
  if (fileName) return join(WORK_DIR, fileName);

  return expectedNames[0];
}

async function main() {
  assertEnv("R2_ENDPOINT");
  assertEnv("R2_ACCESS_KEY");
  assertEnv("R2_SECRET_KEY");

  const pdfKeys = await listPdfs();
  console.log(`Found ${pdfKeys.length} writing PDFs in R2`);

  for (const pdfKey of pdfKeys) {
    const pdfName = basename(pdfKey);
    const localPdfPath = join(LOCAL_DIR, pdfName);
    const pdfPath = existsSync(localPdfPath) ? localPdfPath : join(WORK_DIR, pdfName);

    if (!existsSync(pdfPath)) {
      console.log(`Downloading ${pdfName}`);
      await downloadPdf(pdfKey, pdfPath);
    }

    const outputPrefix = join(WORK_DIR, pdfName.replace(/\.pdf$/i, ""));
    execFileSync(PDFTOPPM, ["-f", "1", "-l", "1", "-r", "144", "-png", pdfPath, outputPrefix], {
      stdio: "inherit",
    });

    const thumbnailName = pdfName.replace(/\.pdf$/i, ".png");
    const thumbnailKey = `${THUMBNAIL_PREFIX}${thumbnailName}`;

    await client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: thumbnailKey,
      Body: readFileSync(firstPageOutput(outputPrefix)),
      ContentType: "image/png",
    }));

    console.log(`Uploaded ${thumbnailKey}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
