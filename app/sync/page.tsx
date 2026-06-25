import type { Metadata } from "next";
import Link from "next/link";
import SyncCatalog from "@/components/SyncCatalog";

export const metadata: Metadata = {
  title: "Sync Licensing — Erik Sjøholm",
  description:
    "Original music available for film, TV, advertising, and other media. One-stop licensing. Browse the catalog on Disco.",
};

export default function Sync() {
  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Fixed background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(/images/bg/bg-02.jpg)",
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.08,
          }}
        />
      </div>

      <div className="relative px-6 pt-28 pb-24" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          {/* 1. Eyebrow + Title */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "1rem",
            }}
          >
            Sync Licensing
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              color: "#E8E0D4",
              letterSpacing: "0.03em",
              lineHeight: 1.05,
            }}
          >
            Music for picture.
          </h1>

          {/* 2. Intro */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#7A6F62",
              lineHeight: 1.7,
              marginTop: "2rem",
              maxWidth: "65ch",
            }}
          >
            Original songs and instrumentals available for film, television,
            advertising, and interactive media. Most tracks are offered as
            one-stop solutions — a single license clears both master and
            publishing rights.
          </p>

          {/* 3. Catalog */}
          <div style={{ marginTop: "3.5rem" }}>
            <div className="flex items-baseline justify-between gap-4" style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.45rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                }}
              >
                Catalogue
              </p>
              <a
                href="https://eriksjoholmofficial.disco.ac/cat/1272966979"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.48rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C8922A",
                  flexShrink: 0,
                }}
              >
                Open on Disco →
              </a>
            </div>
            <SyncCatalog />
          </div>

          {/* 4. What's available */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            style={{ marginTop: "4rem" }}
          >
            {[
              {
                label: "Format",
                title: "One-stop licensing",
                desc: "A single agreement covers both master recording and publishing rights. No chasing multiple rights holders.",
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
            ].map(({ label, title, desc }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.45rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#C8922A",
                  }}
                >
                  {label}
                </p>
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "1.05rem", color: "#E8E0D4", marginTop: "0.35rem" }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    color: "#7A6F62",
                    marginTop: "0.25rem",
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* 5. Get in touch */}
          <div
            style={{
              marginTop: "4rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: "3rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.45rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#7A6F62",
              }}
            >
              Get in touch
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "2rem", color: "#E8E0D4", marginTop: "0.75rem" }}
            >
              Send a brief.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8rem",
                color: "#7A6F62",
                marginTop: "0.75rem",
                lineHeight: 1.7,
                maxWidth: "48ch",
              }}
            >
              Whether you have a specific scene, a mood reference, or just want
              to explore what&apos;s in the catalog — get in touch directly.
              Custom quotes are available for all project sizes.
            </p>
            <a
              href="mailto:erik@eriksjoholm.com"
              className="font-[family-name:var(--font-cormorant)] font-light hover:opacity-80 transition-opacity duration-200"
              style={{
                display: "block",
                fontSize: "1.3rem",
                color: "#C8922A",
                marginTop: "1.25rem",
              }}
            >
              erik@eriksjoholm.com
            </a>
          </div>

          {/* 6. Back navigation */}
          <div style={{ marginTop: "4rem" }}>
            <Link
              href="/work"
              className="hover:text-[#C8922A] transition-colors duration-200"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#7A6F62",
              }}
            >
              ← Music &amp; Work
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
