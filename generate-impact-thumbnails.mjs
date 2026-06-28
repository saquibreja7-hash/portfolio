import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createWriteStream, existsSync, mkdirSync, readFileSync, readdirSync } from "fs";
import { basename, join } from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { execFileSync } from "child_process";

const BUCKET = "portfolio-assets";
const PREFIX = "06_Impact + Reports/";
const LOCAL_PDF_DIR = "C:\\Users\\Media\\Desktop\\Personal\\03-Resources\\My Portfolio\\06_Impact + Reports";
const WORK_DIR = "C:\\Users\\Media\\Desktop\\Personal\\01-Projects\\saquib-portfolio\\tmp\\impact-thumbnails";
const PDFTOPPM = "C:\\Users\\Media\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\native\\poppler\\Library\\bin\\pdftoppm.exe";

const PDF_TO_THUMBNAIL = {
  "16 Days Of Activism Toolkit.pdf": "16 Days of Actvism.png",
  "AI Impact Summit Quotes.pdf": "Key Takeaways from AI Impact Summit 2026.png",
  "Annual Report 2024.pdf": "Copy of Final Annual Report 2024 (Flyer (A4)) (9).png",
  "CSR Annual Report 2025.pdf": "CSR Annual Report 2025.png",
  "Email Newsletter.pdf": "Email Newsletter.png",
  "Newsletter I  2025.pdf": "Newsletter I  2025 (1).png",
  "Newsletter II  2025.pdf": "Newsletter II  2025.png",
  "Newsletter III  2025.pdf": "Newsletter III  2025.png",
  "Newsletter Q I  2026 (3).pdf": "Newsletter Q I  2026.png",
  "TASI 2026 Brochure.pdf": "Copy of TASI 2026 Brochure.png",
  "TASI Event Report 2025.pdf": "TASI Event Report 2025 (8).png",
  "Takeaways from AI Impact Summit 2026.pdf": "Key Takeaways (1).png",
};

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

function firstPageOutput(prefix) {
  const expectedNames = [`${prefix}-1.png`, `${prefix}-01.png`];
  const existing = expectedNames.find((path) => existsSync(path));
  if (existing) return existing;

  const prefixName = basename(prefix);
  const fileName = readdirSync(WORK_DIR).find((name) => name.startsWith(`${prefixName}-`) && name.endsWith(".png"));
  if (fileName) return join(WORK_DIR, fileName);

  return expectedNames[0];
}

async function downloadPdf(key, targetPath) {
  const response = await client.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
  const body = response.Body instanceof Readable ? response.Body : Readable.fromWeb(response.Body);
  await pipeline(body, createWriteStream(targetPath));
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

async function main() {
  assertEnv("R2_ENDPOINT");
  assertEnv("R2_ACCESS_KEY");
  assertEnv("R2_SECRET_KEY");

  const pdfKeys = await listPdfs();
  console.log(`Found ${pdfKeys.length} PDFs in R2`);

  for (const pdfKey of pdfKeys) {
    const pdfName = basename(pdfKey);
    const thumbnailName = PDF_TO_THUMBNAIL[pdfName];

    if (!thumbnailName) {
      console.warn(`Skipping unmapped PDF: ${pdfName}`);
      continue;
    }

    const localPdfPath = join(LOCAL_PDF_DIR, pdfName);
    const pdfPath = existsSync(localPdfPath) ? localPdfPath : join(WORK_DIR, pdfName);

    if (!existsSync(pdfPath)) {
      console.log(`Downloading ${pdfName}`);
      await downloadPdf(pdfKey, pdfPath);
    }

    const outputPrefix = join(WORK_DIR, pdfName.replace(/\.pdf$/i, ""));
    execFileSync(PDFTOPPM, ["-f", "1", "-l", "1", "-r", "144", "-png", pdfPath, outputPrefix], {
      stdio: "inherit",
    });

    const outputPng = firstPageOutput(outputPrefix);

    const thumbnailKey = `${PREFIX}thumbnails/${thumbnailName}`;
    await client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: thumbnailKey,
      Body: readFileSync(outputPng),
      ContentType: "image/png",
    }));

    console.log(`Uploaded ${thumbnailKey}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
