"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const videos = [
  "/videos/bg-01.mp4",
  "/videos/bg-02.mp4",
  "/videos/bg-03.mp4",
  "/videos/bg-04.mp4",
];

const CYCLE_MS = 30_000;

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
  const pathname      = usePathname();
  const isHome        = LOCALE_HOME_RE.test(pathname);

  const [current, setCurrent]   = useState(0);
  const [reducedMotion, setRM]  = useState(false);
  const [showVideo, setShowVideo] = useState(false); // off until client confirms conditions
  const [muted, setMuted]       = useState(true);
  const [volume, setVolume]     = useState(0.6);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Reduced-motion preference + mobile/slow-connection check
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRM(mq.matches);
    const h = (e: MediaQueryListEvent) => setRM(e.matches);
    mq.addEventListener("change", h);

    // Skip video on mobile viewports or low-bandwidth connections
    const conn = (navigator as any).connection;
    const isMobile = window.innerWidth < 768;
    const isSlow = conn?.saveData || ['slow-2g', '2g'].includes(conn?.effectiveType ?? '');
    if (!isMobile && !isSlow) setShowVideo(true);

    return () => mq.removeEventListener("change", h);
  }, []);

  // Video cycling
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % videos.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Mount: fix muted hydration bug, seek and play current video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted  = true;
      v.volume = volume;
      if (i === current) {
        seekToMiddle(v);
        v.play().catch(() => {});
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-seek and play on cycle, mute outgoing video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        v.muted = muted;
        v.volume = volume;
        seekToMiddle(v);
        v.play().catch(() => {});
      } else {
        v.muted = true;
      }
    });
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sound: keep active video in sync with muted/volume controls
  useEffect(() => {
    const v = videoRefs.current[current];
    if (!v) return;
    v.muted  = muted;
    v.volume = volume;
  }, [muted, volume, current]);

  // ── Render ────────────────────────────────────────────────────────────────

  if (reducedMotion || !showVideo) {
    // Static dark background for: reduced-motion preference, mobile, or slow connection
    if (!isHome) return null;
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0d0d0d", pointerEvents: "none" }} />
    );
  }

  const nextIdx = (current + 1) % videos.length;

  return (
    <>
      {/* Videos only on home page */}
      {isHome && (
        <>
          <div className="bg-slideshow">
            {videos.map((src, i) => (
              <div key={src} className={`bg-slide video-slide${i === current ? " active" : ""}`}>
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  muted loop playsInline aria-hidden="true"
                  preload={i === current || i === nextIdx ? "auto" : "none"}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.62) contrast(0.88) saturate(0.82)" }}
                >
                  <source src={src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>

          {/* Dark vignette */}
          <div
            aria-hidden="true"
            style={{
              position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          {/* Sound controls */}
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
      )}
    </>
  );
}
