import type { Metadata } from "next";
import Link from "next/link";
import RevealSection from "@/components/RevealSection";
import BackNav from "@/components/BackNav";

export const metadata: Metadata = {
  title: "GLENN — Erik Sjøholm",
  description:
    "GLENN: The Things We Don't Speak About — a storytelling concert by Erik Sjøholm. Book for festivals, theatres, and cultural venues.",
};

const container: React.CSSProperties = {
  maxWidth: "720px",
  margin: "0 auto",
  padding: "0 1.5rem",
  width: "100%",
};

const sectionPad: React.CSSProperties = {
  paddingTop: "5rem",
  paddingBottom: "5rem",
};

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.48rem",
  letterSpacing: "0.35em",
  textTransform: "uppercase" as const,
  color: "#7A6F62",
  marginBottom: "1rem",
};

const sectionHeading: React.CSSProperties = {
  fontFamily: "var(--font-cormorant)",
  fontWeight: 300,
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  color: "#E8E0D4",
  letterSpacing: "0.03em",
  lineHeight: 1.05,
  marginBottom: "2rem",
};

const bodyText: React.CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.875rem",
  color: "#7A6F62",
  lineHeight: 1.8,
};

const divider: React.CSSProperties = {
  borderTop: "1px solid rgba(255,255,255,0.07)",
};

