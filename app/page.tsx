import Script from "next/script";

const FORM_ID = "12cecb7e-72ad-4cd0-b12f-3868272593d0";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#0A0A0A]">
      {/* Name */}
      <h1
        className="font-[family-name:var(--font-cormorant)] font-light text-white text-center mb-3"
        style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", letterSpacing: "0.1em" }}
      >
        ERIK SJ<span className="text-[#F59E0B]">Ø</span>HOLM
      </h1>

      {/* Tagline */}
      <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#555555] mb-16">
        New music coming
      </p>

      {/* Beehiiv form */}
      <div className="w-full max-w-md">
        <div data-beehiiv-form={FORM_ID} />
        <Script
          src="https://subscribe-forms.beehiiv.com/v3/loader.js"
          data-beehiiv-form={FORM_ID}
          strategy="afterInteractive"
        />
      </div>

      {/* Social links */}
      <div className="flex items-center gap-8 mt-16">
        <a
          href="https://www.instagram.com/eriksjoholmofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#444444] hover:text-white transition-colors duration-300"
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
      </div>
    </main>
  );
}
