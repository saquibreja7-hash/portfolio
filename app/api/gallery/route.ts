import { AwsClient } from "aws4fetch";
import { NextRequest, NextResponse } from "next/server";
import galleryManifest from "../../data/gallery-manifest.json";

const R2_PUBLIC =
  process.env.R2_PUBLIC_URL || "https://pub-c4c57fdf67d242f582ba15043d5ade5c.r2.dev";
const BUCKET = "portfolio-assets";

const ALLOWED_PREFIXES = [
  "02_Social Media Content/",
  "04_Writing Samples/",
  "05_Design Samples/",
  "06_Impact + Reports/",
];

export const dynamic = "force-dynamic";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov"]);

type ManifestEntry = {
  urls: string[];
  videos: string[];
  pdfs: string[];
  count: number;
};

type GalleryResponse = ManifestEntry & {
  nextCursor: string | null;
  source?: "r2" | "manifest";
};

const MANIFEST = galleryManifest as Record<string, ManifestEntry>;

function toUrl(key: string) {
  return `${R2_PUBLIC}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

function hasR2Env() {
  return Boolean(process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY && process.env.R2_SECRET_KEY);
}

function getAws(): AwsClient {
  return new AwsClient({
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
    service: "s3",
    region: "auto",
  });
}

interface ListResult {
  keys: string[];
  nextContinuationToken?: string;
  isTruncated: boolean;
}

async function listObjectsOnce(
  prefix: string,
  maxKeys: number,
  continuationToken?: string
): Promise<ListResult> {
  const aws = getAws();
  const endpoint = process.env.R2_ENDPOINT!.replace(/\/$/, "");
  const url = new URL(`${endpoint}/${BUCKET}`);
  url.searchParams.set("list-type", "2");
  url.searchParams.set("prefix", prefix);
  url.searchParams.set("max-keys", String(maxKeys));
  if (continuationToken) url.searchParams.set("continuation-token", continuationToken);

  const res = await aws.fetch(url.toString(), { method: "GET" });
  if (!res.ok) throw new Error(`R2 list failed: ${res.status} ${await res.text()}`);

  const xml = await res.text();

  // Parse keys from S3 ListObjectsV2 XML
  const keys: string[] = [];
  const keyMatches = xml.matchAll(/<Key>([\s\S]*?)<\/Key>/g);
  for (const [, key] of keyMatches) keys.push(key);

  const isTruncated = /<IsTruncated>true<\/IsTruncated>/.test(xml);
  const tokenMatch = xml.match(/<NextContinuationToken>([\s\S]*?)<\/NextContinuationToken>/);
  const nextContinuationToken = tokenMatch?.[1];

  return { keys, isTruncated, nextContinuationToken };
}

function classifyKeys(keys: string[]) {
  const images: string[] = [];
  const videos: string[] = [];
  const pdfs: string[] = [];
  for (const key of keys) {
    const ext = key.substring(key.lastIndexOf(".")).toLowerCase();
    if (IMAGE_EXTS.has(ext)) images.push(toUrl(key));
    else if (VIDEO_EXTS.has(ext)) videos.push(toUrl(key));
    else if (ext === ".pdf") pdfs.push(toUrl(key));
  }
  return { images, videos, pdfs };
}

function manifestResponse(prefix: string, limit: number | null, cursor?: string): GalleryResponse | null {
  const entry = MANIFEST[prefix];
  if (!entry) return null;

  if (limit === null) {
    return { ...entry, nextCursor: null, source: "manifest" };
  }

  const start = cursor ? Math.max(parseInt(cursor, 10) || 0, 0) : 0;
  const items = [
    ...entry.urls.map((url) => ({ type: "url" as const, url })),
    ...entry.videos.map((url) => ({ type: "video" as const, url })),
    ...entry.pdfs.map((url) => ({ type: "pdf" as const, url })),
  ];
  const page = items.slice(start, start + limit);
  const nextCursor = start + limit < items.length ? String(start + limit) : null;

  return {
    urls: page.filter((item) => item.type === "url").map((item) => item.url),
    videos: page.filter((item) => item.type === "video").map((item) => item.url),
    pdfs: page.filter((item) => item.type === "pdf").map((item) => item.url),
    count: page.length,
    nextCursor,
    source: "manifest",
  };
}

function jsonGallery(data: GalleryResponse, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
  });
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

  const fallback = manifestResponse(prefix, limit, cursor);
  if (!hasR2Env() && fallback) {
    return jsonGallery(fallback);
  }

  try {
    if (limit !== null) {
      // Paginated: single request, return cursor for next page
      const { keys, nextContinuationToken } = await listObjectsOnce(prefix, limit, cursor);
      const { images, videos, pdfs } = classifyKeys(keys);
      return jsonGallery({
          urls: images,
          videos,
          pdfs,
          count: images.length + videos.length + pdfs.length,
          nextCursor: nextContinuationToken ?? null,
          source: "r2",
        });
    }

    // No limit — fetch all pages (for small galleries like Impact + Reports)
    const allImages: string[] = [];
    const allVideos: string[] = [];
    const allPdfs: string[] = [];
    let token: string | undefined;
    do {
      const { keys, nextContinuationToken } = await listObjectsOnce(prefix, 1000, token);
      const { images, videos, pdfs } = classifyKeys(keys);
      allImages.push(...images);
      allVideos.push(...videos);
      allPdfs.push(...pdfs);
      token = nextContinuationToken;
    } while (token);

    return jsonGallery({
      urls: allImages,
      videos: allVideos,
      pdfs: allPdfs,
      count: allImages.length + allVideos.length + allPdfs.length,
      nextCursor: null,
      source: "r2",
    });
  } catch (err) {
    console.error("Gallery listing failed:", err);
    if (fallback) {
      return jsonGallery(fallback);
    }

    return NextResponse.json(
      { urls: [], videos: [], pdfs: [], count: 0, nextCursor: null, error: "Failed to load gallery" },
      { status: 502 }
    );
  }
}
