import type { Metadata } from "next";
import BackNav from "@/components/BackNav";
import SyncCatalog from "@/components/SyncCatalog";

export const metadata: Metadata = {
  title: "Sync Licensing — Erik Sjøholm",
  description:
    "Original music available for film, TV, advertising, and other media. One-stop licensing. Browse the catalog on Disco.",
};

const specs = [
  {
    label: "Format",
    title: "One-stop licensing",
    desc: "A single agreement clears both master and publishing rights. No chasing multiple rights holders.",
  },
  {
    label: "Catalog",
    title: "~300 original songs",
    desc: "Singer-songwriter material across English and Scandinavian languages. Atmospheric, narrative, emotionally grounded.",
  },
  {
    label: "Delivery",
    title: "Stems on request",
    desc: "Clean stems and instrumentals available for most tracks. Reach out with your brief.",
  },
];

export default function Sync() {
  return (
    <main className="min-h-screen" style={{ background: "#F7F3EE", color: "#1C1A17" }}>

      {/* Fixed background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-02.jpg)",
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
              Sync Licensing
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
              Music for<br />picture.
            </h1>
            <span className="block" style={{ width: "2rem", height: "1px", background: "#C8922A", margin: "2.5rem 0" }} />
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#7A6F62",
              lineHeight: 1.85,
              maxWidth: "52ch",
            }}>
              Original songs and instrumentals for film, television, advertising,
              and interactive media. Most tracks are one-stop — a single license
              clears both master and publishing rights.
            </p>
          </div>

          {/* ── Catalogue ── */}
          <div style={{ borderTop: "1px solid rgba(28,26,23,0.08)", paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="flex items-baseline justify-between gap-4" style={{ marginBottom: "3rem" }}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.45rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#7A6F62",
              }}>
                Catalogue
              </p>
              <a
                href="https://eriksjoholmofficial.disco.ac/cat/1272966979"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.48rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C8922A",
                  flexShrink: 0,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200,146,42,0.35)",
                  paddingBottom: "2px",
                }}
                className="hover:border-[#C8922A] transition-colors duration-200"
              >
                Open on Disco →
              </a>
            </div>
            <SyncCatalog />
          </div>

          {/* ── Specs ── */}
          <div style={{ borderTop: "1px solid rgba(28,26,23,0.08)", paddingTop: "5rem", paddingBottom: "5rem" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "3.5rem",
            }}>
              What you get
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              {specs.map(({ label, title, desc }) => (
                <div key={label}>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.42rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#C8922A",
                    marginBottom: "0.85rem",
                  }}>
                    {label}
                  </p>
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "1.25rem", color: "#1C1A17", marginBottom: "0.65rem", lineHeight: 1.15 }}
                  >
                    {title}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.78rem",
                    color: "#7A6F62",
                    lineHeight: 1.8,
                  }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Contact ── */}
          <div style={{ borderTop: "1px solid rgba(28,26,23,0.08)", paddingTop: "5rem", paddingBottom: "9rem" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "1.25rem",
            }}>
              Get in touch
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
              Send a brief.
            </h2>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.82rem",
              color: "#7A6F62",
              lineHeight: 1.85,
              maxWidth: "48ch",
              marginBottom: "2.25rem",
            }}>
              Whether you have a specific scene, a mood reference, or just want
              to explore the catalog — reach out directly. Custom quotes available
              for all project sizes.
            </p>
            <a
              href="mailto:erik@eriksjoholm.com"
              className="font-[family-name:var(--font-cormorant)] font-light hover:text-[#1C1A17] transition-colors duration-200"
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
                color: "#C8922A",
              }}
            >
              erik@eriksjoholm.com
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
