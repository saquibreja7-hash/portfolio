"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { categories, type SubCategory } from "./categories";

const PAGE_SIZE = 12;

const THUMBNAIL_TO_PDF: Record<string, string> = {
  "16 Days of Actvism.png": "16 Days Of Activism Toolkit.pdf",
  "Copy of Final Annual Report 2024 (Flyer (A4)) (9).png": "Annual Report 2024.pdf",
  "Copy of TASI 2026 Brochure.png": "TASI 2026 Brochure.pdf",
  "Newsletter I  2025 (1).png": "Newsletter I  2025.pdf",
  "TASI Event Report 2025 (8).png": "TASI Event Report 2025.pdf",
  "Key Takeaways (1).png": "Takeaways from AI Impact Summit 2026.pdf",
  "Key Takeaways from AI Impact Summit 2026.png": "AI Impact Summit Quotes.pdf",
  "CSR Annual Report 2025.png": "CSR Annual Report 2025.pdf",
  "Email Newsletter.png": "Email Newsletter.pdf",
  "Newsletter II  2025.png": "Newsletter II  2025.pdf",
  "Newsletter III  2025.png": "Newsletter III  2025.pdf",
  "Newsletter Q I  2026.png": "Newsletter Q I  2026 (3).pdf",
};

const PDF_TO_THUMBNAIL = Object.fromEntries(
  Object.entries(THUMBNAIL_TO_PDF).map(([thumbnail, pdf]) => [pdf, thumbnail])
) as Record<string, string>;

const R2_BASE = "https://pub-c4c57fdf67d242f582ba15043d5ade5c.r2.dev";

function fileNameFromUrl(url: string): string {
  return decodeURIComponent(url.split("/").pop() || "");
}

function thumbnailToPdfUrl(thumbnailUrl: string, availablePdfs: string[]): string | null {
  const decoded = decodeURIComponent(thumbnailUrl.split("/").pop() || "");
  const pdfName = THUMBNAIL_TO_PDF[decoded];
  if (!pdfName) return null;

  return availablePdfs.find((pdfUrl) => fileNameFromUrl(pdfUrl) === pdfName) || null;
}

function pdfToThumbnailUrl(pdfUrl: string, thumbnails: string[]): string | null {
  const pdfName = fileNameFromUrl(pdfUrl);
  const thumbnailName = PDF_TO_THUMBNAIL[pdfName];
  if (!thumbnailName) return null;

  return (
    thumbnails.find((thumbnailUrl) => fileNameFromUrl(thumbnailUrl) === thumbnailName) ||
    `${R2_BASE}/06_Impact%20%2B%20Reports/thumbnails/${encodeURIComponent(thumbnailName)}`
  );
}

function folderPdfThumbnailUrl(pdfUrl: string, folder: string): string {
  const pdfName = fileNameFromUrl(pdfUrl);
  const thumbnailName = pdfName.replace(/\.pdf$/i, ".png");
  const thumbnailFolder = (folder.startsWith("05_Design Samples/")
    ? "05_Design Samples/thumbnails"
    : `${folder.replace(/\/$/, "")}/thumbnails`)
    .split("/")
    .map(encodeURIComponent)
    .join("/");

  return `${R2_BASE}/${thumbnailFolder}/${encodeURIComponent(thumbnailName)}`;
}

