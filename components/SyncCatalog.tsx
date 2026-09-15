"use client";

import { useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";

export type Track = {
  title: string;
  tempo: "Slow" | "Mid-tempo" | "Uptempo";
  moods: string[];
  uses: string[];
  languages?: string;
  /** Full Spotify track URL — only set when a genuine public single exists for this exact track. */
  spotifyLink?: string;
  /** Direct public URL to an R2-hosted audio file, for real in-page playback (preferred over the Spotify embed). */
  audioUrl?: string;
  coverImage?: string;
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
    spotifyLink: "https://open.spotify.com/track/2ALT61LKWHRLW3qvRpz3JI",
    audioUrl: "https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/Lycka_Sjoholm_Nordstrom.mp3",
    coverImage: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e026ed0b3388394820c3aac27c5",
    notes: "Latest release · with Emil Nordström",
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
    audioUrl: "https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/Barndoms%C3%A5ren%20%28Pargas%2098%29_Sjoholm_Nordstrom.mp3",
    coverImage: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e028cc91fad2d8dc06c518ecf27",
    notes: "with Emil Nordström",
    languages: "Swedish",
  },
  {
    title: "Guardian Angel",
    tempo: "Slow",
    moods: ["Tender", "Sacred", "Protective"],
    uses: ["Spiritual content", "Drama", "Emotional peaks", "Loss"],
  },
  {
    title: "One Last Waltz",
    tempo: "Slow",
    moods: ["Elegant", "Bittersweet", "Final"],
    uses: ["Dance scenes", "Romance", "Endings", "Period drama"],
    spotifyLink: "https://open.spotify.com/track/5mqLS6AqVNBCxak7g4oUO8",
  },
  {
    title: "The Origin Of Love",
    tempo: "Slow",
    moods: ["Profound", "Romantic", "Deep"],
    uses: ["Romance", "Wedding", "Drama", "Emotional climax"],
  },
  {
    title: "The Letter",
    tempo: "Slow",
    moods: ["Intimate", "Nostalgic", "Written"],
    uses: ["Period drama", "Long-distance", "Epistolary narratives"],
  },
  {
    title: "If You Believe",
    tempo: "Mid-tempo",
    moods: ["Hopeful", "Faith", "Inspiring"],
    uses: ["Inspirational content", "Documentary", "Brand campaigns"],
    spotifyLink: "https://open.spotify.com/track/4fX8PDpstnvD1jTPLecaco",
    notes: "with Mistasy",
  },
  {
    title: "Ray Of Light",
    tempo: "Mid-tempo",
    moods: ["Uplifting", "Bright", "Recovery"],
    uses: ["Recovery stories", "Hope", "Charity", "Campaigns"],
    spotifyLink: "https://open.spotify.com/track/2vsvxI57LT953u4MHHJ02I",
  },
  {
    title: "Compromise",
    tempo: "Mid-tempo",
    moods: ["Tense", "Conflicted", "Honest"],
    uses: ["Relationship drama", "Conflict scenes", "Indie film"],
    spotifyLink: "https://open.spotify.com/track/3RY2VzIlJA3iYHGrZR0wCW",
    notes: "2016 · Walkabout",
  },
  {
    title: "Sanden I Min Hand",
    tempo: "Slow",
    moods: ["Poetic", "Fleeting", "Nordic"],
    uses: ["Art house", "Philosophical", "Documentary", "Short film"],
    spotifyLink: "https://open.spotify.com/track/5sxlnPchl6ib1vOrjJanxz",
    audioUrl: "https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/Sanden%20i%20mind%20hand__Sjoholm_Nordstrom.mp3",
    coverImage: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a3617845d60b2e0a31a33e4d",
    notes: "with Emil Nordström",
    languages: "Swedish",
  },
  {
    title: "Längs Med Vägen",
    tempo: "Mid-tempo",
    moods: ["Journey", "Reflective", "Travelling"],
    uses: ["Road trip", "Travel documentary", "Adventure"],
    spotifyLink: "https://open.spotify.com/track/5xGo3coakkLQsrq5V3ArIp",
    audioUrl: "https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/L%C3%A4ngs%20med%20v%C3%A4gen__Sjoholm_Nordstrom.mp3",
    coverImage: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a76303c4d3c06fcf1bfaf925",
    notes: "with Emil Nordström",
    languages: "Swedish",
  },
  {
    title: "La Latina",
    tempo: "Uptempo",
    moods: ["Vibrant", "Warm", "Mediterranean"],
    uses: ["Travel", "Lifestyle", "Summer", "European content"],
  },
  {
    title: "In The Beginning",
    tempo: "Slow",
    moods: ["Epic", "Origin", "Cinematic"],
    uses: ["Documentary", "Nature", "Epic drama", "Opening sequences"],
  },
  {
    title: "Sooner Or Later",
    tempo: "Mid-tempo",
    moods: ["Patient", "Inevitable", "Resigned"],
    uses: ["Drama", "Contemplative", "Indie film", "Character studies"],
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
  "Mid-tempo":  { bg: "rgba(255,255,255,0.06)", color: "#B8B0A6" },
  "Uptempo":    { bg: "rgba(29,185,84,0.14)",   color: "#1DB954" },
};

function spotifyTrackId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/track\/([A-Za-z0-9]+)/);
  return match ? match[1] : null;
}

