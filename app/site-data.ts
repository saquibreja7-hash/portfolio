import { articles } from "./blog/articles";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteSections = [
  { label: "About", href: "/#about", group: "Pages" },
  { label: "Experience", href: "/#experience", group: "Pages" },
  { label: "Work", href: "/#work", group: "Pages" },
  { label: "Gallery", href: "/#gallery", group: "Pages" },
  { label: "Writing", href: "/#writing", group: "Pages" },
  { label: "Contact", href: "/#contact", group: "Pages" },
  { label: "Blog", href: "/blog", group: "Pages" },
];

export const galleryLinks = [
  { label: "Social Media Content", href: "/gallery/social-media-content", group: "Gallery" },
  { label: "Design Samples", href: "/gallery/design-samples", group: "Gallery" },
  { label: "Impact & Reports", href: "/gallery/impact-reports", group: "Gallery" },
  { label: "Writing Samples", href: "/gallery/writing-samples", group: "Gallery" },
  { label: "TASI Event Communications", href: "/gallery/social-media-content?sub=tasi-event-communications", group: "Gallery" },
  { label: "CSR News Posts", href: "/gallery/social-media-content?sub=csr-news-posts", group: "Gallery" },
  { label: "News & Research Posts", href: "/gallery/social-media-content?sub=news-research", group: "Gallery" },
  { label: "Awareness Campaigns", href: "/gallery/social-media-content?sub=awareness-campaigns", group: "Gallery" },
];

export const blogLinks = articles.map((article) => ({
  label: article.title,
  href: `/blog/${article.slug}`,
  group: "Writing",
  keywords: [article.excerpt, article.category, article.author],
}));

export const commandItems = [...siteSections, ...galleryLinks, ...blogLinks];
