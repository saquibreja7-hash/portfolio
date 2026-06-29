"use client";
import { useEffect, useState } from "react";

const stats = [
  { value: 1000, suffix: "+", label: "Assets" },
  { value: 10, suffix: "+", label: "Programmes" },
  { value: 5, suffix: "", label: "Apps + Sites" },
  { value: 3, suffix: "", label: "Core Associations" },
];

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 18, fontWeight: 800, color: "var(--teal)", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {count}{active ? suffix : ""}
      </span>
      <span style={{ fontSize: 12, color: "var(--light-text)", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

export default function StatsBar() {
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const show = !entry.isIntersecting;
        setVisible(show);
        if (show && !animated) setAnimated(true);
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <>

      <div style={{
        position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
        background: "var(--card)", borderBottom: "1px solid var(--hairline)",
        height: 48, display: "flex", alignItems: "center", justifyContent: "center",
        transform: visible ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}>
        <div className="stats-bar-row">
          {stats.map((s, i) => (
            <div key={s.label} className="stats-bar-item">
              <Stat {...s} active={animated} />
              {i < stats.length - 1 && <div className="stats-bar-divider" />}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-bar-row {
          display: flex;
          align-items: center;
          gap: 0;
          max-width: 1000px;
          width: 100%;
          padding: 0 40px;
          justify-content: center;
        }
        .stats-bar-item { display: flex; align-items: center; flex-shrink: 0; }
        .stats-bar-divider { width: 1px; height: 20px; background: var(--hairline); margin: 0 28px; }
        @media (max-width: 640px) {
          .stats-bar-row {
            justify-content: flex-start;
            padding: 0 16px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .stats-bar-row::-webkit-scrollbar { display: none; }
          .stats-bar-divider { margin: 0 14px; }
        }
      `}</style>
    </>
  );
}
