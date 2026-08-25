import { redirect } from 'next/navigation';

// Superseded by the real /audio-player nav page. Kept as a redirect rather
// than deleted, since this sandbox can't unlink files — harmless either way.
export default async function AudioTestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/audio-player`);
}
