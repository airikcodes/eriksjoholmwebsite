'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Work } from '@/data/works';

interface Props {
  albums: Work[];
}

function typeLabel(type: string): string {
  if (type === 'album') return 'Album';
  if (type === 'ep')    return 'EP';
  return type;
}

export default function AlbumsSearch({ albums }: Props) {
  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const filtered = albums.filter((a) =>
    !q || a.title.toLowerCase().includes(q) || (a.meta ?? '').toLowerCase().includes(q)
  );

  return (
    <div>
      {/* ── Search bar ── */}
      <input
        type="search"
        placeholder="Search albums & EPs…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width:        '100%',
          background:   'rgba(255,255,255,0.03)',
          border:       '1px solid rgba(255,255,255,0.09)',
          color:        '#E8E0D4',
          fontFamily:   'var(--font-inter)',
          fontSize:     '0.82rem',
          padding:      '0.6rem 0.9rem',
          outline:      'none',
          borderRadius: 0,
          marginBottom: '2rem',
        }}
      />

      {/* ── Empty state ── */}
      {albums.length === 0 ? (
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize:   '0.875rem',
          color:      '#7A6F62',
          lineHeight: 1.75,
          paddingTop: '1rem',
        }}>
          Albums and EPs coming soon.
        </p>
      ) : filtered.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#7A6F62', paddingTop: '1rem' }}>
          No releases found.
        </p>
      ) : (
        <ul style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {filtered.map((album) => (
            <li key={album.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <Link
                href={`/works/${album.slug}`}
                style={{
                  display:             'grid',
                  gridTemplateColumns: '1fr auto',
                  gap:                 '1.5rem',
                  alignItems:          'center',
                  padding:             '1.75rem 0',
                  textDecoration:      'none',
                }}
                className="group"
              >
                <div>
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
                    style={{
                      fontSize:      'clamp(1.05rem, 2.5vw, 1.4rem)',
                      color:         '#E8E0D4',
                      lineHeight:    1.2,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {album.title}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem', alignItems: 'baseline' }}>
                    {album.year && (
                      <span style={{
                        fontFamily:    'var(--font-inter)',
                        fontSize:      '0.55rem',
                        letterSpacing: '0.1em',
                        color:         '#7A6F62',
                      }}>
                        {album.year}
                      </span>
                    )}
                    <span style={{
                      fontFamily:    'var(--font-inter)',
                      fontSize:      '0.45rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color:         'rgba(200,146,42,0.5)',
                    }}>
                      {typeLabel(album.workType)}
                    </span>
                    {album.meta && (
                      <span style={{
                        fontFamily:    'var(--font-inter)',
                        fontSize:      '0.55rem',
                        letterSpacing: '0.08em',
                        color:         '#7A6F62',
                      }}>
                        {album.meta}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexShrink: 0 }}>
                  {album.spotifyUrl && (
                    <a
                      href={album.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-[#1DB954] transition-colors duration-200"
                      style={{
                        fontFamily:    'var(--font-inter)',
                        fontSize:      '0.48rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color:         '#7A6F62',
                      }}
                    >
                      Spotify
                    </a>
                  )}
                  {album.tidalUrl && (
                    <a
                      href={album.tidalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-[#00FFFF] transition-colors duration-200"
                      style={{
                        fontFamily:    'var(--font-inter)',
                        fontSize:      '0.48rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color:         '#7A6F62',
                      }}
                    >
                      Tidal
                    </a>
                  )}
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.5rem', color: '#7A6F62' }}>
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
