'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Work } from '@/data/works';
import AudioPlayer from '@/components/AudioPlayer';

function spotifyTrackId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/track\/([A-Za-z0-9]+)/);
  return match ? match[1] : null;
}

export default function SinglesList({
  tracks,
  locale,
  label,
}: {
  tracks: Work[];
  locale: string;
  label: string;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <p style={{
        fontFamily:    'var(--font-inter)',
        fontSize:      '0.7rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color:         '#7A6F62',
        marginBottom:  '2rem',
      }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tracks.map((track) => {
          // Prefer real in-site playback (R2-hosted file) once one exists for
          // this track; fall back to Spotify's public embed for released
          // singles that don't have an audioUrl yet.
          const trackId = spotifyTrackId(track.spotifyUrl);
          const playable = Boolean(track.audioUrl || trackId);
          const isOpen = openSlug === track.slug;
          return (
            <div key={track.slug} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 0' }}>
                <Link
                  href={`/${locale}/works/${track.slug}`}
                  style={{
                    flex:                 1,
                    minWidth:             0,
                    display:              'grid',
                    gridTemplateColumns:  track.coverImage ? '44px 1fr auto' : '1fr auto',
                    gap:                  '1rem',
                    alignItems:           'center',
                    textDecoration:       'none',
                  }}
                >
                  {track.coverImage && (
                    <img
                      src={track.coverImage}
                      alt=""
                      width={44}
                      height={44}
                      style={{ width: 44, height: 44, objectFit: 'cover', opacity: 0.8 }}
                    />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
                      style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)', color: '#E8E0D4', lineHeight: 1.25 }}
                    >
                      {track.title}
                    </p>
                    {track.meta && (
                      <p style={{
                        fontFamily:    'var(--font-inter)',
                        fontSize:      '0.52rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color:         '#5A5248',
                        marginTop:     '0.2rem',
                      }}>
                        {track.meta}
                      </p>
                    )}
                    {track.description && (
                      <p style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize:   '0.75rem',
                        color:      'rgba(140,128,118,0.6)',
                        lineHeight: 1.65,
                        marginTop:  '0.5rem',
                        maxWidth:   '44ch',
                      }}>
                        {track.description}
                      </p>
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem', color: '#B8B0A6' }}>→</span>
                </Link>

                {playable && (
                  <button
                    type="button"
                    aria-label={isOpen ? `Hide player for ${track.title}` : `Play ${track.title}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpenSlug(isOpen ? null : track.slug)}
                    style={{
                      flexShrink:   0,
                      display:      'flex',
                      alignItems:   'center',
                      justifyContent: 'center',
                      width:        '2.2rem',
                      height:       '2.2rem',
                      borderRadius: '50%',
                      border:       isOpen ? '1px solid #C8922A' : '1px solid rgba(200,146,42,0.4)',
                      background:   isOpen ? '#C8922A' : 'transparent',
                      color:        isOpen ? '#0D0B09' : '#C8922A',
                      cursor:       'pointer',
                      transition:   'background 200ms ease, border-color 200ms ease',
                    }}
                  >
                    {isOpen ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
                        <path d="M1 1L9 5.5L1 10V1Z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                )}
              </div>

              {isOpen && (
                <div style={{ paddingBottom: '1.25rem' }}>
                  {track.audioUrl ? (
                    <AudioPlayer
                      src={track.audioUrl}
                      title={track.title}
                      meta={track.meta}
                      artworkUrl={track.coverImage}
                    />
                  ) : trackId ? (
                    <iframe
                      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="80"
                      style={{ borderRadius: '8px', border: 'none' }}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`${track.title} — Spotify player`}
                    />
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
