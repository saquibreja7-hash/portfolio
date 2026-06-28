export type SubCategory = { name: string; id: string; folder: string; count: number; color: string; pdfFolder?: string };
export type Category = { title: string; subtitle: string; description: string; color: string; subcategories: SubCategory[] };

export const categories: Record<string, Category> = {
  "social-media-content": {
    title: "Social Media Content",
    subtitle: "845+ Digital Assets",
    description: "End-to-end social media content across awareness campaigns, event promotions, news curation, and brand communications for Centre for Social Research.",
    color: "var(--teal)",
    subcategories: [
      { name: "TASI Event Communications", id: "tasi-event-communications", folder: "02_Social Media Content/TASI Event Communications", count: 90, color: "var(--coral)" },
      { name: "CSR News Posts", id: "csr-news-posts", folder: "02_Social Media Content/CSR News Posts", count: 190, color: "var(--amber)" },
      { name: "News & Research Posts", id: "news-research", folder: "02_Social Media Content/News & Research Post", count: 450, color: "var(--teal)" },
      { name: "16 Days of Activism", id: "16-days-of-activism", folder: "02_Social Media Content/16 Days of Activism Campaign", count: 8, color: "var(--coral)" },
      { name: "India AI Impact Summit 2026", id: "ai-summit", folder: "02_Social Media Content/India AI Impact Summit 2026", count: 24, color: "var(--teal)" },
      { name: "Awareness & Campaign Posts", id: "awareness-campaigns", folder: "02_Social Media Content/Awareness & Campaign Post", count: 14, color: "var(--amber)" },
      { name: "Quote Posts", id: "quote-posts", folder: "02_Social Media Content/Quote Post", count: 34, color: "var(--coral)" },
      { name: "NGO CSW69 Poster", id: "csw69", folder: "02_Social Media Content/NGO CSW69 Poster", count: 6, color: "var(--teal)" },
      { name: "Festival Wishes", id: "festival-wishes", folder: "02_Social Media Content/Festival Wishes", count: 1, color: "var(--amber)" },
      { name: "Christmas Food Menu", id: "christmas-menu", folder: "02_Social Media Content/Christmas Food Menu", count: 14, color: "var(--coral)" },
      { name: "Scrapbook 2025", id: "scrapbook", folder: "02_Social Media Content/Scrapbook 2025", count: 6, color: "var(--teal)" },
      { name: "Podcast YouTube Thumbnails", id: "podcast-thumbnails", folder: "02_Social Media Content/Podcast YouTube Thumbnail", count: 2, color: "var(--amber)" },
      { name: "Video Samples", id: "video-samples", folder: "02_Social Media Content/Video Samples", count: 6, color: "var(--coral)" },
    ],
  },
  "design-samples": {
    title: "Design Samples",
    subtitle: "77 Design Assets",
    description: "Print and digital design work including annual reports, event posters, speaker panels, brochures, and menu designs.",
    color: "var(--amber)",
    subcategories: [
      { name: "Annual Report Cover Pages", id: "annual-report", folder: "05_Design Samples/Annual Report Cover Page", count: 16, color: "var(--amber)" },
      { name: "Speaker Panels", id: "speakers-panel", folder: "05_Design Samples/Speakers Panel", count: 25, color: "var(--coral)" },
      { name: "Menu Designs", id: "menu-designs", folder: "05_Design Samples/Menu Designs", count: 29, color: "var(--teal)" },
      { name: "Posters", id: "posters", folder: "05_Design Samples/Posters", count: 2, color: "var(--amber)" },
      { name: "Brochures", id: "brochures", folder: "05_Design Samples/Brochures", count: 2, color: "var(--coral)" },
      { name: "PPTs", id: "ppts", folder: "05_Design Samples/PPTs", count: 2, color: "var(--teal)" },
      { name: "Women's Day Post", id: "womens-day", folder: "05_Design Samples/Women's Day Post", count: 1, color: "var(--amber)" },
    ],
  },
  "writing-samples": {
    title: "Writing Samples",
    subtitle: "8 Documents",
    description: "Strategic communications, articles, and written content showcasing editorial and content strategy skills.",
    color: "var(--coral)",
    subcategories: [
      { name: "All Writing Samples", id: "all", folder: "04_Writing Samples", count: 8, color: "var(--coral)" },
    ],
  },
  "impact-reports": {
    title: "Impact & Reports",
    subtitle: "12 Documents",
    description: "Annual reports, impact assessments, and organizational reports documenting programme outcomes and research findings.",
    color: "var(--teal)",
    subcategories: [
      { name: "All Reports", id: "all", folder: "06_Impact + Reports/thumbnails", pdfFolder: "06_Impact + Reports", count: 12, color: "var(--teal)" },
    ],
  },
};
