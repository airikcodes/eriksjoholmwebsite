import type { Metadata } from "next";
import BackNav from "@/components/BackNav";

export const metadata: Metadata = {
  title: "The Resonators — Erik Sjøholm",
  description: "Join The Resonators — Erik Sjøholm's inner circle of listeners.",
};

const offerings = [
  {
    index: "I",
    title: "Artistic Travelogue",
    body: "A personal letter from Erik — essays, reflections, and fragments written between songs and stages. Not a newsletter. A dispatch.",
  },
  {
    index: "II",
    title: "First listening",
    body: "New music reaches The Resonators before it reaches anywhere else. You hear it in its earliest form — sometimes rough, always honest.",
  },
  {
    index: "III",
    title: "Behind the work",
    body: "The stories behind the songs. What was happening when they were written, why they needed to exist, and how they changed on the way.",
  },
  {
    index: "IV",
    title: "Rare recordings",
    body: "Live takes, sessions, and versions that exist nowhere else. The room sound. The second take that was better than the one that got released.",
  },
];

export default function Resonators() {
  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Static background — Croatia performance */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-04.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.11,
        }} />
      </div>

      <div className="relative px-6 pt-20 pb-24" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <BackNav />

          {/* Title */}
          <div className="mb-14">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C8922A", marginBottom: "1.25rem" }}>
              The inner circle
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#E8E0D4", letterSpacing: "0.03em", lineHeight: 1.05 }}
            >
              The Resonators
            </h1>
          </div>

          {/* Opening */}
          <p
            className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.55rem)", color: "#E8E0D4" }}
          >
            Some songs need an audience that stays in the room.
          </p>

          <span className="block w-6 h-px my-10" style={{ background: "#C8922A" }} />

          <div className="space-y-6">
            <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.9 }}>
              The Resonators is a small, quiet community of people who listen
              closely. Not followers — listeners. People who want to know what
              is being made, and why, and what it cost. Who want to be inside
              the work, not just next to it.
            </p>

            <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.9 }}>
              If a song lands differently in your chest than it does in the
              background — this is for you.
            </p>
          </div>

          {/* Offerings */}
          <div className="mt-14">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1.25rem" }}>
              What you receive
            </p>
            <ul style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {offerings.map((o) => (
                <li
                  key={o.index}
                  className="py-7 flex gap-6"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span
                    className="font-[family-name:var(--font-cormorant)] font-light shrink-0"
                    style={{ fontSize: "0.85rem", color: "rgba(200,146,42,0.5)", letterSpacing: "0.1em", paddingTop: "0.2rem", width: "1.5rem" }}
                  >
                    {o.index}
                  </span>
                  <div>
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.2rem", color: "#E8E0D4", marginBottom: "0.5rem" }}
                    >
                      {o.title}
                    </p>
                    <p className="text-sm" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
                      {o.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-14 text-center py-12 px-8" style={{ border: "1px solid rgba(200,146,42,0.15)", background: "rgba(200,146,42,0.03)" }}>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "#E8E0D4", marginBottom: "1.75rem" }}
            >
              Stay in the room.
            </p>
            <a
              href="https://eriksjoholm-newsletter.beehiiv.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#E8E0D4",
                borderBottom: "1px solid rgba(200,146,42,0.5)",
                paddingBottom: "3px",
              }}
              className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
            >
              Join The Resonators
            </a>
            <p className="text-xs mt-4" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
              Free. No algorithm. Unsubscribe any time.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
