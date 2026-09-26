import { NextResponse } from 'next/server';
import { conciergeSearch } from '@/lib/lyrics-search';

// GET /api/concierge?q=<free text>  ->  { hits: LyricHit[] }
// Lyrics-based matching for the Song Concierge. Lexical, in-memory, no external calls.
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q')?.trim() ?? '';
  if (q.length < 2 || q.length > 200) return NextResponse.json({ hits: [] });
  const { hits, intent, pure, random } = conciergeSearch(q, 3);
  return NextResponse.json(
    { hits, intent, pure },
    { headers: { 'Cache-Control': random ? 'no-store' : 'public, max-age=300, s-maxage=3600' } },
  );
}
