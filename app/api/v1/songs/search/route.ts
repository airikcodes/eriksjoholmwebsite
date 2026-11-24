import { makeHandler, parseSearchParams } from '@/lib/song-api/guard';
import { searchSongs } from '@/lib/song-api/core';

// GET /api/v1/songs/search?q=&lang=&limit=
// Read-only keyword search over one artist's released songs. See lib/song-api/core.ts.
const handler = makeHandler('songs.search', (req) => {
  const { q, lang, limit } = parseSearchParams(new URL(req.url));
  const out = searchSongs({ q, lang, limit });
  return {
    body: { results: out.results, count: out.results.length, intent: out.intent, note: out.note ?? null, query_length: q.length },
    qLen: q.length,
    count: out.results.length,
  };
});

export const GET = handler;
export const OPTIONS = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
