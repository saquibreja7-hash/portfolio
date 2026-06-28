import { articles } from "../blog/articles";
import { galleryLinks, siteSections, siteUrl } from "../site-data";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Saquib Jamil",
    "",
    "> Communications professional, digital safety advocate, and product builder working across trust and safety, AI governance, social impact communications, and portfolio storytelling.",
    "",
    `Canonical site: ${siteUrl}`,
    "",
    "## Core Pages",
    ...siteSections.map((item) => `- ${item.label}: ${item.href}`),
    "",
    "## Portfolio Galleries",
    ...galleryLinks.map((item) => `- ${item.label}: ${item.href}`),
    "",
    "## Writing",
    ...articles.map((article) => [
      `- ${article.title}`,
      `  URL: /blog/${article.slug}`,
      `  Date: ${article.date}`,
      `  Author: ${article.author}`,
      `  Summary: ${article.excerpt}`,
    ].join("\n")),
    "",
    "## Topics",
    "- Trust and safety",
    "- AI governance",
    "- Digital safety",
    "- Online harms",
    "- Platform accountability",
    "- Social impact communications",
    "- Campaign and event communications",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