function SubGrid({ sub, showHeading, initialCount, onImageClick }: {
  sub: SubCategory; showHeading: boolean; initialCount: number; onImageClick: (img: string) => void;
}) {
  const [allImages, setAllImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(initialCount);
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const markFailed = (url: string) =>
    setFailed(prev => (prev.has(url) ? prev : new Set(prev).add(url)));

  useEffect(() => {
    const fetchJson = async (prefix: string) => {
      const r = await fetch(`/api/gallery?prefix=${encodeURIComponent(prefix)}`);
      if (!r.ok) throw new Error(`Gallery fetch failed: ${r.status}`);
      return r.json();
    };
    const promises: Promise<void>[] = [
      fetchJson(sub.folder + "/").then(data => {
        setAllImages(data.urls || []);
        setVideos(data.videos || []);
        if (!sub.pdfFolder) setPdfs(data.pdfs || []);
      }),
    ];
    if (sub.pdfFolder) {
      promises.push(
        fetchJson(sub.pdfFolder + "/").then(data => { setPdfs(data.pdfs || []); })
      );
    }
    Promise.all(promises)
      .then(() => setLoading(false))
      .catch(() => { setError(true); setLoading(false); });
  }, [sub.folder, sub.pdfFolder]);

  const reportMedia = sub.pdfFolder
    ? pdfs.map((pdfUrl) => ({
        url: pdfUrl,
        previewUrl: pdfToThumbnailUrl(pdfUrl, allImages),
        isPdf: true,
        isVideo: false,
      }))
    : [];
  const regularMedia = [...allImages, ...videos].map((url) => ({
    url,
    previewUrl: url,
    isPdf: false,
    isVideo: url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov"),
  }));
  const folderPdfMedia = sub.pdfFolder
    ? []
    : pdfs.map((pdfUrl) => ({
        url: pdfUrl,
        previewUrl: folderPdfThumbnailUrl(pdfUrl, sub.folder),
        isPdf: true,
        isVideo: false,
      }));
  const allMedia = sub.pdfFolder ? reportMedia : [...regularMedia, ...folderPdfMedia];
  const shown = allMedia.slice(0, visible);
  const hasMore = visible < allMedia.length;

  const loadMore = () => setVisible(v => Math.min(v + PAGE_SIZE, allMedia.length));

  return (
    <div style={{ padding: "0 40px 60px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {showHeading && (
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--dark)", marginBottom: 20, paddingBottom: 12, borderBottom: "2px solid var(--hairline)" }}>
            <span style={{ color: sub.color }}>●</span> {sub.name}
            <span style={{ fontSize: 13, fontWeight: 400, color: "var(--muted)", marginLeft: 10 }}>{sub.count} items</span>
          </h2>
        )}
        {loading && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)", fontSize: 14 }}>Loading images...</div>
        )}
        {!loading && error && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)", fontSize: 14 }}>
            Couldn&apos;t load this gallery right now. Please refresh to try again.
          </div>
        )}
        {!loading && !error && allMedia.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)", fontSize: 14 }}>
            Nothing here yet.
          </div>
        )}
        <div style={{ columnCount: 3, columnGap: 16 }} className="masonry-grid">
          {shown.map((media, i) => {
            const linkedPdf = media.isPdf ? media.url : thumbnailToPdfUrl(media.url, pdfs);
            const showFilenameCard = !media.previewUrl || failed.has(media.previewUrl);
            const activate = () => {
              if (media.isVideo) return;
              if (linkedPdf) window.open(linkedPdf, "_blank", "noopener,noreferrer");
              else onImageClick(media.url);
            };
            const interactive = !media.isVideo;
            const label = media.isPdf
              ? `Open PDF: ${fileNameFromUrl(media.url).replace(/\.pdf$/i, "")}`
              : `View ${sub.name} image ${i + 1}`;
            return (
              <motion.div key={media.url}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.6) }}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={interactive ? label : undefined}
                onClick={activate}
                onKeyDown={interactive ? (e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
                } : undefined}
                style={{ breakInside: "avoid", marginBottom: 16, cursor: media.isVideo ? "default" : "pointer" }}>
                <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
                  {media.isVideo ? (
                    <video
                      src={media.url}
                      controls
                      preload="metadata"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  ) : media.previewUrl && !showFilenameCard ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={media.previewUrl}
                      alt={media.isPdf ? `${fileNameFromUrl(media.url).replace(/\.pdf$/i, "")} cover` : `${sub.name} - ${i + 1}`}
                      loading="lazy"
                      onError={() => media.previewUrl && markFailed(media.previewUrl)}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  ) : (
                    <div style={{ minHeight: 180, padding: 24, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: "var(--dark)", fontSize: 14, fontWeight: 700, lineHeight: 1.4 }}>
                      {fileNameFromUrl(media.url).replace(/\.pdf$/i, "")}
                    </div>
                  )}
                  {linkedPdf && (
                    <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(13,107,88,0.9)", color: "white", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 90, backdropFilter: "blur(4px)", letterSpacing: "0.06em" }}>
                      PDF
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={loadMore}
              style={{ fontSize: 13, fontWeight: 600, padding: "12px 32px", borderRadius: 90, border: "2px solid var(--hairline)", background: "white", color: "var(--dark)", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--dark)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "var(--dark)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--dark)"; e.currentTarget.style.borderColor = "var(--hairline)"; }}>
              Load More ({allMedia.length - visible} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryDetailInner() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const subQuery = searchParams.get("sub");
  const category = categories[slug];
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(subQuery);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  if (!category) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <p>Category not found.</p>
      </div>
    );
  }

  const activeSubs = activeSub
    ? category.subcategories.filter(s => s.id === activeSub)
    : category.subcategories;
  const visibleSubs = activeSubs.length > 0 ? activeSubs : category.subcategories;

  return (
    <>
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <div style={{ padding: "40px 40px 0" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <button onClick={() => router.push("/#gallery")}
              style={{ background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "var(--teal)", cursor: "pointer", padding: 0, marginBottom: 40, display: "flex", alignItems: "center", gap: 6 }}>
              ← Back to Gallery
            </button>
          </div>
        </div>

        <div style={{ padding: "0 40px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--dark)", marginBottom: 4 }}>
                {category.title}
              </h1>
              <span aria-hidden="true" style={{ display: "block", fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--dark)", opacity: 0.15, marginBottom: 4 }}>
                {category.title}
              </span>
              <span aria-hidden="true" style={{ display: "block", fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--dark)", opacity: 0.05, marginBottom: 32 }}>
                {category.title}
              </span>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ fontSize: 14, fontWeight: 600, color: category.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
              {category.subtitle}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }}
              style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted)", maxWidth: 560, margin: "0 auto" }}>
              {category.description}
            </motion.p>
          </div>
        </div>

        {category.subcategories.length > 1 && (
          <div style={{ padding: "0 40px 32px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setActiveSub(null)}
                style={{ fontSize: 12, fontWeight: 600, padding: "8px 18px", borderRadius: 90, border: "none", background: !activeSub ? "var(--dark)" : "var(--bg)", color: !activeSub ? "white" : "var(--muted)", cursor: "pointer", transition: "all 0.2s" }}>
                All
              </button>
              {category.subcategories.map(sub => (
                <button key={sub.id} onClick={() => setActiveSub(sub.id)}
                  style={{ fontSize: 12, fontWeight: 600, padding: "8px 18px", borderRadius: 90, border: "none", background: activeSub === sub.id ? "var(--dark)" : "var(--bg)", color: activeSub === sub.id ? "white" : "var(--muted)", cursor: "pointer", transition: "all 0.2s" }}>
                  {sub.name} ({sub.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {visibleSubs.map(sub => (
          <SubGrid
            key={sub.id}
            sub={sub}
            showHeading={visibleSubs.length > 1}
            initialCount={activeSub && activeSubs.length > 0 || category.subcategories.length === 1 ? 12 : 6}
            onImageClick={setLightbox}
          />
        ))}
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)}
          role="dialog" aria-modal="true" aria-label="Image preview"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out", padding: 40 }}>
          <button onClick={() => setLightbox(null)} aria-label="Close image preview"
            style={{ position: "absolute", top: 20, right: 20, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "none", color: "white", fontSize: 24, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ×
          </button>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox}
              alt="Enlarged gallery image"
              style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 12 }}
            />
          </motion.div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .masonry-grid { column-count: 2 !important; } }
        @media (max-width: 500px) { .masonry-grid { column-count: 1 !important; } }
      `}</style>
    </>
  );
}

export default function GalleryDetailClient() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg)" }} />}>
      <GalleryDetailInner />
    </Suspense>
  );
}
