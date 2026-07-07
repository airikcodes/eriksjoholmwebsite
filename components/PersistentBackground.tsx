"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const videos = [
  "/videos/bg-01.mp4",
  "/videos/bg-02.mp4",
  "/videos/bg-03.mp4",
  "/videos/bg-04.mp4",
];

const CYCLE_MS     = 30_000;
const OVERLAY      = "rgba(252,250,247,0.96)";
const BRUSH_R      = 58;
const BRUSH_R_TOUCH = 90; // fingers cover more area

const LOCALE_HOME_RE = /^\/([a-z]{2})?\/?$/;

function seekToMiddle(video: HTMLVideoElement) {
  const go = () => {
    if (video.duration && isFinite(video.duration)) {
      video.currentTime = video.duration / 2;
    }
  };
  if (video.readyState >= 1 && isFinite(video.duration)) go();
  else video.addEventListener("loadedmetadata", go, { once: true });
}

// ── Icons ────────────────────────────────────────────────────────────────────

function IconOverlayOn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="7" y1="9"  x2="17" y2="9"  />
      <line x1="7" y1="13" x2="14" y2="13" />
      <line x1="7" y1="17" x2="10" y2="17" />
    </svg>
  );
}

function IconOverlayOff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
    </svg>
  );
}

function IconPaint() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

function IconPaintOff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function IconSoundOff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconSoundOn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

// ── Glass button shared style ─────────────────────────────────────────────────

