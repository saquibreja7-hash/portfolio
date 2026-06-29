"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const R2 = "https://pub-c4c57fdf67d242f582ba15043d5ade5c.r2.dev";

const items = [
  {
    label: "Social Media Content",
    count: "845+",
    sub: "Campaigns, news posts & event promotions",
    image: `${R2}/02_Social%20Media%20Content/16%20Days%20of%20Activism%20Campaign/16%20Days%20Activism%20Campaign%20%281%29.png`,
    slug: "social-media-content",
  },
  {
    label: "Design Samples",
    count: "77",
    sub: "Reports, speaker panels & posters",
    image: `${R2}/05_Design%20Samples/Annual%20Report%20Cover%20Page/1.png`,
    slug: "design-samples",
  },
  {
    label: "Impact & Reports",
    count: "12",
    sub: "Annual reports & impact assessments",
    image: "/gallery/impact-reports-thumbnail.png",
    slug: "impact-reports",
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="gallery" ref={ref} style={{ background: "var(--bg)", padding: "110px 60px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 56 }}
        >
          <div>
            <p style={{ display: "inline-flex", alignItems: "center", minHeight: 34, border: "1px solid var(--hairline)", borderRadius: 999, padding: "0 18px", color: "var(--dark)", fontSize: 13, fontWeight: 700, background: "var(--card)", marginBottom: 20 }}>
              Portfolio
            </p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--dark)", lineHeight: 1.2 }}>
              Explore my portfolio of<br />creative solutions
            </h2>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 280, lineHeight: 1.6 }}>
            950+ assets across campaigns, events & brand design.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="portfolio-grid">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/gallery/${item.slug}${"query" in item && item.query ? `?sub=${item.query}` : ""}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div className="portfolio-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    className="portfolio-card-img"
                    onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
                  />
                  <div className="portfolio-card-hover">
                    <div className="portfolio-card-content">
                      <span className="portfolio-card-count">{item.count} assets</span>
                      <h3 className="portfolio-card-title">{item.label}</h3>
                      <p className="portfolio-card-sub">{item.sub}</p>
                      <span className="portfolio-card-link">
                        View
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .portfolio-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          background: #e5e5e5;
          cursor: pointer;
        }
        .portfolio-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portfolio-card-hover {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: flex-end;
          transition: background 0.4s;
        }
        .portfolio-card-content {
          padding: 24px 20px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.3s, transform 0.3s;
          width: 100%;
        }
        .portfolio-card:hover .portfolio-card-img {
          transform: scale(1.05);
        }
        .portfolio-card:hover .portfolio-card-hover {
          background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 100%);
        }
        .portfolio-card:hover .portfolio-card-content {
          opacity: 1;
          transform: translateY(0);
        }
        .portfolio-card-count {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }
        .portfolio-card-title {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin: 4px 0 3px;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .portfolio-card-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.55);
          line-height: 1.4;
          margin: 0;
        }
        .portfolio-card-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          color: white;
          margin-top: 12px;
          padding: 5px 12px;
          border-radius: 90px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        @media (max-width: 900px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (max-width: 500px) {
          .portfolio-grid { grid-template-columns: 1fr; gap: 14px; }
          .portfolio-card { aspect-ratio: 1 / 1; }
        }
      `}</style>
    </section>
  );
}
