import type { MetadataRoute } from "next";
import { works, albums } from "@/data/works";
import { getNotes } from "@/lib/notes";

const base = "https://eriksjoholm.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/works`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/live`,        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/notes`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/contact`,     lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/shop`,        lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
  ];

  const workEntries: MetadataRoute.Sitemap = [...works, ...albums].map((w) => ({
    url:            `${base}/works/${w.slug}`,
    lastModified:   now,
    changeFrequency: "monthly",
    priority:       0.6,
  }));

  const notes = await getNotes();
  const noteEntries: MetadataRoute.Sitemap = notes.map((n) => ({
    url:            `${base}/notes/${n.slug}`,
    lastModified:   n.date ? new Date(n.date) : now,
    changeFrequency: "yearly",
    priority:       0.5,
  }));

  return [...staticEntries, ...workEntries, ...noteEntries];
}
