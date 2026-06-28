"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experience = [
  {
    period: "2025 - Now",
    org: "Centre for Social Research",
    role: "Project Coordinator, Trust & Safety",
    desc: "Coordinating national trust and safety work across TASI, ACTS, policy outreach, sponsorship conversations, and multi-stakeholder programming.",
  },
  {
    period: "2024 - 2025",
    org: "Centre for Social Research",
    role: "Communication Associate",
    desc: "Led digital communications, school outreach, newsletters, social content systems, and campaign operations for child online safety and programme visibility.",
  },
  {
    period: "2023",
    org: "Centre for Social Research",
    role: "Research Intern",
    desc: "Supported field research across 33 villages in Alwar, Rajasthan, working on gender, water, climate change, survey data entry, and respondent analysis.",
  },
  {
    period: "2022 - Now",
    org: "Samsung India",
    role: "Community Brand Ambassador",
    desc: "Moderated the Samsung Members community, supported digital campaigns for product launches, and represented community users across brand events.",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} style={{ background: "var(--surface)", padding: "110px 60px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-head"
        >
          <div>
            <span className="section-pill">Experience</span>
            <h2>A yearly snapshot of my professional growth</h2>
          </div>
          <p>Work across communications, research, digital safety, community operations, and stakeholder coordination.</p>
        </motion.div>

        <div className="experience-table">
          {experience.map((item, i) => (
            <motion.div
              key={`${item.org}-${item.role}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="experience-row"
            >
              <div>
                <h3>{item.role}</h3>
                <p className="experience-org">{item.org}</p>
                <p className="experience-desc">{item.desc}</p>
              </div>
              <strong>{item.period}</strong>
            </motion.div>
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
          max-width: 650px;
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
        .experience-table {
          border-top: 1px solid var(--hairline);
        }
        .experience-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 260px;
          gap: 40px;
          align-items: center;
          min-height: 150px;
          border-bottom: 1px solid var(--hairline);
          padding: 34px 0;
        }
        .experience-row:nth-child(even) {
          margin-left: -40px;
          margin-right: -40px;
          padding-left: 40px;
          padding-right: 40px;
          background: var(--bg);
        }
        .experience-row h3 {
          font-size: clamp(21px, 2.4vw, 29px);
          line-height: 1.2;
          letter-spacing: -0.035em;
          font-weight: 800;
          color: var(--dark);
          margin-bottom: 8px;
        }
        .experience-org {
          font-size: 13px;
          font-weight: 800;
          color: var(--teal);
          margin-bottom: 8px;
        }
        .experience-desc {
          max-width: 720px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.65;
        }
        .experience-row strong {
          text-align: right;
          font-size: clamp(18px, 2vw, 24px);
          line-height: 1;
          letter-spacing: -0.02em;
          font-weight: 700;
          color: var(--muted);
        }
        @media (max-width: 760px) {
          .section-head,
          .experience-row {
            grid-template-columns: 1fr;
          }
          .experience-row strong {
            text-align: left;
            font-size: 18px;
            margin-top: 4px;
          }
          .experience-row:nth-child(even) {
            margin-left: -20px;
            margin-right: -20px;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </section>
  );
}
