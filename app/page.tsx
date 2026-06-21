import Script from "next/script";

const FORM_ID = "12cecb7e-72ad-4cd0-b12f-3868272593d0";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      {/* Name */}
      <h1
        className="font-[family-name:var(--font-cormorant)] font-light text-[#0A0A0A] text-center mb-2"
        style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "0.1em" }}
      >
        ERIK SJ<span className="text-[#F59E0B]">Ø</span>HOLM
      </h1>

      <div className="mb-10" />

      {/* Beehiiv form */}
      <div className="w-full max-w-sm">
        <div data-beehiiv-form={FORM_ID} />
        <Script
          src="https://subscribe-forms.beehiiv.com/v3/loader.js"
          data-beehiiv-form={FORM_ID}
          strategy="afterInteractive"
        />
      </div>

      {/* Social links */}
      <div className="flex items-center gap-8 mt-14">
        <a
          href="https://www.instagram.com/eriksjoholmofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#0A0A0A] transition-colors duration-300"
        >
          Instagram
        </a>
        <span className="w-px h-3 bg-black/10" />
        <a
          href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#1DB954] transition-colors duration-300"
        >
          Spotify
        </a>
        <span className="w-px h-3 bg-black/10" />
        <a
          href="https://tidal.com/artist/47687355"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#0A0A0A] transition-colors duration-300"
        >
          Tidal
        </a>
      </div>
    </main>
  );
}
