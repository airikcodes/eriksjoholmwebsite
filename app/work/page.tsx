import type { Metadata } from "next";
import Link from "next/link";
import BackNav from "@/components/BackNav";

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
  { title: "Lycka",                                   meta: "2025",                       spotify: SPOTIFY_ARTIST,                                            tidal: tidalSearch("Lycka") },
  { title: "Midnight Sun",                            meta: "with Mistasy",               spotify: "https://open.spotify.com/track/7KAFu2ouup81IBB6AnQZkM",  tidal: tidalSearch("Midnight Sun") },
  { title: "Matsawana",                               meta: "Erik Sjøholm",               spotify: "https://open.spotify.com/track/0ap55kADfSNkisbVEWJWrr",  tidal: tidalSearch("Matsawana") },
  { title: "Ashes",                                   meta: "Erik Sjøholm",               spotify: "https://open.spotify.com/track/6tcU3CmHiLKfbRNyTL5Evo",  tidal: tidalSearch("Ashes") },
  { title: "The Night Is Long (That Never Finds The Day)", meta: "2024",                  spotify: "https://open.spotify.com/track/2hApCQl0DQfhkEutJFOxVV",  tidal: tidalSearch("The Night Is Long") },
  { title: "Magari",                                  meta: "with Mistasy",               spotify: "https://open.spotify.com/track/37US5z8tYa3VWQoqiRAjRF",  tidal: tidalSearch("Magari") },
  { title: "Gone",                                    meta: "with Mistasy",               spotify: "https://open.spotify.com/track/0Ii1bB6sc3ZyXUE5QGzqgB",  tidal: tidalSearch("Gone") },
  { title: "Wake Up",                                 meta: "with Mistasy · 14k streams", spotify: "https://open.spotify.com/track/5QKRx4B5ToIdKAcmaw093P",  tidal: tidalSearch("Wake Up") },
  { title: "Välkommen hem",                           meta: "with The Sjöholm Family Band", spotify: "https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr", tidal: tidalSearch("Välkommen hem") },
  { title: "Barndomsåren (Pargas 98)",                meta: "with Emil Nordström",        spotify: "https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu",  tidal: tidalSearch("Barndomsåren Pargas") },
];

export default function Work() {
  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Static background — Arbogast Festival stage photo */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-01.jpg)",
          backgroundSize: "cover", backgroundPosition: "center top",
          opacity: 0.1,
        }} />
      </div>

      <div className="relative px-6 pt-20 pb-24" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <BackNav />

          <h1
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#E8E0D4", letterSpacing: "0.03em", lineHeight: 1.05 }}
          >
            Music &amp; Work
          </h1>
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginTop: "0.85rem" }}>
            Releases &amp; Recordings
          </p>

          {/* Track list */}
          <ul className="mt-14" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {releases.map((r, i) => (
              <li
                key={r.title}
                className="group flex items-center justify-between gap-4 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Index + title */}
                <div className="flex items-baseline gap-4 min-w-0">
                  <span style={{ fontSize: "0.5rem", color: "rgba(200,146,42,0.4)", letterSpacing: "0.1em", flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light truncate"
                      style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)", color: "#E8E0D4", lineHeight: 1.3 }}
                    >
                      {r.title}
                    </p>
                    <p style={{ fontSize: "0.5rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A6F62", marginTop: "0.25rem" }}>
                      {r.meta}
                    </p>
                  </div>
                </div>

                {/* Stream links */}
                <div className="flex gap-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <a href={r.spotify} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
                    className="hover:text-[#1DB954] transition-colors duration-150">
                    Spotify
                  </a>
                  <a href={r.tidal} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
                    className="hover:text-[#00FFFF] transition-colors duration-150">
                    Tidal
                  </a>
                </div>
              </li>
            ))}
          </ul>

          {/* Full catalogue links */}
          <div className="mt-12 flex flex-wrap gap-8">
            <a href={SPOTIFY_ARTIST} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62", borderBottom: "1px solid rgba(200,146,42,0.3)", paddingBottom: "2px" }}
              className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200">
              Full catalogue on Spotify →
            </a>
            <a href={TIDAL_ARTIST} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62", borderBottom: "1px solid rgba(200,146,42,0.3)", paddingBottom: "2px" }}
              className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200">
              Full catalogue on Tidal →
            </a>
            <Link href="/sync"
              style={{ fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62", borderBottom: "1px solid rgba(200,146,42,0.3)", paddingBottom: "2px" }}
              className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200">
              Sync licensing →
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
