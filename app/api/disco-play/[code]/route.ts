import type { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const res = await fetch(`https://s.disco.ac/${code}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' },
    redirect: 'follow',
  });

  if (!res.ok) {
    return Response.json({ error: 'Failed to fetch track' }, { status: 502 });
  }

  const html = await res.text();

  const match = html.indexOf('window.track_data = {');
  if (match === -1) {
    return Response.json({ error: 'Track data not found' }, { status: 502 });
  }

  const block = html.slice(match + 'window.track_data = '.length);
  let depth = 0, inStr = false, esc = false;
  for (let i = 0; i < block.length; i++) {
    const c = block[i];
    if (esc) { esc = false; continue; }
    if (c === '\\' && inStr) { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (!inStr) {
      if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) {
          const data = JSON.parse(block.slice(0, i + 1)) as { public_play_url?: string };
          const audioUrl = data.public_play_url;
          if (!audioUrl) return Response.json({ error: 'No play URL' }, { status: 502 });
          return Response.json({ audioUrl });
        }
      }
    }
  }

  return Response.json({ error: 'Parse failed' }, { status: 502 });
}
