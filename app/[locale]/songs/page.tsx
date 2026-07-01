import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackNav from "@/components/BackNav";
import SongsAccordion from "@/components/SongsAccordion";
import type { Song } from "@/components/SongsAccordion";
import { getDictionary, hasLocale } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Songs — Erik Sjøholm",
  description:
    "Selected songs with lyrics, stories, and listening links. Full catalogue on Spotify and Tidal.",
  alternates: { canonical: "https://eriksjoholm.com/songs" },
  openGraph: {
    title: "Songs — Erik Sjøholm",
    description:
      "Selected songs with lyrics, stories, and listening links. Full catalogue on Spotify and Tidal.",
    url: "https://eriksjoholm.com/songs",
    images: [{ url: "/images/portrait.jpg", width: 800, height: 800, alt: "Erik Sjøholm" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Songs — Erik Sjøholm",
    description:
      "Selected songs with lyrics, stories, and listening links. Full catalogue on Spotify and Tidal.",
    images: ["/images/portrait.jpg"],
  },
};

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp";
const TIDAL_ARTIST   = "https://tidal.com/artist/47687355";

function tidalSearch(q: string) {
  return `https://tidal.com/search?q=${encodeURIComponent(q + " Erik Sjøholm")}`;
}

const songs: Song[] = [
  { id: "lycka",          title: "Lycka",                                    meta: "2025 · Swedish", spotify: SPOTIFY_ARTIST,                                              tidal: tidalSearch("Lycka") },
  { id: "ashes",          title: "Ashes",                                                             spotify: "https://open.spotify.com/track/6tcU3CmHiLKfbRNyTL5Evo",   tidal: tidalSearch("Ashes") },
  { id: "night-is-long",  title: "The Night Is Long (That Never Finds The Day)", meta: "2024",        spotify: "https://open.spotify.com/track/2hApCQl0DQfhkEutJFOxVV",   tidal: tidalSearch("The Night Is Long") },
  { id: "midnight-sun",   title: "Midnight Sun",                             meta: "with Mistasy",    spotify: "https://open.spotify.com/track/7KAFu2ouup81IBB6AnQZkM",   tidal: tidalSearch("Midnight Sun") },
  { id: "matsawana",      title: "Matsawana",                                                         spotify: "https://open.spotify.com/track/0ap55kADfSNkisbVEWJWrr",   tidal: tidalSearch("Matsawana") },
  { id: "magari",         title: "Magari",                                   meta: "with Mistasy · Italian / English", spotify: "https://open.spotify.com/track/37US5z8tYa3VWQoqiRAjRF", tidal: tidalSearch("Magari") },
  { id: "gone",           title: "Gone",                                     meta: "with Mistasy",    spotify: "https://open.spotify.com/track/0Ii1bB6sc3ZyXUE5QGzqgB",   tidal: tidalSearch("Gone") },
  { id: "wake-up",        title: "Wake Up",                                  meta: "with Mistasy",    spotify: "https://open.spotify.com/track/5QKRx4B5ToIdKAcmaw093P",   tidal: tidalSearch("Wake Up") },
  { id: "valkommenhem",   title: "Välkommen hem",                            meta: "with The Sjöholm Family Band · Swedish", spotify: "https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr", tidal: tidalSearch("Välkommen hem") },
  { id: "barndomsaren",   title: "Barndomsåren / Pargas 98",                 meta: "with Emil Nordström · Swedish", spotify: "https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu", tidal: tidalSearch("Barndomsåren Pargas") },
];

export default async function Songs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const s = t.songs;

  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Fixed background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-01.jpg)",
          backgroundSize: "cover", backgroundPosition: "center top",
          opacity: 0.09,
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
              {s.eyebrow}
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: "clamp(3rem, 9vw, 6rem)",
                color: "#E8E0D4",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
                marginBottom: "2.5rem",
              }}
            >
              {s.title}
            </h1>

            <span className="block" style={{ width: "2rem", height: "1px", background: "#C8922A", marginBottom: "2.5rem" }} />

            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#7A6F62",
              lineHeight: 1.85,
              maxWidth: "50ch",
              marginBottom: "2rem",
            }}>
              {s.featuredSongs.replace("{n}", String(songs.length))}
            </p>

            <div className="flex flex-wrap gap-6">
              <a
                href={SPOTIFY_ARTIST}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1DB954] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.52rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                  borderBottom: "1px solid rgba(122,111,98,0.3)",
                  paddingBottom: "2px",
                }}
              >
                {s.fullCatalogueSpotify}
              </a>
              <a
                href={TIDAL_ARTIST}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00FFFF] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.52rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                  borderBottom: "1px solid rgba(122,111,98,0.3)",
                  paddingBottom: "2px",
                }}
              >
                {s.fullCatalogueTidal}
              </a>
            </div>
          </div>

          {/* ── Song list ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingBottom: "5rem" }}>
            <SongsAccordion songs={songs} />
          </div>

          {/* ── Three destinations ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "5rem", paddingBottom: "9rem" }}>

            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "3.5rem",
            }}>
              {s.thereIsMore}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">

              {/* Sync Licensing */}
              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.42rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#C8922A",
                  marginBottom: "0.85rem",
                }}>
                  {s.sync.eyebrow}
                </p>
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "1.25rem", color: "#E8E0D4", lineHeight: 1.15, marginBottom: "0.85rem" }}
                >
                  {s.sync.title}
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.78rem",
                  color: "#7A6F62",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}>
                  {s.sync.desc}
                </p>
                <Link
                  href="/sync"
                  className="hover:text-[#C8922A] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#7A6F62",
                    borderBottom: "1px solid rgba(122,111,98,0.3)",
                    paddingBottom: "2px",
                  }}
                >
                  {s.sync.cta}
                </Link>
              </div>

              {/* Songs For You */}
              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.42rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#C8922A",
                  marginBottom: "0.85rem",
                }}>
                  {s.forYou.eyebrow}
                </p>
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "1.25rem", color: "#E8E0D4", lineHeight: 1.15, marginBottom: "0.85rem" }}
                >
                  {s.forYou.title}
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.78rem",
                  color: "#7A6F62",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}>
                  {s.forYou.desc}
                </p>
                <Link
                  href="/contact"
                  className="hover:text-[#C8922A] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#7A6F62",
                    borderBottom: "1px solid rgba(122,111,98,0.3)",
                    paddingBottom: "2px",
                  }}
                >
                  {s.forYou.cta}
                </Link>
              </div>

              {/* Notes */}
              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.42rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#C8922A",
                  marginBottom: "0.85rem",
                }}>
                  {s.notes.eyebrow}
                </p>
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "1.25rem", color: "#E8E0D4", lineHeight: 1.15, marginBottom: "0.85rem" }}
                >
                  {s.notes.title}
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.78rem",
                  color: "#7A6F62",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}>
                  {s.notes.desc}
                </p>
                <a
                  href="https://eriksjoholm-newsletter.beehiiv.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C8922A] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#7A6F62",
                    borderBottom: "1px solid rgba(122,111,98,0.3)",
                    paddingBottom: "2px",
                  }}
                >
                  {s.notes.cta}
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
