import type { Metadata } from "next";
import Link from "next/link";
import BackNav from "@/components/BackNav";

export const metadata: Metadata = {
  title: "Live — Erik Sjøholm",
  description: "Upcoming shows and tour dates for Erik Sjøholm.",
};

const pastStages = [
  { venue: "GLÖD Storytelling Festival",   location: "Vasa, Finland" },
  { venue: "Amsterdam Storytelling Festival", location: "Amsterdam, Netherlands" },
  { venue: "Mezrab",                        location: "Amsterdam, Netherlands" },
  { venue: "Arbogast Festival",             location: "Mölltorp, Sweden" },
  { venue: "Tüssenland Festival",           location: "Zwolle, Netherlands" },
  { venue: "Währinge Wohnzimmer",           location: "Vienna, Austria" },
];

export default function Live() {
  return (
    <main className="min-h-screen" style={{ background: "#F7F3EE", color: "#1C1A17" }}>

      {/* Fixed background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-04.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.08,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* ── Hero ── */}
          <div style={{ paddingTop: "5.5rem", paddingBottom: "5rem" }}>
            <BackNav />
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.48rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "1.25rem",
            }}>
              Tour dates
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: "clamp(3rem, 9vw, 6rem)",
                color: "#1C1A17",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
              }}
            >
              Live
            </h1>
            <span className="block" style={{ width: "2rem", height: "1px", background: "#C8922A", marginTop: "2.5rem" }} />
          </div>

          {/* ── Upcoming shows ── */}
          <div style={{ borderTop: "1px solid rgba(28,26,23,0.08)", paddingTop: "5rem", paddingBottom: "5rem" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "3rem",
            }}>
              Upcoming
            </p>

            <p
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
                color: "#1C1A17",
                lineHeight: 1.3,
                marginBottom: "1.5rem",
              }}
            >
              No dates announced yet.
            </p>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#7A6F62",
              lineHeight: 1.85,
              maxWidth: "44ch",
              marginBottom: "2.5rem",
            }}>
              When shows are confirmed, subscribers to Notes hear first.
            </p>
            <a
              href="https://eriksjoholm-newsletter.beehiiv.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-[#C8922A] hover:text-[#F7F3EE] transition-all duration-200"
              style={{
                display: "inline-block",
                border: "1px solid #C8922A",
                color: "#C8922A",
                padding: "0.7rem 2rem",
                fontFamily: "var(--font-inter)",
                fontSize: "0.5rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Subscribe to Notes
            </a>
          </div>

          {/* ── Past stages ── */}
          <div style={{ borderTop: "1px solid rgba(28,26,23,0.08)", paddingTop: "5rem", paddingBottom: "5rem" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "0",
            }}>
              Past stages
            </p>
            <ul style={{ borderTop: "1px solid rgba(28,26,23,0.08)", marginTop: "1.25rem" }}>
              {pastStages.map((s) => (
                <li
                  key={s.venue}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  style={{
                    borderBottom: "1px solid rgba(28,26,23,0.08)",
                    padding: "1.6rem 0",
                  }}
                >
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)", color: "#1C1A17" }}
                  >
                    {s.venue}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.62rem",
                    color: "#7A6F62",
                    letterSpacing: "0.08em",
                    flexShrink: 0,
                    marginTop: "0.3rem",
                  }}>
                    {s.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Book a show ── */}
          <div style={{ borderTop: "1px solid rgba(28,26,23,0.08)", paddingTop: "5rem", paddingBottom: "9rem" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "1.25rem",
            }}>
              Booking
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#1C1A17",
                lineHeight: 1.05,
                marginBottom: "1.75rem",
              }}
            >
              Bring Erik to<br />your stage.
            </h2>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#7A6F62",
              lineHeight: 1.9,
              maxWidth: "48ch",
              marginBottom: "2rem",
            }}>
              For concerts, festivals, storytelling events, and private shows —
              reach out directly. A full tech rider and press kit are available
              on request.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="mailto:erik@eriksjoholm.com"
                className="font-[family-name:var(--font-cormorant)] font-light hover:text-[#1C1A17] transition-colors duration-200"
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
                  letterSpacing: "0.03em",
                  color: "#C8922A",
                }}
              >
                erik@eriksjoholm.com
              </a>
              <Link
                href="/storyteller"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                  borderBottom: "1px solid rgba(122,111,98,0.35)",
                  paddingBottom: "2px",
                }}
                className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
              >
                About the GLENN show →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
