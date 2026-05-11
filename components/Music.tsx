"use client";

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp";

const releases = [
  {
    id: 1,
    title: "Lycka",
    year: "2025",
    type: "Album",
    gradient: "linear-gradient(135deg, #1A1A1A 0%, #2A2210 100%)",
    link: SPOTIFY_ARTIST,
  },
  {
    id: 2,
    title: "Gone",
    year: "2024",
    type: "Single",
    gradient: "linear-gradient(135deg, #111111 0%, #1A1814 100%)",
    link: SPOTIFY_ARTIST,
  },
  {
    id: 3,
    title: "One Last Waltz",
    year: "2024",
    type: "Single",
    gradient: "linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%)",
    link: SPOTIFY_ARTIST,
  },
];

function ReleaseCard({ release, featured }: { release: typeof releases[0]; featured?: boolean }) {
  return (
    <a
      href={release.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
    >
      <div className="relative overflow-hidden aspect-square bg-[#1A1A1A]">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: release.gradient }}
        >
          <span className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-white/10 select-none">
            ES
          </span>
        </div>

        {/* Spotify play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-14 h-14 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-lg">
            <svg width="16" height="16" viewBox="0 0 12 12" fill="#0A0A0A">
              <polygon points="1,0 11,6 1,12" />
            </svg>
          </div>
        </div>

        <div className="absolute inset-0 border border-transparent group-hover:border-[#F59E0B]/40 transition-all duration-500 z-10" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-[5]" />

        {featured && (
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[0.5rem] tracking-[0.25em] uppercase bg-[#F59E0B] text-[#0A0A0A] px-2 py-1 font-medium">
              Latest
            </span>
          </div>
        )}
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
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-6">
          <span className="block w-10 h-px bg-[#F59E0B]" />
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#888888]">Music</span>
        </div>
        <a
          href={SPOTIFY_ARTIST}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-[#555555] hover:text-[#1DB954] transition-colors duration-300"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          All releases
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {releases.map((release, i) => (
          <ReleaseCard key={release.id} release={release} featured={i === 0} />
        ))}
      </div>
    </section>
  );
}
