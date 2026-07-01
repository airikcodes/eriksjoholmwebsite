import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackNav from "@/components/BackNav";
import { getDictionary, hasLocale } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Contact — Erik Sjøholm",
  description:
    "Reach Erik Sjøholm for booking, collaboration, press, or commissioned songs. Based in Luzern, performing across Europe.",
  alternates: { canonical: "https://eriksjoholm.com/contact" },
  openGraph: {
    title: "Contact — Erik Sjøholm",
    description:
      "Reach Erik Sjøholm for booking, collaboration, press, or commissioned songs.",
    url: "https://eriksjoholm.com/contact",
    images: [{ url: "/images/portrait.jpg", width: 800, height: 800, alt: "Erik Sjøholm" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Erik Sjøholm",
    description:
      "Reach Erik Sjøholm for booking, collaboration, press, or commissioned songs.",
    images: ["/images/portrait.jpg"],
  },
};

const social = [
  { label: "Instagram", href: "https://www.instagram.com/eriksjoholmofficial",        hover: "hover:text-[#E8E0D4]" },
  { label: "Facebook",  href: "https://facebook.com/eriksjoholmffofficial/",           hover: "hover:text-[#1877F2]" },
  { label: "YouTube",   href: "https://www.youtube.com/eriksjoholmofficial",           hover: "hover:text-[#FF0000]" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/eriksjoholmofficial1717/",  hover: "hover:text-[#0A66C2]" },
  { label: "Spotify",   href: "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp", hover: "hover:text-[#1DB954]" },
  { label: "Tidal",     href: "https://tidal.com/artist/47687355",                    hover: "hover:text-[#00FFFF]" },
];

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const c = t.contact;

  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Fixed background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-05.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.08,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* ── Hero ── */}
          <div style={{ paddingTop: "5.5rem", paddingBottom: "4rem" }}>
            <BackNav />
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: "clamp(3rem, 9vw, 6rem)",
                color: "#E8E0D4",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
              }}
            >
              {c.title}
            </h1>
            <span className="block" style={{ width: "2rem", height: "1px", background: "#C8922A", marginTop: "2.5rem" }} />
          </div>

          {/* ── Write directly ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "5rem", paddingBottom: "5rem" }}>

            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "1.25rem",
            }}>
              {c.writeDirectly}
            </p>
            <a
              href="mailto:erik@eriksjoholm.com"
              className="font-[family-name:var(--font-cormorant)] font-light hover:text-[#E8E0D4] transition-colors duration-200"
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
                letterSpacing: "0.03em",
                color: "#C8922A",
                display: "block",
                marginBottom: "4rem",
              }}
            >
              erik@eriksjoholm.com
            </a>

            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "0",
            }}>
              {c.whatThisIsAbout}
            </p>
            <ul style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "1.25rem" }}>
              {c.topics.map((topic) => (
                <li
                  key={topic.title}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    padding: "1.75rem 0",
                  }}
                >
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)", color: "#E8E0D4" }}
                  >
                    {topic.title}
                  </p>
                  <p
                    className="mt-1 sm:mt-0 sm:text-right sm:max-w-[16rem]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      color: "#7A6F62",
                      lineHeight: 1.7,
                    }}
                  >
                    {topic.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Songs For You ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "5rem", paddingBottom: "5rem" }}>

            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "1.25rem",
            }}>
              {c.commission}
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#E8E0D4",
                lineHeight: 1.05,
                marginBottom: "2rem",
              }}
            >
              {c.songsForYouTitle}
            </h2>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#7A6F62",
              lineHeight: 1.9,
              maxWidth: "52ch",
              marginBottom: "2.5rem",
            }}>
              {c.songsForYouDesc}
            </p>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.82rem",
              color: "#7A6F62",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}>
              {c.toBegin}
            </p>
            <a
              href="mailto:erik@eriksjoholm.com"
              className="font-[family-name:var(--font-cormorant)] font-light hover:text-[#E8E0D4] transition-colors duration-200"
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
                letterSpacing: "0.03em",
                color: "#C8922A",
              }}
            >
              erik@eriksjoholm.com
            </a>
          </div>

          {/* ── For professionals ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "5rem", paddingBottom: "5rem" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "1.5rem",
            }}>
              {c.forProfessionals}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="/storyteller"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.78rem",
                  color: "#7A6F62",
                  letterSpacing: "0.03em",
                  borderBottom: "1px solid rgba(122,111,98,0.25)",
                  paddingBottom: "2px",
                  width: "fit-content",
                }}
                className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
              >
                {c.glennLink}
              </a>
              <a
                href="/sync"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.78rem",
                  color: "#7A6F62",
                  letterSpacing: "0.03em",
                  borderBottom: "1px solid rgba(122,111,98,0.25)",
                  paddingBottom: "2px",
                  width: "fit-content",
                }}
                className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
              >
                {c.syncLink}
              </a>
            </div>
          </div>

          {/* ── Elsewhere ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "5rem", paddingBottom: "9rem" }}>

            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "2.5rem",
            }}>
              {c.elsewhere}
            </p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-12" style={{ maxWidth: "28rem" }}>
              {social.map(({ label, href, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${hover} transition-colors duration-200`}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.82rem",
                    color: "#7A6F62",
                    letterSpacing: "0.03em",
                    padding: "0.5rem 0",
                    display: "block",
                  }}
                >
                  {label} →
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
