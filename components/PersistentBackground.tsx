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

const bgFilter = "brightness(0.62) contrast(0.88) saturate(0.82)";

// ── Component ─────────────────────────────────────────────────────────────────

export default function PersistentBackground() {
  const pathname      = usePathname();
  const isHome        = LOCALE_HOME_RE.test(pathname);

  const [current, setCurrent]     = useState(0);
  const [reducedMotion, setRM]    = useState(false);
  const [showVideo, setShowVideo] = useState(false); // conservative: off until client confirms
  const [muted, setMuted]         = useState(true);
  const [volume, setVolume]       = useState(0.6);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Reduced-motion preference + mobile/slow-connection check
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRM(mq.matches);
    const h = (e: MediaQueryListEvent) => setRM(e.matches);
    mq.addEventListener("change", h);

    const conn = (navigator as any).connection;
    const isMobile = window.innerWidth < 768;
    const isSlow = conn?.saveData || ['slow-2g', '2g'].includes(conn?.effectiveType ?? '');
    if (!isMobile && !isSlow) setShowVideo(true);

    return () => mq.removeEventListener("change", h);
  }, []);

  // Cycling — runs for both image and video modes
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setCurrent((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Mount: fix muted hydration bug and play current video from start
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted  = true;
      v.volume = volume;
      if (i === current % videos.length) {
        v.play().catch(() => {});
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Play next video from start on cycle, mute outgoing video
  useEffect(() => {
    const activeIdx = current % videos.length;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIdx) {
        v.muted = muted;
        v.volume = volume;
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.muted = true;
      }
    });
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sound: keep active video in sync with muted/volume controls
  useEffect(() => {
    const v = videoRefs.current[current % videos.length];
    if (!v) return;
    v.muted  = muted;
    v.volume = volume;
  }, [muted, volume, current]);

  // ── Render ────────────────────────────────────────────────────────────────

  if (!isHome) return null;

  // Reduced-motion: no animation at all — static dark background
  if (reducedMotion) {
    return <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0d0d0d", pointerEvents: "none" }} />;
  }

  // Mobile / slow connection: Ken Burns image slideshow (no video download)
  if (!showVideo) {
    const imgIdx = current % images.length;
    return (
      <>
        <div className="bg-slideshow">
          {images.map((src, i) => (
            <div
              key={src}
              className={`bg-slide${i === imgIdx ? " active" : ""}`}
              style={{ backgroundImage: `url(${src})`, filter: bgFilter }}
            />
          ))}
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
            background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </>
    );
  }

  // Desktop / fast connection: video slideshow
  const activeVideoIdx = current % videos.length;
  const nextVideoIdx   = (current + 1) % videos.length;

  return (
    <>
      <div className="bg-slideshow">
        {videos.map((src, i) => (
          <div key={src} className={`bg-slide video-slide${i === activeVideoIdx ? " active" : ""}`}>
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              muted loop playsInline aria-hidden="true"
              preload={i === activeVideoIdx || i === nextVideoIdx ? "auto" : "none"}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: bgFilter }}
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div
        role="group"
        aria-label="Background controls"
        style={{
          position: "fixed",
          bottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))",
          right:  "max(1.5rem, env(safe-area-inset-right, 0px))",
          zIndex: 50,
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}
      >
        {!muted && (
          <input type="range" min="0" max="1" step="0.05" value={volume}
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
    </>
  );
}
