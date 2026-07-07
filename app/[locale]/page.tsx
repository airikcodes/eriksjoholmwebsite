import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RevealSection from "@/components/RevealSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import SongConcierge from "@/components/SongConcierge";
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

  const navItems = [
    { label: t.nav.about,   href: "/about",   external: false },
    { label: t.nav.works,   href: "/works",   external: false },
    { label: t.nav.live,    href: "/live",    external: false },
    { label: t.nav.notes,   href: "/notes",   external: false },
    { label: t.nav.shop,    href: "/shop",    external: false },
    { label: t.nav.contact, href: "/contact", external: false },
  ];

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
      </section>

      {/* ── Navigation as Rooms ──────────────────────────── */}
      <RevealSection>
        <section
          id="nav"
          className="flex flex-col items-center justify-center px-6 pt-24 pb-40 sm:pt-32 sm:pb-56"
          style={{ minHeight: "80vh", zIndex: 2, position: "relative" }}
        >
          <nav data-no-peephole="true" className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="room-link font-[family-name:var(--font-cormorant)] font-light"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                    letterSpacing: "0.02em",
                    transition: "color 200ms ease",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="room-link font-[family-name:var(--font-cormorant)] font-light"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                    letterSpacing: "0.02em",
                    transition: "color 200ms ease",
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </section>
      </RevealSection>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        className="flex flex-col items-center justify-end gap-5 px-6 pb-10"
        style={{ zIndex: 2, position: "relative", minHeight: "clamp(140px, 30vh, 280px)" }}
      >
        {/* Secondary — for professionals */}
        <div className="flex items-center gap-6">
          <a
            href="/storyteller"
            style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(140,128,118,0.45)", padding: "0.5rem 0", display: "block" }}
            className="hover:text-[#C8922A] transition-colors duration-200"
          >
            {t.home.footer.storyteller}
          </a>
          <span style={{ color: "rgba(140,128,118,0.25)", fontSize: "0.5rem" }}>·</span>
          <a
            href="/sync"
            style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(140,128,118,0.45)", padding: "0.5rem 0", display: "block" }}
            className="hover:text-[#C8922A] transition-colors duration-200"
          >
            {t.home.footer.syncLicensing}
          </a>
        </div>
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
