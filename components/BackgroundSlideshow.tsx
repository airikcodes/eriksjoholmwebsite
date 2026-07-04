"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const videos = [
  { src: "/videos/bg-01.mp4", label: "In The Beginning" },
  { src: "/videos/bg-02.mp4", label: "La Latina" },
  { src: "/videos/bg-03.mp4", label: "Ray Of Light" },
  { src: "/videos/bg-04.mp4", label: "Ashes" },
];

// Static fallback for prefers-reduced-motion users
const FALLBACK_IMAGE = "/images/bg/bg-01.jpg";

const CYCLE_INTERVAL_MS = 30_000;

export default function BackgroundSlideshow() {
  const [current, setCurrent]           = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Cycle through videos on a timer (skip when reduced motion)
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % videos.length),
      CYCLE_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Play the active video; pause + reset others
  useEffect(() => {
    if (reducedMotion) return;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === current) {
        video.currentTime = 0;
        video.play().catch(() => {/* autoplay blocked — video stays paused */});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [current, reducedMotion]);

  // Static fallback for reduced-motion users
  if (reducedMotion) {
    return (
      <div className="bg-slideshow">
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Image
            src={FALLBACK_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="bg-overlay" />
      </div>
    );
  }

  return (
    <div className="bg-slideshow">
      {videos.map(({ src, label }, i) => (
        <div
          key={src}
          /* video-slide keeps Ken Burns from being applied — videos have their own motion */
          className={`bg-slide video-slide${i === current ? " active" : ""}`}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el; }}
            muted
            loop
            playsInline
            aria-hidden="true"
            aria-label={label}
            style={{
              position:   "absolute",
              inset:      0,
              width:      "100%",
              height:     "100%",
              objectFit:  "cover",
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      ))}
      <div className="bg-overlay" />
    </div>
  );
}
