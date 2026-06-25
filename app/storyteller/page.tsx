import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Storyteller — Erik Sjøholm",
  description: "Erik Sjøholm as storyteller — concerts, narrative performances, and the art of the song-story.",
};

const performances = [
  { name: "Mezrab",                           location: "Amsterdam, Netherlands" },
  { name: "Amsterdam Storytelling Festival",  location: "Amsterdam, Netherlands" },
  { name: "Arbogast Festival",                location: "Sweden" },
  { name: "Croatia Storying",                 location: "Croatia" },
];

export default function Storyteller() {
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
          The Storyteller
        </h1>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62", marginTop: "1rem" }}>
          Song · Narrative · Presence
        </p>

        <div className="mt-14 space-y-8">
          <p
            className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
            style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)", color: "#E8E0D4" }}
          >
            Every song Erik writes is a story that needed to become music before
            it could be told.
          </p>

          <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
            A performance is never just a set list. It is a room being built in
            real time — through voice, guitar, and the particular silence between
            the two. Erik places each song the way a storyteller places a sentence:
            with intention, with weight, with room to breathe.
          </p>

          <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
            He has performed in storytelling houses, festival stages, and intimate
            gatherings across Europe. Whether at Mezrab in Amsterdam or a festival
            square in Croatia, the form is the same: one person, one story, one
            guitar. What changes is only the room.
          </p>

          <p
            className="font-[family-name:var(--font-cormorant)] font-light italic"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.3rem)", color: "#C8922A" }}
          >
            &ldquo;A song is a story that found its rhythm before it found its words.&rdquo;
          </p>
        </div>

        {/* Divider */}
        <span className="block w-8 h-px mt-14 mb-12" style={{ background: "#C8922A" }} />

        {/* Stages */}
        <div>
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1.5rem" }}>
            Stages
          </p>
          <ul className="space-y-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {performances.map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "1.05rem", color: "#E8E0D4" }}
                >
                  {p.name}
                </span>
                <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62" }}>
                  {p.location}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Booking */}
        <div className="mt-14 space-y-4">
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7A6F62" }}>
            Booking &amp; enquiries
          </p>
          <p className="text-sm" style={{ color: "#7A6F62", lineHeight: 1.8 }}>
            For concerts, storytelling events, or collaborative work, reach out directly.
          </p>
          <a
            href="mailto:erik@eriksjoholm.com"
            style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#7A6F62", borderBottom: "1px solid rgba(200,146,42,0.3)", paddingBottom: "2px" }}
            className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200 inline-block"
          >
            erik@eriksjoholm.com
          </a>
        </div>

      </div>
    </main>
  );
}
