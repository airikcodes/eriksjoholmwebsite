"use client";

import { useState, useRef, FormEvent } from "react";

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp";

const catalog = [
  {
    id: "latest",
    title: "Lycka",
    subtitle: "Latest release · 2025",
    link: SPOTIFY_ARTIST,
    mood: ["new", "latest", "recent", "fresh", "now", "happy", "joy", "light", "warm", "summer"],
  },
  {
    id: "played",
    title: "Wake Up",
    subtitle: "Most played · 14k streams",
    link: SPOTIFY_ARTIST,
    mood: ["popular", "known", "familiar", "best", "top", "played", "loved", "favourite", "favorite", "wake", "morning", "start", "energy", "upbeat"],
  },
  {
    id: "unexpected",
    title: "The Night Is Long",
    subtitle: "That Never Finds The Day · 2024",
    link: SPOTIFY_ARTIST,
    mood: ["unexpected", "surprise", "random", "different", "dark", "deep", "hidden", "rare", "night", "sad", "melanchol", "lonely", "slow", "quiet", "calm", "still", "soft", "late"],
  },
];

function matchFromText(input: string) {
  const lower = input.toLowerCase();
  for (const track of catalog) {
    if (track.mood.some((word) => lower.includes(word))) return track;
  }
  if (/sad|melanchol|lonely|night|slow|quiet|calm|still|soft|dark|long/.test(lower)) return catalog[2];
  if (/happ|danc|energy|upbeat|fast|loud|hype|fun|wake|morn/.test(lower)) return catalog[1];
  return catalog[0];
}

type Track = (typeof catalog)[0];

function ResultCard({ track, onClose }: { track: Track; onClose: () => void }) {
  return (
    <div className="mt-8 card-settle" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "1.5rem 1.75rem" }}>
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ border: "1px solid var(--color-border)" }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="var(--color-accent)" style={{ transform: "translateX(1px)" }}>
              <polygon points="1,0 11,6 1,12" />
            </svg>
          </div>
          <div>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "1.25rem", color: "var(--color-text)" }}
            >
              {track.title}
            </p>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-muted)", marginTop: "0.2rem" }}>
              {track.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={track.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-muted)" }}
            className="hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            Listen →
          </a>
          <button
            onClick={onClose}
            aria-label="Dismiss"
            style={{ color: "var(--color-border)", fontSize: "1.2rem", lineHeight: 1 }}
            className="hover:text-[var(--color-muted)] transition-colors duration-200"
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
    { label: "Latest Release", id: "latest" },
    { label: "Most Played",    id: "played" },
    { label: "Unexpected",     id: "unexpected" },
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
            background: "transparent",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            padding: "1rem 3rem 1rem 1.25rem",
            fontSize: "0.875rem",
            letterSpacing: "0.02em",
            outline: "none",
            transition: "border-color 200ms",
            fontFamily: "var(--font-inter)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
        <button
          type="submit"
          aria-label="Send"
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
          style={{ color: "var(--color-muted)" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-accent)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>

      {/* Chips */}
      <div className="flex flex-wrap gap-3 mt-4">
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-muted)", alignSelf: "center" }}>
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
              border: `1px solid ${activeChip === chip.id ? "var(--color-accent)" : "var(--color-border)"}`,
              color: activeChip === chip.id ? "var(--color-accent)" : "var(--color-muted)",
              background: "transparent",
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