const glassBtn: React.CSSProperties = {
  width: "44px", height: "44px", borderRadius: "50%",
  background: "rgba(10,8,6,0.55)",
  border: "1px solid rgba(200,146,42,0.35)",
  color: "#C8922A",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer",
  backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
  flexShrink: 0,
  transition: "background 180ms ease, border-color 180ms ease, opacity 180ms ease",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function PersistentBackground() {
  const pathname        = usePathname();
  const isHome          = LOCALE_HOME_RE.test(pathname);

  const [current, setCurrent]         = useState(0);
  const [reducedMotion, setRM]        = useState(false);
  const [muted, setMuted]             = useState(true);
  const [volume, setVolume]           = useState(0.6);
  const [overlayOn, setOverlayOn]     = useState(true);
  const [paintEnabled, setPaint]      = useState(true);

  const videoRefs      = useRef<(HTMLVideoElement | null)[]>([]);
  const canvasRef      = useRef<HTMLCanvasElement | null>(null);
  // Refs so the mousemove closure always reads current values
  const overlayOnRef   = useRef(true);
  const paintRef       = useRef(true);
  const isHomeRef      = useRef(isHome);

  useEffect(() => { overlayOnRef.current = overlayOn; }, [overlayOn]);
  useEffect(() => { paintRef.current     = paintEnabled; }, [paintEnabled]);
  useEffect(() => { isHomeRef.current    = isHome; }, [isHome]);

  // Reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRM(mq.matches);
    const h = (e: MediaQueryListEvent) => setRM(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Video cycling
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % videos.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Mount: fix muted hydration bug, seek, play
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.muted  = true;
      v.volume = volume;
      seekToMiddle(v);
      v.play().catch(() => {});
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-seek on cycle
  useEffect(() => {
    const v = videoRefs.current[current];
    if (v) seekToMiddle(v);
  }, [current]);

  // Sound: only active video gets audio
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted  = muted || i !== current;
      v.volume = volume;
    });
  }, [muted, volume, current]);

  // Canvas: fill + persistent scratch
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let prevX: number | null = null;
    let prevY: number | null = null;
    let velX = 0, velY = 0;
    let prevMX = 0, prevMY = 0;

    const isTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
    const STEP = isTouch ? 8 : 4;

    // Fast coordinate check to avoid painting over the controls cluster
    const inControls = (x: number, y: number) =>
      x > window.innerWidth - 260 && y > window.innerHeight - 90;

    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = Math.round(window.innerWidth  * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = OVERLAY;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      prevX = null;
      prevY = null;
    };
    initCanvas();

    const stamp = (x: number, y: number, vx = velX, vy = velY) => {
      if (!ctx) return;
      const baseR   = isTouch ? BRUSH_R_TOUCH : BRUSH_R;
      const speed   = Math.hypot(vx, vy);
      const angle   = Math.atan2(vy, vx);
      const stretch = 1 + Math.log1p(speed) * 0.30;
      const rx      = baseR * stretch;
      const ry      = baseR * Math.max(0.40, 1 / Math.sqrt(stretch));

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(1, ry / rx);

      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      g.addColorStop(0,    "rgba(0,0,0,1)");
      g.addColorStop(0.50, "rgba(0,0,0,0.95)");
      g.addColorStop(0.78, "rgba(0,0,0,0.35)");
      g.addColorStop(1,    "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    };

    const strokeTo = (
      x: number, y: number,
      px: number | null, py: number | null,
      vx: number, vy: number,
    ): { x: number; y: number } => {
      if (px === null || py === null) {
        stamp(x, y, vx, vy);
      } else {
        const d = Math.hypot(x - px, y - py);
        const n = Math.max(1, Math.ceil(d / STEP));
        for (let i = 1; i <= n; i++) {
          const t = i / n;
          stamp(px + (x - px) * t, py + (y - py) * t, vx, vy);
        }
      }
      return { x, y };
    };

    // ── Mouse ────────────────────────────────────────────────────────────────

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - prevMX;
      const dy = e.clientY - prevMY;
      velX   = velX * 0.65 + dx * 0.35;
      velY   = velY * 0.65 + dy * 0.35;
      prevMX = e.clientX;
      prevMY = e.clientY;

      if (!isHomeRef.current || !overlayOnRef.current || !paintRef.current) {
        prevX = null; prevY = null;
        return;
      }
      const blocked = (e.target as Element | null)?.closest?.("[data-no-peephole]");
      if (blocked) { prevX = null; prevY = null; return; }
      ({ x: prevX, y: prevY } = strokeTo(e.clientX, e.clientY, prevX, prevY, velX, velY));
    };

    // ── Touch ────────────────────────────────────────────────────────────────
    //
    // Design: paint directly in onTouchMove (no RAF batching) so strokes
    // track the finger without lag. RAF batching would lose intermediate
    // positions when multiple events fire in one frame, making fast swipes
    // look choppy and adding a full frame of visible lag.
    //
    // Scroll vs paint: first INTENT_PX of movement decides gesture type.
    // Steeper than ~63° from horizontal (dy > dx*2) → scroll; else → paint.

    const INTENT_PX = 16;

    type FingerState = {
      prevX: number | null; prevY: number | null;
      startX: number; startY: number;
      prevMX: number; prevMY: number;
      vx: number; vy: number;
      mode: "undecided" | "scroll" | "paint";
    };
    const fingers = new Map<number, FingerState>();

    const onTouchStart = (e: TouchEvent) => {
      for (const t of Array.from(e.changedTouches)) {
        fingers.set(t.identifier, {
          prevX: null, prevY: null,
          startX: t.clientX, startY: t.clientY,
          prevMX: t.clientX, prevMY: t.clientY,
          vx: 0, vy: 0,
          mode: "undecided",
        });
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isHomeRef.current || !overlayOnRef.current || !paintRef.current) {
        fingers.forEach(s => { s.prevX = null; s.prevY = null; });
        return;
      }
      for (const t of Array.from(e.changedTouches)) {
        const s = fingers.get(t.identifier);
        if (!s) continue;

        // Resolve gesture intent from first significant movement
        if (s.mode === "undecided") {
          const adx = Math.abs(t.clientX - s.startX);
          const ady = Math.abs(t.clientY - s.startY);
          if (Math.hypot(adx, ady) > INTENT_PX) {
            s.mode = ady > adx * 2 ? "scroll" : "paint";
          }
        }
        if (s.mode === "scroll") continue;

        if (inControls(t.clientX, t.clientY)) { s.prevX = null; s.prevY = null; continue; }

        const dx = t.clientX - s.prevMX;
        const dy = t.clientY - s.prevMY;
        s.vx     = s.vx * 0.65 + dx * 0.35;
        s.vy     = s.vy * 0.65 + dy * 0.35;
        s.prevMX = t.clientX;
        s.prevMY = t.clientY;

        ({ x: s.prevX, y: s.prevY } = strokeTo(t.clientX, t.clientY, s.prevX, s.prevY, s.vx, s.vy));
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      for (const t of Array.from(e.changedTouches)) {
        const s = fingers.get(t.identifier);
        // Tap with no significant drag → stamp once to reveal a spot
        if (
          s?.mode === "undecided" &&
          isHomeRef.current && overlayOnRef.current && paintRef.current &&
          !inControls(t.clientX, t.clientY)
        ) {
          stamp(t.clientX, t.clientY, 0, 0);
        }
        fingers.delete(t.identifier);
      }
    };

    const onTouchCancel = (e: TouchEvent) => {
      for (const t of Array.from(e.changedTouches)) fingers.delete(t.identifier);
    };

    window.addEventListener("mousemove",   onMove,         { passive: true });
    window.addEventListener("touchstart",  onTouchStart,   { passive: true });
    window.addEventListener("touchmove",   onTouchMove,    { passive: true });
    window.addEventListener("touchend",    onTouchEnd);
    window.addEventListener("touchcancel", onTouchCancel);
    window.addEventListener("resize",      initCanvas);
    return () => {
      window.removeEventListener("mousemove",   onMove);
      window.removeEventListener("touchstart",  onTouchStart);
      window.removeEventListener("touchmove",   onTouchMove);
      window.removeEventListener("touchend",    onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("resize",      initCanvas);
    };
  }, [reducedMotion]);

  // ── Overlay toggle ────────────────────────────────────────────────────────

  const handleToggleOverlay = () => {
    const next = !overlayOn;
    setOverlayOn(next);
    if (next) {
      // Turning overlay ON: reset canvas to full cream, re-enable painting
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        // Restore exact DPR transform before filling — setTransform is absolute,
        // not cumulative, so this is safe even if state drifted.
        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = OVERLAY;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
      setPaint(true);
    }
  };

  const handleTogglePaint = () => setPaint((p) => !p);

  // ── Render ────────────────────────────────────────────────────────────────

  if (reducedMotion) {
    // Static fallback — no canvas, no interactivity, only on home
    if (!isHome) return null;
    return <div className="bg-overlay" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
  }

  return (
    <>
      {/* Videos: always in DOM so audio persists across navigation.
          visibility:hidden keeps them invisible on non-home pages
          without pausing playback. */}
      <div
        className="bg-slideshow"
        style={{
          // opacity:0 + pointerEvents:none keeps videos playing (audio) on other pages
          // while making them invisible. visibility:hidden can pause media on some mobile browsers.
          opacity: isHome ? 1 : 0,
          pointerEvents: isHome ? "auto" : "none",
        }}
      >
        {videos.map((src, i) => (
          <div key={src} className={`bg-slide video-slide${i === current ? " active" : ""}`}>
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              autoPlay muted loop playsInline aria-hidden="true"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* Canvas always in DOM so scratch marks survive navigation.
            CSS opacity:0 hides it without clearing the bitmap. */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 1,
            opacity: (isHome && overlayOn) ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>

      {/* Controls — fixed bottom-right, visible on all pages */}
      <div
        role="group"
        aria-label="Background controls"
        style={{
          position: "fixed",
          bottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))",
          right: "max(1.5rem, env(safe-area-inset-right, 0px))",
          zIndex: 50,
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}
      >
        {/* Paint toggle — only on home when overlay is on */}
        {isHome && overlayOn && (
          <button
            onClick={handleTogglePaint}
            aria-label={paintEnabled ? "Disable ice painting" : "Enable ice painting"}
            title={paintEnabled ? "Stop painting" : "Paint ice"}
            style={{ ...glassBtn, opacity: paintEnabled ? 1 : 0.45 }}
          >
            {paintEnabled ? <IconPaint /> : <IconPaintOff />}
          </button>
        )}

        {/* Overlay toggle — only on home */}
        {isHome && (
          <button
            onClick={handleToggleOverlay}
            aria-label={overlayOn ? "Remove overlay" : "Restore overlay"}
            title={overlayOn ? "Clear overlay" : "Restore overlay"}
            style={{ ...glassBtn, opacity: overlayOn ? 1 : 0.55 }}
          >
            {overlayOn ? <IconOverlayOn /> : <IconOverlayOff />}
          </button>
        )}

        {/* Volume slider — all pages */}
        {!muted && (
          <input type="range" min="0" max="1" step="0.05" value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            style={{ width: "72px", accentColor: "#C8922A", cursor: "pointer" }}
          />
        )}

        {/* Mute toggle — all pages */}
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute background video" : "Mute background video"}
          style={glassBtn}
        >
          {muted ? <IconSoundOff /> : <IconSoundOn />}
        </button>
      </div>
    </>
  );
}
