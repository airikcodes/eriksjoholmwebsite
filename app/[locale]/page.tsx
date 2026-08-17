import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        className="flex flex-col items-center justify-end gap-5 px-6 pb-10"
        style={{ zIndex: 2, position: "relative", minHeight: "clamp(140px, 30vh, 280px)" }}
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
