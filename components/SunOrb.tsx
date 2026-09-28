"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

/**
 * The sun by day, the moon by night: one circle that wanders the site as you scroll. Always a full circle (no phases).
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

type Hole = [number, number, number, number, number];   // left, top, right, bottom, corner radius (px)

function cornerRadius(el: HTMLElement, w: number, h: number): number {
  // the element or a wrapper of (almost) the same size may carry the rounding (e.g. a round avatar)
  let n: HTMLElement | null = el;
  for (let i = 0; i < 3 && n; i++, n = n.parentElement) {
    const r = n.getBoundingClientRect();
    if (Math.abs(r.width - w) > 3 || Math.abs(r.height - h) > 3) break;
    const cs = getComputedStyle(n);
    const tl = cs.borderTopLeftRadius;
    if (tl && tl !== "0px") {
      const v = parseFloat(tl);
      return tl.includes("%") ? (v / 100) * Math.min(w, h) : v;
    }
  }
  return 0;
}

function photoHoles(): Hole[] {
  const vw = window.innerWidth, vh = window.innerHeight;
  const out: Hole[] = [];
  document.querySelectorAll<HTMLElement>(PHOTO_SELECTOR).forEach((el) => {
    if (el.closest(".sun-orb")) return;
    // .water-mirror is a decorative, flipped *clone* of <main> (components/WaterReflection.tsx) built
    // purely for the reflection band — its cloned <img> tags land at whatever position the scaleY(-1)
    // transform happens to put them, which can be anywhere on screen. Treating those as real photos cut
    // stray holes in the sun/moon that had nothing to do with anything actually visible there.
    if (el.closest(".water-mirror")) return;
    const r = el.getBoundingClientRect();
    if (r.width < 48 || r.height < 48 || r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return;
    const banner = el.classList.contains("page-photo-wrap");
    if (!banner && r.width * r.height > vw * vh * 0.5) return;       // full-screen backdrops don't count
    if (!banner) {
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.05 || cs.display === "none") return;
    }
    out.push([r.left, r.top, r.right, r.bottom, Math.min(cornerRadius(el, r.width, r.height), r.width / 2, r.height / 2)]);
  });
  // drop rects fully inside another (evenodd would otherwise cancel them out)
  return out.filter((a, i) => !out.some((b, j) => j !== i && b[0] <= a[0] + 1 && b[1] <= a[1] + 1 && b[2] >= a[2] - 1 && b[3] >= a[3] - 1 && (b[2] - b[0]) * (b[3] - b[1]) > (a[2] - a[0]) * (a[3] - a[1]) - 4));
}

const HIDE_KEY = "sun-orb-hidden";
const HIDE_EVENT = "sun-orb-hidden-change";
// Phones default to hidden (no explicit "0"/"1" choice yet) — a "1"/"0" the user set via the
// toggle always wins, on any screen size, so this default only applies before their first tap.
const MOBILE_QUERY = "(max-width: 640px)";
function isMobile(): boolean { try { return window.matchMedia(MOBILE_QUERY).matches; } catch { return false; } }
function subscribeHidden(cb: () => void) {
  window.addEventListener(HIDE_EVENT, cb); window.addEventListener("storage", cb);
  let mq: MediaQueryList | null = null;
  try { mq = window.matchMedia(MOBILE_QUERY); mq.addEventListener("change", cb); } catch {}
  return () => {
    window.removeEventListener(HIDE_EVENT, cb); window.removeEventListener("storage", cb);
    mq?.removeEventListener("change", cb);
  };
}
function readHidden(): boolean {
  try {
    const v = localStorage.getItem(HIDE_KEY);
    if (v === "1") return true;
    if (v === "0") return false;
    return isMobile();
  } catch { return false; }
}
const HIDE_LABEL: Record<string, [string, string]> = {
  en: ["Hide the sun and moon", "Show the sun and moon"],
  de: ["Sonne und Mond ausblenden", "Sonne und Mond einblenden"],
  es: ["Ocultar el sol y la luna", "Mostrar el sol y la luna"],
  sv: ["Dölj solen och månen", "Visa solen och månen"],
  fi: ["Piilota aurinko ja kuu", "Näytä aurinko ja kuu"],
  fr: ["Masquer le soleil et la lune", "Afficher le soleil et la lune"],
  it: ["Nascondi il sole e la luna", "Mostra il sole e la luna"],
  pt: ["Ocultar o sol e a lua", "Mostrar o sol e a lua"],
};

const SUN_VIDEOS = Array.from({ length: 12 }, (_, i) => `/videos/bg-${String(i + 1).padStart(2, "0")}.mp4`);

export default function SunOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reflectRef = useRef<HTMLDivElement>(null);
  const reflVideoRef = useRef<HTMLVideoElement>(null);
  const reroll = useRef<(() => void) | null>(null);
  const pathname = usePathname();
  const hidden = useSyncExternalStore(subscribeHidden, readHidden, () => false);
  const lang = useSyncExternalStore(subscribeHidden, () => document.documentElement.lang || "en", () => "en");
  // Layout effect (not a passive one): applies before the browser paints, so this never
  // shows the orb for a frame before hiding it again — the pre-paint bootstrap script
  // (lib/sun-visibility-script.ts) already set the class correctly; this just keeps it in
  // sync as the user toggles or the viewport crosses the mobile breakpoint.
  useLayoutEffect(() => { document.documentElement.classList.toggle("sun-off", hidden); }, [hidden]);
  const toggle = () => {
    try { localStorage.setItem(HIDE_KEY, hidden ? "0" : "1"); } catch {}
    window.dispatchEvent(new Event(HIDE_EVENT));
  };
  const [hideLbl, showLbl] = HIDE_LABEL[lang] ?? HIDE_LABEL.en;

  // New page: new route and a random kick, so the sun never sits in the same corner on arrival.
  useEffect(() => {
    reroll.current?.();
    // ...and it always arrives as the plain sun/moon, never still in video mode from the previous page.
    const el = ref.current;
    if (el && el.dataset.mode === "video") {
      el.dataset.mode = "";
      videoRef.current?.pause(); reflVideoRef.current?.pause();
      window.dispatchEvent(new CustomEvent("sun-video", { detail: { on: false } }));
    }
  }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rnd = (a = 0, b = 1) => a + Math.random() * (b - a);


    // Route parameters, re-rolled whenever scroll direction flips.
    let phase = rnd(0, Math.PI * 2);
    let phase2 = rnd(0, Math.PI * 2);
    let laps = rnd(0.14, 0.3);
    let ampX = rnd(0.22, 0.32);
    let ampY = rnd(0.12, 0.2);
    // The slow "grand orbit" below (wide enough to carry the disc off any edge) gets its own
    // phases so it doesn't retrace the scroll-driven wander above.
    let orbitPhase = rnd(0, Math.PI * 2);
    let orbitPhase2 = rnd(0, Math.PI * 2);

    const vw0 = window.innerWidth, vh0 = window.innerHeight;
    const s = { x: vw0 * rnd(0.1, 0.9), y: vh0 * rnd(0.3, 0.9), vx: 0, vy: 0, sc: 1, vsc: 0 };
    let raf = 0;

    reroll.current = () => {
      phase = rnd(0, Math.PI * 2); phase2 = rnd(0, Math.PI * 2);
      laps = rnd(0.14, 0.3); ampX = rnd(0.22, 0.32); ampY = rnd(0.12, 0.2);
      orbitPhase = rnd(0, Math.PI * 2); orbitPhase2 = rnd(0, Math.PI * 2);
    };

    // Scrolling only moves the sun's 'home' (below). No kicks, no jitter, no direction-flip jumps: it just glides.
    const tick = (t: number) => {
      if (document.documentElement.classList.contains("sun-off")) { raf = requestAnimationFrame(tick); return; }
      const vw = window.innerWidth, vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = reduce ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
      const size = Math.min(vw, vh) * 0.52;

      // Loose "home" for this scroll position, plus a slow independent drift.
      const a = 2 * Math.PI * p * laps + phase;
      const b = 2 * Math.PI * p * (laps * 0.7 + 0.3) + phase2;
      const drift = reduce ? 0 : 1;
      // A wide circuit on top of the scroll-driven wander — wide enough (relative to the viewport)
      // that it reliably carries the disc past every edge in turn, left/right and up/down alike, but
      // on a calmer clock than the first pass at this (which cycled every ~45s and, combined with the
      // size breathing below on a similar timescale, made the disc feel like it was lurching around the
      // page rather than drifting). About a minute and a half per lap keeps real exits/re-entries a
      // visitor will actually notice, without the two cycles beating against each other.
      const orbitA = t * 0.00007 + orbitPhase;   // ~90 s per lap
      const orbitX = drift * vw * 0.64 * Math.cos(orbitA);
      const orbitY = drift * vh * 0.6 * Math.sin(orbitA * 0.82 + orbitPhase2);
      const tx = vw * (0.5 + ampX * Math.cos(a)) + drift * vw * 0.03 * Math.sin(t * 0.00011 + phase) + orbitX;
      const ty = vh * (0.55 + ampY * Math.sin(b)) + drift * vh * 0.03 * Math.cos(t * 0.00009 + phase2) + orbitY;
      // Size breathes on its own, very slowly (about 80 s from smallest to largest and back), like a real moon
      // rising and setting — it is not tied to how fast you scroll, so it never jumps. Capped well short of
      // its old max (which could swell past 3x — big enough to blanket half the page and swallow whatever
      // was underneath, like a list row and its link) so the disc stays a presence, never a wall.
      const k = 0.5 - 0.5 * Math.cos((t / 80000) * 2 * Math.PI + phase2 + p * 1.2);
      const tsc = 0.3 + 1.3 * k;

      if (reduce) {
        s.x = vw * 0.85; s.y = vh * 0.8; s.sc = 1;
      } else {
        // Calm glide: ease toward the target — fast enough to keep pace with the grand orbit above
        // (so the disc actually clears every edge each lap) without the jumpy, overcorrecting motion
        // the very high cap from the first pass at this produced.
        const step = (d: number, k: number, max: number) => Math.max(-max, Math.min(max, d * k));
        s.x += step(tx - s.x, 0.004, 1.5);
        s.y += step(ty - s.y, 0.004, 1.5);
        s.sc += step(tsc - s.sc, 0.004, 0.0012);
        // Free to roam past the edges (the grand orbit above means it actually does) — once the
        // whole disc has cleared one side, it reappears at the equivalent point on the opposite
        // side, same as it left: out left, in right; out above, rise from below.
        const wrap = size * 0.6;
        if (s.x < -wrap) s.x += vw + wrap * 2;
        else if (s.x > vw + wrap) s.x -= vw + wrap * 2;
        if (s.y < -wrap) s.y += vh + wrap * 2;
        else if (s.y > vh + wrap) s.y -= vh + wrap * 2;
        s.sc = Math.min(1.7, Math.max(0.25, s.sc));
      }
      el.style.width = el.style.height = `${size}px`;
      const ox = s.x - size / 2, oy = s.y - size / 2, c = size / 2;
      el.style.transform = `translate3d(${ox}px, ${oy}px, 0) scale(${s.sc})`;
      // Reflection in the water band: a true mirror about the waterline, foreshortened (K) so that a disc up to
      // ~1/K x the band height above the water still shows. Same width as the real disc at the waterline, so the
      // outline runs on continuously from the disc into its reflection. The real disc is cut off at the waterline
      // (below), exactly where the reflection starts.
      const K = 0.4;
      const R = document.documentElement.dataset.tone === "night" ? 2 / 2.1 : 1;   // the moon SVG circle fills 2/2.1 of its box; the sun fills all of it
      const rf = reflectRef.current, band = document.querySelector<HTMLElement>(".water");
      let waterTop = vh;
      if (rf && band) {
        // Read the band's actual on-screen top rather than deriving it from window.innerHeight:
        // mobile browsers resize innerHeight as their address bar collapses/expands mid-scroll,
        // and that live value can be a frame stale next to the band's real (already-rendered)
        // position — the mismatch is what made the reflection visibly jump on phones.
        waterTop = band.getBoundingClientRect().top;
        const cyc = oy + size / 2;                      // viewport y of the disc's centre
        const o = rf.firstElementChild as HTMLElement;
        rf.style.display = "";
        o.style.width = o.style.height = `${size}px`;
        o.dataset.mode = el.dataset.mode === "video" ? "video" : "";
        const r = (size * s.sc * R) / 2;                // visible radius of the disc
        const dy = waterTop - cyc;                      // > 0: disc centre is above the waterline
        if (Math.abs(dy) < r) {
          // The disc crosses the waterline: the reflection hangs from the cut, exactly as wide as the disc is there
          // (never wider), and closes softly below like the lower half of a foreshortened circle.
          const chord = 2 * Math.sqrt(r * r - dy * dy);
          const k = chord / size;
          o.style.display = "";
          o.style.transform = `translate3d(${ox}px, ${-size / 2}px, 0) scale(${k}, ${k * K * 1.4})`;
        } else if (dy > 0) {
          // Disc entirely above the water: its whole foreshortened mirror image
          const bandCy = K * dy;
          o.style.display = "";
          o.style.transform = `translate3d(${ox}px, ${bandCy - size / 2}px, 0) scale(${s.sc * R}, ${s.sc * R * K})`;
        } else {
          o.style.display = "none";                     // disc entirely under the waterline
        }
      }
      // clip the sun away over photos (coordinates converted into the element's own space). Photo
      // rects only move, relative to the viewport, when the page scrolls or resizes — not every
      // frame — so the (fairly heavy, full-DOM) scan is skipped whenever neither has changed since
      // the last frame. On phones this is the difference between a smooth glide and a stutter.
      let d = `M0 0H${size}V${size}H0Z`;
      const holesKeyNow = `${vw}x${vh}x${Math.round(window.scrollY)}`;
      if (holesKeyNow !== holesKey) { cachedPhotoHoles = photoHoles(); holesKey = holesKeyNow; }
      holes = cachedPhotoHoles.concat([[0, waterTop, vw, vh, 0]]);   // the disc stops at the waterline; the reflection carries on
      document.documentElement.classList.toggle("sun-hover", !!mouse && !reduce && onSun(mouse.x, mouse.y));
      for (const [l, t, r, b, rad] of holes) {
        const x1 = c + (l - ox - c) / s.sc, y1 = c + (t - oy - c) / s.sc;
        const x2 = c + (r - ox - c) / s.sc, y2 = c + (b - oy - c) / s.sc;
        if (x2 < 0 || y2 < 0 || x1 > size || y1 > size) continue;
        const q = Math.max(0, rad / s.sc);
        // rounded rectangle (a full circle when the radius is half the side); evenodd cuts it out of the sun
        d += q < 0.5
          ? `M${x1.toFixed(1)} ${y1.toFixed(1)}H${x2.toFixed(1)}V${y2.toFixed(1)}H${x1.toFixed(1)}Z`
          : `M${(x1 + q).toFixed(1)} ${y1.toFixed(1)}H${(x2 - q).toFixed(1)}A${q.toFixed(1)} ${q.toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${(y1 + q).toFixed(1)}V${(y2 - q).toFixed(1)}A${q.toFixed(1)} ${q.toFixed(1)} 0 0 1 ${(x2 - q).toFixed(1)} ${y2.toFixed(1)}H${(x1 + q).toFixed(1)}A${q.toFixed(1)} ${q.toFixed(1)} 0 0 1 ${x1.toFixed(1)} ${(y2 - q).toFixed(1)}V${(y1 + q).toFixed(1)}A${q.toFixed(1)} ${q.toFixed(1)} 0 0 1 ${(x1 + q).toFixed(1)} ${y1.toFixed(1)}Z`;
      }
      // by day the sun overlays the page and is cut away over photos; at night the moon sits *behind* the page, so photos are naturally on top
      el.style.clipPath = document.documentElement.dataset.tone === "night" ? "none" : `path(evenodd, "${d}")`;
      raf = requestAnimationFrame(tick);
    };

    // ── Click the sun: it turns into the background videos (same size, same motion). Click again for yellow.
    let holes: Hole[] = [];
    let cachedPhotoHoles: Hole[] = [];
    let holesKey = "";
    let mouse: { x: number; y: number } | null = null;
    let vidIdx = Math.floor(Math.random() * SUN_VIDEOS.length);
    const INTERACTIVE = "a, button, input, textarea, select, summary, label, [role=button], [role=link]";

    const onSun = (x: number, y: number) => {
      const r = (Math.min(window.innerWidth, window.innerHeight) * 0.52 * s.sc) / 2;
      if ((x - s.x) ** 2 + (y - s.y) ** 2 > r * r) return false;
      if (holes.some(([l, t, rr, b]) => x >= l && x <= rr && y >= t && y <= b)) return false;   // clipped away over photos
      const hit = document.elementFromPoint(x, y);
      if (!hit) return true;
      if (hit.closest(INTERACTIVE)) return false;
      let n: Element | null = hit;                      // anything that looks clickable (cards, rows) is not the moon
      for (let i = 0; n && i < 6; i++, n = n.parentElement) if (getComputedStyle(n).cursor === "pointer") return false;
      return true;
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
      const rv = reflVideoRef.current;                  // the reflection plays the same clip, upside down
      if (rv) { rv.muted = true; rv.src = v.src; rv.play().catch(() => {}); }
    };
    const syncRefl = () => {
      const v = videoRef.current, rv = reflVideoRef.current;
      if (v && rv && Math.abs(rv.currentTime - v.currentTime) > 0.25) rv.currentTime = v.currentTime;
    };
    videoRef.current?.addEventListener("timeupdate", syncRefl);
    const onClick = (e: MouseEvent) => {
      if (reduce || !onSun(e.clientX, e.clientY)) return;
      const on = el.dataset.mode !== "video";
      el.dataset.mode = on ? "video" : "";
      window.dispatchEvent(new CustomEvent("sun-video", { detail: { on } }));
      const v = videoRef.current;
      if (on) playNext(); else { v?.pause(); reflVideoRef.current?.pause(); }
    };
    const onMove = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
    const onEnded = () => playNext();
    videoRef.current?.addEventListener("ended", onEnded);
    window.addEventListener("click", onClick);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMove); window.removeEventListener("bg-audio", onAudio); videoRef.current?.removeEventListener("ended", onEnded);
      document.documentElement.classList.remove("sun-hover"); cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
    <div ref={reflectRef} className="sun-reflect" aria-hidden="true" style={{ display: "none" }}>
      <div className="sun-reflect-orb"><video ref={reflVideoRef} muted playsInline preload="none" tabIndex={-1} /></div>
    </div>
    <div ref={ref} className="sun-orb" aria-hidden="true">
      <video ref={videoRef} muted playsInline preload="none" tabIndex={-1} />
      <svg className="moon-svg" viewBox="-1.05 -1.05 2.1 2.1" aria-hidden="true">
        <defs>
          <radialGradient id="moon-grad" cx="0.38" cy="0.34" r="0.95">
            <stop offset="0" stopColor="#FFF3D2" stopOpacity="0.34" /><stop offset="0.7" stopColor="#F6E4B8" stopOpacity="0.22" /><stop offset="1" stopColor="#EAD7A6" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <circle r="1" className="moon-lit" />
      </svg>
    </div>
    <button
      type="button"
      className="sun-toggle"
      onClick={toggle}
      aria-pressed={hidden}
      aria-label={hidden ? showLbl : hideLbl}
      title={hidden ? showLbl : hideLbl}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="6" fill={hidden ? "none" : "currentColor"} fillOpacity="0.25" />
        {hidden && <line x1="4" y1="20" x2="20" y2="4" />}
      </svg>
    </button>
    </>
  );
}
