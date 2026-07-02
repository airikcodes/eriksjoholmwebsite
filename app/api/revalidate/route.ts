import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

// Beehiiv hits this endpoint on publish via webhook.
// Configure the webhook in Beehiiv → Settings → Integrations → Webhooks:
//   URL: https://eriksjoholm.com/api/revalidate?secret=YOUR_SECRET
//   Events: post.created, post.updated
//
// Set REVALIDATE_SECRET as an env var in Vercel (and .env.local for dev).

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('beehiiv-posts', { expire: 0 });

  return Response.json({ revalidated: true, timestamp: Date.now() });
}
