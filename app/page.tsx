export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#0A0A0A]">
      {/* Name */}
      <h1
        className="font-[family-name:var(--font-cormorant)] font-light text-[#FAFAFA] text-center"
        style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "0.1em" }}
      >
        ERIK SJ<span className="text-[#F59E0B]">Ø</span>HOLM
      </h1>

      {/* Divider */}
      <span className="block w-6 h-px bg-[#F59E0B] mt-10 mb-10" />

      {/* Platform links */}
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
        <a
          href="https://www.instagram.com/eriksjoholmofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#666666] hover:text-[#FAFAFA] transition-colors duration-300"
        >
          Instagram
        </a>
        <span className="hidden sm:block w-px h-3 bg-white/10" />
        <a
          href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#666666] hover:text-[#1DB954] transition-colors duration-300"
        >
          Spotify
        </a>
        <span className="hidden sm:block w-px h-3 bg-white/10" />
        <a
          href="https://tidal.com/artist/47687355"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#666666] hover:text-[#FAFAFA] transition-colors duration-300"
        >
          Tidal
        </a>
        <span className="hidden sm:block w-px h-3 bg-white/10" />
        <a
          href="https://eriksjoholm-newsletter.beehiiv.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#666666] hover:text-[#FAFAFA] transition-colors duration-300"
        >
          Artistic Travelogue
        </a>
      </div>
    </main>
  );
}
