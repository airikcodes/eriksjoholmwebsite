"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    const t = setTimeout(() => {
      el.style.transition = "opacity 1.2s ease, transform 1.2s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div ref={titleRef} className="relative z-10 text-center px-6">
        {/* Thin amber line top */}
        <div className="flex justify-center mb-10">
          <span className="block w-10 h-px bg-[#F59E0B]" />
        </div>

        {/* Artist name */}
        <h1
          className="font-[family-name:var(--font-cormorant)] font-light leading-none text-white"
          style={{ fontSize: "clamp(4rem, 14vw, 13rem)", letterSpacing: "0.08em" }}
        >
          ERIK
        </h1>
        <h1
          className="font-[family-name:var(--font-cormorant)] font-light leading-none text-white"
          style={{ fontSize: "clamp(4rem, 14vw, 13rem)", letterSpacing: "0.08em" }}
        >
          SJ<span style={{ color: "#F59E0B" }}>Ø</span>HOLM
        </h1>

        {/* Tagline */}
        <p
          className="mt-10 text-[#888888] tracking-[0.4em] uppercase"
          style={{ fontSize: "0.65rem" }}
        >
          Artist &nbsp;·&nbsp; Musician
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <a
            href="#music"
            className="text-xs tracking-[0.25em] uppercase text-white border border-white/20 px-8 py-3 hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all duration-300"
          >
            Listen
          </a>
          <a
            href="#shows"
            className="text-xs tracking-[0.25em] uppercase text-[#888888] hover:text-white transition-colors duration-300"
          >
            Shows
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[#444444] text-[0.55rem] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#444444] to-transparent" />
      </div>
    </section>
  );
}
