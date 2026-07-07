"use client";
import { useEffect, useState, RefObject } from "react";

/**
 * Reads pixels from the scratch-canvas beneath `elementRef` to determine
 * whether the visible background is light (cream overlay present) or dark
 * (canvas erased / overlay hidden, showing the video).
 *
 * Returns true  → background is light → use dark text
 * Returns false → background is dark  → use white text
 */
export function useBackgroundIsLight(elementRef: RefObject<HTMLElement | null>): boolean {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    let rafId: number;
    let last = true;

    const tick = () => {
      const canvas = document.querySelector<HTMLCanvasElement>(".bg-slideshow canvas");
      const el = elementRef.current;

      if (!canvas || !el) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // When the overlay is toggled off, the canvas CSS opacity is 0.
      // getImageData still reads the stale bitmap, so we must check visibility first.
      if (canvas.style.opacity === "0") {
        if (last) { last = false; setIsLight(false); }
        rafId = requestAnimationFrame(tick);
        return;
      }

      try {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const rect = el.getBoundingClientRect();
          const dpr = window.devicePixelRatio || 1;
          // Three horizontal samples at vertical mid-point
          const points: [number, number][] = [
            [rect.left + rect.width * 0.25, rect.top + rect.height * 0.5],
            [rect.left + rect.width * 0.50, rect.top + rect.height * 0.5],
            [rect.left + rect.width * 0.75, rect.top + rect.height * 0.5],
          ];
          let totalAlpha = 0;
          let n = 0;
          for (const [x, y] of points) {
            const px = Math.round(x * dpr);
            const py = Math.round(y * dpr);
            if (px >= 0 && py >= 0 && px < canvas.width && py < canvas.height) {
              totalAlpha += ctx.getImageData(px, py, 1, 1).data[3];
              n++;
            }
          }
          if (n > 0) {
            const newIsLight = totalAlpha / n > 128;
            if (newIsLight !== last) {
              last = newIsLight;
              setIsLight(newIsLight);
            }
          }
        }
      } catch {
        // Canvas may not be readable in some edge cases; keep current value
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []); // elementRef object is stable; no need to list it

  return isLight;
}
