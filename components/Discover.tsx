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
    <div className="mt-6 animate-[fadeSlideUp_0.4s_ease_forwards]">
      <div className="border border-white/10 hover:border-[#F59E0B]/40 transition-colors duration-500 p-5 flex items-center justify-between gap-6 group">
        <div className="flex items-center gap-5">
          <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#F59E0B]/60 flex items-center justify-center shrink-0 transition-colors duration-300">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              className="text-white group-hover:text-[#F59E0B] transition-colors duration-300 translate-x-px"
            >
              <polygon points="1,0 11,6 1,12" />
            </svg>
          </div>
          <div>
            <p className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-white group-hover:text-[#F59E0B] transition-colors duration-300">
              {track.title}
            </p>
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#666666] mt-0.5">
              {track.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={track.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[0.6rem] tracking-[0.25em] uppercase text-[#888888] hover:text-[#1DB954] transition-colors duration-300"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Listen
          </a>
          <button
            onClick={onClose}
            aria-label="Dismiss"
            className="text-[#333333] hover:text-[#888888] transition-colors duration-200 text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Discover() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Track | null>(null);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chips = [
    { label: "Latest Release", id: "latest" },
    { label: "Most Played", id: "played" },
    { label: "Unexpected", id: "unexpected" },
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
    const track = catalog.find((t) => t.id === id) ?? catalog[0];
    setResult(track);
    inputRef.current?.blur();
  }

  function handleClose() {
    setResult(null);
    setActiveChip(null);
    setInput("");
  }

  return (
    <section className="py-32 border-t border-white/5">
      <div className="px-6 md:px-10 max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-14">
          <span className="block w-10 h-px bg-[#F59E0B]" />
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#888888]">
            Find your sound
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-white leading-snug mb-10">
          What are you<br />looking for?
        </h2>

        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (result && activeChip === null) setResult(null);
            }}
            placeholder="Something melancholic for a late night…"
            className="w-full bg-transparent border border-white/15 focus:border-[#F59E0B]/50 outline-none px-5 py-4 pr-14 text-white placeholder-[#3A3A3A] text-sm tracking-wide transition-colors duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <button
            type="submit"
            aria-label="Send"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#F59E0B] transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>

        <div className="flex flex-wrap gap-3 mt-5">
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#444444] self-center mr-1">
            or
          </span>
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleChip(chip.id)}
              className={`text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                activeChip === chip.id
                  ? "border-[#F59E0B] text-[#F59E0B]"
                  : "border-white/10 text-[#888888] hover:border-white/30 hover:text-white"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {result && <ResultCard track={result} onClose={handleClose} />}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
