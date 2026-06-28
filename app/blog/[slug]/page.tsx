import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: `${article.title} | Saquib Jamil`,
      description: article.excerpt,
      type: "article",
      url: `/blog/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.image, width: 1600, height: 900, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Saquib Jamil`,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();
  const [leadSection, ...bodySections] = article.sections;
  const leadParagraph = leadSection?.paragraphs[0] || article.excerpt;
  const remainingLeadParagraphs = leadSection ? leadSection.paragraphs.slice(1) : [];
  const sections = [
    ...(remainingLeadParagraphs.length > 0 ? [{ paragraphs: remainingLeadParagraphs }] : []),
    ...bodySections,
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
      <article>
        <header className="blog-hero">
          <div className="blog-hero-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.image} alt="" />
          </div>
          <div className="blog-hero-shade" />
          <nav className="blog-nav" aria-label="Portfolio blog navigation">
            <Link href="/#writing" className="blog-logo">Saquib.</Link>
            <div className="blog-nav-links">
              <Link href="/#about">About</Link>
              <Link href="/#work">Work</Link>
              <Link href="/#gallery">Gallery</Link>
              <Link href="/blog">Writing</Link>
              <Link href="/#contact">Contact</Link>
            </div>
          </nav>
          <div className="blog-hero-content">
            <Link href="/blog" className="blog-back">← Back to news</Link>
            <span className="blog-pill">{article.category}</span>
            <h1>{article.title}</h1>
            <div className="blog-byline">
              <span className="blog-avatar">S</span>
              <span>{article.author}</span>
              <span className="blog-divider" />
              <span>{article.date}</span>
            </div>
          </div>
        </header>

        <div className="blog-body">
          <p className="blog-lead">{leadParagraph}</p>
          {sections.map((section, index) => (
            <section key={index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <div className="blog-share">
            <span>Share this article</span>
            <div>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=/blog/${article.slug}`} aria-label="Share on Facebook">f</a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`} aria-label="Share on X">x</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=/blog/${article.slug}`} aria-label="Share on LinkedIn">in</a>
            </div>
          </div>
        </div>
      </article>

      <style>{`
        .blog-hero {
          position: relative;
          min-height: 460px;
          color: white;
          overflow: hidden;
        }
        .blog-hero-bg,
        .blog-hero-shade {
          position: absolute;
          inset: 0;
        }
        .blog-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .blog-hero-shade {
          background: linear-gradient(90deg, rgba(7, 20, 36, 0.88) 0%, rgba(7, 20, 36, 0.58) 45%, rgba(7, 20, 36, 0.2) 100%),
            linear-gradient(0deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 52%, rgba(0,0,0,0.28) 100%);
        }
        .blog-nav {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 18px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .blog-logo {
          color: white;
          font-size: 20px;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: -0.03em;
          text-shadow: 0 1px 16px rgba(0,0,0,0.35);
        }
        .blog-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .blog-nav-links a {
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          text-shadow: 0 1px 16px rgba(0,0,0,0.35);
        }
        .blog-hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 92px auto 0;
          padding: 0 40px 64px;
        }
        .blog-back {
          display: inline-block;
          color: rgba(255,255,255,0.88);
          text-decoration: none;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.04em;
          margin-bottom: 18px;
        }
        .blog-pill {
          display: block;
          width: fit-content;
          border-radius: 999px;
          background: #4b0878;
          color: white;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .blog-hero h1 {
          font-size: clamp(40px, 6vw, 64px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 950;
          margin: 0 0 26px;
          max-width: 900px;
        }
        .blog-byline {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          color: rgba(255,255,255,0.88);
          font-size: 13px;
          font-weight: 800;
        }
        .blog-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.18);
          color: white;
        }
        .blog-divider {
          width: 1px;
          height: 18px;
          background: rgba(255,255,255,0.28);
        }
        .blog-body {
          max-width: 860px;
          margin: 0 auto;
          padding: 64px 40px 96px;
        }
        .blog-lead {
          border-left: 4px solid #ff7a18;
          padding-left: 24px;
          font-size: 25px;
          line-height: 1.35;
          font-weight: 800;
          color: var(--dark);
          margin: 0 0 44px;
        }
        .blog-body h2 {
          font-size: 20px;
          line-height: 1.3;
          font-weight: 900;
          letter-spacing: -0.025em;
          color: var(--dark);
          margin: 34px 0 12px;
        }
        .blog-body p {
          font-size: 18px;
          line-height: 1.84;
          color: var(--muted);
          margin: 0 0 24px;
        }
        .blog-share {
          margin-top: 64px;
          padding-top: 28px;
          border-top: 1px solid var(--hairline);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .blog-share span {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--light-text);
        }
        .blog-share div {
          display: flex;
          gap: 12px;
        }
        .blog-share a {
          width: 34px;
          height: 34px;
          border: 1px solid var(--hairline);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          text-decoration: none;
          font-size: 11px;
          font-weight: 800;
        }
        @media (max-width: 760px) {
          .blog-nav-links { display: none; }
          .blog-hero { min-height: 520px; }
          .blog-hero-content { margin-top: 78px; }
          .blog-body { padding-left: 24px; padding-right: 24px; }
          .blog-lead { font-size: 20px; }
        }
      `}</style>
    </main>
  );
}
