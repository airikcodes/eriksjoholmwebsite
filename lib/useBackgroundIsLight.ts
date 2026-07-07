"use client";
import { useEffect, RefObject } from "react";

/**
 * Samples the scratch canvas beneath wrapperRef.current each animation frame
 * and writes `data-bg-mode="light"` or `data-bg-mode="dark"` directly onto
 * that element — no React state, no re-renders.
 *
 * CSS responds to the attribute:
 *   [data-bg-mode="dark"] .child { color: white; }
 */
export function useBgColorMode(wrapperRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    let rafId: number;
    let frameIdx = 0;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let streak = 0;       // +N = N light readings, -N = N dark readings
    const THRESHOLD = 4;  // consecutive frames before committing a flip
    let mode = "light";   // tracks what's written to the DOM

    const tick = () => {
      rafId = requestAnimationFrame(tick);

      // ~20 fps: only sample every 3rd frame
      if (++frameIdx % 3 !== 0) return;

      if (!canvas) {
        canvas = document.querySelector<HTMLCanvasElement>(".bg-slideshow canvas");
        if (!canvas) return;
      }

      const el = wrapperRef.current;
      if (!el) return;

      // Overlay toggled off → canvas CSS opacity "0" → full video behind, always dark
      if (canvas.style.opacity === "0") {
        streak = 0;
        if (mode !== "dark") { mode = "dark"; el.dataset.bgMode = "dark"; }
        return;
      }

      if (!ctx) {
        ctx = canvas.getContext("2d");
        if (!ctx) return;
      }

      try {
        const rect = el.getBoundingClientRect();
        const dpr  = window.devicePixelRatio || 1;
        const cx   = Math.round((rect.left + rect.width  * 0.5) * dpr);
        const cy   = Math.round((rect.top  + rect.height * 0.5) * dpr);

        // Need ≥1 px margin for the 3×3 block
        if (cx < 1 || cy < 1 || cx >= canvas.width - 1 || cy >= canvas.height - 1) return;

        // One getImageData call reads 9 pixels — averaged alpha tells us what's showing
        const { data } = ctx.getImageData(cx - 1, cy - 1, 3, 3);
        let totalAlpha = 0;
        for (let i = 3; i < data.length; i += 4) totalAlpha += data[i];
        const avg = totalAlpha / 9; // ~245 = full overlay, ~0 = fully erased (video)

        // Dead-band [96, 160] prevents flickering at brush-stroke edges
        if      (avg > 160) streak = Math.min(streak + 1,  THRESHOLD);
        else if (avg <  96) streak = Math.max(streak - 1, -THRESHOLD);

        if (streak >=  THRESHOLD && mode !== "light") { mode = "light"; el.dataset.bgMode = "light"; }
        if (streak <= -THRESHOLD && mode !== "dark")  { mode = "dark";  el.dataset.bgMode = "dark";  }
      } catch { /* canvas read error — keep current mode */ }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []); // wrapperRef object is stable for the component's lifetime
}
