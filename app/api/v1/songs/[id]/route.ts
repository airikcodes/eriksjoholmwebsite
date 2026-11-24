import { ApiError, makeHandler } from '@/lib/song-api/guard';
import { getSong, isValidId } from '@/lib/song-api/core';

// GET /api/v1/songs/{id}
// One song with metadata and links. No lyrics. Unknown ids and non-exposed works both return the same not_found.
const handler = makeHandler('songs.get', async (_req, ctx) => {
  const { id } = await ctx.params;
  if (!isValidId(id)) throw new ApiError(400, 'invalid_id', 'The id format is not valid.');
  const song = getSong(id);
  if (!song) throw new ApiError(404, 'not_found', 'No song with that id.');
  return { body: { song }, count: 1 };
});

export const GET = handler;
export const OPTIONS = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
