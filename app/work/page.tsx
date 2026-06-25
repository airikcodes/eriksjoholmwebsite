import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Music & Work — Erik Sjøholm",
  description: "Releases, collaborations and recorded work by Erik Sjøholm.",
};

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp";
const TIDAL_ARTIST   = "https://tidal.com/artist/47687355";

function tidalSearch(q: string) {
  return `https://tidal.com/search?q=${encodeURIComponent(q + " Erik Sjøholm")}`;
}

const releases = [
  {
    title: "Lycka",
    meta: "Single · 2025",
    spotify: SPOTIFY_ARTIST,
    tidal: tidalSearch("Lycka"),
  },
  {
    title: "Midnight Sun",
    meta: "Single · with Mistasy",
    spotify: "https://open.spotify.com/track/7KAFu2ouup81IBB6AnQZkM",
    tidal: tidalSearch("Midnight Sun"),
  },
  {
    title: "Matsawana",
    meta: "Single · Erik Sjøholm",
    spotify: "https://open.spotify.com/track/0ap55kADfSNkisbVEWJWrr",
    tidal: tidalSearch("Matsawana"),
  },
  {
    title: "Ashes",
    meta: "Single · Erik Sjøholm",
    spotify: "https://open.spotify.com/track/6tcU3CmHiLKfbRNyTL5Evo",
    tidal: tidalSearch("Ashes"),
  },
  {
    title: "The Night Is Long (That Never Finds The Day)",
    meta: "Single · 2024",
    spotify: "https://open.spotify.com/track/2hApCQl0DQfhkEutJFOxVV",
    tidal: tidalSearch("The Night Is Long"),
  },
  {
    title: "Magari",
    meta: "Single · with Mistasy",
    spotify: "https://open.spotify.com/track/37US5z8tYa3VWQoqiRAjRF",
    tidal: tidalSearch("Magari"),
  },
  {
    title: "Gone",
    meta: "Single · with Mistasy",
    spotify: "https://open.spotify.com/track/0Ii1bB6sc3ZyXUE5QGzqgB",
    tidal: tidalSearch("Gone"),
  },
  {
    title: "Wake Up",
    meta: "Single · with Mistasy · 14k streams",
    spotify: "https://open.spotify.com/track/5QKRx4B5ToIdKAcmaw093P",
    tidal: tidalSearch("Wake Up"),
  },
  {
    title: "Välkommen hem",
    meta: "Single · with The Sjöholm Family Band",
    spotify: "https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr",
    tidal: tidalSearch("Välkommen hem"),
  },
  {
    title: "Barndomsåren (Pargas 98)",
    meta: "Single · with Emil Nordström",
    spotify: "https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu",
    tidal: tidalSearch("Barndomsåren Pargas"),
  },
];

export default function Work() {
  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{ background: "#0D0B09", color: "#E8E0D4" }}
    >
      <div className="max-w-xl mx-auto">

        <Link
          href="/"
          style={{ fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62" }}
          className="hover:text-[#E8E0D4] transition-colors duration-200"
        >
          ← Home
        </Link>

        <h1
          className="font-[family-name:var(--font-cormorant)] font-light mt-16"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#E8E0D4", letterSpacing: "0.03em", lineHeight: 1.1 }}
        >
          Music &amp; Work
        </h1>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62", marginTop: "1rem" }}>
          Releases
        </p>

        {/* Track list */}
        <ul className="mt-14 space-y-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {releases.map((r) => (
            <li
              key={r.title}
              className="flex items-center justify-between gap-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "#E8E0D4" }}
                >
                  {r.title}
                </p>
                <p style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A6F62", marginTop: "0.3rem" }}>
                  {r.meta}
                </p>
              </div>
              <div className="flex gap-5 shrink-0">
                <a
                  href={r.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
                  className="hover:text-[#1DB954] transition-colors duration-200"
                >
                  Spotify
                </a>
                <a
                  href={r.tidal}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
                  className="hover:text-[#00FFFF] transition-colors duration-200"
                >
                  Tidal
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* More on streaming */}
        <div className="mt-12 flex gap-6">
          <a
            href={SPOTIFY_ARTIST}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62", borderBottom: "1px solid rgba(200,146,42,0.3)", paddingBottom: "2px" }}
            className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
          >
            Full discography on Spotify →
          </a>
          <a
            href={TIDAL_ARTIST}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62", borderBottom: "1px solid rgba(200,146,42,0.3)", paddingBottom: "2px" }}
            className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
          >
            Full discography on Tidal →
          </a>
        </div>

      </div>
    </main>
  );
}
