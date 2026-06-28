import type { MetadataRoute } from "next";
import { siteUrl } from "./site-data";
import { articles } from "./blog/articles";

const gallerySlugs = [
  "social-media-content",
  "design-samples",
  "impact-reports",
  "writing-samples",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const galleryRoutes: MetadataRoute.Sitemap = gallerySlugs.map((slug) => ({
    url: `${siteUrl}/gallery/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = articles.map((a) => {
    const parsed = new Date(a.date);
    return {
      url: `${siteUrl}/blog/${a.slug}`,
      lastModified: isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: "yearly",
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...galleryRoutes, ...blogRoutes];
}
