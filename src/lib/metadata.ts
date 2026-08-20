import type { Metadata } from "next";
import { site } from "./content";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: site.name, type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Sonar Studio. Get found when your customers ask AI." }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
