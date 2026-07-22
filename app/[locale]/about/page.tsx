import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackNav from "@/components/BackNav";
import RevealSection from "@/components/RevealSection";
import { getDictionary, hasLocale } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "About — Erik Sjøholm",
  description:
    "Singer-songwriter and storyteller from Ostrobothnia, the Swedish-speaking coast of Finland, based in Luzern, Switzerland. Shaped by Lennon, Buckley, Mitchell, and Rice.",
  alternates: { canonical: "https://eriksjoholm.com/about" },
  openGraph: {
    title: "About — Erik Sjøholm",
    description:
      "Singer-songwriter from Ostrobothnia, Finland, based in Luzern, Switzerland.",
    url: "https://eriksjoholm.com/about",
    images: [{ url: "/images/portrait.jpg", width: 800, height: 800, alt: "Erik Sjøholm" }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Erik Sjøholm",
    description: "Singer-songwriter from Ostrobothnia, Finland, based in Luzern, Switzerland.",
    images: ["/images/portrait.jpg"],
  },
};

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const a = t.about;

  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Fixed background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-03.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.08,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* ── Back navigation ── */}
          <div style={{ paddingTop: "5.5rem" }}>
            <BackNav />
          </div>

          {/* ── Portrait & name ── */}
          <div className="flex flex-col items-center text-center" style={{ paddingBottom: "5rem" }}>
            <div style={{
              width: "clamp(120px, 28vw, 160px)",
              height: "clamp(120px, 28vw, 160px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid rgba(200,146,42,0.25)",
              marginBottom: "2.25rem",
              flexShrink: 0,
            }}>
              <Image
                src="/images/portrait.jpg"
                alt="Erik Sjøholm"
                width={160}
                height={160}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                color: "#E8E0D4",
                letterSpacing: "0.04em",
                lineHeight: 1.05,
              }}
            >
              Erik Sjøholm
            </h1>
            <span className="block" style={{ width: "2rem", height: "1px", background: "#C8922A", margin: "1.5rem auto" }} />
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.52rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
            }}>
              {a.subtitle}
            </p>
          </div>

          {/* ── Bio ── */}
          <RevealSection>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "5rem", paddingBottom: "5rem" }}>

              <p
                className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
                style={{ fontSize: "clamp(1.15rem, 2.8vw, 1.55rem)", color: "#E8E0D4" }}
              >
                {a.bio1}
              </p>

              <span className="block" style={{ width: "2rem", height: "1px", background: "#C8922A", margin: "3rem 0" }} />

              <div className="space-y-8">
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  color: "#7A6F62",
                  lineHeight: 1.9,
                }}>
                  {a.bio2}
                </p>

                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  color: "#7A6F62",
                  lineHeight: 1.9,
                }}>
                  {a.bio3}
                </p>
              </div>

              {/* Pull quote */}
              <blockquote
                className="font-[family-name:var(--font-cormorant)] font-light italic"
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
                  color: "#C8922A",
                  borderLeft: "1px solid rgba(200,146,42,0.35)",
                  paddingLeft: "1.5rem",
                  marginTop: "3.5rem",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;{a.pullQuote}&rdquo;
              </blockquote>

            </div>
          </RevealSection>

          {/* ── Links ── */}
          <RevealSection>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "5rem", paddingBottom: "8rem" }}>

              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.45rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#7A6F62",
                marginBottom: "3.5rem",
              }}>
                {a.findTheWork}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 sm:gap-y-16 gap-x-12">

                <div>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.45rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#7A6F62",
                    marginBottom: "1.25rem",
                  }}>
                    {a.listen}
                  </p>
                  <div className="space-y-4">
                    <a
                      href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp"
                      target="_blank" rel="noopener noreferrer"
                      className="block hover:text-[#1DB954] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      Spotify →
                    </a>
                    <a
                      href="https://tidal.com/artist/47687355"
                      target="_blank" rel="noopener noreferrer"
                      className="block hover:text-[#00FFFF] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      Tidal →
                    </a>
                  </div>
                </div>

                <div>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.45rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#7A6F62",
                    marginBottom: "1.25rem",
                  }}>
                    {a.follow}
                  </p>
                  <div className="space-y-4">
                    <a
                      href="https://www.instagram.com/eriksjoholmofficial"
                      target="_blank" rel="noopener noreferrer"
                      className="block hover:text-[#E8E0D4] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      Instagram →
                    </a>
                    <a
                      href="https://facebook.com/eriksjoholmffofficial/"
                      target="_blank" rel="noopener noreferrer"
                      className="block hover:text-[#1877F2] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      Facebook →
                    </a>
                    <a
                      href="https://www.youtube.com/eriksjoholmofficial"
                      target="_blank" rel="noopener noreferrer"
                      className="block hover:text-[#FF0000] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      YouTube →
                    </a>
                    <a
                      href="https://www.linkedin.com/in/eriksjoholmofficial1717/"
                      target="_blank" rel="noopener noreferrer"
                      className="block hover:text-[#0A66C2] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      LinkedIn →
                    </a>
                    <Link
                      href="/notes"
                      className="block hover:text-[#C8922A] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      Notes →
                    </Link>
                  </div>
                </div>

                <div>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.45rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#7A6F62",
                    marginBottom: "1.25rem",
                  }}>
                    {a.contact}
                  </p>
                  <a
                    href="mailto:erik@eriksjoholm.com"
                    className="block hover:text-[#C8922A] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                  >
                    erik@eriksjoholm.com
                  </a>
                </div>

                <div>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.45rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#7A6F62",
                    marginBottom: "1.25rem",
                  }}>
                    {a.explore}
                  </p>
                  <div className="space-y-4">
                    <Link
                      href="/works"
                      className="block hover:text-[#E8E0D4] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      {a.works}
                    </Link>
                    <Link
                      href="/storyteller"
                      className="block hover:text-[#E8E0D4] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      {a.theStoryteller}
                    </Link>
                    <Link
                      href="/sync"
                      className="block hover:text-[#E8E0D4] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#7A6F62", letterSpacing: "0.03em", padding: "0.25rem 0" }}
                    >
                      {a.syncLicensing}
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </RevealSection>

        </div>
      </div>
    </main>
  );
}
