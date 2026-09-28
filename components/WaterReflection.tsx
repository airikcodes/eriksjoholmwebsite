"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * A reflection layer at the bottom of every page: a band across the bottom of the viewport (height --water-h)
 * shows a mirrored, softened copy of the page just above it, fading with depth. It is only *added* to the
 * page: the live content underneath and the progressive blur (GradientBlur, which sits on top) are unchanged.
 *
 * The reflection is a decorative clone of <main>: inert, aria-hidden, no ids, no media elements. It is
 * re-cloned (debounced) when the page changes, and only repositioned on scroll.
 */
// The page's own <main> — never the copy inside the water band (it comes first in the DOM, so a plain
// querySelector("main") would find the clone and clone the clone, which collapses to width 0).
function pageMain(): HTMLElement | null {
  return ([...document.querySelectorAll("main")] as HTMLElement[]).find((m) => !m.closest(".water")) ?? null;
}

export default function WaterReflection() {
  const bandRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const band = bandRef.current, mirror = mirrorRef.current;
    if (!band || !mirror) return;
    let raf = 0, timer = 0, mainTop = 0, mainLeft = 0;
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
      const main = pageMain();
      mirror.textContent = "";
      if (!main) return;
      const r = main.getBoundingClientRect();
      mainTop = r.top + window.scrollY; mainLeft = r.left + window.scrollX;
      const clone = main.cloneNode(true) as HTMLElement;
      // Fixed elements belong to the viewport, not the page: inside the transformed mirror they would land at its
      // top-left corner, so drop them. Sticky ones stay in the layout (removing them would collapse grids) but
      // are un-stuck. Paired with the real elements by DOM order.
      const realEls = main.querySelectorAll<HTMLElement>("*");
      const cloneEls = clone.querySelectorAll<HTMLElement>("*");
      realEls.forEach((el, i) => {
        const pos = getComputedStyle(el).position;
        if (pos === "fixed") cloneEls[i]?.setAttribute("data-drop", "");   // out of flow: safe to drop
        else if (pos === "sticky") {                                        // in flow (e.g. year labels): keep it, just un-stick
          const c = cloneEls[i]; if (c) { c.style.position = "relative"; c.style.top = "auto"; }
        }
      });
      clone.querySelectorAll("[data-drop]").forEach((n) => n.remove());
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
    const main = pageMain();
    if (main) {
      mo = new MutationObserver(schedule);
      mo.observe(main, { childList: true, subtree: true, characterData: true });
      ro = new ResizeObserver(schedule);
      ro.observe(main);
    }
    return () => {
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", schedule);
      window.clearTimeout(timer); if (raf) cancelAnimationFrame(raf);
      mo?.disconnect(); ro?.disconnect();
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
