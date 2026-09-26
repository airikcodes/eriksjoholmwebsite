import { works, type Work } from "@/data/works";

/** Compact, serialisable track passed from the server to the (client) Song Concierge. */
export interface ConciergeTrack {
  slug: string;
  title: string;
  meta?: string;
  coverImage?: string;
  spotifyUrl?: string;
  tidalUrl?: string;
  description?: string;
}

const compact = (w: Work): ConciergeTrack => ({
  slug: w.slug,
  title: w.title,
  meta: w.meta,
  coverImage: w.coverImage,
  spotifyUrl: w.spotifyUrl,
  tidalUrl: w.tidalUrl,
  description: w.description,
});

/** Newest released song, by releaseDate (falling back to year). Single source of truth: data/works.ts. */
export function getLatestRelease(): ConciergeTrack | null {
  const songs = works.filter(
    (w) => w.releaseStatus === "released" && w.spotifyUrl && /\/track\//.test(w.spotifyUrl),
  );
  const key = (w: Work) => w.releaseDate ?? String(w.year ?? 0);
  let best: Work | undefined;
  for (const w of songs) if (!best || key(w) > key(best)) best = w;
  return best ? compact(best) : null;
}
