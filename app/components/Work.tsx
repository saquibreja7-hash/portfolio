"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Meri Asmita Platform",
    category: "Digital Safety Product",
    org: "Founder & Developer",
    description: "A trauma-informed platform for NCII survivors with case documentation, legal notice workflows, and platform escalation support.",
    tags: ["Next.js", "PostgreSQL", "Survivor Safety"],
    image: "/gallery/meri-asmita-cover.png",
    link: "https://meriasmita.org",
  },
  {
    title: "Let's Love App",
    category: "Mobile Product",
    org: "Founder & Developer",
    description: "A private couple-space app with chat, memories, goals, dates, and relationship rituals designed for everyday intimacy.",
    tags: ["React Native", "Firebase", "Play Store"],
    image: "/gallery/letslove-cover.jpg",
    link: "https://letslove.jamsaq.in",
  },
  {
    title: "TASI Communications",
    category: "Event & Policy Communications",
    org: "Trust & Safety India",
    description: "Branding, content systems, sponsorship support, and stakeholder messaging for a national trust and safety convening.",
    tags: ["TASI", "Branding", "Convening"],
    image: "/gallery/tasi-cover.png",
    link: "https://trustandsafetyindia.org/",
  },
];

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" style={{ background: "var(--bg)", padding: "110px 60px" }} ref={ref}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <motion.div className="section-head" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div>
            <span className="section-pill">Selected work</span>
            <h2>My latest works</h2>
          </div>
          <p>Products, campaigns, and communications work across Meri Asmita, Let's Love, ACTS, TASI, and CSR.</p>
        </motion.div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="work-card"
            >
              <div className="work-image">
                <Image
                  src={p.image}
                  alt={`${p.title} preview`}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title}`}>
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </div>
              <div className="work-body">
                <span>{p.category}</span>
                <h3>{p.title}</h3>
                <p className="work-org">{p.org}</p>
                <p className="work-desc">{p.description}</p>
                <div>
                  {p.tags.map(tag => <small key={tag}>{tag}</small>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <style>{`
        .section-head {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
          gap: 48px;
          align-items: end;
          margin-bottom: 42px;
        }
        .section-pill {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          border: 1px solid var(--hairline);
          border-radius: 999px;
          padding: 0 18px;
          color: var(--dark);
          font-size: 13px;
          font-weight: 700;
          background: var(--card);
          margin-bottom: 20px;
        }
        .section-head h2 {
          font-size: clamp(26px, 3.5vw, 36px);
          line-height: 1.2;
          letter-spacing: -0.03em;
          font-weight: 800;
          color: var(--dark);
        }
        .section-head p {
          color: var(--muted);
          font-size: 17px;
          line-height: 1.55;
        }
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        .work-card {
          border: 1px solid var(--hairline);
          border-radius: 16px;
          background: var(--card);
          overflow: hidden;
          box-shadow: 0 8px 32px var(--shadow);
          display: flex;
          flex-direction: column;
        }
        .work-image {
          position: relative;
          aspect-ratio: 3 / 2;
          background: var(--bg-warm);
          overflow: hidden;
          flex-shrink: 0;
        }
        .work-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .work-card:hover .work-image img {
          transform: scale(1.04);
        }
        .work-image a {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.86);
          color: var(--dark);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          backdrop-filter: blur(8px);
        }
        .work-body {
          padding: 20px 24px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .work-body > span {
          display: inline-block;
          color: var(--teal);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .work-body h3 {
          color: var(--dark);
          font-size: 25px;
          line-height: 1.12;
          letter-spacing: -0.04em;
          font-weight: 900;
          margin-bottom: 7px;
        }
        .work-org {
          color: var(--light-text);
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .work-desc {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.65;
          margin-bottom: 16px;
          flex: 1;
        }
        .work-body div {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .work-body small {
          background: var(--bg);
          color: var(--muted);
          border: 1px solid var(--hairline);
          border-radius: 999px;
          padding: 5px 11px;
          font-size: 11px;
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .section-head,
          .work-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
