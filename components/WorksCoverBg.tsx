'use client';

import { useEffect, useRef } from 'react';

const IMG_STYLE: React.CSSProperties = {
  position:   'absolute',
  inset:      0,
  width:      '100%',
  height:     '100%',
  objectFit:  'cover',
  transform:  'scale(1.06)',  // prevents blur-edge artifacts
  filter:     'brightness(0.35) saturate(0.35) blur(38px)',
  opacity:    0,
  transition: 'opacity 1.3s ease-in-out',
  zIndex:     1,
  display:    'block',
};

export default function WorksCoverBg({ initialCover }: { initialCover?: string }) {
  const slotA      = useRef<HTMLImageElement>(null);
  const slotB      = useRef<HTMLImageElement>(null);
  const activeSlot = useRef<'A' | 'B'>('A');
  const currentCover = useRef<string>('');

  useEffect(() => {
    const aImg = slotA.current;
    const bImg = slotB.current;
    if (!aImg || !bImg) return;

    // Initialise with the first cover so it's visible before scroll
    if (initialCover) {
      aImg.src = initialCover;
      aImg.style.opacity = '0.10';
      currentCover.current = initialCover;
      activeSlot.current   = 'A';
    }

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-work-cover]'));
    if (!els.length) return;

    const ratioMap = new Map<HTMLElement, number>(els.map(el => [el, 0]));

    function transitionTo(cover: string) {
      const active   = activeSlot.current === 'A' ? aImg! : bImg!;
      const inactive = activeSlot.current === 'A' ? bImg! : aImg!;

      const swap = () => {
        active.style.opacity   = '0';
        inactive.style.opacity = '0.10';
        activeSlot.current = activeSlot.current === 'A' ? 'B' : 'A';
      };

      // Clear any prior onload
      inactive.onload = null;
      inactive.src    = cover;

      if (inactive.complete && inactive.naturalWidth > 0) {
        swap();
      } else {
        inactive.onload = swap;
      }
    }

    function fadeOut() {
      if (slotA.current) slotA.current.style.opacity = '0';
      if (slotB.current) slotB.current.style.opacity = '0';
    }

    function update() {
      let bestEl: HTMLElement | null = null;
      let bestRatio = 0;
      for (const [el, ratio] of ratioMap) {
        if (ratio > bestRatio) { bestRatio = ratio; bestEl = el; }
      }

      const newCover = bestEl ? (bestEl.dataset.workCover ?? '') : '';
      if (newCover === currentCover.current) return;
      currentCover.current = newCover;

      if (newCover) {
        transitionTo(newCover);
      } else {
        fadeOut();
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratioMap.set(e.target as HTMLElement, e.intersectionRatio);
        update();
      },
      { threshold: [0, 0.1, 0.25, 0.5, 1.0] }
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [initialCover]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* Dark base — keeps the page dark even without a cover loaded */}
      <div style={{ position: 'absolute', inset: 0, background: '#0D0B09', zIndex: 0 }} />
      <img ref={slotA} alt="" aria-hidden="true" style={IMG_STYLE} />
      <img ref={slotB} alt="" aria-hidden="true" style={IMG_STYLE} />
    </div>
  );
}
