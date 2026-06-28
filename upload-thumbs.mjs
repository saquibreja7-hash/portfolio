import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";

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

const dir = "C:\\Users\\Media\\AppData\\Local\\Temp\\claude\\C--Users-Media-Desktop-Personal-03-Resources-Job-Search\\683d27fd-e0f8-4953-8f88-f6683647a1b7\\scratchpad\\pdf-thumbs";

const files = [
  { local: "Email Newsletter-1.png", key: "06_Impact + Reports/thumbnails/Email Newsletter.png" },
];

for (const f of files) {
  const body = readFileSync(dir + "\\" + f.local);
  await client.send(new PutObjectCommand({
    Bucket: "portfolio-assets",
    Key: f.key,
    Body: body,
    ContentType: "image/png",
  }));
  console.log("Uploaded:", f.key);
}
console.log("Done!");
