import Link from "next/link";
import RevealSection from "@/components/RevealSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import SongConcierge from "@/components/SongConcierge";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";

const navItems = [
  { label: "About",   href: "/about",                                          external: false },
  { label: "Songs",   href: "/songs",                                          external: false },
  { label: "Shows",   href: "/live",                                           external: false },
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
        className="relative flex flex-col items-center justify-center px-5 sm:px-6 py-16"
        style={{ minHeight: "100svh", zIndex: 2, position: "relative" }}
      >
        <SongConcierge />
        <ScrollIndicator />
      </section>

      {/* ── Navigation as Rooms ──────────────────────────── */}
      <RevealSection>
        <section
          id="nav"
          className="flex flex-col items-center justify-center px-6 pt-24 pb-40 sm:pt-32 sm:pb-56"
          style={{ minHeight: "80vh", borderTop: "1px solid rgba(28,26,23,0.08)", zIndex: 2, position: "relative" }}
        >
          <nav className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7">
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
                    color: "#1C1A17",
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
                    color: "#1C1A17",
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
        className="flex flex-col items-center justify-end gap-6 px-6 pb-10"
        style={{ borderTop: "1px solid rgba(28,26,23,0.08)", zIndex: 2, position: "relative", minHeight: "40vh" }}
      >
        {/* Secondary — for professionals */}
        <div className="flex items-center gap-6">
          <a
            href="/storyteller"
            style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(140,128,118,0.45)" }}
            className="hover:text-[#C8922A] transition-colors duration-200"
          >
            Storyteller
          </a>
          <span style={{ color: "rgba(140,128,118,0.25)", fontSize: "0.5rem" }}>·</span>
          <a
            href="/sync"
            style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(140,128,118,0.45)" }}
            className="hover:text-[#C8922A] transition-colors duration-200"
          >
            Sync Licensing
          </a>
        </div>
        {/* Copyright */}
        <div className="flex items-center gap-8">
          <p style={{ fontSize: "0.5rem", letterSpacing: "0.15em", color: "rgba(140,128,118,0.45)" }}>
            © {new Date().getFullYear()} Erik Sjøholm
          </p>
          <a
            href="https://www.instagram.com/eriksjoholmofficial"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(140,128,118,0.45)" }}
            className="hover:text-[#1C1A17] transition-colors duration-200"
          >
            @eriksjoholmofficial
          </a>
        </div>
      </footer>
    </main>
  );
}
