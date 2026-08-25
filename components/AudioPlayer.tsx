'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  /** Direct URL to the audio file (R2 public URL, or later a same-origin proxy route) */
  src: string;
  title: string;
  /** Short descriptor, e.g. "2024 · with Mistasy" */
  meta?: string;
  artworkUrl?: string;
  /** Numbered row index, e.g. 1 → "01" (omit to hide) */
  index?: number;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

export default function AudioPlayer({ src, title, meta, artworkUrl, index }: Props) {
  const audioRef              = useRef<HTMLAudioElement>(null);
  const [playing,  setPlaying]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [duration, setDuration] = useState(0);
  const [current,  setCurrent]  = useState(0);
  const [hover,    setHover]    = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate  = () => setCurrent(audio.currentTime);
    const onLoadedMeta  = () => setDuration(audio.duration || 0);
    const onEnded       = () => { setPlaying(false); setCurrent(0); };
    const onWaiting     = () => setLoading(true);
    const onPlaying     = () => setLoading(false);
    const onPause       = () => setPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMeta);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      setLoading(true);
      audio.play().then(() => setPlaying(true)).catch(() => setLoading(false));
    }
  };

  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const time  = Number(e.target.value);
    if (audio) audio.currentTime = time;
    setCurrent(time);
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div
      style={{
        display:             'grid',
        gridTemplateColumns: [
          index !== undefined ? '2rem' : null,
          '40px',
          artworkUrl ? '52px' : null,
          '1fr',
          'auto',
        ].filter(Boolean).join(' '),
        gap:          '1.25rem',
        alignItems:   'center',
        padding:      '1.5rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <audio ref={audioRef} src={src} preload="none" />

      {index !== undefined && (
        <span
          style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      '0.48rem',
            color:         'rgba(200,146,42,0.35)',
            letterSpacing: '0.08em',
          }}
        >
          {String(index).padStart(2, '0')}
        </span>
      )}

      <button
        onClick={togglePlay}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={playing ? 'Pause' : 'Play'}
        aria-pressed={playing}
        style={{
          width:           40,
          height:          40,
          flexShrink:      0,
          borderRadius:    '2px',
          border:          hover ? '1px solid rgba(200,146,42,0.85)' : '1px solid rgba(200,146,42,0.55)',
          background:      hover ? 'rgba(13,11,9,0.75)' : 'rgba(13,11,9,0.55)',
          color:           hover ? '#E0A83A' : '#C8922A',
          cursor:          'pointer',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          transition:      'background 180ms ease, border-color 180ms ease, color 180ms ease',
        }}
      >
        {loading ? (
          <span
            aria-hidden="true"
            style={{
              width:        12,
              height:       12,
              borderRadius: '50%',
              border:       '1.5px solid rgba(200,146,42,0.35)',
              borderTopColor: '#C8922A',
              animation:    'audioPlayerSpin 700ms linear infinite',
            }}
          />
        ) : playing ? (
          <svg aria-hidden="true" width="11" height="12" viewBox="0 0 11 12" fill="none">
            <line x1="1.5" y1="0.5" x2="1.5" y2="11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="9.5" y1="0.5" x2="9.5" y2="11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="11" height="12" viewBox="0 0 11 12" fill="none">
            <path d="M0.5 0.75L10.5 6L0.5 11.25V0.75Z" fill="currentColor" />
          </svg>
        )}
      </button>

      {artworkUrl && (
        <img
          src={artworkUrl}
          alt=""
          width={52}
          height={52}
          style={{ width: 52, height: 52, objectFit: 'cover', opacity: 0.85, flexShrink: 0 }}
        />
      )}

      <div style={{ minWidth: 0 }}>
        <p
          className="font-[family-name:var(--font-cormorant)] font-light"
          style={{
            fontSize:      'clamp(1.1rem, 2.8vw, 1.55rem)',
            color:         '#E8E0D4',
            lineHeight:    1.2,
            letterSpacing: '0.01em',
          }}
        >
          {title}
        </p>
        {meta && (
          <p
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.5rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginTop:     '0.2rem',
            }}
          >
            {meta}
          </p>
        )}

        <div
          style={{
            marginTop:    '0.65rem',
            position:     'relative',
            height:       3,
            background:   'rgba(255,255,255,0.08)',
            borderRadius: '2px',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position:     'absolute',
              left:         0,
              top:          0,
              bottom:       0,
              width:        `${pct}%`,
              background:   '#C8922A',
              borderRadius: '2px',
              pointerEvents: 'none',
            }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={onScrub}
            aria-label="Seek"
            style={{
              position: 'absolute',
              inset:    0,
              width:    '100%',
              margin:   0,
              opacity:  0,
              cursor:   'pointer',
            }}
          />
        </div>
      </div>

      <span
        style={{
          fontFamily:        'var(--font-inter)',
          fontSize:          '0.5rem',
          color:             '#7A6F62',
          flexShrink:        0,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatTime(current)} / {formatTime(duration)}
      </span>
    </div>
  );
}
