import type { MetadataRoute } from "next";

const base = "https://eriksjoholm.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: base,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/works`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/live`,        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/notes`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/contact`,     lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/storyteller`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sync`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/shop`,        lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
  ];
}
