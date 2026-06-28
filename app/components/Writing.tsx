"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { articles } from "../blog/articles";

export default function Writing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="writing" ref={ref} style={{ background: "var(--surface)", padding: "110px 60px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 44 }}
        >
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2a005f", marginBottom: 14 }}>
              News & Updates
            </p>
            <h2 style={{ fontSize: "clamp(34px, 4.4vw, 52px)", fontWeight: 900, letterSpacing: "-0.045em", color: "var(--dark)", lineHeight: 1.05 }}>
              The latest from Saquib
            </h2>
          </div>
          <Link
            href="/blog"
            className="writing-view-all"
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            View all writing →
          </Link>
        </motion.div>

        <div className="writing-grid">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={i === 0 ? "writing-card writing-card-featured" : "writing-card"}
            >
              <Link href={`/blog/${article.slug}`} className="writing-image-link" aria-label={article.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.image} alt="" className="writing-image" />
              </Link>
              <div className="writing-card-body">
                <div className="writing-meta">
                  <span className="writing-chip">{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h3 className={i === 0 ? "writing-title-featured" : "writing-title"}>
                  <Link href={`/blog/${article.slug}`} className="writing-title-link">
                    {article.title}
                  </Link>
                </h3>
                <p className="writing-excerpt">
                  {article.excerpt}
                </p>
                <Link href={`/blog/${article.slug}`} className="writing-read-more">
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .writing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .writing-card-featured {
          grid-column: span 1;
        }
        .writing-card {
          background: var(--card);
          border: 1px solid var(--hairline);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .writing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        .writing-view-all {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 28px;
          border: 1px solid #dbe1ea;
          border-radius: 999px;
          color: var(--dark);
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          transition: opacity 0.2s;
        }
        .writing-image-link {
          display: block;
          height: 190px;
          background: #e9edf2;
          overflow: hidden;
        }
        .writing-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .writing-card:hover .writing-image {
          transform: scale(1.04);
        }
        .writing-card-body {
          padding: 26px 28px 28px;
          display: flex;
          flex: 1;
          flex-direction: column;
        }
        .writing-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          color: #4c5a6a;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .writing-chip {
          color: #2a005f;
          background: #efe7f7;
          border-radius: 8px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
        }
        .writing-title-link {
          color: inherit;
          text-decoration: none;
        }
        .writing-title {
          font-size: 21px;
          font-weight: 800;
          color: var(--dark);
          letter-spacing: -0.035em;
          line-height: 1.18;
          margin-bottom: 14px;
        }
        .writing-title-featured {
          font-size: 21px;
          font-weight: 800;
          color: var(--dark);
          letter-spacing: -0.035em;
          line-height: 1.18;
          margin-bottom: 14px;
        }
        .writing-excerpt {
          font-size: 14px;
          line-height: 1.55;
          color: #415064;
          margin: 0 0 24px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .writing-read-more {
          margin-top: auto;
          width: fit-content;
          color: #2a005f;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .writing-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .writing-grid { grid-template-columns: 1fr; }
          .writing-card-featured { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
}
