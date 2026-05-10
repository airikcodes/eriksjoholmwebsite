"use client";

import Image from "next/image";

const releases = [
  {
    id: 1,
    title: "Latest Release",
    year: "2025",
    type: "Single",
    image: "/releases/cover-1.jpg",
    link: "https://www.instagram.com/p/DV15E62iOnd/",
  },
  {
    id: 2,
    title: "Release Title",
    year: "2024",
    type: "EP",
    image: "/releases/cover-2.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Release Title",
    year: "2024",
    type: "Single",
    image: "/releases/cover-3.jpg",
    link: "#",
  },
];

function ReleaseCard({ release, featured }: { release: typeof releases[0]; featured?: boolean }) {
  return (
    <a
      href={release.link}
      target={release.link.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`group relative block ${featured ? "md:col-span-1 md:row-span-1" : ""}`}
    >
      <div className="relative overflow-hidden aspect-square bg-[#1A1A1A]">
        {/* Placeholder gradient – replace with real Image once you add cover art to /public/releases/ */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: featured
              ? "linear-gradient(135deg, #1A1A1A 0%, #2A2210 100%)"
              : "linear-gradient(135deg, #111111 0%, #1A1A1A 100%)",
          }}
        >
          <span className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-white/10 select-none">
            ES
          </span>
        </div>

        {/* Amber hover border */}
        <div className="absolute inset-0 border border-transparent group-hover:border-[#F59E0B]/60 transition-all duration-500 z-10" />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#F59E0B]/0 group-hover:bg-[#F59E0B]/5 transition-all duration-500 z-10" />
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-medium text-white group-hover:text-[#F59E0B] transition-colors duration-300">
            {release.title}
          </h3>
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#555555]">
            {release.year}
          </span>
        </div>
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#555555] mt-0.5">
          {release.type}
        </p>
      </div>
    </a>
  );
}

export default function Music() {
  return (
    <section id="music" className="py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex items-center gap-6 mb-16">
        <span className="block w-10 h-px bg-[#F59E0B]" />
        <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#888888]">Music</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {releases.map((release, i) => (
          <ReleaseCard key={release.id} release={release} featured={i === 0} />
        ))}
      </div>

      <p className="mt-10 text-[0.6rem] tracking-[0.2em] uppercase text-[#444444]">
        * Replace images in{" "}
        <code className="text-[#F59E0B]">/public/releases/</code> with your cover art
      </p>
    </section>
  );
}
