import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
});

const R2_PUBLIC = process.env.R2_PUBLIC_URL!;

// Only allow listing within the known portfolio content folders.
// Prevents arbitrary enumeration of the entire bucket.
const ALLOWED_PREFIXES = [
  "02_Social Media Content/",
  "04_Writing Samples/",
  "05_Design Samples/",
  "06_Impact + Reports/",
];

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const prefix = req.nextUrl.searchParams.get("prefix");
  if (!prefix) return NextResponse.json({ error: "prefix required" }, { status: 400 });

  if (!ALLOWED_PREFIXES.some((allowed) => prefix.startsWith(allowed))) {
    return NextResponse.json({ error: "prefix not allowed" }, { status: 403 });
  }

  const imageExts = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);
  const videoExts = new Set([".mp4", ".webm", ".mov"]);
  const images: string[] = [];
  const videos: string[] = [];
  const pdfs: string[] = [];
  let token: string | undefined;

  try {
    do {
      const res = await client.send(
        new ListObjectsV2Command({
          Bucket: "portfolio-assets",
          Prefix: prefix,
          MaxKeys: 1000,
          ContinuationToken: token,
        })
      );
      for (const obj of res.Contents || []) {
        const key = obj.Key!;
        const ext = key.substring(key.lastIndexOf(".")).toLowerCase();
        const url = `${R2_PUBLIC}/${key.split("/").map(encodeURIComponent).join("/")}`;
        if (imageExts.has(ext)) images.push(url);
        else if (videoExts.has(ext)) videos.push(url);
        else if (ext === ".pdf") pdfs.push(url);
      }
      token = res.NextContinuationToken;
    } while (token);
  } catch (err) {
    console.error("Gallery listing failed:", err);
    return NextResponse.json(
      { urls: [], videos: [], pdfs: [], count: 0, error: "Failed to load gallery" },
      { status: 502 }
    );
  }

  return NextResponse.json({ urls: images, videos, pdfs, count: images.length + videos.length + pdfs.length }, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
  });
}
