"use client";

import { useState } from "react";

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp";

export type Track = {
  title: string;
  tempo: "Slow" | "Mid-tempo" | "Uptempo";
  moods: string[];
  uses: string[];
  languages?: string;
  spotifyLink: string;
  notes?: string;
};

export const syncCatalog: Track[] = [
  {
    title: "Wake Up",
    tempo: "Uptempo",
    moods: ["Energetic", "Hopeful", "Fresh"],
    uses: ["Advertising", "Sports", "Morning routines", "Motivational"],
    spotifyLink: "https://open.spotify.com/track/5QKRx4B5ToIdKAcmaw093P",
    notes: "14k streams · with Mistasy",
  },
  {
    title: "Lycka",
    tempo: "Mid-tempo",
    moods: ["Uplifting", "Warm", "Joyful"],
    uses: ["Lifestyle", "Summer campaigns", "Feel-good drama", "Brands"],
    spotifyLink: SPOTIFY_ARTIST,
    notes: "Latest release · 2025",
    languages: "Swedish",
  },
  {
    title: "The Night Is Long (That Never Finds The Day)",
    tempo: "Slow",
    moods: ["Dark", "Cinematic", "Introspective"],
    uses: ["Drama", "Thriller", "Late-night scenes", "Trailers"],
    spotifyLink: "https://open.spotify.com/track/2hApCQl0DQfhkEutJFOxVV",
    notes: "2024",
  },
  {
    title: "Ashes",
    tempo: "Slow",
    moods: ["Grief", "Heavy", "Emotional"],
    uses: ["Drama", "Memorial", "Funeral scenes", "Loss narratives"],
    spotifyLink: "https://open.spotify.com/track/6tcU3CmHiLKfbRNyTL5Evo",
  },
  {
    title: "Midnight Sun",
    tempo: "Mid-tempo",
    moods: ["Nordic", "Atmospheric", "Expansive"],
    uses: ["Travel", "Documentary", "Scandinavia", "Nature"],
    spotifyLink: "https://open.spotify.com/track/7KAFu2ouup81IBB6AnQZkM",
    notes: "with Mistasy",
  },
  {
    title: "Matsawana",
    tempo: "Mid-tempo",
    moods: ["Soulful", "Worldly", "Spiritual"],
    uses: ["Documentary", "World culture", "Travel", "Human stories"],
    spotifyLink: "https://open.spotify.com/track/0ap55kADfSNkisbVEWJWrr",
  },
  {
    title: "Magari",
    tempo: "Mid-tempo",
    moods: ["Romantic", "Bittersweet", "Longing"],
    uses: ["Romance", "European drama", "Fashion", "Lifestyle"],
    spotifyLink: "https://open.spotify.com/track/37US5z8tYa3VWQoqiRAjRF",
    notes: "with Mistasy",
    languages: "Italian / English",
  },
  {
    title: "Gone",
    tempo: "Slow",
    moods: ["Loss", "Quiet", "Departure"],
    uses: ["Drama", "Breakup scenes", "Endings", "Reflection"],
    spotifyLink: "https://open.spotify.com/track/0Ii1bB6sc3ZyXUE5QGzqgB",
    notes: "with Mistasy",
  },
  {
    title: "Välkommen hem",
    tempo: "Mid-tempo",
    moods: ["Warm", "Nostalgic", "Family"],
    uses: ["Family drama", "Homecoming", "Nostalgia", "Brands"],
    spotifyLink: "https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr",
    notes: "with The Sjöholm Family Band",
    languages: "Swedish",
  },
  {
    title: "Barndomsåren (Pargas 98)",
    tempo: "Mid-tempo",
    moods: ["Childhood", "Memory", "Innocent"],
    uses: ["Coming of age", "Memory sequences", "Documentary"],
    spotifyLink: "https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu",
    notes: "with Emil Nordström",
    languages: "Swedish",
  },
  {
    title: "Guardian Angel",
    tempo: "Slow",
    moods: ["Tender", "Sacred", "Protective"],
    uses: ["Spiritual content", "Drama", "Emotional peaks", "Loss"],
    spotifyLink: SPOTIFY_ARTIST,
  },
  {
    title: "One Last Waltz",
    tempo: "Slow",
    moods: ["Elegant", "Bittersweet", "Final"],
    uses: ["Dance scenes", "Romance", "Endings", "Period drama"],
    spotifyLink: SPOTIFY_ARTIST,
  },
  {
    title: "The Origin Of Love",
    tempo: "Slow",
    moods: ["Profound", "Romantic", "Deep"],
    uses: ["Romance", "Wedding", "Drama", "Emotional climax"],
    spotifyLink: SPOTIFY_ARTIST,
  },
  {
    title: "The Letter",
    tempo: "Slow",
    moods: ["Intimate", "Nostalgic", "Written"],
    uses: ["Period drama", "Long-distance", "Epistolary narratives"],
    spotifyLink: SPOTIFY_ARTIST,
  },
  {
    title: "If You Believe",
    tempo: "Mid-tempo",
    moods: ["Hopeful", "Faith", "Inspiring"],
    uses: ["Inspirational content", "Documentary", "Brand campaigns"],
    spotifyLink: SPOTIFY_ARTIST,
  },
  {
    title: "Ray Of Light",
    tempo: "Mid-tempo",
    moods: ["Uplifting", "Bright", "Recovery"],
    uses: ["Recovery stories", "Hope", "Charity", "Campaigns"],
    spotifyLink: SPOTIFY_ARTIST,
  },
  {
    title: "Compromise",
    tempo: "Mid-tempo",
    moods: ["Tense", "Conflicted", "Honest"],
    uses: ["Relationship drama", "Conflict scenes", "Indie film"],
    spotifyLink: SPOTIFY_ARTIST,
  },
  {
    title: "Sanden I Min Hand",
    tempo: "Slow",
    moods: ["Poetic", "Fleeting", "Nordic"],
    uses: ["Art house", "Philosophical", "Documentary", "Short film"],
    spotifyLink: SPOTIFY_ARTIST,
    languages: "Swedish",
  },
  {
    title: "Längs Med Vägen",
    tempo: "Mid-tempo",
    moods: ["Journey", "Reflective", "Travelling"],
    uses: ["Road trip", "Travel documentary", "Adventure"],
    spotifyLink: SPOTIFY_ARTIST,
    languages: "Swedish",
  },
  {
    title: "La Latina",
    tempo: "Uptempo",
    moods: ["Vibrant", "Warm", "Mediterranean"],
    uses: ["Travel", "Lifestyle", "Summer", "European content"],
    spotifyLink: SPOTIFY_ARTIST,
  },
  {
    title: "In The Beginning",
    tempo: "Slow",
    moods: ["Epic", "Origin", "Cinematic"],
    uses: ["Documentary", "Nature", "Epic drama", "Opening sequences"],
    spotifyLink: SPOTIFY_ARTIST,
  },
  {
    title: "Sooner Or Later",
    tempo: "Mid-tempo",
    moods: ["Patient", "Inevitable", "Resigned"],
    uses: ["Drama", "Contemplative", "Indie film", "Character studies"],
    spotifyLink: SPOTIFY_ARTIST,
  },
];

