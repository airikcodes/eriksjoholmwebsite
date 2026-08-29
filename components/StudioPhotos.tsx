'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export default function StudioPhotos({ photos }: { photos: string[] }) {
  const [open, setOpen] = useState(true);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Drag state kept in refs so it never triggers re-renders mid-drag.
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumIdRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  const getStep = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>('[data-photo-card]');
    if (!card) return el.clientWidth * 0.8;
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const updateEdgesAndProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ atStart: el.scrollLeft <= 4, atEnd: el.scrollLeft >= max - 4 });
    setProgress(max > 0 ? Math.min(100, Math.max(0, (el.scrollLeft / max) * 100)) : 0);
  }, []);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      updateEdgesAndProgress();
      tickingRef.current = false;
    });
  }, [updateEdgesAndProgress]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * getStep(), behavior: 'smooth' });
  };

  const cancelMomentum = () => {
    if (momentumIdRef.current) {
      cancelAnimationFrame(momentumIdRef.current);
      momentumIdRef.current = null;
    }
  };

  const snapToNearest = useCallback(() => {
    const el = trackRef.current;
    const step = getStep();
    if (!el || step <= 0) return;
    const index = Math.round(el.scrollLeft / step);
    el.scrollTo({ left: index * step, behavior: 'smooth' });
  }, [getStep]);

  const startMomentum = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    let velocity = velocityRef.current * 14;
    const friction = 0.92;
    const step = () => {
      velocity *= friction;
      if (Math.abs(velocity) < 0.5) {
        snapToNearest();
        return;
      }
      el.scrollLeft += velocity;
      updateEdgesAndProgress();
      momentumIdRef.current = requestAnimationFrame(step);
    };
    if (Math.abs(velocity) > 1) {
      momentumIdRef.current = requestAnimationFrame(step);
    } else {
      snapToNearest();
    }
  }, [snapToNearest, updateEdgesAndProgress]);

  // Click-and-drag for mouse/trackpad pointers; touch keeps native swipe scrolling.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    cancelMomentum();
    draggingRef.current = true;
    el.classList.add('is-dragging');
    startXRef.current = e.clientX;
    startScrollRef.current = el.scrollLeft;
    lastXRef.current = e.clientX;
    lastTRef.current = performance.now();
    velocityRef.current = 0;
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - startXRef.current;
    el.scrollLeft = startScrollRef.current - dx;
    const now = performance.now();
    const dt = now - lastTRef.current;
    if (dt > 0) velocityRef.current = (lastXRef.current - e.clientX) / dt;
    lastXRef.current = e.clientX;
    lastTRef.current = now;
    updateEdgesAndProgress();
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const el = trackRef.current;
    if (el) {
      el.classList.remove('is-dragging');
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture may already be released; safe to ignore
      }
    }
    startMomentum();
  };

  useEffect(() => {
    updateEdgesAndProgress();
    window.addEventListener('resize', updateEdgesAndProgress);
    return () => {
      window.removeEventListener('resize', updateEdgesAndProgress);
      cancelMomentum();
    };
  }, [photos, updateEdgesAndProgress]);

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
            <div
              className={`studio-photo-track${edges.atStart ? '' : ' fade-left'}${edges.atEnd ? '' : ' fade-right'}`}
              ref={trackRef}
              onScroll={handleScroll}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {photos.map((src, i) => (
                <div className="studio-photo-card" data-photo-card key={src}>
                  <img
                    src={src}
                    alt=""
                    loading={i < 3 ? 'eager' : 'lazy'}
                    draggable={false}
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>

            {/* Desktop-only nav arrows; drag/swipe always works too */}
            <button
              aria-label="Previous photos"
              onClick={() => scrollByAmount(-1)}
              disabled={edges.atStart}
              className="studio-photo-nav studio-photo-nav-prev"
            >
              <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
                <path d="M7.5 1L1.5 7L7.5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              aria-label="Next photos"
              onClick={() => scrollByAmount(1)}
              disabled={edges.atEnd}
              className="studio-photo-nav studio-photo-nav-next"
            >
              <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
                <path d="M1.5 1L7.5 7L1.5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="studio-photo-progress">
            <div className="studio-photo-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

    </div>
  );
}
