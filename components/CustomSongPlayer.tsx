'use client';

import { useState, useRef, useEffect } from 'react';
import type { FeaturedCustomSong } from '@/data/customSongs';

interface Props {
  songs: FeaturedCustomSong[];
  playlistUrl: string;
}

export default function CustomSongPlayer({ songs, playlistUrl }: Props) {
  const [activeCode, setActiveCode]   = useState<string | null>(null);
  const [loadingCode, setLoadingCode] = useState<string | null>(null);
  const [progress, setProgress]       = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onEnded    = () => { setActiveCode(null); setProgress(0); };
    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      audio.pause();
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  async function handlePlay(code: string) {
    const audio = audioRef.current!;

    if (activeCode === code) {
      audio.pause();
      setActiveCode(null);
      return;
    }

    audio.pause();
    setActiveCode(null);
    setProgress(0);
    setLoadingCode(code);

    try {
      const res = await fetch(`/api/disco-play/${code}`);
      const { audioUrl } = (await res.json()) as { audioUrl?: string };
      if (!audioUrl) throw new Error('No URL');
      audio.src = audioUrl;
      await audio.play();
      setActiveCode(code);
    } catch {
      // silently fail — network issue or CORS
    } finally {
      setLoadingCode(null);
    }
  }

  return (
    <div>
      <ul style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: '2.5rem' }}>
        {songs.map((song) => {
          const isActive  = activeCode  === song.discoCode;
          const isLoading = loadingCode === song.discoCode;

          return (
            <li
              key={song.discoCode}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={() => handlePlay(song.discoCode)}
                style={{
                  display:    'grid',
                  gridTemplateColumns: '52px 1fr auto',
                  gap:        '1.25rem',
                  alignItems: 'center',
                  width:      '100%',
                  padding:    '1.25rem 0',
                  background: 'none',
                  border:     'none',
                  cursor:     'pointer',
                  textAlign:  'left',
                }}
              >
                {/* Artwork */}
                <div style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
                  <img
                    src={song.artworkUrl}
                    alt=""
                    width={52}
                    height={52}
                    style={{ width: 52, height: 52, objectFit: 'cover', display: 'block', opacity: isActive ? 0.6 : 0.85 }}
                  />
                  {/* Play/pause overlay on artwork */}
                  <div style={{
                    position:   'absolute',
                    inset:      0,
                    display:    'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity:    isActive || isLoading ? 1 : 0,
                    transition: 'opacity 150ms',
                  }}>
                    <span style={{
                      color:    '#C8922A',
                      fontSize: isLoading ? '0.5rem' : '1rem',
                      lineHeight: 1,
                    }}>
                      {isLoading ? '···' : isActive ? '■' : '▶'}
                    </span>
                  </div>
                </div>

                {/* Title + duration */}
                <div>
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{
                      fontSize:  'clamp(1rem, 2.4vw, 1.3rem)',
                      color:     isActive ? '#C8922A' : '#E8E0D4',
                      lineHeight: 1.2,
                      transition: 'color 150ms',
                    }}
                  >
                    {song.title}
                  </p>
                  {isActive && (
                    <div style={{
                      marginTop:      '0.4rem',
                      height:         '2px',
                      width:          '100%',
                      background:     'rgba(200,146,42,0.15)',
                      borderRadius:   '1px',
                      overflow:       'hidden',
                    }}>
                      <div style={{
                        height:     '100%',
                        width:      `${progress * 100}%`,
                        background: '#C8922A',
                        transition: 'width 0.5s linear',
                      }} />
                    </div>
                  )}
                </div>

                {/* Play icon + duration */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                  <span style={{
                    fontFamily:    'var(--font-inter)',
                    fontSize:      '1rem',
                    color:         isActive ? '#C8922A' : 'rgba(200,146,42,0.4)',
                    transition:    'color 150ms',
                    lineHeight:    1,
                  }}>
                    {isLoading ? '···' : isActive ? '■' : '▶'}
                  </span>
                  <span style={{
                    fontFamily:    'var(--font-inter)',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.08em',
                    color:         '#7A6F62',
                  }}>
                    {song.duration}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Playlist link */}
      <a
        href={playlistUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display:       'inline-block',
          fontFamily:    'var(--font-inter)',
          fontSize:      '0.48rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         '#7A6F62',
          borderBottom:  '1px solid rgba(122,111,98,0.3)',
          paddingBottom: '2px',
          textDecoration: 'none',
          marginBottom:  '2.5rem',
        }}
        className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
      >
        Hear more examples →
      </a>
    </div>
  );
}
