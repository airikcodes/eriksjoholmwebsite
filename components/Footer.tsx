export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-cormorant)] text-sm text-[#444444] tracking-wider">
          © {year} Erik Sjøholm
        </p>

        <div className="flex items-center gap-8">
          <a
            href="https://www.instagram.com/eriksjoholmofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6rem] tracking-[0.25em] uppercase text-[#444444] hover:text-[#F59E0B] transition-colors duration-300"
          >
            Instagram
          </a>
          <span className="w-px h-3 bg-white/10" />
          <a
            href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6rem] tracking-[0.25em] uppercase text-[#444444] hover:text-[#1DB954] transition-colors duration-300"
          >
            Spotify
          </a>
          <span className="w-px h-3 bg-white/10" />
          <a
            href="mailto:erik@eriksjoholm.com"
            className="text-[0.6rem] tracking-[0.25em] uppercase text-[#444444] hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
