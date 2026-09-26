import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import KeepInTouch from '@/components/KeepInTouch';
import CustomSongPlayer from '@/components/CustomSongPlayer';
import { featuredCustomSongs, CUSTOM_SONGS_PLAYLIST_URL } from '@/data/customSongs';
import { getNotes } from '@/lib/notes';
import { getDictionary, hasLocale } from '@/lib/dictionaries';
import {
  FILTERS,
  applyFilter,
  buildLibrary,
  groupEntries,
  isFilter,
  type LibraryEntry,
  type LibraryKind,
} from '@/lib/library';

export const metadata: Metadata = {
  title: 'Artworks — Erik Sjøholm',
  description:
    'Everything Erik Sjøholm has made, in one place — albums, EPs, singles, a storytelling concert, and the stories that go with them.',
  alternates: { canonical: 'https://eriksjoholm.com/works' },
  openGraph: {
    title: 'Artworks — Erik Sjøholm',
    description: 'Albums, EPs, singles, a storytelling concert and stories by Erik Sjøholm.',
    url: 'https://eriksjoholm.com/works',
    images: [{ url: '/images/portrait.jpg', width: 800, height: 800, alt: 'Erik Sjøholm' }],
    type: 'website',
  },
};

const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp';
const TIDAL_ARTIST   = 'https://tidal.com/artist/47687355';

const EYEBROW: React.CSSProperties = {
  fontFamily:    'var(--font-inter)',
  fontSize:      '0.7rem',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color:         'var(--color-ink-meta)',
};

const META_LINK: React.CSSProperties = {
  fontFamily:    'var(--font-inter)',
  fontSize:      '0.7rem',
  fontWeight:    500,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color:         'var(--color-ink-meta)',
  textDecoration: 'none',
  borderBottom:  '1px solid rgba(var(--meta-rgb),0.35)',
  paddingBottom: '2px',
};

export default async function WorksPage({
  params,
  searchParams,
}: {
  params:       Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const { type } = await searchParams;

  const t     = await getDictionary(locale);
  const lib   = t.library;
  const kinds = t.home.portal.kinds;
  const notes = await getNotes();

  const all = buildLibrary(notes, {
    concertTitle: t.home.portal.titles.concert,
    concertMeta:  lib.concertMeta,
    storiesTitle: t.home.portal.titles.stories,
    storiesMeta:  lib.storiesMeta,
  });

  const active = isFilter(type) ? type : 'all';
  const groups = groupEntries(applyFilter(all, active));

  const kindLabel: Record<LibraryKind, string> = {
    album: kinds.album, ep: kinds.ep, single: kinds.songs, storytelling: kinds.live, story: kinds.notes,
  };

  function groupLabel(key: string, year?: number): string {
    if (year) return String(year);
    if (key === 'ongoing')  return lib.ongoing;
    if (key === 'upcoming') return lib.comingSoon;
    return lib.undated;
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--page-solid)', color: 'var(--color-ink-primary)' }}>
      {/* Top photo band (light theme; a faint ghost in dark) */}
      <div className="page-photo-wrap" style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div className="page-photo" style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/banners/works.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 'calc(0.06 * var(--ghost-k))',
          filter: 'var(--ghost-filter)',
          mixBlendMode: 'var(--ghost-blend)' as React.CSSProperties['mixBlendMode'],
        }} />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── Header ── */}
        <header style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
          <BackNav />
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{
              fontSize:      'clamp(3rem, 9vw, 6rem)',
              color:         'var(--color-ink-primary)',
              letterSpacing: '0.02em',
              lineHeight:    0.95,
              marginBottom:  '2rem',
            }}
          >
            {t.nav.works}
          </h1>
          <span className="block" style={{ width: '2rem', height: '1px', background: '#C8922A', marginBottom: '2rem' }} />
          <p className="body-copy" style={{ maxWidth: '52ch', marginBottom: '1.75rem' }}>{lib.intro}</p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
            <a
              href={SPOTIFY_ARTIST}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1DB954] transition-colors duration-200"
              style={META_LINK}
            >
              {t.songs.fullCatalogueSpotify}
            </a>
            <a
              href={TIDAL_ARTIST}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00FFFF] transition-colors duration-200"
              style={META_LINK}
            >
              {t.songs.fullCatalogueTidal}
            </a>
          </div>

          <nav aria-label={lib.filterLabel} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {FILTERS.map((f) => {
              const count = applyFilter(all, f).length;
              if (f !== 'all' && count === 0) return null;
              return (
                <Link
                  key={f}
                  href={f === 'all' ? '/works' : `/works?type=${f}`}
                  className="lib-filter"
                  aria-current={f === active ? 'true' : undefined}
                  scroll={false}
                >
                  {lib.filters[f]}
                  <span style={{ opacity: 0.6, marginLeft: '0.5rem' }}>{count}</span>
                </Link>
              );
            })}
          </nav>
        </header>

        {/* ── Index, grouped by year ── */}
        <div>
          {groups.map((g) => (
            <section key={g.key} className="lib-year-group" aria-label={groupLabel(g.key, g.year)}>
              <h2
                className="lib-year font-[family-name:var(--font-cormorant)] font-light"
                style={{
                  fontSize:   g.year ? 'clamp(2rem, 5vw, 3rem)' : '1.15rem',
                  lineHeight: 1,
                  color:      g.year ? 'var(--color-ink-primary)' : 'var(--color-ink-body)',
                  letterSpacing: g.year ? '0.01em' : '0.02em',
                  fontStyle:  g.year ? 'normal' : 'italic',
                }}
              >
                {groupLabel(g.key, g.year)}
              </h2>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {g.entries.map((e) => (
                  <Row key={e.id} entry={e} kind={kindLabel[e.kind]} soon={lib.comingSoon} />
                ))}
              </ul>
            </section>
          ))}
        </div>

      </div>

    {/* ══════════════════════════════════════════════════════
        ZONE B — PROFESSIONAL SERVICES
        Full-bleed section with its own darker tint
    ══════════════════════════════════════════════════════ */}
    <div id="sync" style={{
      background:  'rgba(5,4,3,0.82)',
      borderTop:   '1px solid rgba(var(--fg-rgb),0.05)',
      borderBottom:'1px solid rgba(var(--fg-rgb),0.05)',
    }}>
      {/* Separator label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 1.5rem', paddingTop: '4rem' }}>
        <span style={{ flex: 1, height: '1px', background: 'rgba(var(--fg-rgb),0.05)' }} />
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.4rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-ink-meta)', whiteSpace: 'nowrap' }}>
          For professionals
        </span>
        <span style={{ flex: 1, height: '1px', background: 'rgba(var(--fg-rgb),0.05)' }} />
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
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'var(--color-ink-primary)', lineHeight: 1.05, letterSpacing: '0.01em', marginBottom: '1.25rem' }}
          >
            {t.sync.title}
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'var(--color-ink-body)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '36ch' }}>
            {t.sync.intro}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="https://sync.eriksjoholm.com"
              style={{ display: 'inline-block', border: '1px solid rgba(200,146,42,0.45)', color: 'var(--accent-ink)', fontFamily: 'var(--font-inter)', fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', padding: '0.7rem 1.5rem', textDecoration: 'none', transition: 'border-color 200ms, color 200ms' }}
              className="hover:border-[#C8922A] hover:text-[color:var(--color-ink-primary)] transition-all duration-200"
            >
              {t.songs.sync.cta}
            </Link>
            <a
              href="https://eriksjoholmofficial.disco.ac/cat/1272966979"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-meta)', borderBottom: '1px solid rgba(var(--meta-rgb),0.3)', paddingBottom: '2px', textDecoration: 'none' }}
              className="hover:text-[color:var(--accent-ink)] hover:border-[#C8922A] transition-colors duration-200"
            >
              {t.sync.openOnDisco}
            </a>
          </div>
        </div>

        {/* Songs For You */}
        <div id="songs-for-you">
          <p style={{ ...EYEBROW, marginBottom: '1rem' }}>{t.songs.forYou.eyebrow}</p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'var(--color-ink-primary)', lineHeight: 1.05, letterSpacing: '0.01em', marginBottom: '1.25rem' }}
          >
            {t.songs.forYou.title}
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'var(--color-ink-body)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '36ch' }}>
            {t.songs.forYou.desc}
          </p>
          <CustomSongPlayer songs={featuredCustomSongs} playlistUrl={CUSTOM_SONGS_PLAYLIST_URL} />
          <Link
            href="/contact"
            style={{ display: 'inline-block', marginTop: '2rem', border: '1px solid rgba(200,146,42,0.45)', color: 'var(--accent-ink)', fontFamily: 'var(--font-inter)', fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', padding: '0.7rem 1.5rem', textDecoration: 'none' }}
            className="hover:border-[#C8922A] hover:text-[color:var(--color-ink-primary)] transition-all duration-200"
          >
            {t.songs.forYou.cta}
          </Link>
        </div>
      </div>
    </div>


      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ borderTop: '1px solid rgba(var(--fg-rgb),0.07)', paddingTop: '5rem', paddingBottom: '9rem' }}>
          <KeepInTouch variant="works" locale={locale} />
        </div>
      </div>
      </div>
    </main>
  );
}

