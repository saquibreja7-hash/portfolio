"use client";
import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from "framer-motion";
import Image from "next/image";

function GridPattern({
  offsetX,
  offsetY,
}: {
  offsetX: ReturnType<typeof useMotionValue<number>>;
  offsetY: ReturnType<typeof useMotionValue<number>>;
}) {
  return (
    <svg style={{ width: "100%", height: "100%" }}>
      <defs>
        <motion.pattern
          id="hero-grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--muted)" strokeWidth="1" />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
    </svg>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "112px 48px 64px",
        overflow: "hidden",
      }}
    >
      {/* Scrolling grid — base dim layer */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.06 }}>
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Scrolling grid — cursor-revealed layer */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.35,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Ambient colour blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", right: "-15%", top: "-15%", width: "45%", height: "45%", borderRadius: "50%", background: "rgba(201,138,30,0.18)", filter: "blur(100px)" }} />
        <div style={{ position: "absolute", right: "5%", top: "-5%", width: "22%", height: "22%", borderRadius: "50%", background: "rgba(13,107,88,0.12)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", left: "-10%", bottom: "-15%", width: "40%", height: "40%", borderRadius: "50%", background: "rgba(59,130,246,0.1)", filter: "blur(100px)" }} />
      </div>

      {/* Hero content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, width: "100%", margin: "0 auto", textAlign: "center" }}>

        {/* Photo + floating name tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ position: "relative", display: "inline-block", marginBottom: 28 }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--teal)", boxShadow: "0 4px 20px rgba(13,107,88,0.15)", margin: "0 auto", background: "white" }}>
            <Image
              src="/photo.jpg"
              alt="Saquib Jamil"
              width={100}
              height={100}
              style={{ objectFit: "cover", objectPosition: "center top", borderRadius: "50%" }}
            />
          </div>
          <motion.div
            className="hero-name-tag"
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ position: "absolute", top: 10, left: "calc(50% + 38px)", background: "var(--teal)", color: "white", borderRadius: 90, padding: "5px 14px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", boxShadow: "0 2px 12px rgba(13,107,88,0.25)" }}>
            Saquib Jamil ✦
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontSize: "clamp(34px, 5.5vw, 60px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--dark)", marginBottom: 20, fontWeight: 400 }}>
          Communications,{" "}
          <strong style={{ fontWeight: 800, color: "var(--teal)" }}>digital safety</strong>{" "}
          &amp; product building.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ fontSize: 16, lineHeight: 1.75, color: "var(--muted)", maxWidth: 520, margin: "0 auto 36px" }}>
          Project Coordinator at Centre for Social Research. Working on online safety, gender-based violence, trust &amp; safety policy, and public-interest digital products.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", marginBottom: 56 }}>
          <a href="#work"
            style={{ background: "var(--teal)", color: "white", fontSize: 13, fontWeight: 600, padding: "12px 28px", borderRadius: 90, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            View my work
            <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 90, padding: "2px 8px", fontSize: 11 }}>6</span>
          </a>
          <a href="#contact"
            style={{ color: "var(--muted)", fontSize: 13, fontWeight: 500, padding: "12px 20px", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
            Get in touch →
          </a>
        </motion.div>

        {/* Org strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ border: "1px solid var(--hairline)", borderRadius: 18, padding: "22px 24px", background: "var(--card)", boxShadow: "0 18px 60px var(--shadow)" }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 16 }}>
            Work &amp; associations
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }} className="association-grid">
            {[
              ["Centre for Social Research", "Project Coordinator"],
              ["Trust & Safety India Festival", "Core Team"],
              ["Alliance for Cyber Trust & Safety", "Secretariat"],
            ].map(([org, role]) => (
              <div key={org} style={{ border: "1px solid var(--hairline)", borderRadius: 12, padding: "14px 16px", textAlign: "left", background: "var(--bg)" }}>
                <span style={{ display: "block", fontSize: 13, fontWeight: 800, color: "var(--dark)", marginBottom: 6 }}>{org}</span>
                <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, color: "var(--teal)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{role}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 700px) { .association-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 380px) { .hero-name-tag { left: calc(50% + 24px) !important; font-size: 11px !important; padding: 4px 11px !important; } }
      `}</style>
      {/* Sentinel observed by StatsBar — must be at actual bottom of hero */}
      <div id="hero-sentinel" style={{ height: 1 }} />
    </section>
  );
}
