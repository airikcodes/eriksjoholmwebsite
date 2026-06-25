import type { Metadata } from "next";
import BackNav from "@/components/BackNav";

export const metadata: Metadata = {
  title: "The Storyteller — Erik Sjøholm",
  description: "Erik Sjøholm as storyteller — concerts, narrative performances, and the art of the song-story.",
};

const stages = [
  { name: "Mezrab",                          location: "Amsterdam, NL",  note: "Storytelling house" },
  { name: "Amsterdam Storytelling Festival", location: "Amsterdam, NL",  note: "Annual festival" },
  { name: "Arbogast Festival",               location: "Sweden",         note: "Music & arts festival" },
  { name: "Croatia Storying",                location: "Croatia",        note: "International gathering" },
];

export default function Storyteller() {
  return (
    <main className="min-h-screen" style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Static background — Mezrab performance */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/bg/bg-02.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.13,
        }} />
      </div>

      <div className="relative px-6 pt-20 pb-24" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <BackNav />

          {/* Title */}
          <div className="mb-14">
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C8922A", marginBottom: "1.25rem" }}>
              Song · Narrative · Presence
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#E8E0D4", letterSpacing: "0.03em", lineHeight: 1.05 }}
            >
              The Storyteller
            </h1>
          </div>

          {/* Opening */}
          <p
            className="font-[family-name:var(--font-cormorant)] font-light leading-relaxed"
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.55rem)", color: "#E8E0D4" }}
          >
            Every song Erik writes is a story that needed to become music
            before it could be told.
          </p>

          {/* Divider */}
          <span className="block w-6 h-px my-10" style={{ background: "#C8922A" }} />

          {/* Body */}
          <div className="space-y-6">
            <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.9 }}>
              A performance is never just a set list. It is a room being built in
              real time — through voice, guitar, and the particular silence between
              the two. Erik places each song the way a storyteller places a sentence:
              with intention, with weight, with room to breathe.
            </p>

            <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.9 }}>
              He has performed in storytelling houses, festival stages, and intimate
              gatherings across Europe. Whether at Mezrab in Amsterdam or a festival
              square in Croatia, the form is the same: one person, one story, one guitar.
              What changes is only the room.
            </p>

            <p className="text-sm leading-relaxed" style={{ color: "#7A6F62", lineHeight: 1.9 }}>
              The songs arrive from the same place stories always do — from the
              details most people notice but never say out loud. A conversation
              that ended too soon. A face remembered on a train. The particular
              colour of grief on a Tuesday morning. Erik says it plainly so you
              don&apos;t have to.
            </p>
          </div>

          {/* Pull quote */}
          <blockquote
            className="font-[family-name:var(--font-cormorant)] font-light italic my-14"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
              color: "#C8922A",
              borderLeft: "1px solid rgba(200,146,42,0.35)",
              paddingLeft: "1.5rem",
              lineHeight: 1.6,
            }}
          >
            &ldquo;A song is a story that found its rhythm before it found its words.&rdquo;
          </blockquote>

          {/* Stages */}
          <div>
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1.25rem" }}>
              Stages
            </p>
            <ul style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {stages.map((s) => (
                <li
                  key={s.name}
                  className="py-5 flex items-start justify-between gap-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div>
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.1rem", color: "#E8E0D4" }}
                    >
                      {s.name}
                    </p>
                    <p style={{ fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A6F62", marginTop: "0.2rem" }}>
                      {s.note}
                    </p>
                  </div>
                  <span style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6F62", paddingTop: "0.15rem", flexShrink: 0 }}>
                    {s.location}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking */}
          <div className="mt-14 p-6" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7A6F62", marginBottom: "1rem" }}>
              Booking &amp; enquiries
            </p>
            <p className="text-sm" style={{ color: "#7A6F62", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              For concerts, storytelling events, or collaborative work,
              reach out directly.
            </p>
            <a
              href="mailto:erik@eriksjoholm.com"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C8922A" }}
              className="hover:text-[#E8E0D4] transition-colors duration-200"
            >
              erik@eriksjoholm.com →
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
