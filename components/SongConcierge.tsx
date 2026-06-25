"use client";

import { useState, useRef, FormEvent } from "react";

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp";
const TIDAL_ARTIST   = "https://tidal.com/artist/47687355";

const catalog = [
  {
    id: "lycka",
    title: "Lycka",
    subtitle: "Latest release · 2025",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink: TIDAL_ARTIST,
    mood: ["new", "latest", "recent", "fresh", "now", "happy", "joy", "joyful", "light", "warm", "summer", "lycka", "swedish", "glad"],
  },
  {
    id: "wake-up",
    title: "Wake Up",
    subtitle: "Most played · 14k streams",
    spotifyLink: "https://open.spotify.com/track/5QKRx4B5ToIdKAcmaw093P",
    tidalLink: "https://tidal.com/search?q=Wake+Up+Erik+Sj%C3%B8holm",
    mood: ["popular", "known", "familiar", "best", "top", "played", "loved", "favourite", "favorite", "wake", "morning", "start", "energy", "upbeat", "motivat", "drive", "focus"],
  },
  {
    id: "night",
    title: "The Night Is Long",
    subtitle: "That Never Finds The Day · 2024",
    spotifyLink: "https://open.spotify.com/track/2hApCQl0DQfhkEutJFOxVV",
    tidalLink: "https://tidal.com/search?q=The+Night+Is+Long+Erik+Sj%C3%B8holm",
    mood: ["unexpected", "surprise", "different", "dark", "deep", "hidden", "rare", "night", "sad", "melanchol", "lonely", "slow", "quiet", "calm", "still", "soft", "late", "insomniac", "sleepless", "long", "brooding"],
  },
  {
    id: "magari",
    title: "Magari",
    subtitle: "with Mistasy",
    spotifyLink: "https://open.spotify.com/track/37US5z8tYa3VWQoqiRAjRF",
    tidalLink: "https://tidal.com/search?q=Magari+Erik+Sj%C3%B8holm",
    mood: ["italian", "bittersweet", "longing", "nostalgic", "romantic", "maybe", "distant", "wistful", "tender", "dream", "wish", "hopeful", "desire", "yearning"],
  },
  {
    id: "gone",
    title: "Gone",
    subtitle: "with Mistasy",
    spotifyLink: "https://open.spotify.com/track/0Ii1bB6sc3ZyXUE5QGzqgB",
    tidalLink: "https://tidal.com/search?q=Gone+Erik+Sj%C3%B8holm",
    mood: ["gone", "loss", "missing", "absent", "empty", "leaving", "goodbye", "end", "over", "away", "breakup", "separation", "departed", "farewell"],
  },
  {
    id: "välkommen",
    title: "Välkommen hem",
    subtitle: "with The Sjöholm Family Band",
    spotifyLink: "https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr",
    tidalLink: "https://tidal.com/search?q=V%C3%A4lkommen+hem+Erik+Sj%C3%B8holm",
    mood: ["home", "family", "welcome", "return", "belonging", "together", "reunion", "roots", "cozy", "hearth", "swedish", "coming home", "hygge"],
  },
  {
    id: "barndomsåren",
    title: "Barndomsåren",
    subtitle: "Pargas 98 · with Emil Nordström",
    spotifyLink: "https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu",
    tidalLink: "https://tidal.com/search?q=Barndomsaren+Pargas+Erik+Sj%C3%B8holm",
    mood: ["childhood", "memory", "memories", "past", "growing up", "youth", "finland", "pargas", "old", "remember", "innocen", "school", "friend", "nineties", "98", "nostalgia"],
  },
];

function matchFromText(input: string) {
  const lower = input.toLowerCase();
  for (const track of catalog) {
    if (track.mood.some((word) => lower.includes(word))) return track;
  }
  if (/sad|melanchol|lonely|night|dark|slow|quiet|still|soft|late|long|broken/.test(lower)) return catalog[2];
  if (/happ|danc|energy|upbeat|fast|loud|hype|fun|wake|morn|go/.test(lower))                return catalog[1];
  if (/miss|gone|leav|away|end|over|apart/.test(lower))                                      return catalog[4];
  if (/home|family|belong|safe|cozy/.test(lower))                                             return catalog[5];
  if (/child|young|past|memor|old|90/.test(lower))                                            return catalog[6];
  return catalog[0];
}

type Track = (typeof catalog)[0];

function ResultCard({ track, onClose }: { track: Track; onClose: () => void }) {
  return (
    <div
      className="mt-8 card-settle"
      style={{ background: "rgba(20,16,10,0.75)", border: "1px solid rgba(255,255,255,0.12)", padding: "1.5rem 1.75rem", backdropFilter: "blur(8px)" }}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="var(--color-accent)" style={{ transform: "translateX(1px)" }}>
              <polygon points="1,0 11,6 1,12" />
            </svg>
          </div>
          <div>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "1.25rem", color: "#E8E0D4" }}
            >
              {track.title}
            </p>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A6F62", marginTop: "0.2rem" }}>
              {track.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col items-end gap-1.5">
            <a
              href={track.spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
              className="hover:text-[#1DB954] transition-colors duration-200"
            >
              Spotify →
            </a>
            <a
              href={track.tidalLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
              className="hover:text-[#00FFFF] transition-colors duration-200"
            >
              Tidal →
            </a>
          </div>
          <button
            onClick={onClose}
            aria-label="Dismiss"
            style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.2rem", lineHeight: 1 }}
            className="hover:text-[#7A6F62] transition-colors duration-200"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SongConcierge() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Track | null>(null);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chips = [
    { label: "Latest Release", id: "lycka" },
    { label: "Most Played",    id: "wake-up" },
    { label: "Unexpected",     id: "night" },
  ];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setActiveChip(null);
    setResult(matchFromText(input));
  }

  function handleChip(id: string) {
    setActiveChip(id);
    setInput("");
    setResult(catalog.find((t) => t.id === id) ?? catalog[0]);
    inputRef.current?.blur();
  }

  function handleClose() {
    setResult(null);
    setActiveChip(null);
    setInput("");
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2
        className="font-[family-name:var(--font-cormorant)] font-light text-center mb-10"
        style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "#E8E0D4", letterSpacing: "0.02em" }}
      >
        What song can I play for you?
      </h2>

      {/* Input */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (result && !activeChip) setResult(null);
          }}
          placeholder="Something quiet for late at night…"
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#E8E0D4",
            padding: "1rem 3rem 1rem 1.25rem",
            fontSize: "0.875rem",
            letterSpacing: "0.02em",
            outline: "none",
            transition: "border-color 200ms",
            fontFamily: "var(--font-inter)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
        />
        <button
          type="submit"
          aria-label="Send"
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
          style={{ color: "#7A6F62" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-accent)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#7A6F62")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>

      {/* Chips */}
      <div className="flex flex-wrap gap-3 mt-4">
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62", alignSelf: "center" }}>
          or
        </span>
        {chips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => handleChip(chip.id)}
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "0.5rem 1.1rem",
              border: `1px solid ${activeChip === chip.id ? "var(--color-accent)" : "rgba(255,255,255,0.12)"}`,
              color: activeChip === chip.id ? "var(--color-accent)" : "#7A6F62",
              background: activeChip === chip.id ? "transparent" : "rgba(255,255,255,0.04)",
              transition: "border-color 200ms, color 200ms",
              cursor: "pointer",
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {result && <ResultCard track={result} onClose={handleClose} />}
    </div>
  );
}
