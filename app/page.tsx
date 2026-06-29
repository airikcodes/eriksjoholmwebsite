import Link from "next/link";
import RevealSection from "@/components/RevealSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import SongConcierge from "@/components/SongConcierge";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";

const navItems = [
  { label: "About",   href: "/about",                                          external: false },
  { label: "Songs",   href: "/songs",                                          external: false },
  { label: "Shows",   href: "/storyteller",                                    external: false },
  { label: "Live",    href: "/live",                                            external: false },
  { label: "Notes",   href: "https://eriksjoholm-newsletter.beehiiv.com",      external: true  },
  { label: "Shop",    href: "https://erik-sjoeholm-shop.fourthwall.com",        external: true  },
  { label: "Contact", href: "/contact",                                         external: false },
];

const footerLinks = [
  { label: "Spotify",   href: "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp", hover: "hover:text-[#1DB954]" },
  { label: "Instagram", href: "https://www.instagram.com/eriksjoholmofficial",             hover: "hover:text-[#E8E0D4]" },
  { label: "YouTube",   href: "https://www.youtube.com/eriksjoholmofficial",               hover: "hover:text-[#FF0000]" },
  { label: "Notes",     href: "https://eriksjoholm-newsletter.beehiiv.com",                hover: "hover:text-[#C8922A]" },
];

export default function Home() {
  return (
    <main>
      <BackgroundSlideshow />

      {/* ── Hero: Concierge ──────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center px-5 sm:px-6 py-16"
        style={{ minHeight: "100svh", zIndex: 2, position: "relative" }}
      >
        <SongConcierge />
        <ScrollIndicator />
      </section>

      {/* ── Identity bridge ──────────────────────────────── */}
      <RevealSection>
        <section
          className="flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 2, position: "relative" }}
        >
          <p
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{
              fontStyle: "italic",
              fontSize: "clamp(1.15rem, 2.8vw, 1.75rem)",
              color: "rgba(232,224,212,0.8)",
              letterSpacing: "0.02em",
              lineHeight: 1.75,
              maxWidth: "36ch",
            }}
          >
            Songs that don&apos;t rush — music built from real moments,
            lived quietly and felt deeply.
          </p>
          <span
            className="block"
            style={{ width: "2rem", height: "1px", background: "#C8922A", margin: "2.5rem auto" }}
          />
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.52rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#7A6F62",
          }}>
            Singer-songwriter · Ostrobothnia · Luzern
          </p>
        </section>
      </RevealSection>

      {/* ── Navigation as Rooms ──────────────────────────── */}
      <RevealSection>
        <section
          id="nav"
          className="flex flex-col items-center justify-center px-6 pt-24 pb-40 sm:pt-32 sm:pb-56"
          style={{ minHeight: "75vh", borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 2, position: "relative" }}
        >
          <nav className="flex flex-col gap-5 sm:gap-6 md:gap-7 pl-5 sm:pl-10">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="room-link font-[family-name:var(--font-cormorant)] font-light"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                    letterSpacing: "0.02em",
                    color: "#E8E0D4",
                    transition: "color 200ms ease",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="room-link font-[family-name:var(--font-cormorant)] font-light"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                    letterSpacing: "0.02em",
                    color: "#E8E0D4",
                    transition: "color 200ms ease",
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </section>
      </RevealSection>

      {/* ── Footer ───────────────────────────────────────── */}
      <RevealSection>
        <footer
          className="flex flex-col items-center justify-end gap-10 px-6 pt-24 pb-12"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 2, position: "relative", minHeight: "40vh" }}
        >
          {/* Newsletter invite */}
          <div className="text-center">
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.48rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "0.85rem",
            }}>
              Stay close
            </p>
            <a
              href="https://eriksjoholm-newsletter.beehiiv.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-cormorant)] font-light hover:text-[#C8922A] transition-colors duration-200"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                color: "rgba(232,224,212,0.6)",
                letterSpacing: "0.02em",
              }}
            >
              Subscribe to Notes →
            </a>
          </div>

          {/* Social / streaming links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {footerLinks.map(({ label, href, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${hover} transition-colors duration-200`}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <p style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(122,111,98,0.45)" }}>
            © {new Date().getFullYear()} Erik Sjøholm
          </p>
        </footer>
      </RevealSection>
    </main>
  );
}