const ALL_MOODS = [
  "Cinematic", "Dark", "Uplifting", "Romantic", "Nostalgic",
  "Nordic", "Energetic", "Emotional", "Hopeful", "Intimate", "Journey", "Spiritual",
];
const ALL_USES = [
  "Drama", "Documentary", "Advertising", "Travel",
  "Romance", "Lifestyle", "Inspirational", "Sports",
];

const TEMPO_COLORS: Record<Track["tempo"], { bg: string; color: string }> = {
  "Slow":       { bg: "rgba(200,146,42,0.15)",  color: "#C8922A" },
  "Mid-tempo":  { bg: "rgba(255,255,255,0.06)", color: "#7A6F62" },
  "Uptempo":    { bg: "rgba(29,185,84,0.12)",   color: "#1DB954" },
};

function FilterChip({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.58rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        padding: "0.45rem 1rem",
        border: `1px solid ${active ? "#C8922A" : "rgba(255,255,255,0.1)"}`,
        color: active ? "#C8922A" : "#7A6F62",
        background: active ? "rgba(200,146,42,0.08)" : "transparent",
        cursor: "pointer",
        transition: "border-color 150ms, color 150ms, background 150ms",
      }}
    >
      {label}
    </button>
  );
}

export default function SyncCatalog() {
  const [activeMood,  setActiveMood]  = useState<string | null>(null);
  const [activeUse,   setActiveUse]   = useState<string | null>(null);
  const [activeTempo, setActiveTempo] = useState<Track["tempo"] | null>(null);

  const filtered = syncCatalog.filter((t) => {
    if (activeMood  && !t.moods.some(m => m.toLowerCase().includes(activeMood.toLowerCase()))) return false;
    if (activeUse   && !t.uses.some(u => u.toLowerCase().includes(activeUse.toLowerCase()))) return false;
    if (activeTempo && t.tempo !== activeTempo) return false;
    return true;
  });

  function toggleMood(m: string)           { setActiveMood(prev  => prev === m ? null : m); }
  function toggleUse(u: string)            { setActiveUse(prev   => prev === u ? null : u); }
  function toggleTempo(t: Track["tempo"])  { setActiveTempo(prev => prev === t ? null : t); }
  function clearAll() { setActiveMood(null); setActiveUse(null); setActiveTempo(null); }
  const hasFilter = activeMood || activeUse || activeTempo;

  return (
    <div>

      {/* ── Filter panel ── */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "1.75rem",
        marginBottom: "2.5rem",
      }}>
        <div className="space-y-5">

          {/* Tempo */}
          <div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "0.75rem" }}>
              Tempo
            </p>
            <div className="flex flex-wrap gap-2">
              {(["Slow", "Mid-tempo", "Uptempo"] as Track["tempo"][]).map((t) => (
                <FilterChip key={t} label={t} active={activeTempo === t} onClick={() => toggleTempo(t)} />
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "0.75rem" }}>
              Mood
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_MOODS.map((m) => (
                <FilterChip key={m} label={m} active={activeMood === m} onClick={() => toggleMood(m)} />
              ))}
            </div>
          </div>

          {/* Use case */}
          <div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "0.75rem" }}>
              Use case
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_USES.map((u) => (
                <FilterChip key={u} label={u} active={activeUse === u} onClick={() => toggleUse(u)} />
              ))}
            </div>
          </div>

        </div>

        {/* Count + clear */}
        <div className="flex items-center gap-5 mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.48rem", letterSpacing: "0.12em", color: "#7A6F62" }}>
            {filtered.length} of {syncCatalog.length} tracks
          </span>
          {hasFilter && (
            <button
              onClick={clearAll}
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8922A", cursor: "pointer" }}
            >
              Clear ×
            </button>
          )}
        </div>
      </div>

      {/* ── Track list ── */}
      <ul style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {filtered.map((track, i) => (
          <li
            key={track.title}
            className="group"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "1.75rem 0" }}
          >
            <div className="flex items-center justify-between gap-4">

              {/* Left: index + title + meta */}
              <div className="flex items-center gap-5 min-w-0">
                <span style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.48rem",
                  color: "rgba(200,146,42,0.35)",
                  letterSpacing: "0.08em",
                  flexShrink: 0,
                  width: "1.4rem",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 1.3rem)", color: "#E8E0D4", lineHeight: 1.2 }}
                  >
                    {track.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                    <span style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.44rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "0.22rem 0.6rem",
                      background: TEMPO_COLORS[track.tempo].bg,
                      color: TEMPO_COLORS[track.tempo].color,
                    }}>
                      {track.tempo}
                    </span>
                    {track.languages && (
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.44rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A6F62" }}>
                        {track.languages}
                      </span>
                    )}
                    {track.notes && (
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.44rem", letterSpacing: "0.08em", color: "rgba(122,111,98,0.7)" }}>
                        {track.notes}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: mood tags + listen */}
              <div className="flex items-center gap-5 shrink-0">
                <div className="hidden sm:flex flex-wrap justify-end gap-1.5" style={{ maxWidth: "11rem" }}>
                  {track.moods.slice(0, 2).map((m) => (
                    <span
                      key={m}
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.42rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0.22rem 0.6rem",
                        background: "rgba(200,146,42,0.07)",
                        border: "1px solid rgba(200,146,42,0.18)",
                        color: "#C8922A",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <a
                  href={track.spotifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:text-[#1DB954] transition-colors duration-150"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.45rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(122,111,98,0.55)",
                    flexShrink: 0,
                  }}
                >
                  Listen →
                </a>
              </div>

            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-center py-20" style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#7A6F62" }}>
          No tracks match those filters.{" "}
          <button
            onClick={clearAll}
            style={{ color: "#C8922A", cursor: "pointer" }}
          >
            Clear all
          </button>
        </p>
      )}

    </div>
  );
}
