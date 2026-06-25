"use client";

import { useEffect, useState } from "react";

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
      {images.map((src, i) => (
        <div
          key={src}
          className={`bg-slide${i === current ? " active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="bg-overlay" />
    </div>
  );
}
