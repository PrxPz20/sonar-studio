import type { MetadataRoute } from "next";
import { articles, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/results", "/about", "/insights", "/contact", "/privacy", "/terms"];
  return [...routes.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: path === "/insights" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 })), ...articles.map(({ slug }) => ({ url: `${site.url}/insights/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .65 }))];
}
