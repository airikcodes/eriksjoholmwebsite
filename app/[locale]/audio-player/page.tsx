import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import AudioPlayer from '@/components/AudioPlayer';
import { getDictionary, hasLocale } from '@/lib/dictionaries';

// Early-stage listening page — not yet in sitemap.ts and not indexed while
// the catalogue is still being uploaded to R2, but reachable from the main
// nav so it can be tested and shown around.
export const metadata: Metadata = {
  title: 'Audio Player — Erik Sjøholm',
  description: 'Listen to tracks from the catalogue, hosted directly on the site.',
  robots: { index: false, follow: true },
};

const TEST_TRACK_URL =
  'https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/Erik%20Sj%C3%B6holm%20-%2001%20Old%20town%20.mp3';

export default async function AudioPlayerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
          <BackNav />
          <p style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      '0.45rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color:         '#7A6F62',
            marginBottom:  '1.25rem',
          }}>
            {t.nav.audioPlayer}
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', color: '#E8E0D4', marginBottom: '2.5rem' }}
          >
            Audio Player
          </h1>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <AudioPlayer
              index={1}
              title="Old town"
              meta="From the catalogue"
              src={TEST_TRACK_URL}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
