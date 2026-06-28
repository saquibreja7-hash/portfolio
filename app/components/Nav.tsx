"use client";
import { useState, useEffect } from "react";
import { Menu, X, Copy, Check, Phone, Moon, Sun } from "lucide-react";

const email = "iamsaquib.work@gmail.com";
const phone = "+91 7011925439";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Gallery", href: "#gallery" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  function copyEmail() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "color-mix(in srgb, var(--bg) 92%, transparent)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--hairline)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

        {/* Left — name brand */}
        <a href="#" style={{ fontSize: 20, fontWeight: 700, color: "var(--teal)", textDecoration: "none", letterSpacing: "-0.02em" }}>
          Saquib.
        </a>

        {/* Center — nav links */}
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              style={{
                fontSize: 13, fontWeight: 500, color: "var(--muted)", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right — email + CV */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="desktop-nav">
          <div style={{ display: "flex", alignItems: "center", gap: 0, background: "var(--card)", borderRadius: 90, overflow: "hidden", border: "1px solid var(--hairline)" }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", padding: "6px 12px 6px 14px" }}>
              {email}
            </span>
            <button onClick={copyEmail} aria-label="Copy email address"
              style={{ background: "none", border: "none", borderLeft: "1px solid var(--hairline)", padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", color: "#aaa" }}>
              {copied ? <Check size={12} color="var(--teal)" /> : <Copy size={12} />}
            </button>
          </div>
          <button onClick={toggleDark}
            style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--hairline)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--teal-light)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--hairline)")}>
            {dark ? <Sun size={15} color="var(--teal)" /> : <Moon size={15} color="var(--muted)" />}
          </button>
          <a href={`tel:${phone.replace(/\s/g, "")}`} title={phone}
            style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
            <Phone size={14} color="white" />
          </a>
        </div>

        <button onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 10, margin: -10, color: "var(--dark)" }} className="mobile-menu-btn">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ background: "var(--card)", borderTop: "1px solid var(--hairline)", padding: "8px 20px 20px" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "14px 0", fontSize: 15, fontWeight: 500, color: "var(--dark)", textDecoration: "none", borderBottom: "1px solid var(--hairline)" }}>
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18 }}>
            <button onClick={toggleDark} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              style={{ flex: 1, minHeight: 46, borderRadius: 90, background: "var(--hairline)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "var(--dark)" }}>
              {dark ? <Sun size={16} color="var(--teal)" /> : <Moon size={16} color="var(--muted)" />}
              {dark ? "Light" : "Dark"}
            </button>
            <a href={`tel:${phone.replace(/\s/g, "")}`} aria-label={`Call ${phone}`}
              style={{ flex: 1, minHeight: 46, borderRadius: 90, background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, color: "white" }}>
              <Phone size={15} color="white" />
              Call
            </a>
          </div>
          <a href={`mailto:${email}`}
            style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
            {email}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
