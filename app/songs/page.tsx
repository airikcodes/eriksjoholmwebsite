import type { Metadata } from "next";
import BackNav from "@/components/BackNav";
import SongsAccordion from "@/components/SongsAccordion";
import type { Song } from "@/components/SongsAccordion";

export const metadata: Metadata = {
  title: "Songs — Erik Sjøholm",
  description: "Lyrics, stories, and listening links for every song by Erik Sjøholm.",
};

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp";
const TIDAL_ARTIST   = "https://tidal.com/artist/47687355";

function tidalSearch(q: string) {
  return `https://tidal.com/search?q=${encodeURIComponent(q + " Erik Sjøholm")}`;
}

const songs: Song[] = [
  {
    id: "lycka",
    title: "Lycka",
    meta: "2025 · Swedish",
    spotify: SPOTIFY_ARTIST,
    tidal: tidalSearch("Lycka"),
  },
  {
    id: "ashes",
    title: "Ashes",
    spotify: "https://open.spotify.com/track/6tcU3CmHiLKfbRNyTL5Evo",
    tidal: tidalSearch("Ashes"),
  },
  {
    id: "night-is-long",
    title: "The Night Is Long (That Never Finds The Day)",
    meta: "2024",
    spotify: "https://open.spotify.com/track/2hApCQl0DQfhkEutJFOxVV",
    tidal: tidalSearch("The Night Is Long"),
  },
  {
    id: "midnight-sun",
    title: "Midnight Sun",
    meta: "with Mistasy",
    spotify: "https://open.spotify.com/track/7KAFu2ouup81IBB6AnQZkM",
    tidal: tidalSearch("Midnight Sun"),
  },
  {
    id: "matsawana",
    title: "Matsawana",
    spotify: "https://open.spotify.com/track/0ap55kADfSNkisbVEWJWrr",
    tidal: tidalSearch("Matsawana"),
  },
  {
    id: "magari",
    title: "Magari",
    meta: "with Mistasy · Italian / English",
    spotify: "https://open.spotify.com/track/37US5z8tYa3VWQoqiRAjRF",
    tidal: tidalSearch("Magari"),
  },
  {
    id: "gone",
    title: "Gone",
    meta: "with Mistasy",
    spotify: "https://open.spotify.com/track/0Ii1bB6sc3ZyXUE5QGzqgB",
    tidal: tidalSearch("Gone"),
  },
  {
    id: "wake-up",
    title: "Wake Up",
    meta: "with Mistasy",
    spotify: "https://open.spotify.com/track/5QKRx4B5ToIdKAcmaw093P",
    tidal: tidalSearch("Wake Up"),
  },
  {
    id: "valkommenhem",
    title: "Välkommen hem",
    meta: "with The Sjöholm Family Band · Swedish",
    spotify: "https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr",
    tidal: tidalSearch("Välkommen hem"),
  },
  {
    id: "barndomsaren",
    title: "Barndomsåren / Pargas 98",
    meta: "with Emil Nordström · Swedish",
    spotify: "https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu",
    tidal: tidalSearch("Barndomsåren Pargas"),
  },
];

export default function Songs() {
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

          {/* ── Header ── */}
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
              Songs
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: "clamp(3rem, 9vw, 6rem)",
                color: "#E8E0D4",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
                marginBottom: "2rem",
              }}
            >
              Songs
            </h1>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#7A6F62",
              lineHeight: 1.8,
              maxWidth: "48ch",
            }}>
              The words, where they came from, and where to hear them.
            </p>
          </div>

          {/* ── Song list ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingBottom: "5rem" }}>
            <SongsAccordion songs={songs} />
          </div>

          {/* ── Catalogue footer ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "4rem", paddingBottom: "8rem" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7A6F62",
              marginBottom: "1.5rem",
            }}>
              Full catalogue
            </p>
            <div className="flex flex-wrap gap-8">
              <a
                href={SPOTIFY_ARTIST}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                  borderBottom: "1px solid rgba(200,146,42,0.3)",
                  paddingBottom: "2px",
                }}
              >
                Full catalogue on Spotify →
              </a>
              <a
                href={TIDAL_ARTIST}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#7A6F62",
                  borderBottom: "1px solid rgba(200,146,42,0.3)",
                  paddingBottom: "2px",
                }}
              >
                Full catalogue on Tidal →
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
