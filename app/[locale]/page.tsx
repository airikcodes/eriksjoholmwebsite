import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SongConcierge from "@/components/SongConcierge";
import HeroLanguages from "@/components/HeroLanguages";
import HomePortal from "@/components/HomePortal";
import RevealSection from "@/components/RevealSection";
import BeehiivForm from "@/components/BeehiivForm";
import { getNotes } from "@/lib/notes";
import { getDictionary, hasLocale } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Erik Sjøholm",
  description:
    "Singer-songwriter and storyteller from Ostrobothnia, Finland, based in Luzern, Switzerland. Songs built from real moments, lived quietly and felt deeply.",
  alternates: { canonical: "https://eriksjoholm.com" },
  openGraph: {
    title: "Erik Sjøholm",
    description:
      "Singer-songwriter and storyteller from Finland, based in Luzern, Switzerland.",
    url: "https://eriksjoholm.com",
    images: [{ url: "/images/portrait.jpg", width: 800, height: 800, alt: "Erik Sjøholm" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erik Sjøholm",
    description:
      "Singer-songwriter and storyteller from Finland, based in Luzern, Switzerland.",
    images: ["/images/portrait.jpg"],
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const notes = await getNotes();

  return (
    <>
    {/* Preload first slideshow image — avoids LCP delay from CSS background discovery */}
    {/* eslint-disable-next-line @next/next/no-page-custom-font */}
    <link rel="preload" as="image" href="/images/bg/bg-01.jpg" fetchPriority="high" />
    <main style={{ background: "transparent" }}>
      {/* ── Hero: Concierge ──────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center px-5 sm:px-6 py-16"
        style={{ minHeight: "100svh", zIndex: 2, position: "relative" }}
      >
        <SongConcierge
          preamble={t.concierge.preamble}
          heading={t.concierge.heading}
          timeSlots={t.concierge.timeSlots}
          timeReplace={t.concierge.timeReplace}
          placeholder={t.concierge.placeholder}
          orLabel={t.concierge.or}
          chipLatest={t.concierge.chips.latest}
          chipMostPlayed={t.concierge.chips.mostPlayed}
          chipUnexpected={t.concierge.chips.unexpected}
        />
        <div style={{ marginTop: "2.5rem" }}>
          <HeroLanguages />
        </div>
      </section>

      {/* ── Section 2: portal panel over the video ────────────────────────
          The hero above stays untouched. From here on the background video
          recedes behind a near-opaque wash so type and cover art read cleanly. */}
      <div
        style={{
          position:   "relative",
          zIndex:     2,
          background:
            "linear-gradient(to bottom, rgba(13,11,9,0) 0, rgba(13,11,9,0.9) 9rem)",
        }}
      >
        {/* ── Section 2: portal to the Library ─────────────── */}
        <section
          id="library"
          aria-labelledby="library-heading"
          style={{ maxWidth: "1120px", margin: "0 auto", padding: "8rem 1.25rem 6rem" }}
        >
          <RevealSection>
            <div style={{ marginBottom: "3.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <span className="block" style={{ width: "2rem", height: "1px", background: "#C8922A" }} />
                <p className="eyebrow-label" style={{ color: "#D9A544" }}>{t.home.portal.eyebrow}</p>
              </div>
              <h2
                id="library-heading"
                className="font-[family-name:var(--font-cormorant)] font-light"
                style={{
                  fontSize:      "clamp(2.7rem, 7.5vw, 5.4rem)",
                  lineHeight:    0.98,
                  letterSpacing: "0.01em",
                  color:         "#E8E0D4",
                  marginBottom:  "1.5rem",
                }}
              >
                {t.home.portal.heading}
              </h2>
              <p className="body-copy" style={{ maxWidth: "46ch" }}>
                {t.home.portal.intro}
              </p>
            </div>
          </RevealSection>

          <RevealSection>
            <HomePortal
              t={t.home.portal}
              comingSoon={t.library.comingSoon}
              latestNoteTitle={notes[0]?.title}
            />
          </RevealSection>
        </section>
      </div>

      {/* ── Section 3: the mailing list — its own full-height section ─────── */}
      <section
        id="mailing-list"
        aria-labelledby="mailing-list-heading"
        className="mail-section"
      >
        <div className="mail-bg" aria-hidden="true" />
        <div className="mail-scrim" aria-hidden="true" />
        <div className="mail-inner">
          <RevealSection>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.6rem" }}>
              <span className="block" style={{ width: "2rem", height: "1px", background: "#C8922A" }} />
              <p className="eyebrow-label" style={{ color: "#D9A544" }}>{t.home.newsletter.eyebrow}</p>
            </div>
            <h2
              id="mailing-list-heading"
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize:      "clamp(3rem, 8vw, 6rem)",
                lineHeight:    0.98,
                letterSpacing: "0.01em",
                color:         "#E8E0D4",
                marginBottom:  "1.6rem",
              }}
            >
              {t.home.newsletter.heading}
            </h2>
            <p className="body-copy" style={{ maxWidth: "40ch", marginBottom: "2.4rem", fontSize: "1.05rem" }}>
              {t.home.newsletter.body}
            </p>
            <div className="mail-form">
              <BeehiivForm
                subscribeLabel={t.form.subscribe}
                successMsg={t.form.success}
                errorMsg={t.form.error}
              />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        className="flex flex-col items-center justify-end gap-5 px-6 pb-10"
        style={{ zIndex: 2, position: "relative", minHeight: "7rem", background: "#0D0B09" }}
      >
        {/* Copyright */}
        <div className="flex items-center gap-8">
          <p style={{ fontSize: "0.5rem", letterSpacing: "0.15em", color: "rgba(140,128,118,0.45)" }}>
            © {new Date().getFullYear()} Erik Sjøholm
          </p>
          <a
            href="https://www.instagram.com/eriksjoholmofficial"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(140,128,118,0.45)", padding: "0.5rem 0", display: "block" }}
            className="hover:text-[#1C1A17] transition-colors duration-200"
          >
            @eriksjoholmofficial
          </a>
        </div>
      </footer>
    </main>
    </>
  );
}
