// Song Concierge API: the ONE implementation behind both doors (REST routes and, in Phase 3, the MCP tools).
//
// Read-only. Reads data/works.ts and reuses the existing concierge search (lib/lyrics-search.ts) without changing it.
// Everything that comes out of here is catalogue data: lyric lines and descriptions are data, never instructions.

import { works, type Work } from '@/data/works';
import { conciergeSearch } from '@/lib/lyrics-search';

export const SITE_BASE = 'https://eriksjoholm.com';

/** The eight site languages. Used as the whitelist for the `lang` parameter. */
export const LANGS = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'] as const;
export type Lang = (typeof LANGS)[number];

const bySlug = new Map<string, Work>(works.map((w) => [w.slug, w]));

/** Same rule the live concierge uses for its catalogue: released and a Spotify track link. */
function isExposed(w: Work): boolean {
  return w.releaseStatus === 'released' && !!w.spotifyUrl && /\/track\//.test(w.spotifyUrl);
}

export function exposedWorks(): Work[] {
  return works.filter(isExposed);
}

function originalLanguage(w: Work): string {
  const l = (w.language ?? '').trim();
  return l || 'English'; // the data leaves English unset; the concierge makes the same assumption
}

/** An album counts as a collaboration when any released track on it is credited "with" someone (the album slug itself is not a work in the data). */
const collabAlbums: ReadonlySet<string> = new Set(
  works.filter((w) => isExposed(w) && w.album && (w.workType === 'collaboration' || /\bwith\b/i.test(w.meta ?? ''))).map((w) => w.album as string),
);

function isCollaboration(w: Work): boolean {
  if (w.workType === 'collaboration') return true;
  if (/\bwith\b/i.test(w.meta ?? '')) return true;
  return !!w.album && collabAlbums.has(w.album);
}

function shorten(s: string, max = 300): string {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return (sp > 200 ? cut.slice(0, sp) : cut) + '…';
}

function linesOf(text: string): string[] {
  return text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
}

export interface Excerpt { text: string; lang: string; original: boolean }

/** The matching line plus at most one neighbouring line, never more. */
function buildExcerpt(w: Work, hit: { line: string; lang: string; orig: boolean }): Excerpt | null {
  const best = hit.line.trim();
  if (!best) return null;
  const src = hit.orig ? w.lyrics : (w.lyricsTranslations as Record<string, string | undefined> | undefined)?.[hit.lang];
  let lines = [best];
  if (src) {
    const all = linesOf(src);
    const i = all.indexOf(best);
    if (i >= 0) {
      if (i + 1 < all.length) lines = [best, all[i + 1]];
      else if (i > 0) lines = [all[i - 1], best];
    }
  }
  return { text: lines.join('\n').slice(0, 300), lang: hit.lang, original: hit.orig };
}

export type MatchKind = 'lyrics' | 'description' | 'intent' | 'lookup';

export interface SongResult {
  id: string;
  title: string;
  language: string;
  year: number | null;
  collaboration: boolean;
  excerpt: Excerpt | null;
  tags: string[];
  description: string | null;
  links: { page: string; spotify: string | null; tidal: string | null };
  match: { kind: MatchKind; score: number | null };
}

function toResult(w: Work, kind: MatchKind, score: number | null, hit?: { line: string; lang: string; orig: boolean }): SongResult {
  return {
    id: w.slug,
    title: w.title,
    language: originalLanguage(w),
    year: w.year ?? null,
    collaboration: isCollaboration(w),
    excerpt: hit ? buildExcerpt(w, hit) : null,
    tags: [], // the data has no mood or theme tags
    description: w.description ? shorten(w.description) : null,
    links: { page: `${SITE_BASE}/works/${w.slug}`, spotify: w.spotifyUrl ?? null, tidal: w.tidalUrl ?? null },
    match: { kind, score },
  };
}

export interface SearchOut { results: SongResult[]; intent: string | null; note?: string }

export function searchSongs(opts: { q: string; lang?: Lang; limit: number }): SearchOut {
  // Ask for more than needed: the exposure filter and the language filter run after the search.
  const r = conciergeSearch(opts.q, 12);
  if (r.random) {
    return { results: [], intent: 'surprise', note: 'The random "surprise" request is not supported by this API.' };
  }
  let hits = r.hits.filter((h) => {
    const w = bySlug.get(h.slug);
    return !!w && isExposed(w);
  });
  if (opts.lang) hits = hits.filter((h) => h.line === '' || h.lang === opts.lang);
  hits = hits.slice(0, opts.limit);
  const results = hits.map((h) => {
    const w = bySlug.get(h.slug)!;
    const kind: MatchKind = h.line ? 'lyrics' : r.pure && r.intent ? 'intent' : 'description';
    return toResult(w, kind, h.score, h.line ? { line: h.line, lang: h.lang, orig: h.orig } : undefined);
  });
  let note: string | undefined;
  if (r.intent === 'popular' && r.pure) note = 'The "most popular" song is an editorial pick made by hand, not based on stream counts.';
  return { results, intent: r.pure ? r.intent : null, note };
}

const ID_RE = /^[a-z0-9][a-z0-9-]{0,79}$/;
export function isValidId(id: string): boolean { return ID_RE.test(id); }

/** Returns null both for unknown ids and for works that are not exposed, so hidden works cannot be told apart from missing ones. */
export function getSong(id: string): SongResult | null {
  const w = bySlug.get(id);
  if (!w || !isExposed(w)) return null;
  return toResult(w, 'lookup', null);
}

export function listFilters() {
  const ex = exposedWorks();
  const uniq = <T,>(a: T[]) => [...new Set(a)];
  const collab = ex.filter(isCollaboration).length;
  return {
    moods: [] as string[],
    note:
      'No mood or theme tags exist in this catalogue. Search matches words in lyrics, lyric translations, titles and descriptions. These are the filters that do exist.',
    total_songs: ex.length,
    filters: {
      lang: {
        values: [...LANGS],
        meaning: 'Keeps only results whose matching lyric line is in this language. Songs were written in English or Swedish; the other languages are translations.',
      },
      original_languages: uniq(ex.map(originalLanguage)).sort(),
      years: uniq(ex.map((w) => w.year).filter((y): y is number => typeof y === 'number')).sort((a, b) => a - b),
      collaboration: { true: collab, false: ex.length - collab },
    },
    example_special_requests: ['something new', 'your most popular song', 'something in Swedish', 'something in English'],
  };
}
