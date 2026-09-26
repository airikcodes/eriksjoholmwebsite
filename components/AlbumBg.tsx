'use client';

import { useState, useEffect } from 'react';

const CYCLE_MS = 9_000;

export default function AlbumBg({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % photos.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  if (!photos.length) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {photos.map((src, i) => (
        <div
          key={src}
          className={`bg-slide${i === idx ? ' active' : ''}`}
          style={{
            backgroundImage:    `url(${src})`,
            filter:             'var(--photo-filter)',
            backgroundPosition: 'center',
          }}
        />
      ))}
      {/* Reading scrim — the photo layer above is already dimmed via a
          brightness filter (not opacity), so mid-tones/highlights can still
          sit close to the reading copy that overlays it. This gradient adds
          a touch more consistent darkening left/top, where the title and
          story paragraph live, without flattening the photo everywhere. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--album-scrim)',
        }}
      />
    </div>
  );
}
