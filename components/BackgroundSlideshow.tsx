"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const videos = [
  "/videos/bg-01.mp4",
  "/videos/bg-02.mp4",
  "/videos/bg-03.mp4",
  "/videos/bg-04.mp4",
];

const FALLBACK_IMAGE  = "/images/bg/bg-01.jpg";
const CYCLE_MS        = 30_000;

export default function BackgroundSlideshow() {
  const [current, setCurrent]             = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRefs                         = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % videos.length),
      CYCLE_MS
    );
    return () => clearInterval(id);
  }, [reducedMotion]);

  // When cycling, reset the incoming video to its start so it feels fresh
  useEffect(() => {
    const video = videoRefs.current[current];
    if (video) video.currentTime = 0;
  }, [current]);

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
    <div className="bg-slideshow">
      {videos.map((src, i) => (
        <div
          key={src}
          className={`bg-slide video-slide${i === current ? " active" : ""}`}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el; }}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{
              position:  "absolute",
              inset:     0,
              width:     "100%",
              height:    "100%",
              objectFit: "cover",
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
