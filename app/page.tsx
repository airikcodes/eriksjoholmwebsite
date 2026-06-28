import Link from "next/link";
import RevealSection from "@/components/RevealSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import SongConcierge from "@/components/SongConcierge";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";

const navItems = [
  { label: "About",   href: "/about",                                          external: false },
  { label: "Songs",   href: "/songs",                                          external: false },
  { label: "Shows",   href: "/storyteller",                                    external: false },
  { label: "Notes",   href: "https://eriksjoholm-newsletter.beehiiv.com",      external: true  },
  { label: "Shop",    href: "https://erik-sjoeholm-shop.fourthwall.com",        external: true  },
  { label: "Contact", href: "/contact",                                         external: false },
];

export default function Home() {
  return (
    <main>
      <BackgroundSlideshow />

      {/* ── Hero: Concierge ──────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center px-6"
        style={{ minHeight: "100svh", zIndex: 2, position: "relative" }}
      >
        <SongConcierge />
        <ScrollIndicator />
      </section>

      {/* ── Navigation as Rooms ──────────────────────────── */}
      <RevealSection>
        <section
          id="nav"
          className="flex flex-col items-center justify-center px-6 pt-32 pb-56"
          style={{ minHeight: "80vh", borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 2, position: "relative" }}
        >
          <nav className="flex flex-col gap-6 md:gap-7 pl-10">
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
      <footer
        className="flex items-end justify-center gap-8 px-6 pb-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 2, position: "relative", minHeight: "50vh" }}
      >
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "#7A6F62" }}>
          © {new Date().getFullYear()} Erik Sjøholm
        </p>
        <a
          href="https://www.instagram.com/eriksjoholmofficial"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
          className="hover:text-[#E8E0D4] transition-colors duration-200"
        >
          @eriksjoholmofficial
        </a>
      </footer>
    </main>
  );
}
