import Link from "next/link";
import RevealSection from "@/components/RevealSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import SongConcierge from "@/components/SongConcierge";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";

const navItems = [
  { label: "About",           href: "/about" },
  { label: "Music & Work",    href: "/work" },
  { label: "The Storyteller", href: "/storyteller" },
  { label: "The Resonators",  href: "/resonators" },
  { label: "Contact",         href: "/contact" },
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
          className="flex flex-col items-center justify-center px-6 py-32"
          style={{ minHeight: "80vh", borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 2, position: "relative" }}
        >
          <nav className="flex flex-col gap-6 md:gap-7 pl-10">
            {navItems.map((item) => (
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
            ))}
          </nav>
        </section>
      </RevealSection>

      {/* ── The Resonators ───────────────────────────────── */}
      <RevealSection>
        <section
          className="py-32 px-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 2, position: "relative" }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              color: "#7A6F62",
              marginBottom: "1.75rem",
            }}
          >
            Stay in the room.
          </p>
          <a
            href="https://eriksjoholm-newsletter.beehiiv.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#E8E0D4",
              borderBottom: "1px solid rgba(200,146,42,0.4)",
              paddingBottom: "2px",
              transition: "border-color 200ms, color 200ms",
            }}
            className="hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]"
          >
            Join The Resonators
          </a>
        </section>
      </RevealSection>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        className="flex items-center justify-between px-6 md:px-10 py-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 2, position: "relative" }}
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
