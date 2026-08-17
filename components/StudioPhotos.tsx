'use client';

import { useState } from 'react';

export default function StudioPhotos({ photos }: { photos: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem', paddingBottom: '3rem' }}>

      {/* Toggle row */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          width:          '100%',
          background:     'none',
          border:         'none',
          cursor:         'pointer',
          padding:        '0.25rem 0',
        }}
      >
        <span style={{
          fontFamily:    'var(--font-inter)',
          fontSize:      '0.45rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color:         open ? '#B8B0A6' : '#7A6F62',
          transition:    'color 200ms ease',
        }}>
          From the Studio
        </span>

        <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      '0.45rem',
            letterSpacing: '0.15em',
            color:         'rgba(122,111,98,0.45)',
          }}>
            {photos.length} photos
          </span>
          <svg
            width="10" height="6" viewBox="0 0 10 6" fill="none"
            style={{
              color:      '#7A6F62',
              transform:   open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.35s ease',
              flexShrink: 0,
            }}
          >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Collapsible grid — grid-template-rows trick for smooth height animation */}
      <div style={{
        display:          'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition:       'grid-template-rows 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap:                 '0.5rem',
            paddingTop:          '2rem',
          }}>
            {photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                loading={i < 4 ? 'eager' : 'lazy'}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