function Row({ entry: e, kind, soon }: { entry: LibraryEntry; kind: string; soon: string }) {
  const inner = (
    <>
      {e.cover ? (
        <img className="lib-cover" src={e.cover} alt="" width={88} height={88} loading="lazy" />
      ) : (
        <span
          className="lib-cover font-[family-name:var(--font-cormorant)]"
          aria-hidden="true"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.6rem', color: 'rgba(200,146,42,0.4)' }}
        >
          “
        </span>
      )}
      <span style={{ minWidth: 0 }}>
        <span
          className="font-[family-name:var(--font-cormorant)] font-light lib-title"
          style={{ display: 'block', fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', lineHeight: 1.15, color: 'var(--color-ink-primary)' }}
        >
          {e.title}
        </span>
        <span
          style={{
            display:       'block',
            marginTop:     '0.35rem',
            fontFamily:    'var(--font-inter)',
            fontSize:      '0.7rem',
            fontWeight:    500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--color-ink-body)',
            lineHeight:    1.6,
          }}
        >
          {kind}
          {e.upcoming ? ` · ${soon}` : ''}
          {e.meta ? ` · ${e.meta}` : ''}
        </span>
      </span>
    </>
  );

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(var(--fg-rgb),0.05)' }}>
      {e.external ? (
        <a href={e.href} target="_blank" rel="noopener noreferrer" className="lib-row group" style={{ flex: 1, minWidth: 0 }}>
          {inner}
        </a>
      ) : (
        <Link href={e.href} className="lib-row group" style={{ flex: 1, minWidth: 0 }}>
          {inner}
        </Link>
      )}
      {(e.spotifyUrl || e.tidalUrl) && (
        <span className="lib-links" style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
          {e.spotifyUrl && (
            <a href={e.spotifyUrl} target="_blank" rel="noopener noreferrer" style={META_LINK} className="hover:text-[#1DB954] transition-colors duration-200">
              Spotify
            </a>
          )}
        </span>
      )}
    </li>
  );
}
