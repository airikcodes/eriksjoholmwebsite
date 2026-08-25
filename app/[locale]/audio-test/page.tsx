import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import AudioPlayer from '@/components/AudioPlayer';
import { hasLocale } from '@/lib/dictionaries';

// Internal test route — not linked from nav, not in sitemap.ts. Kept out of
// search indexing while we test R2-hosted audio playback.
export const metadata = {
  title: 'Audio test',
  robots: { index: false, follow: false },
};

const TEST_TRACK_URL =
  'https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/Erik%20Sj%C3%B6holm%20-%2001%20Old%20town%20.mp3';

export default async function AudioTestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
          <BackNav />
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#E8E0D4', marginBottom: '2rem' }}
          >
            Audio player test
          </h1>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <AudioPlayer
              index={1}
              title="Old town"
              meta="Test upload · eriksjoholm-catalogue-web"
              src={TEST_TRACK_URL}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
