import Link from "next/link";
import RevealSection from "@/components/RevealSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import SongConcierge from "@/components/SongConcierge";
import ResonatorsForm from "@/components/ResonatorsForm";

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
      {/* ── Hero: Concierge ──────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center px-6"
        style={{ minHeight: "100svh" }}
      >
        {/* Name in top-left corner */}
        <p
          className="absolute top-7 left-7 font-[family-name:var(--font-cormorant)] font-light"
          style={{
            fontSize: "0.9rem",
            letterSpacing: "0.12em",
            color: "var(--color-muted)",
          }}
        >
          Erik Sjøholm
        </p>

        <SongConcierge />
        <ScrollIndicator />
      </section>

      {/* ── Navigation as Rooms ──────────────────────────── */}
      <RevealSection>
        <section
          className="flex flex-col items-center justify-center px-6 py-32"
          style={{ minHeight: "80vh", borderTop: "1px solid var(--color-border)" }}
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
                  color: "var(--color-text)",
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
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              color: "var(--color-muted)",
              marginBottom: "2rem",
            }}
          >
            Stay in the room. Join The Resonators.
          </p>
          <ResonatorsForm />
        </section>
      </RevealSection>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        className="flex items-center justify-between px-6 md:px-10 py-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--color-muted)" }}>
          © {new Date().getFullYear()} Erik Sjøholm
        </p>
        <a
          href="https://www.instagram.com/eriksjoholmofficial"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-muted)" }}
          className="hover:text-[var(--color-text)] transition-colors duration-200"
        >
          @eriksjoholmofficial
        </a>
      </footer>
    </main>
  );
}
