"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const videos = [
  "/videos/bg-01.mp4",
  "/videos/bg-02.mp4",
  "/videos/bg-03.mp4",
  "/videos/bg-04.mp4",
];

const FALLBACK_IMAGE = "/images/bg/bg-01.jpg";
const CYCLE_MS = 30_000;

function seekToMiddle(video: HTMLVideoElement) {
  const go = () => {
    if (video.duration && isFinite(video.duration)) {
      video.currentTime = video.duration / 2;
    }
  };
  if (video.readyState >= 1 && isFinite(video.duration)) {
    go();
  } else {
    video.addEventListener("loadedmetadata", go, { once: true });
  }
}

export default function BackgroundSlideshow() {
  const [current, setCurrent]             = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [muted, setMuted]                 = useState(true);
  const [volume, setVolume]               = useState(0.6);
  const videoRefs                         = useRef<(HTMLVideoElement | null)[]>([]);
  const circleRef                         = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % videos.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // On mount: fix React hydration muted bug, seek all to middle, start playing
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.muted = true;
      video.volume = volume;
      seekToMiddle(video);
      video.play().catch(() => {});
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // On cycle: re-seek the incoming video to its middle
  useEffect(() => {
    const video = videoRefs.current[current];
    if (video) seekToMiddle(video);
  }, [current]);

  // Only the active video plays with sound; all others stay muted
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.muted = muted || i !== current;
      video.volume = volume;
    });
  }, [muted, volume, current]);

  // Organic peephole — RAF loop for smooth following + breathing radius
  useEffect(() => {
    if (reducedMotion) return;

    let raf: number;
    let targetR = 0;
    let currentR = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let start: number | null = null;

    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;

      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      currentR += (targetR - currentR) * 0.07;

      // Two overlapping sine waves → irregular organic breathing
      const breathe = currentR > 5
        ? Math.sin(elapsed * 0.00085) * 14 + Math.sin(elapsed * 0.0013) * 9
        : 0;

      const r = Math.max(0, currentR + breathe);
      const circle = circleRef.current;
      if (circle) {
        circle.setAttribute("cx", String(currentX | 0));
        circle.setAttribute("cy", String(currentY | 0));
        circle.setAttribute("r",  String(r | 0));
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const blocked = (e.target as Element | null)?.closest?.("[data-no-peephole]");
      targetX = e.clientX;
      targetY = e.clientY;
      targetR = blocked ? 0 : 160;
    };

    const onLeave = () => { targetR = 0; };

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="bg-slideshow">
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Image src={FALLBACK_IMAGE} alt="" fill priority sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
        <div className="bg-overlay" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-slideshow">
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

        {/* SVG overlay with organic aquarelle peephole */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
            overflow: "visible",
          }}
        >
          <defs>
            {/*
              Filter pipeline:
              1. Blur the circle edge softly
              2. Displace the blurred result with animated fractal noise
              → produces a living, aquarelle-like fringe
            */}
            <filter id="organic-edge" x="-60%" y="-60%" width="220%" height="220%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.015"
                numOctaves="4"
                seed="7"
                result="turbulence"
              >
                {/* @ts-ignore — SMIL animate is valid SVG but React types are narrow here */}
                <animate
                  attributeName="baseFrequency"
                  values="0.010 0.013;0.016 0.020;0.011 0.015;0.014 0.019;0.010 0.013"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blurred" />
              <feDisplacementMap
                in="blurred"
                in2="turbulence"
                scale="48"
                xChannelSelector="R"
                yChannelSelector="G"
              >
                {/* @ts-ignore */}
                <animate
                  attributeName="scale"
                  values="36;58;42;54;36"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </feDisplacementMap>
            </filter>

            <mask id="peephole-mask">
              {/* White = show overlay, black = reveal video */}
              <rect width="100%" height="100%" fill="white" />
              <circle
                ref={circleRef}
                cx="0"
                cy="0"
                r="0"
                fill="black"
                filter="url(#organic-edge)"
              />
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="rgba(252,250,247,0.96)"
            mask="url(#peephole-mask)"
          />
        </svg>
      </div>

      {/* Sound control — fixed bottom-right */}
      <div
        role="group"
        aria-label="Video sound"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
        }}
      >
        {!muted && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            style={{ width: "72px", accentColor: "#C8922A", cursor: "pointer" }}
          />
        )}
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute background video" : "Mute background video"}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(10,8,6,0.55)",
            border: "1px solid rgba(200,146,42,0.35)",
            color: "#C8922A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            flexShrink: 0,
            transition: "background 180ms ease, border-color 180ms ease",
          }}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
