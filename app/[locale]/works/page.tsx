import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import CoverScatter from '@/components/CoverScatter';
import WorksCoverBg from '@/components/WorksCoverBg';
import KeepInTouch from '@/components/KeepInTouch';
import CustomSongPlayer from '@/components/CustomSongPlayer';
import { works, albums, featuredWorks, upcomingAlbums } from '@/data/works';
import { featuredCustomSongs, CUSTOM_SONGS_PLAYLIST_URL } from '@/data/customSongs';
import { getDictionary, hasLocale } from '@/lib/dictionaries';

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
};

const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp';
const TIDAL_ARTIST   = 'https://tidal.com/artist/47687355';

// Released albums/EPs/singles for the scatter (upcoming shown separately in Up Next)
const releasedAlbums = albums.filter(a => a.releaseStatus !== 'upcoming');

const EYEBROW: React.CSSProperties = {
  fontFamily:    'var(--font-inter)',
  fontSize:      '0.45rem',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color:         '#7A6F62',
};

export default async function WorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);

  const firstFeaturedCover = featuredWorks[0]?.coverImage;
  const upNext             = upcomingAlbums[0];

  // Extract hook sentence from album description (up to first period)
  let hookText = '';
  if (upNext?.description) {
    const first = upNext.description.split('\n\n')[0] ?? '';
    hookText = first.length > 240 ? first.slice(0, 240).replace(/\s+\S*$/, '') + '…' : first;
  }

  return (
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>

      {/* ── Crossfading cover-art background ── */}
      <WorksCoverBg initialCover={firstFeaturedCover} />

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ══════════════════════════════════════════════════════
            ZONE A — MUSIC
        ══════════════════════════════════════════════════════ */}
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Hero ── */}
          <div style={{ paddingTop: '5.5rem', paddingBottom: '5rem' }}>
            <BackNav />
            <p style={{ ...EYEBROW, marginBottom: '1.25rem' }}>{t.nav.works}</p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize:      'clamp(3rem, 9vw, 6rem)',
                color:         '#E8E0D4',
                letterSpacing: '0.02em',
                lineHeight:    0.95,
                marginBottom:  '2.5rem',
              }}
            >
              {t.nav.works}
            </h1>

            <span className="block" style={{ width: '2rem', height: '1px', background: '#C8922A', marginBottom: '2.5rem' }} />

            <p style={{
              fontFamily:   'var(--font-inter)',
              fontSize:     '0.875rem',
              color:        '#7A6F62',
              lineHeight:   1.85,
              maxWidth:     '50ch',
              marginBottom: '2rem',
            }}>
              {t.works.intro}
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a
                href={SPOTIFY_ARTIST}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1DB954] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A6F62', borderBottom: '1px solid rgba(122,111,98,0.3)', paddingBottom: '2px' }}
              >
                {t.songs.fullCatalogueSpotify}
              </a>
              <a
                href={TIDAL_ARTIST}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00FFFF] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A6F62', borderBottom: '1px solid rgba(122,111,98,0.3)', paddingBottom: '2px' }}
              >
                {t.songs.fullCatalogueTidal}
              </a>
            </div>
          </div>

          {/* ── Featured ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p style={{ ...EYEBROW, marginBottom: '3.5rem' }}>{t.works.featured}</p>

            <div>
              {featuredWorks.map((work, i) => (
                <Link
                  key={work.id}
                  href={`/works/${work.slug}`}
                  // data-work-cover triggers WorksCoverBg to crossfade to this artwork
                  data-work-cover={work.coverImage ?? ''}
                  style={{
                    display:             'grid',
                    gridTemplateColumns: work.coverImage ? '2.5rem 110px 1fr auto' : '2.5rem 1fr auto',
                    gap:                 '1.5rem',
                    alignItems:          'center',
                    padding:             '2rem 0',
                    borderBottom:        '1px solid rgba(255,255,255,0.06)',
                    textDecoration:      'none',
                  }}
                  className="group"
                >
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.48rem', color: 'rgba(200,146,42,0.35)', letterSpacing: '0.08em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {work.coverImage && (
                    <img
                      src={work.coverImage}
                      alt=""
                      width={110}
                      height={110}
                      style={{ width: 110, height: 110, objectFit: 'cover', opacity: 0.88, display: 'block' }}
                    />
                  )}

                  <div>
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
                      style={{ fontSize: 'clamp(1.15rem, 3vw, 1.75rem)', color: '#E8E0D4', lineHeight: 1.15, letterSpacing: '0.01em' }}
                    >
                      {work.title}
                    </p>
                    {work.meta && (
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A6F62', marginTop: '0.4rem' }}>
                        {work.meta}
                      </p>
                    )}
                  </div>

                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.5rem', letterSpacing: '0.18em', color: '#7A6F62', flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Up Next ── */}
          {upNext && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '5rem' }}>
              <p style={{ ...EYEBROW, marginBottom: '3.5rem' }}>{t.works.upNext}</p>

              <Link
                href={`/works/${upNext.slug}`}
                data-work-cover={upNext.coverImage ?? ''}
                className="group up-next-grid"
                style={{ textDecoration: 'none', display: 'grid', gap: '3rem', alignItems: 'flex-start' }}
              >
                {/* Text column */}
                <div>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.45rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(200,146,42,0.55)', marginBottom: '0.75rem' }}>
                    {upNext.workType === 'album' ? 'Album' : upNext.workType === 'ep' ? 'EP' : 'Single'} · {t.works.comingSoon}
                  </p>

                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
                    style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)', color: '#E8E0D4', lineHeight: 1.05, letterSpacing: '0.01em', marginBottom: '1.25rem' }}
                  >
                    {upNext.title}
                  </p>

                  {hookText && (
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'rgba(232,224,212,0.55)', lineHeight: 1.85, maxWidth: '40ch', marginBottom: '1.5rem' }}>
                      {hookText}
                    </p>
                  )}

                  {upNext.tracks && upNext.tracks.length > 0 && (
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5A5248', marginBottom: '2rem' }}>
                      {upNext.tracks.length} {upNext.tracks.length !== 1 ? t.works.singlesSoFar : t.works.singleSoFar}
                    </p>
                  )}

                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.48rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8922A', borderBottom: '1px solid rgba(200,146,42,0.35)', paddingBottom: '2px' }}>
                    Explore the album →
                  </span>
                </div>

                {/* Cover photo */}
                {upNext.coverImage && (
                  <div style={{ flexShrink: 0 }}>
                    <img
                      src={upNext.coverImage}
                      alt=""
                      width={300}
                      height={300}
                      style={{
                        width:      '100%',
                        maxWidth:   '300px',
                        height:     'auto',
                        display:    'block',
                        opacity:    0.9,
                        transition: 'opacity 300ms ease',
                      }}
                      className="group-hover:opacity-100"
                    />
                  </div>
                )}
              </Link>
            </div>
          )}

          {/* ── Albums & EPs (scatter) ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p style={{ ...EYEBROW, marginBottom: '3rem' }}>{t.works.albumsAndEps}</p>
            <CoverScatter
              works={releasedAlbums}
              hrefBase="/works"
              sizeRange={[130, 210]}
              searchPlaceholder="Search releases…"
            />
          </div>

          {/* ── Songs (scatter) ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p style={{ ...EYEBROW, marginBottom: '3rem' }}>{t.works.songs}</p>
            <CoverScatter
              works={works}
              showFilter
              hrefBase="/works"
              sizeRange={[80, 140]}
              searchPlaceholder="Search songs…"
            />
          </div>

        </div>{/* /Zone A column */}

        {/* ══════════════════════════════════════════════════════
            ZONE B — PROFESSIONAL SERVICES
            Full-bleed section with its own darker tint
        ══════════════════════════════════════════════════════ */}
        <div style={{
          background:  'rgba(5,4,3,0.82)',
          borderTop:   '1px solid rgba(255,255,255,0.05)',
          borderBottom:'1px solid rgba(255,255,255,0.05)',
        }}>
          {/* Separator label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 1.5rem', paddingTop: '4rem' }}>
            <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.4rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#4A4540', whiteSpace: 'nowrap' }}>
              For professionals
            </span>
            <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          </div>

          {/* Two-column service cards */}
          <div
            className="pro-cards-grid"
            style={{ maxWidth: '760px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}
          >
            {/* Sync Licensing */}
            <div>
              <p style={{ ...EYEBROW, marginBottom: '1rem' }}>{t.sync.eyebrow}</p>
              <h2
                className="font-[family-name:var(--font-cormorant)] font-light"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#E8E0D4', lineHeight: 1.05, letterSpacing: '0.01em', marginBottom: '1.25rem' }}
              >
                {t.sync.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#7A6F62', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '36ch' }}>
                {t.sync.intro}
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link
                  href="/sync"
                  style={{ display: 'inline-block', border: '1px solid rgba(200,146,42,0.45)', color: '#C8922A', fontFamily: 'var(--font-inter)', fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', padding: '0.7rem 1.5rem', textDecoration: 'none', transition: 'border-color 200ms, color 200ms' }}
                  className="hover:border-[#C8922A] hover:text-[#E8E0D4] transition-all duration-200"
                >
                  {t.songs.sync.cta}
                </Link>
                <a
                  href="https://eriksjoholmofficial.disco.ac/cat/1272966979"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-inter)', fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A6F62', borderBottom: '1px solid rgba(122,111,98,0.3)', paddingBottom: '2px', textDecoration: 'none' }}
                  className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
                >
                  {t.sync.openOnDisco}
                </a>
              </div>
            </div>

            {/* Songs For You */}
            <div>
              <p style={{ ...EYEBROW, marginBottom: '1rem' }}>{t.songs.forYou.eyebrow}</p>
              <h2
                className="font-[family-name:var(--font-cormorant)] font-light"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#E8E0D4', lineHeight: 1.05, letterSpacing: '0.01em', marginBottom: '1.25rem' }}
              >
                {t.songs.forYou.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#7A6F62', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '36ch' }}>
                {t.songs.forYou.desc}
              </p>
              <CustomSongPlayer songs={featuredCustomSongs} playlistUrl={CUSTOM_SONGS_PLAYLIST_URL} />
              <Link
                href="/contact"
                style={{ display: 'inline-block', marginTop: '2rem', border: '1px solid rgba(200,146,42,0.45)', color: '#C8922A', fontFamily: 'var(--font-inter)', fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', padding: '0.7rem 1.5rem', textDecoration: 'none' }}
                className="hover:border-[#C8922A] hover:text-[#E8E0D4] transition-all duration-200"
              >
                {t.songs.forYou.cta}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Keep in touch ── */}
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '9rem' }}>
            <KeepInTouch variant="works" locale={locale} />
          </div>
        </div>

      </div>{/* /relative zIndex:1 */}
    </main>
  );
}
