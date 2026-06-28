import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "./articles";

export const metadata: Metadata = {
  title: "Writing",
  description: "News and analysis by Saquib Jamil on trust, safety, AI governance, online harms, platform accountability, and digital rights.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing | Saquib Jamil",
    description: "News and analysis by Saquib Jamil on trust, safety, AI governance, online harms, platform accountability, and digital rights.",
    url: "/blog",
    type: "website",
    images: [{ url: articles[0].image, width: 1600, height: 900, alt: articles[0].title }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Saquib Jamil",
    description: "News and analysis by Saquib Jamil on trust, safety, AI governance, online harms, platform accountability, and digital rights.",
    images: [articles[0].image],
  },
};

export default function BlogIndex() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--surface)", padding: "48px 40px 110px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Link href="/#writing" style={{ fontSize: 13, fontWeight: 700, color: "var(--teal)", textDecoration: "none" }}>
          ← Back to portfolio
        </Link>

        <header style={{ margin: "64px 0 44px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <div>
          <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2a005f", marginBottom: 14 }}>
            News & Updates
          </p>
          <h1 style={{ fontSize: "clamp(38px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.02, color: "var(--dark)", marginBottom: 16 }}>
            The latest from Saquib
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted)", maxWidth: 620 }}>
            Articles on trust, safety, AI governance, online harms, platform accountability, and digital rights.
          </p>
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              style={{ background: "var(--card)", border: "1px solid var(--hairline)", borderRadius: 12, color: "inherit", textDecoration: "none", display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt="" style={{ width: "100%", height: 210, objectFit: "cover", display: "block", background: "#e9edf2" }} />
              <div style={{ padding: 28, display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", color: "#4c5a6a", fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
                  <span style={{ color: "#2a005f", background: "#efe7f7", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 800 }}>{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h2 style={{ fontSize: 24, lineHeight: 1.18, letterSpacing: "-0.04em", color: "var(--dark)", marginBottom: 14 }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#415064", margin: "0 0 24px" }}>
                  {article.excerpt}
                </p>
                <span style={{ fontSize: 13, color: "#2a005f", fontWeight: 800, marginTop: "auto" }}>
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
