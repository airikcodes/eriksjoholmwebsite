"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * The sun by day, the moon by night: one flat circle that wanders the site as you scroll.
 *
 * It is a small spring simulation rather than a fixed path: scroll position sets a loose
 * home for the sun, but every scroll adds random impulses, every change of direction
 * (down → up, up → down) re-rolls its route, and it drifts on its own when you stop — so
 * no two passes look the same. It is kept mostly on screen and never intercepts the
 * pointer. multiply-blended so text and covers stay legible beneath it. Light theme,
 * on every page, in the light theme only (visibility: globals.css). It lives in the root layout, so it
 * keeps floating across page changes; each navigation re-rolls its route.
 */

// Photos, video and banners are never painted over: the sun is clipped away wherever one is on screen,
// so it only ever moves across the white (paper) sections.
const PHOTO_SELECTOR = 'img, video, canvas, iframe, .page-photo-wrap, [style*="background-image"]';

function photoHoles(): Array<[number, number, number, number]> {
  const vw = window.innerWidth, vh = window.innerHeight;
  const out: Array<[number, number, number, number]> = [];
  document.querySelectorAll<HTMLElement>(PHOTO_SELECTOR).forEach((el) => {
    if (el.closest(".sun-orb")) return;
    const r = el.getBoundingClientRect();
    if (r.width < 48 || r.height < 48 || r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return;
    const banner = el.classList.contains("page-photo-wrap");
    if (!banner && r.width * r.height > vw * vh * 0.5) return;       // full-screen backdrops don't count
    if (!banner) {
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.05 || cs.display === "none") return;
    }
    out.push([r.left, r.top, r.right, r.bottom]);
  });
  // drop rects fully inside another (evenodd would otherwise cancel them out)
  return out.filter((a, i) => !out.some((b, j) => j !== i && b[0] <= a[0] + 1 && b[1] <= a[1] + 1 && b[2] >= a[2] - 1 && b[3] >= a[3] - 1 && (b[2] - b[0]) * (b[3] - b[1]) > (a[2] - a[0]) * (a[3] - a[1]) - 4));
}

const SUN_VIDEOS = Array.from({ length: 12 }, (_, i) => `/videos/bg-${String(i + 1).padStart(2, "0")}.mp4`);

// Moon phase → SVG path of the lit part. p: 0 new … 0.5 full … 1 new (synodic month from a known new moon).
function moonPhase(now = Date.now()): number {
  return ((((now - Date.UTC(2000, 0, 6, 18, 14)) / 864e5) / 29.53059) % 1 + 1) % 1;
}
function litPath(p: number): string {
  const k = Math.abs(Math.cos(2 * Math.PI * p)).toFixed(3);      // terminator half-width: 1 at new/full, 0 at quarters
  const crescent = p < 0.25 || p > 0.75;                          // less than half lit
  return p < 0.5
    ? `M0 -1 A1 1 0 0 1 0 1 A${k} 1 0 0 ${crescent ? 0 : 1} 0 -1 Z`   // waxing: lit on the right
    : `M0 -1 A1 1 0 0 0 0 1 A${k} 1 0 0 ${crescent ? 1 : 0} 0 -1 Z`;  // waning: lit on the left
}

