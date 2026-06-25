import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Erik Sjøholm",
  description: "Singer-songwriter and storyteller from Norway and Sweden, based in Amsterdam.",
};

export default function About() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-6 py-24"
      style={{ background: "#0D0B09", color: "#E8E0D4" }}
    >
      {/* Header */}
      <div className="w-full max-w-xl">
        <Link
          href="/"
          style={{ fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
          className="hover:text-[#E8E0D4] transition-colors duration-200"
        >
          ← Home
        </Link>
      </div>

      <div className="w-full max-w-xl mt-16 space-y-14">

        {/* Name / title */}
        <div>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#E8E0D4", letterSpacing: "0.03em", lineHeight: 1.1 }}
          >
            Erik Sjøholm
          </h1>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62", marginTop: "1rem" }}>
            Singer-songwriter · Storyteller
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-6">
          <p
            className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
            style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)", color: "#E8E0D4" }}
          >
            Erik Sjøholm is a Norwegian-Swedish singer-songwriter and storyteller,
            based in Amsterdam. He writes songs that don&apos;t rush — music built
            from real moments, lived quietly and felt deeply.
          </p>

          <p className="leading-relaxed text-sm" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
            Shaped by John Lennon, Jeff Buckley, Joni Mitchell, and Damien Rice,
            his sound carries the particular weight of a story you&apos;ve heard before
            but can&apos;t quite place. Songs about love, loss, distance, homecoming —
            and the thin line between all of them.
          </p>

          <p className="leading-relaxed text-sm" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
            He has performed at stages across Europe — from the Arbogast Festival
            in Sweden to Mezrab and the Amsterdam Storytelling Festival in the
            Netherlands, to storytelling gatherings in Croatia. Every performance
            is part concert, part narrative: a song has to earn its place in the room.
          </p>

          <p
            className="font-[family-name:var(--font-cormorant)] font-light italic"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.3rem)", color: "#C8922A" }}
          >
            &ldquo;I think you deserve to be respected and loved for who you are.&rdquo;
          </p>
        </div>

        {/* Divider */}
        <span className="block w-8 h-px" style={{ background: "#C8922A" }} />

        {/* Platforms */}
        <div className="space-y-3">
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62" }}>
            Listen
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {[
              { label: "Spotify", href: "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp", hover: "#1DB954" },
              { label: "Tidal",   href: "https://tidal.com/artist/47687355",                       hover: "#00FFFF" },
            ].map(({ label, href, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
                className={`transition-colors duration-200 hover:text-[${hover}]`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Follow */}
        <div className="space-y-3">
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62" }}>
            Follow
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {[
              { label: "Instagram",          href: "https://www.instagram.com/eriksjoholmofficial" },
              { label: "Artistic Travelogue", href: "https://eriksjoholm-newsletter.beehiiv.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
                className="hover:text-[#E8E0D4] transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62" }}>
            Get in touch
          </p>
          <a
            href="mailto:erik@eriksjoholm.com"
            style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#7A6F62" }}
            className="hover:text-[#C8922A] transition-colors duration-200"
          >
            erik@eriksjoholm.com
          </a>
        </div>

      </div>
    </main>
  );
}
