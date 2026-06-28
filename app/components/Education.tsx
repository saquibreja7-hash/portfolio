"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const education = [
  { degree: "MA in Development Studies", institution: "Dr. B R Ambedkar University, Delhi", period: "2022 – 2024", grade: "7.34 CGPA" },
  { degree: "BA (Hons) Political Science", institution: "Jamia Millia Islamia, New Delhi", period: "2018 – 2021", grade: "8.07 CGPA" },
];

const skills = [
  { label: "Tech", items: "React Native, Next.js, Firebase, PostgreSQL, Supabase, Kotlin", color: "var(--teal)" },
  { label: "Tools", items: "Figma, Canva, Affinity, Premiere Pro, Power BI, MS Excel", color: "var(--amber)" },
  { label: "Comms", items: "Content Strategy, Copywriting, Newsletters, Social Media", color: "var(--coral)" },
  { label: "Research", items: "Qualitative & Quantitative, Field Research, Data Analysis", color: "var(--teal)" },
  { label: "Domain", items: "Online Safety, Trust & Safety, Digital Rights, Gender Justice", color: "var(--amber)" },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "var(--bg)", padding: "0 60px 110px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* Education card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div style={{ background: "var(--card)", borderRadius: 24, padding: "32px 36px", height: "100%", border: "1px solid var(--hairline)" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5" />
              </svg>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--dark)", marginBottom: 24, letterSpacing: "-0.02em" }}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: i < education.length - 1 ? 20 : 0, paddingBottom: i < education.length - 1 ? 20 : 0, borderBottom: i < education.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--dark)", marginBottom: 4 }}>{e.degree}</p>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>{e.institution}</p>
                <p style={{ fontSize: 12, color: "var(--light-text)", marginTop: 6 }}>{e.period} · {e.grade}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          <div style={{ background: "var(--card)", borderRadius: 24, padding: "32px 36px", height: "100%", border: "1px solid var(--hairline)" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--coral-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--dark)", marginBottom: 24, letterSpacing: "-0.02em" }}>Skills</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {skills.map(s => (
                <div key={s.label} style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: s.color, width: 52, flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</span>
                  <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{s.items}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
      <style>{`@media (max-width: 640px) { section > div { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
