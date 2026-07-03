'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { FWImage } from '@/lib/fourthwall';

interface Props {
  images: FWImage[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <div style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.03)' }} />;
  }

  const main = images[active];

  return (
    <div>
      {/* Main image */}
      <div style={{
        aspectRatio: '1 / 1',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        marginBottom: images.length > 1 ? '0.875rem' : 0,
      }}>
        <Image
          key={main.id}
          src={main.url}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover', transition: 'opacity 200ms ease' }}
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === active}
              style={{
                width: '72px',
                aspectRatio: '1/1',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.03)',
                border: i === active
                  ? '1px solid rgba(200,146,42,0.8)'
                  : '1px solid transparent',
                cursor: 'pointer',
                padding: 0,
                transition: 'border-color 150ms',
              }}
            >
              <Image
                src={img.url}
                alt={`${alt} — image ${i + 1}`}
                fill
                sizes="72px"
                style={{
                  objectFit: 'cover',
                  opacity: i === active ? 1 : 0.55,
                  transition: 'opacity 150ms',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
