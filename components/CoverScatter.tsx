'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Work } from '@/data/works';

type Filter = 'all' | 'released' | 'unreleased';

interface Props {
  works:              Work[];
  showFilter?:        boolean;
  searchPlaceholder?: string;
  /** Base path for work links, e.g. "/works" — final href is `${hrefBase}/${work.slug}` */
  hrefBase:           string;
  sizeRange?:         [number, number]; // [minPx, maxPx] for scatter tiles
}

// Seeded LCG pseudo-random — same layout every render
function lcg(seed: number) {
  let s = seed | 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) | 0;
    return (s >>> 0) / 0x100000000;
  };
}

const COL_W = 680; // conservative column width for position clamping

interface Tile { leftPct: number; topPx: number; sizePx: number; deg: number; delay: number; }

function buildLayout(n: number, minSz: number, maxSz: number): { tiles: Tile[]; h: number } {
  const tiles: Tile[] = [];
  let y = 0;
  for (let i = 0; i < n; i++) {
    const r = lcg(i * 53 + 17);
    // Size: larger for earlier works
    const t      = n > 1 ? Math.min(i / (n - 1), 1) : 0;
    const sizePx = Math.round(maxSz - t * (maxSz - minSz));
    // Two-zone stagger: left / right
    const isLeft = i % 2 === 0;
    const rawMin = isLeft ? 2  : 47;
    const rawMax = isLeft ? 40 : 80;
    const maxL   = ((COL_W - sizePx) / COL_W) * 100;
    const xMin   = rawMin;
    const xMax   = Math.min(rawMax, maxL);
    const leftPct = xMin + r() * Math.max(0, xMax - xMin);
    const deg   = (r() - 0.5) * 5;
    const delay = r() * 3;
    tiles.push({ leftPct, topPx: y, sizePx, deg, delay });
    y += sizePx + 28 + r() * 60;
  }
  const last = tiles[tiles.length - 1];
  return { tiles, h: last ? last.topPx + last.sizePx + 40 : 0 };
}

const EYEBROW: React.CSSProperties = {
  fontFamily:    'var(--font-inter)',
  fontSize:      '0.45rem',
  letterSpacing: '0.35em',
  textTransform: 'uppercase' as const,
  color:         '#7A6F62',
  background:    'none',
  border:        'none',
  cursor:        'pointer',
  padding:       '0.3rem 0',
  transition:    'color 150ms',
};

