import { works, albums, type Work } from '@/data/works';
import type { Note } from '@/lib/notes';

/**
 * The Library — one flat, filterable index of everything Erik has made.
 * Built from the existing data (works.ts + notes) so nothing is entered twice.
 */

export type LibraryKind = 'album' | 'ep' | 'single' | 'storytelling' | 'story';

export const STORYTELLER_URL = 'https://storyteller.eriksjoholm.com';

export interface LibraryEntry {
  id:         string;
  kind:       LibraryKind;
  title:      string;
  /** Release year, when known. Entries without one are never given a made-up year. */
  year?:      number;
  meta?:      string;
  cover?:     string;
  href:       string;
  external?:  boolean;
  /** Ongoing practices (the concert, the notes) rather than dated releases. */
  ongoing?:   boolean;
  upcoming?:  boolean;
  spotifyUrl?: string;
  tidalUrl?:   string;
  /** Position within its year group — albums and EPs read before singles. */
  order:      number;
}

const KIND_ORDER: Record<LibraryKind, number> = {
  album: 0, ep: 1, storytelling: 2, story: 3, single: 4,
};

/** Meta strings in works.ts often start with the year ("2026 · Swedish") — drop it, the year is shown as a heading. */
function cleanMeta(meta: string | undefined, year: number | undefined): string | undefined {
  if (!meta) return undefined;
  const parts = meta.split(' · ').filter((p) => !(year && p.trim() === String(year)));
  return parts.length ? parts.join(' · ') : undefined;
}

function fromWork(w: Work): LibraryEntry | null {
  let kind: LibraryKind;
  if (w.workType === 'album') kind = 'album';
  else if (w.workType === 'ep') kind = 'ep';
  else if (w.workType === 'song' || w.workType === 'single' || w.workType === 'collaboration') kind = 'single';
  else return null;

  // Songs that live on the 2016 Walkabout record are listed under the album, not as singles.
  if (kind === 'single' && w.album === 'walkabout') return null;

  return {
    id:         w.id,
    kind,
    title:      w.title,
    year:       w.year,
    meta:       cleanMeta(w.meta, w.year),
    cover:      w.coverImage,
    href:       `/works/${w.slug}`,
    upcoming:   w.releaseStatus === 'upcoming',
    spotifyUrl: w.spotifyUrl,
    tidalUrl:   w.tidalUrl,
    order:      KIND_ORDER[kind],
  };
}

export function buildLibrary(
  notes: Note[],
  labels: { concertTitle: string; concertMeta: string; storiesTitle: string; storiesMeta: string },
): LibraryEntry[] {
  const seen = new Set<string>();
  const entries: LibraryEntry[] = [];

  const seenKeys = new Set<string>();
  for (const w of [...albums, ...works]) {
    if (seen.has(w.slug)) continue;
    seen.add(w.slug);
    const e = fromWork(w);
    if (!e) continue;
    // works.ts lists a few releases twice (same title, year and meta) — show each once.
    const key = [e.kind, e.title.toLowerCase(), e.year ?? '', e.meta ?? ''].join('|');
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);
    entries.push(e);
  }

  entries.push({
    id:       'storytelling-concert',
    kind:     'storytelling',
    title:    labels.concertTitle,
    meta:     labels.concertMeta,
    cover:    '/images/home/storytelling-concert.jpg',
    href:     STORYTELLER_URL,
    external: true,
    ongoing:  true,
    order:    KIND_ORDER.storytelling,
  });

  entries.push({
    id:      'stories',
    kind:    'story',
    title:   labels.storiesTitle,
    meta:    notes[0] ? `${labels.storiesMeta} · ${notes[0].title}` : labels.storiesMeta,
    href:    '/notes',
    ongoing: true,
    order:   KIND_ORDER.story,
  });

  return entries;
}

export const FILTERS = ['all', 'albums', 'eps', 'singles', 'storytelling', 'stories'] as const;
export type LibraryFilter = (typeof FILTERS)[number];

const FILTER_KIND: Record<Exclude<LibraryFilter, 'all'>, LibraryKind> = {
  albums: 'album', eps: 'ep', singles: 'single', storytelling: 'storytelling', stories: 'story',
};

export function isFilter(v: string | undefined): v is LibraryFilter {
  return !!v && (FILTERS as readonly string[]).includes(v);
}

export function applyFilter(entries: LibraryEntry[], f: LibraryFilter): LibraryEntry[] {
  return f === 'all' ? entries : entries.filter((e) => e.kind === FILTER_KIND[f]);
}

export interface LibraryGroup {
  key:     string;          // "ongoing" | "upcoming" | "2026" | "undated"
  year?:   number;
  entries: LibraryEntry[];
}

/** Ongoing first, then what's coming, then years newest → oldest, then anything without a known year. */
export function groupEntries(entries: LibraryEntry[]): LibraryGroup[] {
  const sorted = (list: LibraryEntry[]) => [...list].sort((a, b) => a.order - b.order);

  const ongoing  = entries.filter((e) => e.ongoing);
  const upcoming = entries.filter((e) => !e.ongoing && e.upcoming);
  const rest     = entries.filter((e) => !e.ongoing && !e.upcoming);
  const dated    = rest.filter((e) => e.year);
  const undated  = rest.filter((e) => !e.year);

  const years = [...new Set(dated.map((e) => e.year!))].sort((a, b) => b - a);

  const groups: LibraryGroup[] = [];
  if (ongoing.length)  groups.push({ key: 'ongoing',  entries: sorted(ongoing) });
  if (upcoming.length) groups.push({ key: 'upcoming', entries: sorted(upcoming) });
  for (const y of years) groups.push({ key: String(y), year: y, entries: sorted(dated.filter((e) => e.year === y)) });
  if (undated.length) groups.push({ key: 'undated', entries: sorted(undated) });
  return groups;
}
