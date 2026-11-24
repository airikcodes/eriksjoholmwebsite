// Per-IP rate limit, in memory. Best effort only: every serverless instance has its own memory,
// so this is a courtesy limit. The real limit is the Vercel Firewall rule (to be tried on staging).

interface Slot { n: number; reset: number }

const WINDOW_MS = 60_000;
const slots = new Map<string, Slot>();

/** Requests per minute per IP. Default 60 (raised from 30 in Phase 4: one assistant session costs about 8 HTTP requests); can be overridden with SONG_API_RATE_LIMIT (not a secret). */
export function rateLimitMax(): number {
  const v = Number(process.env.SONG_API_RATE_LIMIT);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 60;
}

export function checkRate(ip: string, now: number = Date.now()): { ok: boolean; retryAfter: number } {
  if (slots.size > 5000) {
    for (const [k, s] of slots) if (s.reset <= now) slots.delete(k);
    if (slots.size > 20000) slots.clear(); // hard memory bound
  }
  let s = slots.get(ip);
  if (!s || s.reset <= now) {
    s = { n: 0, reset: now + WINDOW_MS };
    slots.set(ip, s);
  }
  s.n++;
  if (s.n > rateLimitMax()) return { ok: false, retryAfter: Math.max(1, Math.ceil((s.reset - now) / 1000)) };
  return { ok: true, retryAfter: 0 };
}

/** For tests only. */
export function resetRateLimit(): void { slots.clear(); }
