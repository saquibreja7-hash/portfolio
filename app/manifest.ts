import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Saquib Jamil — Communications & Digital Safety",
    short_name: "Saquib Jamil",
    description:
      "Portfolio of Saquib Jamil — communications professional, digital safety advocate, and product builder.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f2ea",
    theme_color: "#0d6b58",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
