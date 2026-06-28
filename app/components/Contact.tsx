"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const email = "iamsaquib.work@gmail.com";
const phone = "+91 7011925439";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref}>
      {/* Get in Touch — white background */}
      <div style={{ background: "var(--surface)", padding: "110px 60px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <p style={{ display: "inline-flex", alignItems: "center", minHeight: 34, border: "1px solid var(--hairline)", borderRadius: 999, padding: "0 18px", color: "var(--dark)", fontSize: 13, fontWeight: 700, background: "var(--card)", marginBottom: 20 }}>Get In Touch</p>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 900, letterSpacing: "-0.055em", lineHeight: 1.05, color: "var(--dark)", marginBottom: 20 }}>
              Got a Vision? Let&apos;s Bring It to Life!
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)", marginBottom: 36 }}>
              I&apos;m always excited to collaborate on new and innovative projects. Whether you&apos;re starting from scratch or refining an existing idea.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`mailto:${email}`}
                style={{ background: "var(--teal)", color: "white", fontSize: 14, fontWeight: 700, padding: "14px 32px", borderRadius: 90, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email Me
              </a>
              <a href="https://linkedin.com/in/saquibjamil" target="_blank" rel="noopener noreferrer"
                style={{ background: "transparent", color: "var(--dark)", fontSize: 14, fontWeight: 600, padding: "14px 32px", borderRadius: 90, textDecoration: "none", border: "1px solid var(--hairline)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "var(--dark)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--hairline)"; }}>
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer — dark background */}
      <div style={{ background: "#111412", padding: "60px 40px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, paddingBottom: 48 }}>
            {/* Brand */}
            <div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "var(--teal)", letterSpacing: "-0.02em" }}>Saquib.</span>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 8, maxWidth: 260, lineHeight: 1.6 }}>
                Communications & Digital Safety professional based in New Delhi.
              </p>
            </div>

            {/* Nav + Contact columns */}
            <div style={{ display: "flex", gap: 56 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>Navigate</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["About", "Experience", "Work", "Gallery"].map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`}
                      style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "white")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>Contact</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href={`mailto:${email}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{email}</a>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{phone}</a>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>New Delhi, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copyright bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>© 2025 Saquib Jamil</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>JAMSAQ STUDIO</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #contact > div:last-child > div > div:first-child { flex-direction: column !important; align-items: center !important; text-align: center !important; }
        }
        @media (max-width: 640px) {
          #contact > div:first-child { padding: 72px 20px !important; }
          #contact > div:last-child { padding: 48px 20px 0 !important; }
        }
      `}</style>
    </section>
  );
}
