import type { Metadata } from "next";
import BackNav from "@/components/BackNav";
import SyncCatalog from "@/components/SyncCatalog";

export const metadata: Metadata = {
  title: "Sync Licensing — Erik Sjøholm",
  description: "License music by Erik Sjøholm for film, TV, advertising, and documentary. One-stop clearance. 22 songs. Contact directly for placement.",
};

export default function Sync() {
  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Static background — Croatia storying (mood-lit, cinematic) */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-04.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.1,
        }} />
      </div>

      <div className="relative px-6 pt-20 pb-24" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <BackNav />

          {/* ── Hero ──────────────────────────────────────────── */}
          <div className="mb-16">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C8922A", marginBottom: "1.25rem" }}>
              Film · TV · Advertising · Documentary
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#E8E0D4", letterSpacing: "0.03em", lineHeight: 1.05 }}
            >
              License my music<br />for your project
            </h1>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light mt-8"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)", color: "rgba(232,224,212,0.7)", lineHeight: 1.6, maxWidth: "38rem" }}
            >
              Singer-songwriter music with emotional depth and cinematic range.
              Spanning English, Swedish, and Italian. One-stop clearance — master
              and publishing in one conversation.
            </p>
          </div>

          {/* ── At a glance ───────────────────────────────────── */}
          <div
            className="grid grid-cols-2 gap-px mb-16"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.07)" }}
          >
            {[
              { label: "Tracks available",  value: "22" },
              { label: "Clearance",         value: "One-stop" },
              { label: "Languages",         value: "EN · SV · IT" },
              { label: "Response time",     value: "24–48 hours" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="px-6 py-6"
                style={{ background: "#0D0B09" }}
              >
                <p style={{ fontSize: "0.42rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "0.5rem" }}>
                  {label}
                </p>
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "1.4rem", color: "#E8E0D4" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          <span className="block w-6 h-px mb-16" style={{ background: "rgba(200,146,42,0.35)" }} />

          {/* ── Catalog ──────────────────────────────────────── */}
          <div className="mb-20">
            <div className="flex items-baseline justify-between gap-4 mb-8">
              <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62" }}>
                Browse the catalogue
              </p>
              <a
                href="https://eriksjoholmofficial.disco.ac/cat/1272966979"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.48rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8922A", flexShrink: 0 }}
                className="hover:text-[#E8E0D4] transition-colors duration-200"
              >
                Open in Disco →
              </a>
            </div>
            <SyncCatalog />
          </div>

          <span className="block w-6 h-px mb-16" style={{ background: "rgba(200,146,42,0.35)" }} />

          {/* ── What works where ──────────────────────────────── */}
          <div className="mb-20">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1.5rem" }}>
              What the music suits
            </p>
            <div className="grid grid-cols-1 gap-px" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.07)" }}>
              {[
                {
                  type: "Film & drama",
                  desc: "Emotional peaks, quiet aftermath, introspective character moments. Works best where the scene needs presence without overtaking dialogue.",
                },
                {
                  type: "Documentary",
                  desc: "Storytelling-driven compositions that carry narrative weight. Particular strength in human-interest, travel, and nature subjects.",
                },
                {
                  type: "Advertising & brand",
                  desc: "Warm, honest, and non-generic. Suits brands that want authenticity over polish — lifestyle, outdoor, Nordic heritage.",
                },
                {
                  type: "Short film & indie",
                  desc: "The catalog was built track by track with story in mind. Ideal for directors who want music that already knows how to serve a scene.",
                },
              ].map(({ type, desc }) => (
                <div
                  key={type}
                  className="px-6 py-7"
                  style={{ background: "#0D0B09" }}
                >
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "1.1rem", color: "#E8E0D4", marginBottom: "0.5rem" }}
                  >
                    {type}
                  </p>
                  <p className="text-sm" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── How it works ──────────────────────────────────── */}
          <div className="mb-20">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1.5rem" }}>
              How licensing works
            </p>
            <ul style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                { n: "01", title: "Find a track", body: "Browse the catalogue above, listen on Spotify, or browse the full Disco library for stems and alternate versions." },
                { n: "02", title: "Get in touch", body: "Email with the track name, your project type, and intended use. No forms. No agents in between." },
                { n: "03", title: "One-stop clearance", body: "Erik controls both master and publishing. One conversation, one agreement. Fast turnaround for deadline-sensitive projects." },
                { n: "04", title: "Custom work", body: "Need something written to picture or a stem mix? That's possible too. Reach out with a brief." },
              ].map(({ n, title, body }) => (
                <li
                  key={n}
                  className="py-7 flex gap-6"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span style={{ fontSize: "0.48rem", color: "rgba(200,146,42,0.35)", letterSpacing: "0.08em", paddingTop: "0.25rem", flexShrink: 0, width: "1.4rem" }}>
                    {n}
                  </span>
                  <div>
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.1rem", color: "#E8E0D4", marginBottom: "0.4rem" }}
                    >
                      {title}
                    </p>
                    <p className="text-sm" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ───────────────────────────────────────── */}
          <div
            className="p-8 text-center"
            style={{ border: "1px solid rgba(200,146,42,0.2)", background: "rgba(200,146,42,0.03)" }}
          >
            <p style={{ fontSize: "0.48rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1.5rem" }}>
              Hear a track that fits?
            </p>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(1.2rem, 3vw, 1.7rem)", color: "#E8E0D4", marginBottom: "2rem", lineHeight: 1.4 }}
            >
              Write directly. No middlemen.<br />Licensing is handled personally.
            </p>
            <a
              href="mailto:erik@eriksjoholm.com?subject=Sync%20licensing%20enquiry"
              className="hover:text-[#E8E0D4] transition-colors duration-200"
              style={{
                display: "inline-block",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C8922A",
                borderBottom: "1px solid rgba(200,146,42,0.4)",
                paddingBottom: "3px",
              }}
            >
              erik@eriksjoholm.com
            </a>
            <p className="text-xs mt-5" style={{ color: "#7A6F62", letterSpacing: "0.05em" }}>
              Typical response within 24–48 hours.
            </p>
          </div>

          {/* ── Disco link ────────────────────────────────────── */}
          <div className="mt-12 text-center">
            <a
              href="https://eriksjoholmofficial.disco.ac/cat/1272966979"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
              className="hover:text-[#C8922A] transition-colors duration-200"
            >
              Full catalogue with stems on Disco →
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
