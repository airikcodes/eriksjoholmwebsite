"use client";

import { useEffect, useRef } from "react";

/**
 * The "midnight sun": one flat circle that drifts across the homepage as you scroll —
 * right → left → right along the page, rising and shrinking mid-way. Light theme, homepage only
 * (visibility is handled in globals.css via html[data-theme="light"][data-home]).
 * multiply-blended so text and covers stay legible beneath it.
 */
export default function SunOrb() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let cur = { x: 0, y: 0, s: 1 };
    let started = false;

    const target = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = reduce ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
      const d = Math.min(vw, vh);
      const size = d * 0.52;
      const wave = 0.5 - 0.5 * Math.cos(2 * Math.PI * p);          // 0 → 1 → 0
      const cx = vw * (0.9 - 0.8 * wave);                            // right → left → right
      const cy = vh * (0.86 - 0.5 * Math.sin(Math.PI * p));          // low → high → low
      const scale = 1 - 0.42 * wave;                                 // big → small → big
      return { x: cx - size / 2, y: cy - size / 2, s: scale, size };
    };

    const tick = () => {
      const t = target();
      el.style.width = el.style.height = `${t.size}px`;
      if (!started) { cur = { x: t.x, y: t.y, s: t.s }; started = true; }
      const k = reduce ? 1 : 0.09;                                   // gentle follow
      cur.x += (t.x - cur.x) * k;
      cur.y += (t.y - cur.y) * k;
      cur.s += (t.s - cur.s) * k;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) scale(${cur.s})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <div ref={ref} className="sun-orb" aria-hidden="true" />;
}
