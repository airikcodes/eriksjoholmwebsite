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
  /** Grid column count at desktop width (≥640px). Mobile is always 2. */
  columns?:           number;
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
  columns           = 3,
}: Props) {
  const [query,  setQuery]  = useState('');
  const [filter, setFilter] = useState<Filter>('all');

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

  const withCovers = filtered.filter(w => w.coverImage);

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

      {/* ── Grid view (default) — structured, no tilt/randomization ── */}
      {!isSearching && withCovers.length > 0 && (
        <div
          className="cover-grid"
          style={{ '--cover-grid-cols': columns } as React.CSSProperties}
        >
          {withCovers.map((work, i) => (
            <Link
              key={work.id}
              href={`${hrefBase}/${work.slug}`}
              className="group"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                className="cover-grid-tile"
                style={{
                  position:     'relative',
                  aspectRatio:  '1',
                  overflow:     'hidden',
                  borderRadius: '2px',
                  border:       '1px solid rgba(200,146,42,0.22)',
                }}
              >
                <img
                  src={work.coverImage!}
                  alt=""
                  loading={i < 6 ? 'eager' : 'lazy'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <span
                  style={{
                    position:      'absolute',
                    top:           '0.5rem',
                    left:          '0.5rem',
                    fontFamily:    'var(--font-inter)',
                    fontSize:      '0.42rem',
                    letterSpacing: '0.1em',
                    color:         'rgba(232,224,212,0.85)',
                    background:    'rgba(13,11,9,0.55)',
                    padding:       '0.18rem 0.4rem',
                    borderRadius:  '2px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <p
                className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
                style={{
                  fontSize:      'clamp(0.95rem, 1.8vw, 1.15rem)',
                  color:         '#E8E0D4',
                  lineHeight:    1.2,
                  marginTop:     '0.65rem',
                }}
              >
                {work.title}
              </p>
              {work.meta && (
                <p
                  style={{
                    fontFamily:    'var(--font-inter)',
                    fontSize:      '0.44rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         '#7A6F62',
                    marginTop:     '0.25rem',
                  }}
                >
                  {work.meta}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
