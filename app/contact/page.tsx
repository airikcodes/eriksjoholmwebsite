import type { Metadata } from "next";
import BackNav from "@/components/BackNav";

export const metadata: Metadata = {
  title: "Contact — Erik Sjøholm",
  description: "Get in touch with Erik Sjøholm.",
};

const topics = [
  { title: "Booking & live shows",  body: "For concert, festival, or storytelling event enquiries." },
  { title: "Collaboration",         body: "Co-writing, production, or any creative joint venture." },
  { title: "Press & media",        body: "Interviews, features, licensing, or editorial requests." },
  { title: "Everything else",      body: "A kind word is always welcome." },
];

export default function Contact() {
  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Static background — Arbogast second shot */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-05.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.1,
        }} />
      </div>

      <div className="relative px-6 pt-20 pb-48" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <BackNav />

          <h1
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#E8E0D4", letterSpacing: "0.03em", lineHeight: 1.05, marginBottom: "3.5rem" }}
          >
            Let&apos;s be<br />in touch.
          </h1>

          {/* Primary CTA */}
          <div className="mb-16">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1rem" }}>
              Write directly
            </p>
            <a
              href="mailto:erik@eriksjoholm.com"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", letterSpacing: "0.04em", color: "#C8922A" }}
              className="font-[family-name:var(--font-cormorant)] font-light hover:text-[#E8E0D4] transition-colors duration-200"
            >
              erik@eriksjoholm.com
            </a>
          </div>

          <span className="block w-6 h-px mb-12" style={{ background: "rgba(200,146,42,0.35)" }} />

          {/* Topics */}
          <div className="mb-14">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1.25rem" }}>
              What to write about
            </p>
            <ul style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {topics.map((t) => (
                <li
                  key={t.title}
                  className="py-5 flex items-baseline justify-between gap-6"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "1.1rem", color: "#E8E0D4" }}
                  >
                    {t.title}
                  </p>
                  <p className="text-xs text-right" style={{ color: "#7A6F62", lineHeight: 1.7, maxWidth: "14rem" }}>
                    {t.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Songs For You */}
          <div className="mb-16">
            <span className="block w-6 h-px mb-12" style={{ background: "rgba(200,146,42,0.35)" }} />
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1rem" }}>
              Songs For You
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.75rem)", color: "#E8E0D4", lineHeight: 1.1, marginBottom: "1.75rem" }}
            >
              Songs For You
            </h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "#7A6F62", lineHeight: 1.85, maxWidth: "52ch", marginBottom: "1rem" }}>
              A song written for someone you love, for a moment that deserves its
              own music. Weddings, milestones, people who matter. Each one is
              written from scratch, for you alone.
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "#7A6F62", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              To begin a conversation:
            </p>
            <a
              href="mailto:erik@eriksjoholm.com"
              className="font-[family-name:var(--font-cormorant)] font-light hover:text-[#E8E0D4] transition-colors duration-200"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", letterSpacing: "0.04em", color: "#C8922A" }}
            >
              erik@eriksjoholm.com
            </a>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62" }}>
              Elsewhere
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: "Instagram", href: "https://www.instagram.com/eriksjoholmofficial",       hoverClass: "hover:text-[#E8E0D4]" },
                { label: "Facebook",  href: "https://facebook.com/eriksjoholmffofficial/",          hoverClass: "hover:text-[#1877F2]" },
                { label: "YouTube",   href: "https://www.youtube.com/eriksjoholmofficial",          hoverClass: "hover:text-[#FF0000]" },
                { label: "LinkedIn",  href: "https://www.linkedin.com/in/eriksjoholmofficial1717/", hoverClass: "hover:text-[#0A66C2]" },
                { label: "Spotify",   href: "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp", hoverClass: "hover:text-[#1DB954]" },
                { label: "Tidal",     href: "https://tidal.com/artist/47687355",                   hoverClass: "hover:text-[#00FFFF]" },
              ].map(({ label, href, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
                  className={`${hoverClass} transition-colors duration-200`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
