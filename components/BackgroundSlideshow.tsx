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
const CYCLE_MS  = 30_000;
const OVERLAY   = "rgba(252,250,247,0.96)";
const BRUSH_R   = 52; // base brush radius in CSS px

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
  const canvasRef                         = useRef<HTMLCanvasElement | null>(null);

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

  // Canvas scratch effect — persistent ice-wipe
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let prevX: number | null = null;
    let prevY: number | null = null;
    let velX = 0, velY = 0;
    let prevMX = 0, prevMY = 0;

    const initCanvas = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = OVERLAY;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Lift the pen so the next stroke starts fresh after resize
      prevX = null;
      prevY = null;
    };

    initCanvas();

    // Paint one brush stamp at (x, y), shaped by current velocity
    const stamp = (x: number, y: number) => {
      if (!ctx) return;
      const speed   = Math.hypot(velX, velY);
      const angle   = Math.atan2(velY, velX);
      const stretch = 1 + Math.log1p(speed) * 0.30;
      const rx      = BRUSH_R * stretch;
      const ry      = BRUSH_R * Math.max(0.40, 1 / Math.sqrt(stretch));

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(1, ry / rx);

      // Feathered radial gradient — firm centre, soft frosty edge
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

    // Interpolate stamps along the path so fast moves leave no gaps
    const strokeTo = (x: number, y: number) => {
      if (prevX === null || prevY === null) {
        stamp(x, y);
      } else {
        const dist = Math.hypot(x - prevX, y - prevY);
        const n    = Math.max(1, Math.ceil(dist / 4));
        for (let i = 1; i <= n; i++) {
          const t = i / n;
          stamp(prevX + (x - prevX) * t, prevY + (y - prevY) * t);
        }
      }
      prevX = x;
      prevY = y;
    };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - prevMX;
      const dy = e.clientY - prevMY;
      velX   = velX  * 0.65 + dx * 0.35;
      velY   = velY  * 0.65 + dy * 0.35;
      prevMX = e.clientX;
      prevMY = e.clientY;

      const blocked = (e.target as Element | null)?.closest?.("[data-no-peephole]");
      if (blocked) {
        // Lift the pen — no scratch, and don't bridge across the gap on exit
        prevX = null;
        prevY = null;
        return;
      }
      strokeTo(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMove,    { passive: true });
    window.addEventListener("resize",    initCanvas);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize",    initCanvas);
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

        {/* Canvas overlay — starts fully filled; scratches stay cleared */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            pointerEvents: "none",
            zIndex:        1,
          }}
        />
      </div>

      {/* Sound control — fixed bottom-right */}
      <div
        role="group"
        aria-label="Video sound"
        style={{
          position: "fixed",
          bottom:   "1.5rem",
          right:    "1.5rem",
          zIndex:   10,
          display:  "flex",
          alignItems: "center",
          gap:      "0.625rem",
        }}
      >
        {!muted && (
          <input
            type="range"
            min="0" max="1" step="0.05"
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
            width: "36px", height: "36px", borderRadius: "50%",
            background: "rgba(10,8,6,0.55)",
            border: "1px solid rgba(200,146,42,0.35)",
            color: "#C8922A", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer",
            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            flexShrink: 0, transition: "background 180ms ease, border-color 180ms ease",
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
