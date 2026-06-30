"use client";

import { useState } from "react";

export type Song = {
  id: string;
  title: string;
  meta?: string;
  spotify: string;
  tidal: string;
};

export default function SongsAccordion({ songs }: { songs: Song[] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <ul style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      {songs.map((song, i) => {
        const isOpen = openIds.has(song.id);
        return (
          <li key={song.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

            {/* ── Row header (always visible) ── */}
            <button
              onClick={() => toggle(song.id)}
              className="w-full text-left flex items-center justify-between gap-4"
              style={{ padding: "1.75rem 0", cursor: "pointer", background: "none", border: "none" }}
            >
              <div className="flex items-baseline gap-5 min-w-0">
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
                    style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.45rem)", color: "#E8E0D4", lineHeight: 1.2 }}
                  >
                    {song.title}
                  </p>
                  {song.meta && (
                    <p style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#7A6F62",
                      marginTop: "0.35rem",
                    }}>
                      {song.meta}
                    </p>
                  )}
                </div>
              </div>
              <span
                style={{
                  color: "#7A6F62",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  transition: "transform 250ms ease, color 150ms",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>

            {/* ── Expandable content ── */}
            <div style={{
              display: "grid",
              gridTemplateRows: isOpen ? "1fr" : "0fr",
              transition: "grid-template-rows 350ms ease",
            }}>
              <div style={{ overflow: "hidden" }}>
                <div style={{ paddingBottom: "3rem" }}>

                  {/* The Lyric */}
                  <div style={{ marginBottom: "3rem" }}>
                    <p style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.42rem",
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "#7A6F62",
                      marginBottom: "1.5rem",
                    }}>
                      The Lyric
                    </p>
                    <div style={{
                      borderLeft: "1px solid rgba(200,146,42,0.2)",
                      paddingLeft: "1.5rem",
                    }}>
                      <p
                        className="font-[family-name:var(--font-cormorant)] font-light italic"
                        style={{
                          fontSize: "clamp(1rem, 2vw, 1.2rem)",
                          color: "rgba(232,224,212,0.4)",
                          lineHeight: 2.1,
                          whiteSpace: "pre-line",
                        }}
                      >
                        [Lyrics coming soon]
                      </p>
                    </div>
                  </div>

                  {/* The Story */}
                  <div style={{ marginBottom: "2.5rem" }}>
                    <p style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.42rem",
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "#7A6F62",
                      marginBottom: "1rem",
                    }}>
                      The Story
                    </p>
                    <p style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.82rem",
                      color: "rgba(122,111,98,0.7)",
                      lineHeight: 1.85,
                      maxWidth: "56ch",
                      fontStyle: "italic",
                    }}>
                      [Story coming soon]
                    </p>
                  </div>

                  {/* Listen */}
                  <div>
                    <p style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.42rem",
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "#7A6F62",
                      marginBottom: "1rem",
                    }}>
                      Listen
                    </p>
                    <div className="flex gap-7">
                      <a
                        href={song.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#1DB954] transition-colors duration-200"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.72rem",
                          letterSpacing: "0.12em",
                          color: "#C8922A",
                        }}
                      >
                        Spotify →
                      </a>
                      <a
                        href={song.tidal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00FFFF] transition-colors duration-200"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.72rem",
                          letterSpacing: "0.12em",
                          color: "#C8922A",
                        }}
                      >
                        Tidal →
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </li>
        );
      })}
    </ul>
  );
}
