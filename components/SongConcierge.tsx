"use client";

import { useState, useRef, FormEvent } from "react";

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp";
const TIDAL_ARTIST   = "https://tidal.com/artist/47687355";

function tidalSearch(q: string) {
  return `https://tidal.com/search?q=${encodeURIComponent(q + " Erik Sjøholm")}`;
}

function extractTrackId(url: string): string | null {
  const m = url.match(/open\.spotify\.com\/track\/([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}

const catalog = [
  {
    id:          "lycka",
    title:       "Lycka",
    subtitle:    "Latest release · 2025",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   tidalSearch("Lycka"),
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e026ed0b3388394820c3aac27c5",
    description: "A Swedish word for happiness — and a song that actually earns it.",
    mood: ["new", "latest", "recent", "fresh", "now", "happy", "joy", "joyful", "light", "warm", "summer", "lycka", "swedish", "glad"],
  },
  {
    id:          "wake-up",
    title:       "Wake Up",
    subtitle:    "Most played · 14k streams",
    spotifyLink: "https://open.spotify.com/track/5QKRx4B5ToIdKAcmaw093P",
    tidalLink:   tidalSearch("Wake Up"),
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0207610e85bfa96181ab8d9a68",
    description: "The most-streamed moment — a gentle push toward the morning.",
    mood: ["popular", "known", "familiar", "best", "top", "played", "loved", "favourite", "favorite", "wake", "morning", "start", "energy", "upbeat", "motivat", "drive", "focus", "get up"],
  },
  {
    id:          "night",
    title:       "The Night Is Long",
    subtitle:    "That Never Finds The Day · 2024",
    spotifyLink: "https://open.spotify.com/track/2hApCQl0DQfhkEutJFOxVV",
    tidalLink:   tidalSearch("The Night Is Long"),
    coverArt:    "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e24ed1a9271e2c63964dfcb2",
    description: "Written for the hours that refuse to pass — when the ceiling is the only audience.",
    mood: ["unexpected", "different", "dark", "deep", "hidden", "rare", "night", "sad", "melanchol", "lonely", "slow", "quiet", "calm", "still", "soft", "late", "insomniac", "sleepless", "long", "brooding", "3am", "can't sleep"],
  },
  {
    id:          "ashes",
    title:       "Ashes",
    subtitle:    "Erik Sjøholm",
    spotifyLink: "https://open.spotify.com/track/6tcU3CmHiLKfbRNyTL5Evo",
    tidalLink:   tidalSearch("Ashes"),
    coverArt:    "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0256cb815bf3ed91d4650047b2",
    description: "What remains when everything burns down — and the strange quiet after.",
    mood: ["ashes", "loss", "grief", "burned", "end", "aftermath", "remains", "sorrow", "heavy", "destruction", "fire", "ruins", "weight"],
  },
  {
    id:          "midnight-sun",
    title:       "Midnight Sun",
    subtitle:    "with Mistasy",
    spotifyLink: "https://open.spotify.com/track/7KAFu2ouup81IBB6AnQZkM",
    tidalLink:   tidalSearch("Midnight Sun"),
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0248bb1b76bfb10f76e72d6cae",
    description: "A collaboration born under Scandinavian midsummer light.",
    mood: ["midnight sun", "scandinavia", "nordic", "summer night", "bright", "arctic", "white night", "endless day", "northern", "majestic", "wonder"],
  },
  {
    id:          "matsawana",
    title:       "Matsawana",
    subtitle:    "Erik Sjøholm",
    spotifyLink: "https://open.spotify.com/track/0ap55kADfSNkisbVEWJWrr",
    tidalLink:   tidalSearch("Matsawana"),
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02350ba1fef0246915e4b7986a",
    description: "Between languages, between continents — a song that refuses to stay in one place.",
    mood: ["matsawana", "world", "global", "unique", "different", "unexpected", "surprise", "exotic", "african", "intercultural", "journey", "travel"],
  },
  {
    id:          "magari",
    title:       "Magari",
    subtitle:    "with Mistasy",
    spotifyLink: "https://open.spotify.com/track/37US5z8tYa3VWQoqiRAjRF",
    tidalLink:   tidalSearch("Magari"),
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0207610e85bfa96181ab8d9a68",
    description: "Italian for 'maybe' — and all the longing that lives in that small word.",
    mood: ["italian", "bittersweet", "longing", "nostalgic", "romantic", "maybe", "distant", "wistful", "tender", "dream", "wish", "hopeful", "desire", "yearning"],
  },
  {
    id:          "gone",
    title:       "Gone",
    subtitle:    "with Mistasy",
    spotifyLink: "https://open.spotify.com/track/0Ii1bB6sc3ZyXUE5QGzqgB",
    tidalLink:   tidalSearch("Gone"),
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0207610e85bfa96181ab8d9a68",
    description: "The quiet that follows when someone has left, and the air still holds their shape.",
    mood: ["gone", "loss", "missing", "absent", "empty", "leaving", "goodbye", "end", "over", "away", "breakup", "separation", "departed", "farewell", "vanish"],
  },
  {
    id:          "välkommen",
    title:       "Välkommen hem",
    subtitle:    "with The Sjöholm Family Band",
    spotifyLink: "https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr",
    tidalLink:   tidalSearch("Välkommen hem"),
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02788af0fc581b37226b2b54ec",
    description: "A homecoming song written with family — for everyone who's ever returned somewhere.",
    mood: ["home", "family", "welcome", "return", "belonging", "together", "reunion", "roots", "cozy", "hearth", "swedish", "coming home", "hygge"],
  },
  {
    id:          "barndomsåren",
    title:       "Barndomsåren",
    subtitle:    "Pargas 98 · with Emil Nordström",
    spotifyLink: "https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu",
    tidalLink:   tidalSearch("Barndomsåren Pargas"),
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e028cc91fad2d8dc06c518ecf27",
    description: "Childhood summers in Pargas, Finland — caught in amber before they could escape.",
    mood: ["childhood", "memory", "memories", "past", "growing up", "youth", "finland", "pargas", "old", "remember", "innocen", "school", "friend", "nineties", "98", "nostalgia"],
  },

  // ── Not yet individually on Spotify — link to artist page ─────────────
  {
    id:          "guardian-angel",
    title:       "Guardian Angel",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    null as string | null,
    description: "Written in gratitude — for the people who stay when it's hardest to.",
    mood: ["guardian", "angel", "protect", "divine", "safe", "sacred", "spiritual", "watching over", "comfort", "heaven", "blessed", "tender", "care"],
  },
  {
    id:          "one-last-waltz",
    title:       "One Last Waltz",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02be9f68df643e48907377661d",
    description: "A graceful ending — for the dance that can't last and the moment before it stops.",
    mood: ["waltz", "dance", "last dance", "final", "slow dance", "ballroom", "tender farewell", "last time", "ending", "graceful", "bittersweet", "farewell"],
  },
  {
    id:          "origin-of-love",
    title:       "The Origin Of Love",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    null as string | null,
    description: "The question that started everything — where does love actually come from?",
    mood: ["love", "origin", "beginning of love", "where love comes from", "deep love", "profound", "source", "foundation", "root", "pure love", "heartfelt"],
  },
  {
    id:          "the-letter",
    title:       "The Letter",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    null as string | null,
    description: "Words that were never sent — or maybe should have been.",
    mood: ["letter", "writing", "words", "message", "correspondence", "distance", "longing by letter", "handwritten", "pen", "send", "wrote", "read"],
  },
  {
    id:          "if-you-believe",
    title:       "If You Believe",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0262c4628ac70bc7feb7571f1d",
    description: "An open question about faith — not the religious kind, the everyday kind.",
    mood: ["believe", "faith", "hope", "conviction", "trust", "question", "doubt", "possibility", "what if", "inspiration", "spiritual", "uplifting"],
  },
  {
    id:          "ray-of-light",
    title:       "Ray Of Light",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1",
    description: "The feeling just after the weight lifts — when you can finally breathe again.",
    mood: ["light", "ray", "hope", "brightness", "emerging", "dawn", "optimism", "lifting", "relief", "shining", "breakthrough", "sun", "beam"],
  },
  {
    id:          "compromise",
    title:       "Compromise",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1",
    description: "The cost of staying — and whether it's ever the right price to pay.",
    mood: ["compromise", "tension", "middle ground", "relationship", "difficult", "negotiation", "between", "give and take", "struggle", "decision", "balance", "conflict"],
  },
  {
    id:          "sanden",
    title:       "Sanden I Min Hand",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a3617845d60b2e0a31a33e4d",
    description: "Sand through your fingers — a Swedish meditation on time and letting go.",
    mood: ["sand", "hand", "fleeting", "time", "impermanent", "slipping away", "letting go", "momentary", "transient", "swedish", "poetic", "fragile"],
  },
  {
    id:          "langs-med-vagen",
    title:       "Längs Med Vägen",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a76303c4d3c06fcf1bfaf925",
    description: "Along the road — the songs that play when the scenery does the thinking.",
    mood: ["road", "journey", "along the way", "travel", "reflection", "swedish", "path", "wander", "life journey", "passing", "scenic", "contemplative"],
  },
  {
    id:          "la-latina",
    title:       "La Latina",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    null as string | null,
    description: "A neighbourhood in Madrid that stayed with him — all rhythm and warm stone.",
    mood: ["latin", "latina", "spain", "madrid", "neighbourhood", "rhythm", "warm", "mediterranean", "dance", "vibrant", "street", "culture", "spanish"],
  },
  {
    id:          "in-the-beginning",
    title:       "In The Beginning",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    null as string | null,
    description: "Before the noise — the clear, quiet moment at the start of something.",
    mood: ["beginning", "origin", "start", "creation", "first", "genesis", "story", "birth", "initial", "once upon", "primordial", "founding"],
  },
  {
    id:          "sooner-or-later",
    title:       "Sooner Or Later",
    subtitle:    "Erik Sjøholm",
    spotifyLink: SPOTIFY_ARTIST,
    tidalLink:   TIDAL_ARTIST,
    coverArt:    null as string | null,
    description: "The patient side of fate — knowing something is coming and waiting for it anyway.",
    mood: ["sooner or later", "waiting", "inevitability", "patience", "time", "eventual", "will happen", "destiny", "fate", "coming", "anticipation", "resigned"],
  },
];

function matchFromText(input: string): Track[] {
  const lower = input.toLowerCase();

  const scored = catalog.map((track) => ({
    track,
    score: track.mood.reduce(
      (sum, phrase) => (lower.includes(phrase) ? sum + phrase.split(" ").length : sum),
      0
    ),
  }));

  const hits = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.track);

  if (hits.length > 0) return hits;

  const by = (id: string) => catalog.find((t) => t.id === id)!;
  if (/sad|melanchol|lone|dark|night|slow|quiet|still|late|broken|3am/.test(lower))
    return [by("night"), by("ashes"), by("gone")];
  if (/happ|joy|danc|energy|upbeat|fast|fun|wake|morn|motivat/.test(lower))
    return [by("wake-up"), by("lycka"), by("ray-of-light")];
  if (/love|roman|heart|tender|intimate/.test(lower))
    return [by("origin-of-love"), by("magari"), by("one-last-waltz")];
  if (/home|famil|belong|cozy|return|root/.test(lower))
    return [by("välkommen"), by("barndomsåren"), by("langs-med-vagen")];
  if (/travel|journey|road|wander|abroad/.test(lower))
    return [by("matsawana"), by("langs-med-vagen"), by("la-latina")];
  if (/hope|light|faith|inspir|bright/.test(lower))
    return [by("ray-of-light"), by("if-you-believe"), by("wake-up")];
  if (/loss|grief|miss|gone|end|over/.test(lower))
    return [by("gone"), by("ashes"), by("night")];

  return [by("lycka"), by("night"), by("magari")];
}

type Track = (typeof catalog)[0];

function ResultCard({ track, onDismiss }: { track: Track; onDismiss: (id: string) => void }) {
  const trackId = extractTrackId(track.spotifyLink);

  return (
    <div
      className="card-settle"
      style={{
        background:     "rgba(10,8,6,0.92)",
        border:         "1px solid rgba(200,146,42,0.2)",
        backdropFilter: "blur(16px)",
        overflow:       "hidden",
      }}
    >
      {/* Header: cover art + title + description + dismiss */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem 1.25rem 1rem" }}>
        {/* Cover art */}
        {track.coverArt ? (
          <img
            src={track.coverArt}
            alt={track.title}
            width={68}
            height={68}
            style={{ width: 68, height: 68, objectFit: "cover", flexShrink: 0, opacity: 0.9 }}
          />
        ) : (
          <div
            style={{
              width:      68,
              height:     68,
              flexShrink: 0,
              background: "linear-gradient(135deg, rgba(200,146,42,0.12), rgba(200,146,42,0.04))",
              border:     "1px solid rgba(200,146,42,0.15)",
            }}
          />
        )}

        {/* Text block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: "1.25rem", color: "#E8E0D4", lineHeight: 1.2 }}
          >
            {track.title}
          </p>
          <p
            style={{
              fontFamily:    "var(--font-inter)",
              fontSize:      "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "rgba(200,146,42,0.45)",
              marginTop:     "0.2rem",
            }}
          >
            {track.subtitle}
          </p>
          {track.description && (
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize:   "0.78rem",
                color:      "#7A6F62",
                marginTop:  "0.5rem",
                lineHeight: 1.55,
              }}
            >
              {track.description}
            </p>
          )}
          {/* Links — only shown when there's no embeddable player */}
          {!trackId && (
            <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.75rem" }}>
              <a
                href={track.spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
                className="hover:text-[#1DB954] transition-colors duration-200"
              >
                Spotify →
              </a>
              <a
                href={track.tidalLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
                className="hover:text-[#00FFFF] transition-colors duration-200"
              >
                Tidal →
              </a>
            </div>
          )}
        </div>

        {/* Dismiss */}
        <button
          onClick={() => onDismiss(track.id)}
          aria-label="Dismiss"
          style={{ color: "rgba(200,146,42,0.3)", fontSize: "1.25rem", lineHeight: 1, flexShrink: 0 }}
          className="hover:text-[#C8922A] transition-colors duration-200"
        >
          ×
        </button>
      </div>

      {/* Spotify embed + Tidal fallback link */}
      {trackId && (
        <div style={{ padding: "0 1.25rem 1.25rem" }}>
          <iframe
            src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: "block" }}
          />
          <a
            href={track.tidalLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: "0.6rem", fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}
            className="hover:text-[#00FFFF] transition-colors duration-200"
          >
            Also on Tidal →
          </a>
        </div>
      )}
    </div>
  );
}

interface SongConciergeProps {
  heading?:        string;
  placeholder?:    string;
  orLabel?:        string;
  chipLatest?:     string;
  chipMostPlayed?: string;
  chipUnexpected?: string;
  tagline?:        string;
}

export default function SongConcierge({
  heading        = "What song can I play for you?",
  placeholder    = "Something quiet for late at night…",
  orLabel        = "or",
  chipLatest     = "Latest Release",
  chipMostPlayed = "Most Played",
  chipUnexpected = "Unexpected",
  tagline        = "Songs built from real moments, lived quietly and felt deeply.",
}: SongConciergeProps) {
  const [input, setInput]       = useState("");
  const [results, setResults]   = useState<Track[]>([]);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chips = [
    { label: chipLatest,     id: "lycka" },
    { label: chipMostPlayed, id: "wake-up" },
    { label: chipUnexpected, id: "night" },
  ];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setActiveChip(null);
    setResults(matchFromText(input));
  }

  function handleChip(id: string) {
    setActiveChip(id);
    setInput("");
    setResults([catalog.find((t) => t.id === id) ?? catalog[0]]);
    inputRef.current?.blur();
  }

  function handleDismiss(id: string) {
    setResults((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (next.length === 0) { setActiveChip(null); setInput(""); }
      return next;
    });
  }

  return (
    <div className="w-full max-w-lg mx-auto" style={{ paddingTop: "clamp(5rem, 12vh, 7rem)", paddingBottom: "2rem" }}>
      <h2
        className="font-[family-name:var(--font-cormorant)] font-light text-center"
        style={{
          fontSize:     "clamp(1.5rem, 5vw, 2.6rem)",
          color:        "#3A3530",
          letterSpacing:"0.02em",
          marginBottom: tagline ? "0.9rem" : "2rem",
        }}
      >
        {heading}
      </h2>

      {tagline && (
        <p
          className="font-[family-name:var(--font-cormorant)] font-light text-center"
          style={{
            fontSize:     "clamp(1rem, 2.4vw, 1.2rem)",
            color:        "rgba(55,48,43,0.5)",
            fontStyle:    "italic",
            letterSpacing:"0.02em",
            lineHeight:   1.5,
            marginBottom: "2rem",
          }}
        >
          {tagline}
        </p>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (results.length > 0 && !activeChip) setResults([]);
          }}
          className="concierge-input"
          placeholder={placeholder}
          style={{
            width:       "100%",
            background:  "rgba(28,26,23,0.04)",
            border:      "1px solid rgba(28,26,23,0.18)",
            color:       "#1C1A17",
            padding:     "1rem 3rem 1rem 1.25rem",
            fontSize:    "0.875rem",
            letterSpacing:"0.02em",
            outline:     "none",
            transition:  "border-color 200ms",
            fontFamily:  "var(--font-inter)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(28,26,23,0.18)")}
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
      <div className="mt-5 text-center">
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "0.75rem" }}>
          {orLabel}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleChip(chip.id)}
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding:       "0.45rem 1rem",
                border:        `1px solid ${activeChip === chip.id ? "var(--color-accent)" : "rgba(28,26,23,0.18)"}`,
                color:         activeChip === chip.id ? "var(--color-accent)" : "#7A6F62",
                background:    activeChip === chip.id ? "transparent" : "rgba(28,26,23,0.03)",
                transition:    "border-color 200ms, color 200ms",
                cursor:        "pointer",
                whiteSpace:    "nowrap",
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 && (
        <div className="flex flex-col gap-3 mt-8">
          {results.map((track) => (
            <ResultCard key={track.id} track={track} onDismiss={handleDismiss} />
          ))}
        </div>
      )}
    </div>
  );
}