export default function CoverScatter({
  works,
  showFilter        = false,
  searchPlaceholder = 'Search…',
  hrefBase,
  sizeRange         = [120, 200],
}: Props) {
  const [query,   setQuery]   = useState('');
  const [filter,  setFilter]  = useState<Filter>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  const q          = query.toLowerCase().trim();
  const isSearching = q.length > 0 || (showFilter && filter !== 'all');

  const filtered = useMemo(() => works.filter((w) => {
    if (showFilter) {
      if (filter === 'released'   && w.releaseStatus !== 'released')   return false;
      if (filter === 'unreleased' && w.releaseStatus !== 'unreleased') return false;
    }
    if (q && !w.title.toLowerCase().includes(q) && !(w.meta ?? '').toLowerCase().includes(q)) return false;
    return true;
  }), [works, filter, q, showFilter]);

  const withCovers  = filtered.filter(w => w.coverImage);
  const [min, max]  = sizeRange;
  const { tiles, h } = useMemo(
    () => buildLayout(withCovers.length, min, max),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [withCovers.length, min, max]
  );

  return (
    <div>
      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}>
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex:         '1 1 140px',
            minWidth:     0,
            background:   'transparent',
            border:       'none',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            color:        '#E8E0D4',
            fontFamily:   'var(--font-cormorant)',
            fontSize:     '0.95rem',
            fontStyle:    'italic',
            padding:      '0.35rem 0',
            outline:      'none',
          }}
        />
        {showFilter && (
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {(['all', 'released', 'unreleased'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ ...EYEBROW, color: filter === f ? '#C8922A' : '#7A6F62' }}
              >
                {f === 'all' ? 'All' : f === 'released' ? 'Released' : 'Unreleased'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#7A6F62', paddingTop: '1rem' }}>
          Nothing found.
        </p>
      )}

      {/* ── List view (search active) ── */}
      {isSearching && filtered.length > 0 && (
        <ul style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: 0, padding: 0, listStyle: 'none' }}>
          {filtered.map((work) => (
            <li key={work.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <Link
                href={`${hrefBase}/${work.slug}`}
                className="group"
                style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.1rem 0', textDecoration: 'none' }}
              >
                {work.coverImage && (
                  <img src={work.coverImage} alt="" width={40} height={40}
                    style={{ width: 40, height: 40, objectFit: 'cover', opacity: 0.8, flexShrink: 0 }} />
                )}
                <div style={{ minWidth: 0 }}>
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
                    style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#E8E0D4', lineHeight: 1.2 }}
                  >
                    {work.title}
                  </p>
                  {work.meta && (
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A6F62', marginTop: '0.2rem' }}>
                      {work.meta}
                    </p>
                  )}
                </div>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-inter)', fontSize: '0.5rem', color: '#7A6F62', flexShrink: 0 }}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* ── Scatter view (default) ── */}
      {!isSearching && withCovers.length > 0 && (
        <>
          {/* Mobile: 2-column grid */}
          <div className="cover-scatter-mobile">
            {withCovers.map((work) => (
              <Link key={work.id} href={`${hrefBase}/${work.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  width:           '100%',
                  aspectRatio:     '1',
                  maskImage:       'radial-gradient(ellipse 90% 90% at 50% 50%, black 60%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 60%, transparent 100%)',
                  overflow:        'hidden',
                }}>
                  <img
                    src={work.coverImage!}
                    alt=""
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.82 }}
                  />
                </div>
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: '0.8rem', color: '#E8E0D4', marginTop: '0.4rem', lineHeight: 1.2 }}
                >
                  {work.title}
                </p>
              </Link>
            ))}
          </div>

          {/* Desktop: absolute-position scatter */}
          <div className="cover-scatter-desktop" style={{ position: 'relative', height: `${h}px` }}>
            {withCovers.map((work, i) => {
              const tile = tiles[i];
              if (!tile) return null;
              const hot = hovered === work.id;
              return (
                <Link
                  key={work.id}
                  href={`${hrefBase}/${work.slug}`}
                  onMouseEnter={() => setHovered(work.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position:        'absolute',
                    left:            `${tile.leftPct.toFixed(2)}%`,
                    top:             `${tile.topPx}px`,
                    width:           `${tile.sizePx}px`,
                    transform:       `rotate(${tile.deg.toFixed(2)}deg)`,
                    transformOrigin: 'center center',
                    textDecoration:  'none',
                    zIndex:          hot ? 2 : 1,
                  }}
                >
                  <div className="cover-drift" style={{ animationDelay: `${tile.delay.toFixed(2)}s` }}>
                    {/* Image with feathered radial edges */}
                    <div style={{
                      width:           tile.sizePx,
                      height:          tile.sizePx,
                      maskImage:       'radial-gradient(ellipse 90% 90% at 50% 50%, black 55%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 55%, transparent 100%)',
                      overflow:        'hidden',
                      opacity:         hot ? 1 : 0.78,
                      transition:      'opacity 220ms ease',
                    }}>
                      <img
                        src={work.coverImage!}
                        alt=""
                        loading={i < 4 ? 'eager' : 'lazy'}
                        width={tile.sizePx}
                        height={tile.sizePx}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    {/* Title — appears on hover */}
                    <div style={{
                      marginTop:  '0.5rem',
                      textAlign:  'center',
                      opacity:    hot ? 1 : 0,
                      transform:  hot ? 'translateY(0)' : 'translateY(4px)',
                      transition: 'opacity 200ms ease, transform 200ms ease',
                    }}>
                      <p
                        className="font-[family-name:var(--font-cormorant)] font-light"
                        style={{ fontSize: '0.82rem', color: '#E8E0D4', lineHeight: 1.2 }}
                      >
                        {work.title}
                      </p>
                      {work.meta && (
                        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.44rem', color: '#7A6F62', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                          {work.meta}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