export default function SunOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reroll = useRef<(() => void) | null>(null);
  const pathname = usePathname();
  const [lit, setLit] = useState("");
  useEffect(() => { setLit(litPath(moonPhase())); }, []);

  // New page: new route and a random kick, so the sun never sits in the same corner on arrival.
  useEffect(() => { reroll.current?.(); }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rnd = (a = 0, b = 1) => a + Math.random() * (b - a);
    const isLight = () => document.documentElement.dataset.tone !== "night";   // the sun (day) turns into video; the moon (night) is only a glow


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
      s.vx += rnd(-1, 1) * vw * 0.008; s.vy += rnd(-1, 1) * vh * 0.008;
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
        s.vx += rnd(-1, 1) * vw * 0.006;
        s.vy += rnd(-1, 1) * vh * 0.006;
        s.vsc += rnd(-0.008, 0.008);
      }
      lastDir = dir;
      const push = Math.min(Math.abs(dy), 140);
      s.vx += rnd(-1, 1) * push * 0.04;                // sideways jitter proportional to speed
      s.vy += -dir * push * rnd(0.01, 0.06);           // lags / overshoots against the scroll
      s.vsc += rnd(-1, 1) * push * 0.00008;
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
      const tx = vw * (0.5 + ampX * Math.cos(a)) + drift * vw * 0.04 * Math.sin(t * 0.0003 + phase);
      const ty = vh * (0.55 + ampY * Math.sin(b)) + drift * vh * 0.04 * Math.cos(t * 0.00025 + phase2);
      const tsc = 1 - 0.32 * (0.5 - 0.5 * Math.cos(a)) + 0.04 * Math.sin(t * 0.0003);

      if (reduce) {
        s.x = vw * 0.85; s.y = vh * 0.8; s.sc = 1;
      } else {
        // damped spring toward home; impulses from onScroll give the unpredictable overshoot
        s.vx += (tx - s.x) * 0.0025; s.vy += (ty - s.y) * 0.0025; s.vsc += (tsc - s.sc) * 0.004;
        s.vx *= 0.9; s.vy *= 0.9; s.vsc *= 0.88;
        s.x += s.vx; s.y += s.vy; s.sc += s.vsc;
        // stay mostly on screen
        const minX = -size * 0.15, maxX = vw + size * 0.15, minY = vh * 0.05, maxY = vh * 1.0;
        if (s.x < minX) { s.x = minX; s.vx = Math.abs(s.vx) * 0.2; }
        if (s.x > maxX) { s.x = maxX; s.vx = -Math.abs(s.vx) * 0.2; }
        if (s.y < minY) { s.y = minY; s.vy = Math.abs(s.vy) * 0.2; }
        if (s.y > maxY) { s.y = maxY; s.vy = -Math.abs(s.vy) * 0.2; }
        s.sc = Math.min(1.15, Math.max(0.45, s.sc));
      }
      el.style.width = el.style.height = `${size}px`;
      const ox = s.x - size / 2, oy = s.y - size / 2, c = size / 2;
      el.style.transform = `translate3d(${ox}px, ${oy}px, 0) scale(${s.sc})`;
      // clip the sun away over photos (coordinates converted into the element's own space)
      let d = `M0 0H${size}V${size}H0Z`;
      holes = photoHoles();
      document.documentElement.classList.toggle("sun-hover", !!mouse && !reduce && onSun(mouse.x, mouse.y));
      for (const [l, t, r, b] of holes) {
        const x1 = c + (l - ox - c) / s.sc, y1 = c + (t - oy - c) / s.sc;
        const x2 = c + (r - ox - c) / s.sc, y2 = c + (b - oy - c) / s.sc;
        if (x2 < 0 || y2 < 0 || x1 > size || y1 > size) continue;
        const a = Math.max(0, x1), bb = Math.max(0, y1), e = Math.min(size, x2), f = Math.min(size, y2);
        d += `M${a.toFixed(1)} ${bb.toFixed(1)}H${e.toFixed(1)}V${f.toFixed(1)}H${a.toFixed(1)}Z`;
      }
      el.style.clipPath = `path(evenodd, "${d}")`;
      raf = requestAnimationFrame(tick);
    };

    // ── Click the sun: it turns into the background videos (same size, same motion). Click again for yellow.
    let holes: Array<[number, number, number, number]> = [];
    let mouse: { x: number; y: number } | null = null;
    let vidIdx = Math.floor(Math.random() * SUN_VIDEOS.length);
    const INTERACTIVE = "a, button, input, textarea, select, summary, label, [role=button], [role=link]";

    const onSun = (x: number, y: number) => {
      if (!isLight()) return false;                       // only the sun turns into video; the moon is just a glow
      const r = (Math.min(window.innerWidth, window.innerHeight) * 0.52 * s.sc) / 2;
      if ((x - s.x) ** 2 + (y - s.y) ** 2 > r * r) return false;
      if (holes.some(([l, t, rr, b]) => x >= l && x <= rr && y >= t && y <= b)) return false;   // clipped away over photos
      const hit = document.elementFromPoint(x, y);
      return !(hit && hit.closest(INTERACTIVE));
    };
    const applyAudio = () => {
      const v = videoRef.current; if (!v) return;
      const a = (window as unknown as { __bgAudio?: { muted: boolean; volume: number } }).__bgAudio;
      v.muted = a ? a.muted : true; v.volume = a ? a.volume : 0.6;
    };
    const onAudio = (e: Event) => {
      const d = (e as CustomEvent).detail as { muted: boolean; volume: number };
      const v = videoRef.current; if (v) { v.muted = d.muted; v.volume = d.volume; }
    };
    window.addEventListener("bg-audio", onAudio);
    const playNext = () => {
      const v = videoRef.current; if (!v) return;
      applyAudio();
      v.src = SUN_VIDEOS[vidIdx % SUN_VIDEOS.length]; vidIdx++;
      v.play().catch(() => {});
    };
    const onClick = (e: MouseEvent) => {
      if (reduce || !onSun(e.clientX, e.clientY)) return;
      const on = el.dataset.mode !== "video";
      el.dataset.mode = on ? "video" : "";
      window.dispatchEvent(new CustomEvent("sun-video", { detail: { on } }));
      const v = videoRef.current;
      if (on) playNext(); else if (v) { v.pause(); }
    };
    const onMove = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
    const onEnded = () => playNext();
    videoRef.current?.addEventListener("ended", onEnded);
    window.addEventListener("click", onClick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll); window.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMove); window.removeEventListener("bg-audio", onAudio); videoRef.current?.removeEventListener("ended", onEnded);
      document.documentElement.classList.remove("sun-hover"); cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="sun-orb" aria-hidden="true">
      <video ref={videoRef} muted playsInline preload="none" tabIndex={-1} />
      <svg className="moon-svg" viewBox="-1 -1 2 2" aria-hidden="true">
        <defs>
          <radialGradient id="moon-grad" cx="0.38" cy="0.34" r="0.9">
            <stop offset="0" stopColor="#F6F3E8" /><stop offset="0.6" stopColor="#E4E0CF" /><stop offset="1" stopColor="#C9C4B2" />
          </radialGradient>
        </defs>
        <circle r="1" className="moon-dark" />
        {lit && <path d={lit} fill="url(#moon-grad)" />}
        {lit && <g className="moon-maria"><ellipse cx="-0.25" cy="-0.2" rx="0.28" ry="0.2" /><ellipse cx="0.12" cy="0.28" rx="0.22" ry="0.16" /><ellipse cx="0.38" cy="-0.35" rx="0.14" ry="0.1" /></g>}
      </svg>
    </div>
  );
}
