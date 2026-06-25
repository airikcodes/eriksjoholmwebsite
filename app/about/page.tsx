import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Erik Sjøholm",
  description: "Singer-songwriter and storyteller.",
};

export default function About() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ background: "var(--color-bg)" }}
    >
      <span className="block w-6 h-px mb-14" style={{ background: "var(--color-accent)" }} />

      <div className="max-w-md text-center space-y-7">
        <p
          className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", color: "var(--color-text)" }}
        >
          Singer-songwriter and storyteller who converts daily experiences into
          musical compositions.
        </p>

        <p className="leading-relaxed text-sm" style={{ color: "var(--color-muted)" }}>
          Shaped by John Lennon, Jeff Buckley, Joni Mitchell, and Damian Rice —
          music that doesn&apos;t rush. Each release built from real moments,
          written for real people.
        </p>

        <p
          className="font-[family-name:var(--font-cormorant)] font-light italic"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "var(--color-muted)" }}
        >
          &ldquo;I think you deserve to be respected and loved for who you are.&rdquo;
        </p>
      </div>

      <span className="block w-6 h-px mt-14 mb-12" style={{ background: "var(--color-accent)" }} />

      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
        <a
          href="https://www.instagram.com/eriksjoholmofficial"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-muted)" }}
          className="hover:text-[var(--color-text)] transition-colors duration-200"
        >
          Instagram
        </a>
        <span className="hidden sm:block w-px h-3" style={{ background: "var(--color-border)" }} />
        <a
          href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-muted)" }}
          className="hover:text-[#1DB954] transition-colors duration-200"
        >
          Spotify
        </a>
        <span className="hidden sm:block w-px h-3" style={{ background: "var(--color-border)" }} />
        <a
          href="https://tidal.com/artist/47687355"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-muted)" }}
          className="hover:text-[var(--color-text)] transition-colors duration-200"
        >
          Tidal
        </a>
        <span className="hidden sm:block w-px h-3" style={{ background: "var(--color-border)" }} />
        <a
          href="https://eriksjoholm-newsletter.beehiiv.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-muted)" }}
          className="hover:text-[var(--color-text)] transition-colors duration-200"
        >
          Artistic Travelogue
        </a>
      </div>

      <Link
        href="/"
        style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-muted)", marginTop: "3rem" }}
        className="hover:text-[var(--color-text)] transition-colors duration-200"
      >
        ← Back
      </Link>
    </main>
  );
}
