"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * The "midnight sun": one flat circle that wanders the homepage as you scroll.
 *
 * It is a small spring simulation rather than a fixed path: scroll position sets a loose
 * home for the sun, but every scroll adds random impulses, every change of direction
 * (down → up, up → down) re-rolls its route, and it drifts on its own when you stop — so
 * no two passes look the same. It is kept mostly on screen and never intercepts the
 * pointer. multiply-blended so text and covers stay legible beneath it. Light theme,
 * on every page, in the light theme only (visibility: globals.css). It lives in the root layout, so it
 * keeps floating across page changes; each navigation re-rolls its route.
 */
export default function SunOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const reroll = useRef<(() => void) | null>(null);
  const pathname = usePathname();

  // New page: new route and a random kick, so the sun never sits in the same corner on arrival.
  useEffect(() => { reroll.current?.(); }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rnd = (a = 0, b = 1) => a + Math.random() * (b - a);

    // Route parameters, re-rolled whenever scroll direction flips.
    let phase = rnd(0, Math.PI * 2);
    let phase2 = rnd(0, Math.PI * 2);
    let laps = rnd(0.8, 2.2);
    let ampX = rnd(0.32, 0.42);
    let ampY = rnd(0.2, 0.34);

    const vw0 = window.innerWidth, vh0 = window.innerHeight;
    const s = { x: vw0 * rnd(0.1, 0.9), y: vh0 * rnd(0.3, 0.9), vx: 0, vy: 0, sc: 1, vsc: 0 };
    let lastY = window.scrollY, lastDir = 0, raf = 0;

    reroll.current = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      phase = rnd(0, Math.PI * 2); phase2 = rnd(0, Math.PI * 2);
      laps = rnd(0.7, 2.4); ampX = rnd(0.28, 0.44); ampY = rnd(0.16, 0.36);
      lastY = window.scrollY; lastDir = 0;
      s.vx += rnd(-1, 1) * vw * 0.04; s.vy += rnd(-1, 1) * vh * 0.04;
    };

    const onScroll = () => {
      const y = window.scrollY, dy = y - lastY;
      lastY = y;
      if (!dy || reduce) return;
      const dir = Math.sign(dy);
      const vw = window.innerWidth, vh = window.innerHeight;
      if (lastDir !== 0 && dir !== lastDir) {           // direction flipped: new route + a kick
        phase = rnd(0, Math.PI * 2);
        phase2 = rnd(0, Math.PI * 2);
        laps = rnd(0.7, 2.4);
        ampX = rnd(0.28, 0.44);
        ampY = rnd(0.16, 0.36);
        s.vx += rnd(-1, 1) * vw * 0.03;
        s.vy += rnd(-1, 1) * vh * 0.03;
        s.vsc += rnd(-0.05, 0.05);
      }
      lastDir = dir;
      const push = Math.min(Math.abs(dy), 140);
      s.vx += rnd(-1, 1) * push * 0.22;                // sideways jitter proportional to speed
      s.vy += -dir * push * rnd(0.05, 0.3);            // lags / overshoots against the scroll
      s.vsc += rnd(-1, 1) * push * 0.0006;
    };

    const tick = (t: number) => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = reduce ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
      const size = Math.min(vw, vh) * 0.52;

      // Loose "home" for this scroll position, plus a slow independent drift.
      const a = 2 * Math.PI * p * laps + phase;
      const b = 2 * Math.PI * p * (laps * 0.7 + 0.3) + phase2;
      const drift = reduce ? 0 : 1;
      const tx = vw * (0.5 + ampX * Math.cos(a)) + drift * vw * 0.04 * Math.sin(t * 0.00051 + phase);
      const ty = vh * (0.55 + ampY * Math.sin(b)) + drift * vh * 0.04 * Math.cos(t * 0.00043 + phase2);
      const tsc = 1 - 0.32 * (0.5 - 0.5 * Math.cos(a)) + 0.04 * Math.sin(t * 0.0006);

      if (reduce) {
        s.x = vw * 0.85; s.y = vh * 0.8; s.sc = 1;
      } else {
        // damped spring toward home; impulses from onScroll give the unpredictable overshoot
        s.vx += (tx - s.x) * 0.012; s.vy += (ty - s.y) * 0.012; s.vsc += (tsc - s.sc) * 0.02;
        s.vx *= 0.93; s.vy *= 0.93; s.vsc *= 0.9;
        s.x += s.vx; s.y += s.vy; s.sc += s.vsc;
        // stay mostly on screen
        const minX = -size * 0.15, maxX = vw + size * 0.15, minY = vh * 0.05, maxY = vh * 1.0;
        if (s.x < minX) { s.x = minX; s.vx = Math.abs(s.vx) * 0.6; }
        if (s.x > maxX) { s.x = maxX; s.vx = -Math.abs(s.vx) * 0.6; }
        if (s.y < minY) { s.y = minY; s.vy = Math.abs(s.vy) * 0.6; }
        if (s.y > maxY) { s.y = maxY; s.vy = -Math.abs(s.vy) * 0.6; }
        s.sc = Math.min(1.15, Math.max(0.45, s.sc));
      }
      el.style.width = el.style.height = `${size}px`;
      el.style.transform = `translate3d(${s.x - size / 2}px, ${s.y - size / 2}px, 0) scale(${s.sc})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return <div ref={ref} className="sun-orb" aria-hidden="true" />;
}