function FilterChip({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.7rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        padding: "0.45rem 1rem",
        border: `1px solid ${active ? "#C8922A" : "rgba(255,255,255,0.1)"}`,
        color: active ? "#C8922A" : "#B8B0A6",
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
  const [openTitle,   setOpenTitle]   = useState<string | null>(null);

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
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8B0A6", marginBottom: "0.75rem" }}>
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
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8B0A6", marginBottom: "0.75rem" }}>
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
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8B0A6", marginBottom: "0.75rem" }}>
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
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", letterSpacing: "0.1em", color: "#B8B0A6" }}>
            {filtered.length} of {syncCatalog.length} tracks
          </span>
          {hasFilter && (
            <button
              onClick={clearAll}
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8922A", cursor: "pointer" }}
            >
              Clear ×
            </button>
          )}
        </div>
      </div>

      {/* ── Track list ── */}
      <ul style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {filtered.map((track, i) => {
          const trackId  = spotifyTrackId(track.spotifyLink);
          const playable = Boolean(track.audioUrl || trackId);
          const isOpen   = openTitle === track.title;
          const requestSubject = encodeURIComponent(`Track request: ${track.title}`);
          const requestBody    = encodeURIComponent(
            `Hi Erik,\n\nCould you send a preview of "${track.title}" from the sync catalogue?\n\n`
          );

          return (
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
                  fontSize: "0.62rem",
                  color: "rgba(200,146,42,0.55)",
                  letterSpacing: "0.05em",
                  flexShrink: 0,
                  width: "1.6rem",
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
                      fontSize: "0.62rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "0.26rem 0.65rem",
                      background: TEMPO_COLORS[track.tempo].bg,
                      color: TEMPO_COLORS[track.tempo].color,
                    }}>
                      {track.tempo}
                    </span>
                    {track.languages && (
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C7F70" }}>
                        {track.languages}
                      </span>
                    )}
                    {track.notes && (
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", letterSpacing: "0.02em", color: "#8C7F70" }}>
                        {track.notes}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: mood tags + listen / request */}
              <div className="flex items-center gap-5 shrink-0">
                <div className="hidden sm:flex flex-wrap justify-end gap-1.5" style={{ maxWidth: "11rem" }}>
                  {track.moods.slice(0, 2).map((m) => (
                    <span
                      key={m}
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "0.26rem 0.65rem",
                        background: "rgba(200,146,42,0.07)",
                        border: "1px solid rgba(200,146,42,0.18)",
                        color: "#C8922A",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
                {playable ? (
                  <button
                    type="button"
                    onClick={() => setOpenTitle(isOpen ? null : track.title)}
                    aria-expanded={isOpen}
                    className="transition-colors duration-150"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: isOpen ? "#1DB954" : "#B8B0A6",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      flexShrink: 0,
                      padding: "0.4rem 0",
                    }}
                  >
                    {isOpen ? "Close ×" : "Listen ▸"}
                  </button>
                ) : (
                  <a
                    href={`mailto:erik@eriksjoholm.com?subject=${requestSubject}&body=${requestBody}`}
                    className="transition-colors duration-150 hover:text-[#C8922A]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#8C7F70",
                      flexShrink: 0,
                      padding: "0.4rem 0",
                      textAlign: "right",
                    }}
                  >
                    Request preview →
                  </a>
                )}
              </div>

            </div>

            {isOpen && (
              <div style={{ marginTop: "1.25rem", paddingLeft: "2.1rem" }}>
                {track.audioUrl ? (
                  <AudioPlayer
                    src={track.audioUrl}
                    title={track.title}
                    meta={track.notes}
                    artworkUrl={track.coverImage}
                  />
                ) : trackId ? (
                  <iframe
                    src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="80"
                    style={{ borderRadius: "8px", border: "none" }}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`${track.title} — Spotify player`}
                  />
                ) : null}
              </div>
            )}
          </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="text-center py-20" style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#B8B0A6" }}>
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
