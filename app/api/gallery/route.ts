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

const ALLOWED_PREFIXES = [
  "02_Social Media Content/",
  "04_Writing Samples/",
  "05_Design Samples/",
  "06_Impact + Reports/",
];

export const dynamic = "force-dynamic";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov"]);

function toUrl(key: string) {
  return `${R2_PUBLIC}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

function classify(contents: { Key?: string }[]) {
  const images: string[] = [];
  const videos: string[] = [];
  const pdfs: string[] = [];
  for (const obj of contents) {
    const key = obj.Key!;
    const ext = key.substring(key.lastIndexOf(".")).toLowerCase();
    const url = toUrl(key);
    if (IMAGE_EXTS.has(ext)) images.push(url);
    else if (VIDEO_EXTS.has(ext)) videos.push(url);
    else if (ext === ".pdf") pdfs.push(url);
  }
  return { images, videos, pdfs };
}

export async function GET(req: NextRequest) {
  const prefix = req.nextUrl.searchParams.get("prefix");
  if (!prefix) return NextResponse.json({ error: "prefix required" }, { status: 400 });

  if (!ALLOWED_PREFIXES.some((a) => prefix.startsWith(a))) {
    return NextResponse.json({ error: "prefix not allowed" }, { status: 403 });
  }

  const limitParam = req.nextUrl.searchParams.get("limit");
  const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
  const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10), 1), 500) : null;

  try {
    if (limit !== null) {
      // Paginated: single S3 request, return nextCursor for client to continue
      const res = await client.send(
        new ListObjectsV2Command({
          Bucket: "portfolio-assets",
          Prefix: prefix,
          MaxKeys: limit,
          ContinuationToken: cursor,
        })
      );
      const { images, videos, pdfs } = classify(res.Contents || []);
      return NextResponse.json(
        {
          urls: images,
          videos,
          pdfs,
          count: images.length + videos.length + pdfs.length,
          nextCursor: res.NextContinuationToken ?? null,
        },
        { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } }
      );
    }

    // No limit — fetch everything (used for small galleries like Impact + Reports)
    const allImages: string[] = [];
    const allVideos: string[] = [];
    const allPdfs: string[] = [];
    let token: string | undefined;
    do {
      const res = await client.send(
        new ListObjectsV2Command({
          Bucket: "portfolio-assets",
          Prefix: prefix,
          MaxKeys: 1000,
          ContinuationToken: token,
        })
      );
      const { images, videos, pdfs } = classify(res.Contents || []);
      allImages.push(...images);
      allVideos.push(...videos);
      allPdfs.push(...pdfs);
      token = res.NextContinuationToken;
    } while (token);

    return NextResponse.json(
      { urls: allImages, videos: allVideos, pdfs: allPdfs, count: allImages.length + allVideos.length + allPdfs.length, nextCursor: null },
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } }
    );
  } catch (err) {
    console.error("Gallery listing failed:", err);
    return NextResponse.json(
      { urls: [], videos: [], pdfs: [], count: 0, nextCursor: null, error: "Failed to load gallery" },
      { status: 502 }
    );
  }
}
