import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackNav from "@/components/BackNav";

export const metadata: Metadata = {
  title: "About — Erik Sjøholm",
  description: "Singer-songwriter and storyteller from Norway and Sweden, based in Amsterdam.",
};

export default function About() {
  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Static background — Amsterdam Storytelling Festival photo */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-03.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.12,
        }} />
      </div>

      <div className="relative px-6 pt-20 pb-24" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <BackNav />

          {/* Portrait */}
          <div className="flex flex-col items-center text-center mb-16">
            <div style={{
              width: 108, height: 108,
              borderRadius: "50%", overflow: "hidden",
              border: "1px solid rgba(200,146,42,0.25)",
              marginBottom: "1.5rem",
            }}>
              <Image
                src="/images/portrait.jpg"
                alt="Erik Sjøholm"
                width={108}
                height={108}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#E8E0D4", letterSpacing: "0.04em", lineHeight: 1.1 }}
            >
              Erik Sjøholm
            </h1>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginTop: "0.75rem" }}>
              Singer-songwriter · Storyteller
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-7">
            <p
              className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
              style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)", color: "#E8E0D4" }}
            >
              Erik Sjøholm is a Norwegian-Swedish singer-songwriter and storyteller,
              based in Amsterdam. He writes songs that don&apos;t rush — music built
              from real moments, lived quietly and felt deeply.
            </p>

            <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.85 }}>
              Shaped by John Lennon, Jeff Buckley, Joni Mitchell, and Damien Rice,
              his sound carries the weight of a story you&apos;ve heard before but can&apos;t
              quite place. Songs about love, loss, distance, and homecoming — and the
              thin line between all of them.
            </p>

            <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.85 }}>
              He has performed across Europe — from the Arbogast Festival in Sweden
              to Mezrab and the Amsterdam Storytelling Festival in the Netherlands,
              to storytelling gatherings in Croatia. Every performance is part concert,
              part narrative: a song has to earn its place in the room.
            </p>

            <blockquote
              className="font-[family-name:var(--font-cormorant)] font-light italic"
              style={{
                fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
                color: "#C8922A",
                borderLeft: "1px solid rgba(200,146,42,0.35)",
                paddingLeft: "1.25rem",
                marginTop: "2rem",
              }}
            >
              &ldquo;I think you deserve to be respected and loved for who you are.&rdquo;
            </blockquote>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-14">
            <span className="block flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="block w-6 h-px" style={{ background: "#C8922A" }} />
            <span className="block flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-y-10 gap-x-8">

            <div className="space-y-3">
              <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62" }}>Listen</p>
              <div className="space-y-2.5">
                <a href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp" target="_blank" rel="noopener noreferrer"
                  className="block text-xs hover:text-[#1DB954] transition-colors duration-200" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
                  Spotify →
                </a>
                <a href="https://tidal.com/artist/47687355" target="_blank" rel="noopener noreferrer"
                  className="block text-xs hover:text-[#00FFFF] transition-colors duration-200" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
                  Tidal →
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62" }}>Follow</p>
              <div className="space-y-2.5">
                <a href="https://www.instagram.com/eriksjoholmofficial" target="_blank" rel="noopener noreferrer"
                  className="block text-xs hover:text-[#E8E0D4] transition-colors duration-200" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
                  Instagram →
                </a>
                <a href="https://eriksjoholm-newsletter.beehiiv.com" target="_blank" rel="noopener noreferrer"
                  className="block text-xs hover:text-[#C8922A] transition-colors duration-200" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
                  Artistic Travelogue →
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62" }}>Contact</p>
              <a href="mailto:erik@eriksjoholm.com"
                className="block text-xs hover:text-[#C8922A] transition-colors duration-200" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
                erik@eriksjoholm.com
              </a>
            </div>

            <div className="space-y-3">
              <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62" }}>Explore</p>
              <div className="space-y-2.5">
                <Link href="/work"
                  className="block text-xs hover:text-[#E8E0D4] transition-colors duration-200" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
                  Music & Work →
                </Link>
                <Link href="/storyteller"
                  className="block text-xs hover:text-[#E8E0D4] transition-colors duration-200" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
                  The Storyteller →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
