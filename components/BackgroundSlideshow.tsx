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
  const shapeRef                          = useRef<SVGEllipseElement | null>(null);

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

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.muted = true;
      video.volume = volume;
      seekToMiddle(video);
      video.play().catch(() => {});
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const video = videoRefs.current[current];
    if (video) seekToMiddle(video);
  }, [current]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.muted = muted || i !== current;
      video.volume = volume;
    });
  }, [muted, volume, current]);

  // Velocity-reactive organic shape — ink/crack feel
  useEffect(() => {
    if (reducedMotion) return;

    let raf: number;
    let targetR   = 0;
    let currentR  = 0;
    let targetX   = window.innerWidth  / 2;
    let targetY   = window.innerHeight / 2;
    let currentX  = targetX;
    let currentY  = targetY;
    let prevMX    = targetX;
    let prevMY    = targetY;
    let velX      = 0;
    let velY      = 0;
    let start: number | null = null;

    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;

      // Smooth position follow
      currentX += (targetX - currentX) * 0.10;
      currentY += (targetY - currentY) * 0.10;
      currentR += (targetR - currentR) * 0.06;

      // Decay velocity so stretch rebounds when cursor stops
      velX *= 0.86;
      velY *= 0.86;

      const speed = Math.hypot(velX, velY);
      const angle = Math.atan2(velY, velX) * (180 / Math.PI);

      // Logarithmic stretch so it doesn't explode at high speed
      const stretchX = 1 + Math.log1p(speed) * 0.28;
      const squishY  = Math.max(0.55, 1 / Math.sqrt(stretchX));

      // Two out-of-phase sine waves per axis → never a perfect circle
      const bRx = Math.sin(elapsed * 0.00078) * 28 + Math.sin(elapsed * 0.00190) * 16;
      const bRy = Math.sin(elapsed * 0.00091 + 1.9) * 24 + Math.sin(elapsed * 0.00140 + 0.8) * 14;

      const rx = Math.max(0, currentR * stretchX + bRx);
      const ry = Math.max(0, currentR * squishY  + bRy);

      const shape = shapeRef.current;
      if (shape) {
        const cx = currentX | 0;
        const cy = currentY | 0;
        shape.setAttribute("cx",        String(cx));
        shape.setAttribute("cy",        String(cy));
        shape.setAttribute("rx",        String(rx | 0));
        shape.setAttribute("ry",        String(ry | 0));
        // Rotate the ellipse to align with cursor direction
        shape.setAttribute("transform", `rotate(${angle | 0}, ${cx}, ${cy})`);
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const blocked = (e.target as Element | null)?.closest?.("[data-no-peephole]");
      const dx = e.clientX - prevMX;
      const dy = e.clientY - prevMY;
      // Exponential smoothing on velocity
      velX = velX * 0.60 + dx * 0.40;
      velY = velY * 0.60 + dy * 0.40;
      prevMX  = e.clientX;
      prevMY  = e.clientY;
      targetX = e.clientX;
      targetY = e.clientY;
      targetR = blocked ? 0 : 250;
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

        {/* SVG overlay — organic ink/crack peephole */}
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
              Pipeline: blur the ellipse first (soft body) then violently
              displace it with fractal noise → ink tendrils / crack edges
            */}
            <filter id="organic-edge" x="-70%" y="-70%" width="240%" height="240%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018 0.022"
                numOctaves="5"
                seed="12"
                result="turbulence"
              >
                {/* @ts-ignore — SMIL animate is valid SVG */}
                <animate
                  attributeName="baseFrequency"
                  values="0.015 0.020;0.022 0.028;0.017 0.022;0.020 0.026;0.015 0.020"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blurred" />
              <feDisplacementMap
                in="blurred"
                in2="turbulence"
                scale="82"
                xChannelSelector="R"
                yChannelSelector="G"
              >
                {/* @ts-ignore */}
                <animate
                  attributeName="scale"
                  values="68;96;74;90;68"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </feDisplacementMap>
            </filter>

            <mask id="peephole-mask">
              {/* white = show overlay · black = reveal video */}
              <rect width="100%" height="100%" fill="white" />
              <ellipse
                ref={shapeRef}
                cx="0" cy="0"
                rx="0" ry="0"
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
