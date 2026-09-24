import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import KeepInTouch from '@/components/KeepInTouch';
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
  title: 'Library — Erik Sjøholm',
  description:
    'Everything Erik Sjøholm has made, in one place — albums, EPs, singles, a storytelling concert, and the stories that go with them.',
  alternates: { canonical: 'https://eriksjoholm.com/library' },
  openGraph: {
    title: 'Library — Erik Sjøholm',
    description: 'Albums, EPs, singles, a storytelling concert and stories by Erik Sjøholm.',
    url: 'https://eriksjoholm.com/library',
    images: [{ url: '/images/portrait.jpg', width: 800, height: 800, alt: 'Erik Sjøholm' }],
    type: 'website',
  },
};

const META_LINK: React.CSSProperties = {
  fontFamily:    'var(--font-inter)',
  fontSize:      '0.7rem',
  fontWeight:    500,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color:         '#7A6F62',
  textDecoration: 'none',
  borderBottom:  '1px solid rgba(122,111,98,0.35)',
  paddingBottom: '2px',
};

export default async function LibraryPage({
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
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── Header ── */}
        <header style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
          <BackNav />
          <p className="eyebrow-label" style={{ marginBottom: '1.25rem' }}>{lib.eyebrow}</p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{
              fontSize:      'clamp(3rem, 9vw, 6rem)',
              color:         '#E8E0D4',
              letterSpacing: '0.02em',
              lineHeight:    0.95,
              marginBottom:  '2rem',
            }}
          >
            {lib.title}
          </h1>
          <span className="block" style={{ width: '2rem', height: '1px', background: '#C8922A', marginBottom: '2rem' }} />
          <p className="body-copy" style={{ maxWidth: '52ch', marginBottom: '2.25rem' }}>{lib.intro}</p>

          <nav aria-label={lib.filterLabel} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {FILTERS.map((f) => {
              const count = applyFilter(all, f).length;
              if (f !== 'all' && count === 0) return null;
              return (
                <Link
                  key={f}
                  href={f === 'all' ? '/library' : `/library?type=${f}`}
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
                  color:      g.year ? '#E8E0D4' : '#B8B0A6',
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

        {/* ── Newsletter ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '3rem', paddingTop: '5rem', paddingBottom: '9rem' }}>
          <KeepInTouch variant="works" locale={locale} />
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
          style={{ display: 'block', fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', lineHeight: 1.15, color: '#E8E0D4' }}
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
            color:         '#9A8F82',
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
    <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
