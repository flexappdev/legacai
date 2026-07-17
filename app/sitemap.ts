import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://legacai.vercel.app";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#how`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#vaults`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#sources`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
