import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  let email: string;
  try {
    ({ email } = await request.json());
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!pubId || !apiKey) {
    return Response.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: 'website',
        utm_medium: 'organic',
      }),
    }
  );

  if (!res.ok) {
    console.error(`Beehiiv subscribe error: ${res.status} ${await res.text()}`);
    return Response.json({ error: 'Subscription failed' }, { status: 500 });
  }

  return Response.json({ success: true });
}
