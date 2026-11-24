// Guard for every request, both doors: pause flag first, then method, rate limit, input checks, stable JSON errors, log.

import { LANGS, type Lang } from './core';
import { checkRate } from './limits';
import { logRequest } from './log';

export const MAX_QUERY_LENGTH = 200;
export const DEFAULT_LIMIT = 3;
export const MAX_LIMIT = 10;

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public headers: Record<string, string> = {},
  ) {
    super(message);
  }
}

/** The one place the whole API is switched off: SONG_API_PAUSED=1 (or "true"). Read on every request. */
export function isPaused(): boolean {
  const v = (process.env.SONG_API_PAUSED ?? '').trim().toLowerCase();
  return v === '1' || v === 'true';
}

/**
 * ONE validator for both doors (REST and MCP). Inputs are strings or null/undefined as they arrive.
 * Error messages never echo what the caller sent.
 */
export function validateSearchInput(input: { q: unknown; lang?: unknown; limit?: unknown }): { q: string; lang: Lang | undefined; limit: number } {
  const rawQ = input.q;
  if (rawQ === null || rawQ === undefined) throw new ApiError(400, 'empty_query', 'The q parameter is required.');
  if (typeof rawQ !== 'string') throw new ApiError(400, 'empty_query', 'q must be text.');
  if (rawQ.length > MAX_QUERY_LENGTH) throw new ApiError(400, 'query_too_long', `q must be at most ${MAX_QUERY_LENGTH} characters.`);
  const q = rawQ.trim();
  if (q.length < 2) throw new ApiError(400, 'empty_query', 'q must have at least 2 characters.');

  const rawLang = input.lang;
  let lang: Lang | undefined;
  if (rawLang !== null && rawLang !== undefined && rawLang !== '') {
    if (typeof rawLang !== 'string' || !(LANGS as readonly string[]).includes(rawLang)) throw new ApiError(400, 'invalid_lang', `lang must be one of: ${LANGS.join(', ')}.`);
    lang = rawLang as Lang;
  }

  const rawLimit = input.limit;
  let limit = DEFAULT_LIMIT;
  if (rawLimit !== null && rawLimit !== undefined && rawLimit !== '') {
    const s = String(rawLimit);
    if (!/^\d{1,3}$/.test(s)) throw new ApiError(400, 'invalid_limit', `limit must be a whole number from 1 to ${MAX_LIMIT}.`);
    limit = parseInt(s, 10);
    if (limit < 1 || limit > MAX_LIMIT) throw new ApiError(400, 'invalid_limit', `limit must be a whole number from 1 to ${MAX_LIMIT}.`);
  }
  return { q, lang, limit };
}

export function parseSearchParams(url: URL): { q: string; lang: Lang | undefined; limit: number } {
  return validateSearchInput({ q: url.searchParams.get('q'), lang: url.searchParams.get('lang'), limit: url.searchParams.get('limit') });
}

export interface HandlerOut { body: unknown; qLen?: number; count?: number }
export type Ctx = { params: Promise<Record<string, string | string[] | undefined>> };

const BASE_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'X-Content-Type-Options': 'nosniff',
};

export function clientIp(req: Request): string {
  const xf = req.headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0].trim().slice(0, 64);
  return (req.headers.get('x-real-ip') ?? 'unknown').slice(0, 64);
}

function errorResponse(e: ApiError): Response {
  return new Response(JSON.stringify({ error: { code: e.code, message: e.message } }), {
    status: e.status,
    headers: { ...BASE_HEADERS, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...e.headers },
  });
}

/** Wraps a route. Order matters: paused is checked first, before anything else runs. */
export function makeHandler(route: string, fn: (req: Request, ctx: Ctx) => Promise<HandlerOut> | HandlerOut) {
  return async function handler(req: Request, ctx: Ctx): Promise<Response> {
    const t0 = Date.now();
    const ip = clientIp(req);
    let status = 500;
    let code: string | undefined;
    let qLen: number | undefined;
    let count: number | undefined;
    try {
      if (isPaused()) throw new ApiError(503, 'paused', 'The Song Concierge API is switched off right now.', { 'Retry-After': '300' });
      if (req.method === 'OPTIONS') {
        status = 204;
        return new Response(null, {
          status: 204,
          headers: { ...BASE_HEADERS, 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Max-Age': '86400' },
        });
      }
      if (req.method !== 'GET') throw new ApiError(405, 'method_not_allowed', 'Only GET is supported.', { Allow: 'GET, OPTIONS' });
      const rl = checkRate(ip);
      if (!rl.ok) throw new ApiError(429, 'rate_limited', 'Too many requests. Try again shortly.', { 'Retry-After': String(rl.retryAfter) });
      const out = await fn(req, ctx);
      status = 200;
      qLen = out.qLen;
      count = out.count;
      return new Response(JSON.stringify(out.body), {
        status: 200,
        headers: { ...BASE_HEADERS, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=60, s-maxage=60' },
      });
    } catch (e) {
      if (e instanceof ApiError) {
        status = e.status;
        code = e.code;
        return errorResponse(e);
      }
      status = 500;
      code = 'internal_error';
      console.error('song_api_error', route, e instanceof Error ? e.name : 'unknown'); // name only: no message, no input
      return errorResponse(new ApiError(500, 'internal_error', 'Something went wrong.'));
    } finally {
      logRequest({ route, method: req.method, status, code, ip, qLen, count, ms: Date.now() - t0 });
    }
  };
}
