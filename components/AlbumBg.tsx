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
            filter:             'brightness(0.18) saturate(0.55)',
            backgroundPosition: 'center',
          }}
        />
      ))}
    </div>
  );
}
