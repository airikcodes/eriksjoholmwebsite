'use client';

import { useRef, useState } from 'react';

export default function StudioPhotos({ photos }: { photos: string[] }) {
  const [open, setOpen] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-photo-card]');
    const step = card ? card.getBoundingClientRect().width + 10 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

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
          marginBottom:   open ? '1.75rem' : '0',
          transition:     'margin-bottom 0.35s ease',
        }}
      >
        <span style={{
          fontFamily:    'var(--font-inter)',
          fontSize:      '0.7rem',
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
              color:      '#B8B0A6',
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

      {/* Collapsible carousel */}
      <div style={{
        display:          'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition:       'grid-template-rows 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative' }}>
            <div className="studio-photo-track" ref={trackRef}>
              {photos.map((src, i) => (
                <div className="studio-photo-card" data-photo-card key={src}>
                  <img
                    src={src}
                    alt=""
                    loading={i < 3 ? 'eager' : 'lazy'}
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>

            {/* Desktop-only nav arrows; horizontal scroll/swipe always works on touch */}
            <button
              aria-label="Previous photos"
              onClick={() => scrollByAmount(-1)}
              className="studio-photo-nav studio-photo-nav-prev"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              aria-label="Next photos"
              onClick={() => scrollByAmount(1)}
              className="studio-photo-nav studio-photo-nav-next"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