export default function Storyteller() {
  return (
    <main style={{ background: "#0D0B09", color: "#E8E0D4" }}>

      {/* Fixed background — Mezrab storytelling house */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(/images/bg/bg-02.jpg)",
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.08,
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── 1. HERO ──────────────────────────────────────── */}
        <section
          style={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            paddingTop: "5.5rem",
            paddingBottom: "5rem",
          }}
        >
          <div style={{ ...container, display: "flex", flexDirection: "column", flex: 1 }}>

            <BackNav />

            {/* Centered hero content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>

              <p style={{ ...eyebrow, color: "#7A6F62", marginBottom: "2rem" }}>
                A Storytelling Concert
              </p>

              <h1
                className="font-[family-name:var(--font-cormorant)] font-light"
                style={{
                  fontSize: "clamp(5rem, 16vw, 9rem)",
                  color: "#E8E0D4",
                  letterSpacing: "0.04em",
                  lineHeight: 0.92,
                  marginBottom: "1.5rem",
                }}
              >
                GLENN
              </h1>

              <p
                className="font-[family-name:var(--font-cormorant)]"
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1.1rem, 2.8vw, 1.6rem)",
                  color: "rgba(232,224,212,0.7)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.4,
                  marginBottom: "1.25rem",
                }}
              >
                &ldquo;The Things We Don&apos;t Speak About&rdquo;
              </p>

              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.8rem",
                  color: "#7A6F62",
                  lineHeight: 1.7,
                  maxWidth: "42ch",
                  marginBottom: "2.5rem",
                }}
              >
                A storytelling concert born on the day Erik Sjøholm came into
                the world — and his uncle Glenn left it.
              </p>

              <div>
                <a
                  href="#trailer"
                  className="hover:bg-[#C8922A] hover:text-[#0D0B09] transition-all duration-200"
                  style={{
                    display: "inline-block",
                    border: "1px solid #C8922A",
                    color: "#C8922A",
                    padding: "0.7rem 2rem",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  Watch Trailer
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── 2. ABOUT THE SHOW ────────────────────────────── */}
        <RevealSection>
          <section style={{ ...sectionPad, ...divider }}>
            <div style={container}>

              <p style={{ ...eyebrow, marginBottom: "2.5rem" }}>The Show</p>

              <div style={{ maxWidth: "60ch" }}>
                <p style={{ ...bodyText, marginBottom: "1.5rem" }}>
                  Imagine a world blanketed in snow, where light and darkness
                  dance on the edge of silence. That is where Erik Sjøholm was
                  born — and on that very day, his uncle Glenn took his own
                  life, leaving behind a legacy of grief, questions, and
                  unspoken stories.
                </p>
                <p style={bodyText}>
                  In this storytelling concert, Erik digs beneath the snow and
                  ice, uncovering fragments of his family&apos;s unspoken
                  mythology. Through raw personal stories and original songs —
                  in the tradition of Damien Rice, Glen Hansard, and Jeff
                  Buckley — he takes you on a journey into the heart of loss,
                  self-discovery, and the search for meaning.
                </p>
              </div>

              {/* Four themes */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-8"
                style={{ marginTop: "3.5rem" }}
              >
                {[
                  {
                    title: "Grief and Loss",
                    sub: "Unspoken stories, family mythology",
                  },
                  {
                    title: "Resilience",
                    sub: "Rising from the ashes of pain",
                  },
                  {
                    title: "Transformation",
                    sub: "Turning darkness into art",
                  },
                  {
                    title: "Human Connection",
                    sub: "The universality of silent struggles",
                  },
                ].map(({ title, sub }) => (
                  <div key={title}>
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.05rem", color: "#E8E0D4", lineHeight: 1.3, marginBottom: "0.4rem" }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.65rem",
                        color: "#7A6F62",
                        lineHeight: 1.5,
                      }}
                    >
                      {sub}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>
        </RevealSection>

        {/* ── 3. TESTIMONIALS ──────────────────────────────── */}
        <RevealSection>
          <section style={{ ...sectionPad, ...divider }}>
            <div style={container}>

              <p style={eyebrow}>Audience</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {[
                  {
                    name: "Marielle Dúgdam",
                    location: "Amsterdam",
                    quote:
                      "Goose bumps from beginning to end. Your openness is such a gift.",
                  },
                  {
                    name: "Femke",
                    location: "Tüssenland Festival, Zwolle, NL",
                    quote:
                      "It was really impressive. Your voice as well as the show are so beautiful. I'm truly speechless.",
                  },
                  {
                    name: "Evelyn",
                    location: "Währinge Wohnzimmer, Vienna",
                    quote:
                      "Your show was the best end of this day. Thank you for your courage and your honesty. Your beautiful songs touched my heart.",
                  },
                ].map(({ name, quote, location }) => (
                  <div key={name}>
                    <blockquote
                      className="font-[family-name:var(--font-cormorant)]"
                      style={{
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(1rem, 2vw, 1.2rem)",
                        color: "#E8E0D4",
                        lineHeight: 1.6,
                        marginBottom: "1rem",
                      }}
                    >
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#C8922A",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.6rem",
                        color: "#7A6F62",
                      }}
                    >
                      {location}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>
        </RevealSection>

        {/* ── 4. TRAILER ───────────────────────────────────── */}
        <RevealSection>
          <section id="trailer" style={{ ...sectionPad, ...divider }}>
            <div style={container}>

              <p style={{ ...eyebrow, marginBottom: "2.5rem" }}>Watch</p>

              {/* 16:9 YouTube embed */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%",
                  borderRadius: "2px",
                  overflow: "hidden",
                  background: "#000",
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/L44DV_sT-Qw"
                  title="GLENN — The Things We Don't Speak About"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.65rem",
                  color: "#7A6F62",
                  marginTop: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                Performed at GLÖD Storytelling Festival, Vasa, Finland — March 2022
              </p>

            </div>
          </section>
        </RevealSection>

        {/* ── 5. THE TEAM ──────────────────────────────────── */}
        <RevealSection>
          <section style={{ ...sectionPad, ...divider }}>
            <div style={container}>

              <p style={{ ...eyebrow, marginBottom: "2.5rem" }}>The Team</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {[
                  {
                    name: "Erik Sjøholm",
                    role: "Performer & Writer",
                    bio: "Singer-songwriter and storyteller, Erik brings a raw personal narrative to the stage, blending music and storytelling in a way that moves audiences deeply.",
                  },
                  {
                    name: "Raphael Rodan",
                    role: "Co-writer & Director",
                    bio: "An award-winning storyteller and theatre director based in the Netherlands. His work focuses on personal mythology and the universal stories that connect us.",
                  },
                  {
                    name: "Mey Rahimi",
                    role: "Visual Designer & Writer",
                    bio: "A multidisciplinary artist specialising in visual storytelling and stage design. Her visual aesthetics elevate the emotional depth of the show.",
                  },
                ].map(({ name, role, bio }) => (
                  <div key={name}>
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.15rem", color: "#E8E0D4", marginBottom: "0.35rem" }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.48rem",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "#C8922A",
                        marginBottom: "0.85rem",
                      }}
                    >
                      {role}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.75rem",
                        color: "#7A6F62",
                        lineHeight: 1.7,
                      }}
                    >
                      {bio}
                    </p>
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.65rem",
                  color: "#7A6F62",
                  marginTop: "3rem",
                  paddingTop: "2rem",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                This storytelling concert has been partly funded by Svenska
                Kulturfonden.
              </p>

            </div>
          </section>
        </RevealSection>

        {/* ── 6. PRACTICAL INFO (bookers) ──────────────────── */}
        <section
          style={{
            ...sectionPad,
            borderTop: "1px solid rgba(200,146,42,0.35)",
            background: "rgba(200,146,42,0.02)",
          }}
        >
          <div style={container}>

            <p style={eyebrow}>Booking</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ ...sectionHeading }}
            >
              For Programmers &amp; Festivals
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">

              {/* Left: The Show */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.48rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#C8922A",
                    marginBottom: "1.25rem",
                  }}
                >
                  The Show
                </p>
                <dl style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { term: "Duration", desc: "60 minutes" },
                    { term: "Language", desc: "English or Swedish (specified at booking)" },
                    {
                      term: "Target audience",
                      desc: "Age 16+, storytelling festivals, cultural festivals, theatres, mental health awareness programmes, universities, corporate wellness",
                    },
                  ].map(({ term, desc }) => (
                    <div key={term}>
                      <dt
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.45rem",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "#7A6F62",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {term}
                      </dt>
                      <dd
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.8rem",
                          color: "#E8E0D4",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {desc}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Right: Stage Requirements */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.48rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#C8922A",
                    marginBottom: "1.25rem",
                  }}
                >
                  Stage Requirements
                </p>
                <dl style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { term: "Stage size", desc: "Minimum 4m × 4m" },
                    { term: "Lighting", desc: "Basic stage lighting with spotlight capability" },
                    { term: "Sound", desc: "PA system for vocals and acoustic guitar" },
                    { term: "Tech rider", desc: "Full tech rider and press kit available on request" },
                  ].map(({ term, desc }) => (
                    <div key={term}>
                      <dt
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.45rem",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "#7A6F62",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {term}
                      </dt>
                      <dd
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.8rem",
                          color: "#E8E0D4",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {desc}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

            </div>
          </div>
        </section>

        {/* ── 7. CLOSING CTAs ──────────────────────────────── */}
        <RevealSection>
          <section style={{ ...sectionPad, ...divider }}>
            <div style={container}>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">

                {/* See the Show — fans */}
                <div
                  style={{
                    padding: "2rem",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "1.5rem", color: "#E8E0D4", marginBottom: "0.75rem" }}
                  >
                    See the Show
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.78rem",
                      color: "#7A6F62",
                      lineHeight: 1.7,
                      marginBottom: "1.5rem",
                    }}
                  >
                    Upcoming dates and events are announced on Notes — Erik&apos;s newsletter.
                  </p>
                  <a
                    href="https://eriksjoholm-newsletter.beehiiv.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-[#E8E0D4] hover:text-[#0D0B09] transition-all duration-200"
                    style={{
                      display: "inline-block",
                      border: "1px solid #E8E0D4",
                      color: "#E8E0D4",
                      padding: "0.6rem 1.5rem",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.48rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    Subscribe to Notes
                  </a>
                </div>

                {/* Book GLENN — bookers */}
                <div
                  style={{
                    padding: "2rem",
                    border: "1px solid rgba(200,146,42,0.25)",
                    background: "rgba(200,146,42,0.02)",
                  }}
                >
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "1.5rem", color: "#E8E0D4", marginBottom: "0.75rem" }}
                  >
                    Book GLENN
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.78rem",
                      color: "#7A6F62",
                      lineHeight: 1.7,
                      marginBottom: "1.5rem",
                    }}
                  >
                    To discuss availability, fees, and technical requirements,
                    reach out directly.
                  </p>
                  <Link
                    href="/contact"
                    className="hover:bg-[#C8922A] hover:text-[#0D0B09] transition-all duration-200"
                    style={{
                      display: "inline-block",
                      border: "1px solid #C8922A",
                      color: "#C8922A",
                      padding: "0.6rem 1.5rem",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.48rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                    }}
                  >
                    Get in touch
                  </Link>
                </div>

              </div>

            </div>
          </section>
        </RevealSection>

      </div>
    </main>
  );
}
