import { makeHandler } from '@/lib/song-api/guard';
import { listFilters } from '@/lib/song-api/core';

// GET /api/v1/moods
// There are no mood tags in the data, so `moods` is an empty list and the response lists the filters that do exist.
const handler = makeHandler('moods', () => ({ body: listFilters(), count: 0 }));

export const GET = handler;
export const OPTIONS = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
