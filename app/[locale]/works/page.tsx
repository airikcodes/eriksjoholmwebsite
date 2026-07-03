import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import WorksSearch from '@/components/WorksSearch';
import KeepInTouch from '@/components/KeepInTouch';
import { works, featuredWorks } from '@/data/works';
import { hasLocale } from '@/lib/dictionaries';

export const metadata: Metadata = {
  title: 'Works — Erik Sjøholm',
  description:
    'Songs, recordings, and other artistic works from a catalogue of over 300 original compositions by Erik Sjøholm.',
  alternates: { canonical: 'https://eriksjoholm.com/works' },
  openGraph: {
    title: 'Works — Erik Sjøholm',
    description: 'A catalogue of songs, recordings, and artistic works.',
    url: 'https://eriksjoholm.com/works',
    images: [{ url: '/images/portrait.jpg', width: 800, height: 800, alt: 'Erik Sjøholm' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Works — Erik Sjøholm',
    images: ['/images/portrait.jpg'],
  },
};

const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp';
const TIDAL_ARTIST   = 'https://tidal.com/artist/47687355';

export default async function WorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>

      {/* Fixed background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{
          position:            'absolute', inset: 0,
          backgroundImage:     'url(/images/bg/bg-01.jpg)',
          backgroundSize:      'cover',
          backgroundPosition:  'center top',
          opacity:             0.09,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Hero ── */}
          <div style={{ paddingTop: '5.5rem', paddingBottom: '5rem' }}>
            <BackNav />
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.48rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '1.25rem',
            }}>
              Works
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize:     'clamp(3rem, 9vw, 6rem)',
                color:        '#E8E0D4',
                letterSpacing:'0.02em',
                lineHeight:   0.95,
                marginBottom: '2.5rem',
              }}
            >
              Works
            </h1>

            <span className="block" style={{ width: '2rem', height: '1px', background: '#C8922A', marginBottom: '2.5rem' }} />

            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize:   '0.875rem',
              color:      '#7A6F62',
              lineHeight: 1.85,
              maxWidth:   '50ch',
              marginBottom: '2rem',
            }}>
              Songs, recordings, and other artistic works — from a catalogue of over 300 original compositions.
            </p>

            <div className="flex flex-wrap gap-6">
              <a
                href={SPOTIFY_ARTIST}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1DB954] transition-colors duration-200"
                style={{
                  fontFamily:    'var(--font-inter)',
                  fontSize:      '0.52rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         '#7A6F62',
                  borderBottom:  '1px solid rgba(122,111,98,0.3)',
                  paddingBottom: '2px',
                }}
              >
                Full catalogue on Spotify →
              </a>
              <a
                href={TIDAL_ARTIST}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00FFFF] transition-colors duration-200"
                style={{
                  fontFamily:    'var(--font-inter)',
                  fontSize:      '0.52rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         '#7A6F62',
                  borderBottom:  '1px solid rgba(122,111,98,0.3)',
                  paddingBottom: '2px',
                }}
              >
                Full catalogue on Tidal →
              </a>
            </div>
          </div>

          {/* ── Featured ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.45rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '3.5rem',
            }}>
              Featured
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {featuredWorks.map((work, i) => (
                <Link
                  key={work.id}
                  href={`/works/${work.slug}`}
                  style={{
                    display:        'grid',
                    gridTemplateColumns: '2rem 1fr auto',
                    gap:            '1.25rem',
                    alignItems:     'baseline',
                    padding:        '1.75rem 0',
                    borderBottom:   '1px solid rgba(255,255,255,0.06)',
                    textDecoration: 'none',
                    transition:     'opacity 200ms',
                  }}
                  className="group"
                >
                  <span style={{
                    fontFamily:    'var(--font-inter)',
                    fontSize:      '0.48rem',
                    color:         'rgba(200,146,42,0.35)',
                    letterSpacing: '0.08em',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
                      style={{
                        fontSize:     'clamp(1.1rem, 2.8vw, 1.55rem)',
                        color:        '#E8E0D4',
                        lineHeight:   1.2,
                        letterSpacing:'0.01em',
                      }}
                    >
                      {work.title}
                    </p>
                    {work.meta && (
                      <p style={{
                        fontFamily:    'var(--font-inter)',
                        fontSize:      '0.55rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color:         '#7A6F62',
                        marginTop:     '0.3rem',
                      }}>
                        {work.meta}
                      </p>
                    )}
                  </div>
                  <span style={{
                    fontFamily:    'var(--font-inter)',
                    fontSize:      '0.5rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         '#7A6F62',
                    flexShrink:    0,
                  }}>
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Songs catalogue ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.45rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '3rem',
            }}>
              Songs
            </p>

            <WorksSearch works={works} />
          </div>

          {/* ── Keep in touch ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '9rem' }}>
            <KeepInTouch variant="works" />
          </div>

        </div>
      </div>
    </main>
  );
}
