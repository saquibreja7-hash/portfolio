import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";

// Load R2 credentials from .env.local (never hardcode secrets here).
try { process.loadEnvFile(".env.local"); } catch { /* env may be set externally */ }

function assertEnv(name) {
  if (!process.env[name]) throw new Error(`${name} is required (set it in .env.local)`);
}
["R2_ENDPOINT", "R2_ACCESS_KEY", "R2_SECRET_KEY"].forEach(assertEnv);

const client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

const BUCKET = "portfolio-assets";
const SRC = "C:\\Users\\Media\\Desktop\\Personal\\03-Resources\\My Portfolio";

const mimeTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function getAllFiles(dir) {
  const files = [];
  for (const item of readdirSync(dir)) {
    const full = join(dir, item);
    if (statSync(full).isDirectory()) {
      files.push(...getAllFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function getExistingKeys() {
  const keys = new Set();
  let token;
  do {
    const res = await client.send(new ListObjectsV2Command({ Bucket: BUCKET, MaxKeys: 1000, ContinuationToken: token }));
    for (const obj of res.Contents || []) keys.add(obj.Key);
    token = res.NextContinuationToken;
  } while (token);
  return keys;
}

async function upload() {
  const existing = await getExistingKeys();
  console.log(`Already in R2: ${existing.size}`);

  const files = getAllFiles(SRC);
  const toUpload = files.filter(f => !existing.has(relative(SRC, f).replace(/\\/g, "/")));
  console.log(`Total local: ${files.length}, remaining to upload: ${toUpload.length}`);

  let uploaded = 0;
  let failed = 0;

  for (const file of toUpload) {
    const key = relative(SRC, file).replace(/\\/g, "/");
    const ext = extname(file).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    try {
      const body = readFileSync(file);
      await client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
      }));
      uploaded++;
      if (uploaded % 10 === 0) console.log(`Uploaded ${uploaded}/${toUpload.length}...`);
    } catch (err) {
      failed++;
      console.error(`Failed: ${key} — ${err.message}`);
    }
  }

  console.log(`\nDone! Uploaded: ${uploaded}, Failed: ${failed}, Already existed: ${existing.size}`);
}

upload();
