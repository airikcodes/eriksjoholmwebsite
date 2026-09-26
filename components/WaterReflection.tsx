"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * A waterline at the bottom of every page. The page sinks into the water: a band across the bottom of the
 * viewport (height --water-h) shows a mirrored, softened copy of the page just above it, with soft focus,
 * fading with depth. The progressive blur (GradientBlur) still sits on top, so the reflection gets blurrier
 * the deeper it goes. Content emerges from the water as you scroll (body has matching bottom padding so the
 * end of the page can rise clear of it).
 *
 * The reflection is a decorative clone of <main>: inert, aria-hidden, no ids, no media elements. It is
 * re-cloned (debounced) when the page changes, and only repositioned on scroll.
 */
export default function WaterReflection() {
  const bandRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const band = bandRef.current, mirror = mirrorRef.current;
    if (!band || !mirror) return;
    let raf = 0, timer = 0, mainTop = 0, mainLeft = 0;
    let src: HTMLElement | null = null;
    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;

    const place = () => {
      raf = 0;
      const h = band.offsetHeight;
      const t = window.scrollY + window.innerHeight - h - mainTop;    // mirror axis = top edge of the band
      mirror.style.transform = `translate3d(${mainLeft}px, ${t}px, 0) scaleY(-1)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(place); };

    const rebuild = () => {
      const main = document.querySelector("main") as HTMLElement | null;
      src = main;
      mirror.textContent = "";
      if (!main) return;
      const r = main.getBoundingClientRect();
      mainTop = r.top + window.scrollY; mainLeft = r.left + window.scrollX;
      const clone = main.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("video, canvas, iframe, audio, script, noscript").forEach((n) => n.remove());
      clone.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
      clone.querySelectorAll("[for]").forEach((n) => n.removeAttribute("for"));
      clone.querySelectorAll("[autofocus]").forEach((n) => n.removeAttribute("autofocus"));
      clone.querySelectorAll("img").forEach((n) => { n.setAttribute("loading", "eager"); n.removeAttribute("srcset"); });
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("inert", "");
      clone.style.width = `${r.width}px`;
      clone.style.pointerEvents = "none";
      mirror.appendChild(clone);
      place();
    };
    const schedule = () => { window.clearTimeout(timer); timer = window.setTimeout(rebuild, 350); };

    schedule();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    const main = document.querySelector("main");
    if (main) {
      mo = new MutationObserver(schedule);
      mo.observe(main, { childList: true, subtree: true, characterData: true });
      ro = new ResizeObserver(schedule);
      ro.observe(main);
    }
    return () => {
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", schedule);
      window.clearTimeout(timer); if (raf) cancelAnimationFrame(raf);
      mo?.disconnect(); ro?.disconnect(); src = null;
    };
  }, [pathname]);

  return (
    <>
      <div ref={bandRef} className="water" aria-hidden="true">
        <div ref={mirrorRef} className="water-mirror" />
      </div>
    </>
  );
}
