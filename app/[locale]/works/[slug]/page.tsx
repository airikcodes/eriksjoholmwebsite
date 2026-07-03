import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import KeepInTouch from '@/components/KeepInTouch';
import { works, getWork } from '@/data/works';
import { hasLocale } from '@/lib/dictionaries';

const LOCALES = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    works.map((w) => ({ locale, slug: w.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};

  const title = `${work.title} — Erik Sjøholm`;
  const description = work.description
    ?? `${work.title}${work.meta ? ` — ${work.meta}` : ''} by Erik Sjøholm.`;

  return {
    title,
    description,
    alternates: { canonical: `https://eriksjoholm.com/works/${slug}` },
    openGraph: {
      title,
      description,
      url:    `https://eriksjoholm.com/works/${slug}`,
      images: [{ url: '/images/portrait.jpg', alt: work.title }],
      type:   'website',
    },
    twitter: {
      card:   'summary_large_image',
      title,
      images: ['/images/portrait.jpg'],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const work = getWork(slug);
  if (!work) notFound();

  return (
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>

      {/* Fixed background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{
          position:           'absolute', inset: 0,
          backgroundImage:    'url(/images/bg/bg-01.jpg)',
          backgroundSize:     'cover',
          backgroundPosition: 'center top',
          opacity:            0.07,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Header ── */}
          <div style={{ paddingTop: '5.5rem', paddingBottom: '4rem' }}>
            <BackNav href="/works" label="Works" />

            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.48rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '1.5rem',
            }}>
              {work.workType === 'collaboration'
                ? `${work.year ?? ''} · Collaboration`.trim().replace(/^· /, '')
                : work.workType === 'song'
                ? `${work.year ?? ''} · Song`.trim().replace(/^· /, '')
                : `${work.year ?? ''} · ${work.workType}`.trim().replace(/^· /, '')}
            </p>

            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize:     'clamp(2.2rem, 7vw, 4rem)',
                color:        '#E8E0D4',
                letterSpacing:'0.01em',
                lineHeight:   1.05,
              }}
            >
              {work.title}
            </h1>

            {work.meta && (
              <p style={{
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         '#7A6F62',
                marginTop:     '1rem',
              }}>
                {work.meta}
              </p>
            )}

            <span className="block" style={{ width: '2rem', height: '1px', background: '#C8922A', marginTop: '2.5rem' }} />
          </div>

          {/* ── Description ── */}
          {work.description && (
            <div style={{ paddingBottom: '4rem' }}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize:   '0.9rem',
                color:      '#B8B0A6',
                lineHeight: 1.9,
                maxWidth:   '52ch',
              }}>
                {work.description}
              </p>
            </div>
          )}

          {/* ── Listen ── */}
          {(work.spotifyUrl || work.tidalUrl) && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '4rem', paddingBottom: '4rem' }}>
              <p style={{
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.45rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color:         '#7A6F62',
                marginBottom:  '2rem',
              }}>
                Listen
              </p>
              <div className="flex flex-wrap gap-6">
                {work.spotifyUrl && (
                  <a
                    href={work.spotifyUrl}
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
                    Spotify →
                  </a>
                )}
                {work.tidalUrl && (
                  <a
                    href={work.tidalUrl}
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
                    Tidal →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ── Lyrics ── */}
          {work.lyrics && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '4rem', paddingBottom: '4rem' }}>
              <p style={{
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.45rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color:         '#7A6F62',
                marginBottom:  '2rem',
              }}>
                The Lyric
              </p>
              <div style={{
                borderLeft:  '1px solid rgba(200,146,42,0.2)',
                paddingLeft: '1.5rem',
              }}>
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light italic"
                  style={{
                    fontSize:   'clamp(1rem, 2vw, 1.2rem)',
                    color:      'rgba(232,224,212,0.75)',
                    lineHeight: 2.1,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {work.lyrics}
                </p>
              </div>
            </div>
          )}

          {/* ── Story ── */}
          {work.story && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '4rem', paddingBottom: '4rem' }}>
              <p style={{
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.45rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color:         '#7A6F62',
                marginBottom:  '1.5rem',
              }}>
                The Story
              </p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize:   '0.9rem',
                color:      '#B8B0A6',
                lineHeight: 1.9,
                maxWidth:   '52ch',
              }}>
                {work.story}
              </p>
            </div>
          )}

          {/* ── Credits ── */}
          {work.credits && work.credits.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '4rem', paddingBottom: '4rem' }}>
              <p style={{
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.45rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color:         '#7A6F62',
                marginBottom:  '2rem',
              }}>
                Credits
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {work.credits.map((credit, i) => (
                  <li
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1rem 0' }}
                  >
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: '#E8E0D4' }}
                    >
                      {credit.name}
                    </p>
                    <p style={{
                      fontFamily:    'var(--font-inter)',
                      fontSize:      '0.6rem',
                      color:         '#7A6F62',
                      letterSpacing: '0.08em',
                      marginTop:     '0.2rem',
                    }}>
                      {credit.role}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Keep in touch ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '9rem' }}>
            <KeepInTouch variant="work" />
          </div>

        </div>
      </div>
    </main>
  );
}
