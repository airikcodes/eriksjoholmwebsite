import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Erik Sjøholm",
  description: "Get in touch with Erik Sjøholm for bookings, collaborations, or just to say hello.",
};

const topics = [
  { label: "Booking & live shows",       body: "For concert, festival, or storytelling event enquiries." },
  { label: "Collaboration",              body: "Co-writing, production, or any creative joint venture." },
  { label: "Press & media",             body: "Interviews, features, licensing, or editorial requests." },
  { label: "Everything else",           body: "A kind word is always welcome." },
];

export default function Contact() {
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
          Contact
        </h1>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62", marginTop: "1rem" }}>
          Let&apos;s be in touch
        </p>

        <div className="mt-14 space-y-8">
          <p
            className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
            style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)", color: "#E8E0D4" }}
          >
            For anything real, write directly.
          </p>

          <a
            href="mailto:erik@eriksjoholm.com"
            style={{
              display: "inline-block",
              fontSize: "1rem",
              letterSpacing: "0.06em",
              color: "#C8922A",
              borderBottom: "1px solid rgba(200,146,42,0.3)",
              paddingBottom: "3px",
            }}
            className="hover:border-[#C8922A] transition-colors duration-200"
          >
            erik@eriksjoholm.com
          </a>
        </div>

        {/* Divider */}
        <span className="block w-8 h-px mt-14 mb-12" style={{ background: "#C8922A" }} />

        {/* Topics */}
        <div>
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1.5rem" }}>
            What to write about
          </p>
          <ul className="space-y-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {topics.map((t) => (
              <li
                key={t.label}
                className="py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "1.1rem", color: "#E8E0D4", marginBottom: "0.35rem" }}
                >
                  {t.label}
                </p>
                <p className="text-xs" style={{ color: "#7A6F62", lineHeight: 1.7 }}>
                  {t.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="mt-14 space-y-4">
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62" }}>
            Elsewhere
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <a
              href="https://www.instagram.com/eriksjoholmofficial"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
              className="hover:text-[#E8E0D4] transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
              className="hover:text-[#1DB954] transition-colors duration-200"
            >
              Spotify
            </a>
            <a
              href="https://tidal.com/artist/47687355"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
              className="hover:text-[#00FFFF] transition-colors duration-200"
            >
              Tidal
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
