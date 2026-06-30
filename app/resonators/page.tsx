import type { Metadata } from "next";
import BackNav from "@/components/BackNav";

export const metadata: Metadata = {
  title: "Backstage — Erik Sjøholm",
  description: "Backstage — a private dispatch from Erik Sjøholm for people who want to be closer to the work.",
};

const offerings = [
  {
    index: "I",
    title: "Emails from the making",
    body: "Essays, fragments, and reflections written in the middle of the work.",
  },
  {
    index: "II",
    title: "First listening",
    body: "New music reaches Backstage before it reaches anywhere else. Sometimes rough. Always honest.",
  },
  {
    index: "III",
    title: "The stories behind the songs",
    body: "What was happening when they were written. Why they needed to exist. How they changed on the way.",
  },
  {
    index: "IV",
    title: "Rare recordings",
    body: "Live takes, sessions, and versions that exist nowhere else. The second take that was better than the one that got released.",
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

      <div className="relative px-6 pt-32 pb-32" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <BackNav />

          {/* Title */}
          <div className="mb-14">
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#E8E0D4", letterSpacing: "0.03em", lineHeight: 1.05 }}
            >
              Backstage
            </h1>
          </div>

          {/* Opening */}
          <p
            className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.55rem)", color: "#E8E0D4" }}
          >
            Backstage is a newsletter — a small, private dispatch for people
            who want to be closer to the work than an audience usually gets. Not the finished
            version. The version before that — where the decisions are still
            visible and the cost of making it is still in the room.
          </p>

          <span className="block w-6 h-px my-10" style={{ background: "#C8922A" }} />

          <div className="space-y-6">
            <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.9 }}>
              If you&apos;ve ever wondered what it actually takes to build a
              creative life, this is where that conversation happens.
            </p>
          </div>

          {/* Offerings */}
          <div className="mt-24">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1.25rem" }}>
              What you receive
            </p>

            <ul style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {offerings.map((o) => (
                <li
                  key={o.index}
                  className="py-10 flex gap-6"
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
          <div className="mt-24 text-center py-12 px-8" style={{ border: "1px solid rgba(200,146,42,0.15)", background: "rgba(200,146,42,0.03)" }}>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "#E8E0D4", marginBottom: "1.75rem" }}
            >
              Welcome backstage.
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
              Join Backstage
            </a>
            <p className="text-xs mt-4" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
              Free. Unsubscribe any time.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
