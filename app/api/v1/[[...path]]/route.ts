import { ApiError, makeHandler } from '@/lib/song-api/guard';

// Catch-all for /api/v1/*: any path that is not one of the three real endpoints answers with the same
// JSON error shape as the rest of the API, instead of the site's HTML 404 page. Real routes take precedence.
const handler = makeHandler('v1.unknown', () => {
  throw new ApiError(404, 'not_found', 'No such endpoint. See /api/v1/songs/search, /api/v1/songs/{id} and /api/v1/moods.');
});

export const GET = handler;
export const OPTIONS = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
