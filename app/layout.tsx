import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CommandMenu from "./components/CommandMenu";
import { commandItems, siteUrl } from "./site-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Saquib Jamil - Communications & Digital Safety",
    template: "%s | Saquib Jamil",
  },
  description: "Portfolio of Saquib Jamil - communications professional, digital safety advocate, and product builder.",
  authors: [{ name: "Saquib Jamil" }],
  openGraph: {
    type: "website",
    siteName: "Saquib Jamil",
    title: "Saquib Jamil - Communications & Digital Safety",
    description: "Portfolio of Saquib Jamil - communications professional, digital safety advocate, and product builder.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saquib Jamil - Communications & Digital Safety",
    description: "Portfolio of Saquib Jamil - communications professional, digital safety advocate, and product builder.",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Saquib Jamil",
  jobTitle: "Project Coordinator, Trust & Safety",
  url: siteUrl,
  image: `${siteUrl}/photo.jpg`,
  worksFor: { "@type": "Organization", name: "Centre for Social Research" },
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  sameAs: ["https://linkedin.com/in/saquibjamil"],
  knowsAbout: [
    "Communications",
    "Digital Safety",
    "Trust and Safety",
    "Online Safety",
    "Gender Justice",
    "Product Building",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <CommandMenu items={commandItems} />
      </body>
    </html>
  );
}
