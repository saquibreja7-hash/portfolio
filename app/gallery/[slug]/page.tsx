import type { Metadata } from "next";
import { categories } from "./categories";
import GalleryDetailClient from "./GalleryDetailClient";

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories[slug];
  if (!category) {
    return { title: "Gallery" };
  }
  const title = `${category.title} — Portfolio`;
  return {
    title,
    description: category.description,
    alternates: { canonical: `/gallery/${slug}` },
    openGraph: {
      title,
      description: category.description,
      url: `/gallery/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: category.description,
    },
  };
}

export default function GalleryDetailPage() {
  return <GalleryDetailClient />;
}
