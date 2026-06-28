"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  { label: "Communications", count: "1000+ Assets", color: "white", bg: "var(--teal)", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "Digital Safety", count: "10+ Programmes", color: "white", bg: "var(--amber)", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { label: "Product Building", count: "5 Apps + Sites Live", color: "white", bg: "var(--coral)", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { label: "Research", count: "10+ Projects", color: "white", bg: "var(--teal)", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} style={{ background: "var(--bg)", padding: "110px 60px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "380px 1fr", gap: 80, alignItems: "start" }}>

        {/* Left — service list */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          {services.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: 18, padding: "20px 0", borderBottom: i < services.length - 1 ? "1px solid var(--hairline)" : "none" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "var(--dark)", letterSpacing: "-0.01em" }}>{s.label}</p>
                <p style={{ fontSize: 13, color: "var(--light-text)", marginTop: 3 }}>{s.count}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right — heading + bio + stats */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
          <span style={{ display: "inline-flex", alignItems: "center", minHeight: 34, border: "1px solid var(--hairline)", borderRadius: 999, padding: "0 18px", color: "var(--dark)", fontSize: 13, fontWeight: 700, background: "var(--card)", marginBottom: 20 }}>What I do</span>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 900, letterSpacing: "-0.055em", lineHeight: 1.05, color: "var(--dark)", marginBottom: 24 }}>
            What do I do?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--muted)", marginBottom: 16 }}>
            I work at the intersection of communications, digital safety, and social impact, coordinating national events, building survivor support technology, leading outreach programmes, and creating content that reaches thousands.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--muted)", marginBottom: 48 }}>
            Development Studies graduate currently serving as Project Coordinator at Centre for Social Research, New Delhi.
          </p>
        </motion.div>

      </div>
      <style>{`@media (max-width: 768px) { #about > div { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}
