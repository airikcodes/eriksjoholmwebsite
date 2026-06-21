import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Erik Sjøholm",
  description: "Singer-songwriter and storyteller.",
};

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-white">
      {/* Back to home */}
      <Link
        href="/"
        className="font-[family-name:var(--font-cormorant)] font-light text-[#0A0A0A] text-center mb-10 hover:text-[#F59E0B] transition-colors duration-300"
        style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", letterSpacing: "0.1em" }}
      >
        ERIK SJ<span className="text-[#F59E0B]">Ø</span>HOLM
      </Link>

      {/* Amber rule */}
      <span className="block w-6 h-px bg-[#F59E0B] mb-12" />

      {/* Bio */}
      <div className="max-w-md text-center space-y-6">
        <p
          className="font-[family-name:var(--font-cormorant)] font-light text-[#0A0A0A] leading-relaxed"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}
        >
          Singer-songwriter and storyteller who converts daily experiences into
          musical compositions.
        </p>

        <p className="text-[#AAAAAA] text-sm leading-relaxed">
          Shaped by John Lennon, Jeff Buckley, Joni Mitchell, and Damian Rice —
          music that doesn&apos;t rush. Each release built from real moments,
          written for real people.
        </p>

        <p
          className="font-[family-name:var(--font-cormorant)] font-light text-[#AAAAAA] italic"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)" }}
        >
          &ldquo;I think you deserve to be respected and loved for who you are.&rdquo;
        </p>
      </div>

      {/* Amber rule */}
      <span className="block w-6 h-px bg-[#F59E0B] mt-12 mb-10" />

      {/* Links */}
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
        <a
          href="https://www.instagram.com/eriksjoholmofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#0A0A0A] transition-colors duration-300"
        >
          Instagram
        </a>
        <span className="hidden sm:block w-px h-3 bg-black/10" />
        <a
          href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#1DB954] transition-colors duration-300"
        >
          Spotify
        </a>
        <span className="hidden sm:block w-px h-3 bg-black/10" />
        <a
          href="https://tidal.com/artist/47687355"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#0A0A0A] transition-colors duration-300"
        >
          Tidal
        </a>
        <span className="hidden sm:block w-px h-3 bg-black/10" />
        <a
          href="mailto:erik@eriksjoholm.com"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#0A0A0A] transition-colors duration-300"
        >
          Contact
        </a>
      </div>
    </main>
  );
}
