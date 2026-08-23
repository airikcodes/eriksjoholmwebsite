"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const videos = [
  "/videos/bg-01.mp4",
  "/videos/bg-02.mp4",
  "/videos/bg-03.mp4",
  "/videos/bg-04.mp4",
  "/videos/bg-05.mp4",
  "/videos/bg-06.mp4",
  "/videos/bg-07.mp4",
  "/videos/bg-08.mp4",
  "/videos/bg-09.mp4",
  "/videos/bg-10.mp4",
  "/videos/bg-11.mp4",
  "/videos/bg-12.mp4",
];

const images = [
  "/images/bg/bg-01.jpg",
  "/images/bg/bg-02.jpg",
  "/images/bg/bg-03.jpg",
  "/images/bg/bg-04.jpg",
  "/images/bg/bg-05.jpg",
];

const CYCLE_MS = 30_000;
const LOCALE_HOME_RE = /^\/([a-z]{2})?\/?$/;
const bgFilter = "brightness(0.72) contrast(0.88) saturate(0.85)";

// ── Icons ────────────────────────────────────────────────────────────────────

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
//
// Two layers always in the DOM:
//  1. Image layer   — renders immediately, cycles as fallback/under-layer
//  2. Video layer   — opacity 0 → 1 once the first video fires `playing`
//
// This eliminates the hard DOM swap between "image mode" and "video mode"
// that previously caused a flash on desktop. The image and first video share
// the same scene so the opacity crossfade is imperceptible.
//
// Two-slot video approach: slot A plays, slot B preloads next. On each
// 30-second cycle they swap roles and the outgoing slot loads the one after.

export default function PersistentBackground() {
  const pathname = usePathname();
  const isHome   = LOCALE_HOME_RE.test(pathname);

  const [imgIdx, setImgIdx]      = useState(0);
  const [flip, setFlip]          = useState(false); // false = slot A active, true = slot B active
  const [reducedMotion, setRM]   = useState(false);
  const [videoReady, setReady]   = useState(false); // true once first video fires `playing`
  const [muted, setMuted]        = useState(true);
  const [volume, setVolume]      = useState(0.6);

  const slotA        = useRef<HTMLVideoElement>(null);
  const slotB        = useRef<HTMLVideoElement>(null);
  const idxRef       = useRef(0);
  const mutedRef     = useRef(true);
  const volumeRef    = useRef(0.6);
  const videoEnabled = useRef(false); // true only on desktop + fast connection

  useEffect(() => { mutedRef.current  = muted;  }, [muted]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);

  // Detect capabilities; kick off initial playback
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRM(mq.matches);
    const h = (e: MediaQueryListEvent) => setRM(e.matches);
    mq.addEventListener("change", h);

    const conn    = (navigator as any).connection;
    const isMobile = window.innerWidth < 768;
    const isSlow   = conn?.saveData || ['slow-2g', '2g'].includes(conn?.effectiveType ?? '');

    if (!isMobile && !isSlow) {
      videoEnabled.current = true;
      const a = slotA.current;
      const b = slotB.current;

      if (a) {
        a.src    = videos[0];
        a.muted  = true;
        a.volume = volumeRef.current;
        a.load();
        a.play().catch(() => {});

        // Fade in the video layer only once the video is actually playing.
        // Using `playing` (not `canplay`) ensures autoplay-blocked devices
        // stay on the image slideshow rather than fading in a paused frame.
        const onPlaying = () => {
          setReady(true);
          a.removeEventListener('playing', onPlaying);
        };
        a.addEventListener('playing', onPlaying);
      }

      if (b) {
        b.src    = videos[1];
        b.muted  = true;
        b.volume = volumeRef.current;
        b.load();
      }
    }

    return () => mq.removeEventListener("change", h);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cycling — swaps video slots and advances image index every 30 s
  useEffect(() => {
    if (reducedMotion) return;

    const id = setInterval(() => {
      const nextIdx = idxRef.current + 1;
      idxRef.current = nextIdx;

      setFlip((f) => {
        if (videoEnabled.current) {
          const incoming = f ? slotA.current : slotB.current;
          const outgoing = f ? slotB.current : slotA.current;

          if (incoming) {
            incoming.muted       = mutedRef.current;
            incoming.volume      = volumeRef.current;
            incoming.currentTime = 0;
            incoming.play().catch(() => {});
          }
          if (outgoing) {
            outgoing.muted = true;
            outgoing.src   = videos[(nextIdx + 1) % videos.length];
            outgoing.load();
          }
        }
        return !f;
      });

      setImgIdx((i) => i + 1);
    }, CYCLE_MS);

    return () => clearInterval(id);
  }, [reducedMotion]);

  // Keep active video slot in sync with sound controls
  useEffect(() => {
    if (!videoEnabled.current) return;
    const active = flip ? slotB.current : slotA.current;
    if (!active) return;
    active.muted  = muted;
    active.volume = volume;
  }, [muted, volume, flip]);

  // ── Render ────────────────────────────────────────────────────────────────

  if (!isHome) return null;

  if (reducedMotion) {
    return <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0d0d0d", pointerEvents: "none" }} />;
  }

  const videoStyle: React.CSSProperties = {
    position: "absolute", inset: 0,
    width: "100%", height: "100%",
    objectFit: "cover",
    filter: bgFilter,
  };

  const iIdx = imgIdx % images.length;

  return (
    <>
      <div className="bg-slideshow">

        {/* ── Layer 1: image slideshow ───────────────────────────────────────
            Always visible. Cycles until the video layer takes over.
            Ken Burns animation stops automatically once videoReady, since
            only the active slide gets the animation class.                */}
        {images.map((src, i) => (
          <div
            key={src}
            className={`bg-slide${!videoReady && i === iIdx ? " active" : ""}`}
            style={{ backgroundImage: `url(${src})`, filter: bgFilter }}
          />
        ))}

        {/* ── Layer 2: video slots ───────────────────────────────────────────
            Fades in over 1.5 s once the first video starts playing.
            The two slots crossfade between themselves using .bg-slide.active. */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            opacity:    videoReady ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
        >
          <div className={`bg-slide video-slide${!flip ? " active" : ""}`}>
            <video ref={slotA} muted loop playsInline aria-hidden="true" preload="auto" style={videoStyle} />
          </div>
          <div className={`bg-slide video-slide${flip ? " active" : ""}`}>
            <video ref={slotB} muted loop playsInline aria-hidden="true" preload="auto" style={videoStyle} />
          </div>
        </div>

      </div>

      {/* Vignette */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.30) 100%)",
      }} />

      {/* Sound controls — only shown once video is playing */}
      {videoReady && (
        <div role="group" aria-label="Background controls" style={{
          position: "fixed",
          bottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))",
          right:  "max(1.5rem, env(safe-area-inset-right, 0px))",
          zIndex: 50,
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          {!muted && (
            <input
              type="range" min="0" max="1" step="0.05" value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              style={{ width: "72px", accentColor: "#C8922A", cursor: "pointer" }}
            />
          )}
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute background video" : "Mute background video"}
            style={glassBtn}
          >
            {muted ? <IconSoundOff /> : <IconSoundOn />}
          </button>
        </div>
      )}
    </>
  );
}
