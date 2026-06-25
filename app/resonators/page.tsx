import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Resonators — Erik Sjøholm",
  description: "Join The Resonators — Erik Sjøholm's inner circle of listeners.",
};

const whatYouGet = [
  { title: "Artistic Travelogue", body: "A personal letter from Erik — essays, reflections, and fragments written between songs and stages." },
  { title: "First listening",     body: "New music reaches The Resonators before it reaches anywhere else." },
  { title: "Behind the work",     body: "The stories behind the songs. What was happening, why it needed to be written, how it changed." },
  { title: "Rare recordings",     body: "Live takes, sessions, and versions that exist nowhere else." },
];

export default function Resonators() {
  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{ background: "#0D0B09", color: "#E8E0D4" }}
    >
      <div className="max-w-xl mx-auto">

        <Link
          href="/"
          style={{ fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
          className="hover:text-[#E8E0D4] transition-colors duration-200"
        >
          ← Home
        </Link>

        <h1
          className="font-[family-name:var(--font-cormorant)] font-light mt-16"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#E8E0D4", letterSpacing: "0.03em", lineHeight: 1.1 }}
        >
          The Resonators
        </h1>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62", marginTop: "1rem" }}>
          The inner circle
        </p>

        <div className="mt-14 space-y-8">
          <p
            className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
            style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)", color: "#E8E0D4" }}
          >
            Some songs need an audience that stays in the room.
          </p>

          <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
            The Resonators is a small, quiet community of people who listen closely.
            Not followers — listeners. People who want to know what is being made, and
            why, and what it cost. Who want to be inside the work, not just next to it.
          </p>

          <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
            If a song lands differently in your chest than it does everywhere else —
            this is for you.
          </p>
        </div>

        {/* Divider */}
        <span className="block w-8 h-px mt-14 mb-12" style={{ background: "#C8922A" }} />

        {/* What you get */}
        <div>
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "2rem" }}>
            What you receive
          </p>
          <ul className="space-y-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {whatYouGet.map((item) => (
              <li
                key={item.title}
                className="py-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "1.15rem", color: "#E8E0D4", marginBottom: "0.5rem" }}
                >
                  {item.title}
                </p>
                <p className="text-sm" style={{ color: "#7A6F62", lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-14">
          <a
            href="https://eriksjoholm-newsletter.beehiiv.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#E8E0D4",
              borderBottom: "1px solid rgba(200,146,42,0.4)",
              paddingBottom: "3px",
            }}
            className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
          >
            Join The Resonators →
          </a>
          <p className="text-xs mt-3" style={{ color: "#7A6F62" }}>
            Free. No algorithm. Unsubscribe any time.
          </p>
        </div>

      </div>
    </main>
  );
}
