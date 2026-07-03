'use client';

import { useState } from 'react';
import type { Work } from '@/data/works';

type Filter = 'all' | 'released' | 'unreleased';

interface Props {
  works: Work[];
}

export default function WorksSearch({ works }: Props) {
  const [query, setQuery]   = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const q = query.toLowerCase().trim();

  const filtered = works.filter((w) => {
    if (filter === 'released' && w.releaseStatus !== 'released')   return false;
    if (filter === 'unreleased' && w.releaseStatus !== 'unreleased') return false;
    if (q && !w.title.toLowerCase().includes(q)) return false;
    return true;
  });

  const btnBase: React.CSSProperties = {
    background:      'none',
    border:          'none',
    cursor:          'pointer',
    fontFamily:      'var(--font-inter)',
    fontSize:        '0.48rem',
    letterSpacing:   '0.25em',
    textTransform:   'uppercase',
    padding:         '0.4rem 0',
    transition:      'color 150ms',
  };

  return (
    <div>
      {/* ── Toolbar ── */}
      <div style={{
        display:        'flex',
        gap:            '1.5rem',
        flexWrap:       'wrap',
        alignItems:     'center',
        marginBottom:   '2rem',
      }}>
        {/* Search */}
        <input
          type="search"
          placeholder="Search songs…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex:            '1 1 200px',
            minWidth:        0,
            background:      'rgba(255,255,255,0.03)',
            border:          '1px solid rgba(255,255,255,0.09)',
            color:           '#E8E0D4',
            fontFamily:      'var(--font-inter)',
            fontSize:        '0.82rem',
            padding:         '0.6rem 0.9rem',
            outline:         'none',
            borderRadius:    0,
          }}
        />

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1.25rem', flexShrink: 0 }}>
          {(['all', 'released', 'unreleased'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...btnBase,
                color: filter === f ? '#C8922A' : '#7A6F62',
              }}
            >
              {f === 'all' ? 'All' : f === 'released' ? 'Released' : 'Unreleased'}
            </button>
          ))}
        </div>
      </div>

      {/* ── List ── */}
      {filtered.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#7A6F62', paddingTop: '2rem' }}>
          No songs found.
        </p>
      ) : (
        <ul style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {filtered.map((work, i) => {
            const isOpen = openIds.has(work.id);
            return (
              <li key={work.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

                {/* Row header */}
                <button
                  onClick={() => toggle(work.id)}
                  className="w-full text-left flex items-center justify-between gap-4"
                  style={{ padding: '1.6rem 0', cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  <div className="flex items-baseline gap-5 min-w-0">
                    <span style={{
                      fontFamily:   'var(--font-inter)',
                      fontSize:     '0.48rem',
                      color:        'rgba(200,146,42,0.3)',
                      letterSpacing:'0.08em',
                      flexShrink:   0,
                      width:        '1.4rem',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="font-[family-name:var(--font-cormorant)] font-light"
                        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: '#E8E0D4', lineHeight: 1.2 }}
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
                  </div>
                  <span style={{
                    color:      '#7A6F62',
                    fontSize:   '1.2rem',
                    lineHeight: 1,
                    flexShrink: 0,
                    display:    'flex',
                    alignItems: 'center',
                    width:      '2rem',
                    height:     '2rem',
                    transition: 'transform 250ms ease, color 150ms',
                    transform:  isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    +
                  </span>
                </button>

                {/* Expandable panel */}
                <div style={{
                  display:             'grid',
                  gridTemplateRows:    isOpen ? '1fr' : '0fr',
                  transition:          'grid-template-rows 300ms ease',
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ paddingBottom: '2.5rem' }}>

                      {work.story && (
                        <div style={{ marginBottom: '2rem' }}>
                          <p style={{
                            fontFamily:    'var(--font-inter)',
                            fontSize:      '0.42rem',
                            letterSpacing: '0.32em',
                            textTransform: 'uppercase',
                            color:         '#7A6F62',
                            marginBottom:  '0.75rem',
                          }}>
                            The Story
                          </p>
                          <p style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize:   '0.82rem',
                            color:      'rgba(122,111,98,0.85)',
                            lineHeight: 1.85,
                            maxWidth:   '56ch',
                          }}>
                            {work.story}
                          </p>
                        </div>
                      )}

                      {(work.spotifyUrl || work.tidalUrl) && (
                        <div>
                          <p style={{
                            fontFamily:    'var(--font-inter)',
                            fontSize:      '0.42rem',
                            letterSpacing: '0.32em',
                            textTransform: 'uppercase',
                            color:         '#7A6F62',
                            marginBottom:  '0.9rem',
                          }}>
                            Listen
                          </p>
                          <div className="flex gap-7">
                            {work.spotifyUrl && (
                              <a
                                href={work.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#1DB954] transition-colors duration-200"
                                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', letterSpacing: '0.12em', color: '#C8922A' }}
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
                                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', letterSpacing: '0.12em', color: '#C8922A' }}
                              >
                                Tidal →
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
