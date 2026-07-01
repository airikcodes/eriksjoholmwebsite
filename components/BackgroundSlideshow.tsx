"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/images/bg/bg-01.jpg",
  "/images/bg/bg-02.jpg",
  "/images/bg/bg-03.jpg",
  "/images/bg/bg-04.jpg",
  "/images/bg/bg-05.jpg",
];

export default function BackgroundSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slideshow">
      {/* First slide rendered as <Image priority> so the browser can paint it immediately */}
      <div className={`bg-slide${current === 0 ? " active" : ""}`}>
        <Image
          src="/images/bg/bg-01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      {/* Remaining slides as CSS background (no need to prioritise) */}
      {images.slice(1).map((src, i) => (
        <div
          key={src}
          className={`bg-slide${i + 1 === current ? " active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="bg-overlay" />
    </div>
  );
}
