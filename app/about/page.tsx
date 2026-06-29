import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackNav from "@/components/BackNav";

export const metadata: Metadata = {
  title: "About — Erik Sjøholm",
  description: "Singer-songwriter and storyteller from Ostrobothnia, the Swedish-speaking coast of Finland, based in Luzern, Switzerland.",
};

export default function About() {
  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Fixed background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-03.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.08,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* ── Back navigation ── */}
          <div style={{ paddingTop: "5.5rem" }}>
            <BackNav />
          </div>

          {/* ── Portrait & name ── */}
          <div className="flex flex-col items-center text-center" style={{ paddingBottom: "5.5rem" }}>
            <div style={{
              width: 160, height: 160,
              borderRadius: "50%", overflow: "hidden",
              border: "1px solid rgba(200,146,42,0.25)",
              marginBottom: "2.25rem",
            }}>
              <Image
                src="/images/portrait.jpg"
                alt="Erik Sjøholm"
                width={160}
                height={160}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "#E8E0D4",
                letterSpacing: "0.04em",
                lineHeight: 1.05,
              }}
            >
              Erik Sjøholm
            </h1>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.52rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginTop: "1rem",
            }}>
              Singer-songwriter · Storyteller · Luzern
            </p>
          </div>

          {/* ── Bio ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "5rem", paddingBottom: "5rem" }}>

            <p
              className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
              style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.55rem)", color: "#E8E0D4" }}
            >
              Erik Sjøholm is a singer-songwriter and storyteller from Ostrobothnia —
              the Swedish-speaking coast of Finland — now based in Luzern, Switzerland.
              He writes songs that don&apos;t rush — music built from real moments,
              lived quietly and felt deeply.
            </p>

            <span className="block" style={{ width: "2rem", height: "1px", background: "#C8922A", margin: "3rem 0" }} />

            <div className="space-y-8">
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                color: "#7A6F62",
                lineHeight: 1.9,
              }}>
                Shaped by John Lennon, Jeff Buckley, Joni Mitchell, and Damien Rice,
                his sound carries the weight of a story you&apos;ve heard before but
                can&apos;t quite place. Songs about love, loss, distance, and homecoming —
                and the thin line between all of them. He writes in English and
                Swedish, sometimes both in the same breath.
              </p>

              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                color: "#7A6F62",
                lineHeight: 1.9,
              }}>
                He has performed across Europe — from the Arbogast Festival in Sweden
                to Mezrab and the Amsterdam Storytelling Festival in the Netherlands,
                to storytelling gatherings in Croatia and Finland. His concert
                format GLENN weaves original songs with spoken narrative: every song
                earns its place in the room before it&apos;s played.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote
              className="font-[family-name:var(--font-cormorant)] font-light italic"
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
                color: "#C8922A",
                borderLeft: "1px solid rgba(200,146,42,0.35)",
                paddingLeft: "1.5rem",
                marginTop: "3.5rem",
                lineHeight: 1.6,
              }}
            >
              &ldquo;I think you deserve to be respected and loved for who you are.&rdquo;
            </blockquote>

          </div>

          {/* ── Links ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "5rem", paddingBottom: "8rem" }}>

            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "3.5rem",
            }}>
              Find the work
            </p>

            <div className="grid grid-cols-2 gap-y-16 gap-x-12">

              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.45rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                  marginBottom: "1.25rem",
                }}>
                  Listen
                </p>
                <div className="space-y-4">
                  <a
                    href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp"
                    target="_blank" rel="noopener noreferrer"
                    className="block hover:text-[#1DB954] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    Spotify →
                  </a>
                  <a
                    href="https://tidal.com/artist/47687355"
                    target="_blank" rel="noopener noreferrer"
                    className="block hover:text-[#00FFFF] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    Tidal →
                  </a>
                </div>
              </div>

              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.45rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                  marginBottom: "1.25rem",
                }}>
                  Follow
                </p>
                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/eriksjoholmofficial"
                    target="_blank" rel="noopener noreferrer"
                    className="block hover:text-[#E8E0D4] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    Instagram →
                  </a>
                  <a
                    href="https://facebook.com/eriksjoholmffofficial/"
                    target="_blank" rel="noopener noreferrer"
                    className="block hover:text-[#1877F2] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    Facebook →
                  </a>
                  <a
                    href="https://www.youtube.com/eriksjoholmofficial"
                    target="_blank" rel="noopener noreferrer"
                    className="block hover:text-[#FF0000] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    YouTube →
                  </a>
                  <a
                    href="https://www.linkedin.com/in/eriksjoholmofficial1717/"
                    target="_blank" rel="noopener noreferrer"
                    className="block hover:text-[#0A66C2] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    LinkedIn →
                  </a>
                  <a
                    href="https://eriksjoholm-newsletter.beehiiv.com"
                    target="_blank" rel="noopener noreferrer"
                    className="block hover:text-[#C8922A] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    Backstage →
                  </a>
                </div>
              </div>

              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.45rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                  marginBottom: "1.25rem",
                }}>
                  Contact
                </p>
                <a
                  href="mailto:erik@eriksjoholm.com"
                  className="block hover:text-[#C8922A] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                >
                  erik@eriksjoholm.com
                </a>
              </div>

              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.45rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                  marginBottom: "1.25rem",
                }}>
                  Explore
                </p>
                <div className="space-y-4">
                  <Link
                    href="/songs"
                    className="block hover:text-[#E8E0D4] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    Songs →
                  </Link>
                  <Link
                    href="/storyteller"
                    className="block hover:text-[#E8E0D4] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    The Storyteller →
                  </Link>
                  <Link
                    href="/sync"
                    className="block hover:text-[#E8E0D4] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em" }}
                  >
                    Sync Licensing →
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
