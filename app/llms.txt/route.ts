import { albums } from "@/data/works";
import { getNotes } from "@/lib/notes";

// A curated, LLM-friendly summary of the site for AI agents and crawlers —
// see https://llmstxt.org. This complements sitemap.xml (the exhaustive,
// machine-readable page list) rather than replacing it: this file is meant
// to stay short and hand-picked, so it's built from a small, deliberate
// subset of the catalogue (releases, not every individual track) plus
// whatever's in content/notes.
//
// Regenerated on each request from data/works.ts and content/notes so it
// can't drift out of sync with the site.

const base = "https://eriksjoholm.com";

export async function GET() {
  const releases = albums
    .slice()
    .sort((a, b) => {
      // Upcoming releases first (most newsworthy), then released ones newest-first.
      const rank = (w: (typeof albums)[number]) =>
        w.releaseStatus === "upcoming" ? Infinity : (w.year ?? 0);
      return rank(b) - rank(a);
    })
    .map((a) => {
      // meta only, never the full page description — those run to several paragraphs
      // on some releases and this file is meant to stay short and skimmable.
      const bits = [
        a.year ? String(a.year) : a.releaseStatus === "upcoming" ? "upcoming" : null,
        a.meta,
      ].filter(Boolean);
      const desc = bits.length ? `: ${bits.join(" — ")}` : "";
      return `- [${a.title}](${base}/works/${a.slug})${desc}`;
    })
    .join("\n");

  const notes = await getNotes();
  const noteLines = notes.length
    ? notes
        .map((n) => `- [${n.title}](${base}/notes/${n.slug})${n.excerpt ? `: ${n.excerpt}` : ""}`)
        .join("\n")
    : "- (none published yet)";

  const body = `# Erik Sjøholm

> Singer-songwriter and storyteller from Ostrobothnia, the Swedish-speaking coast of Finland, based in Luzern, Switzerland. Shaped by Lennon, Buckley, Mitchell, and Rice.

Erik writes and records original songs, mostly in Swedish and English, and performs a bilingual storytelling-and-live-music show. The Works pages hold the full catalogue with lyrics and credits; Notes is a running journal about the music and the process behind it.

## Music

${releases}

Full catalogue, individual songs, lyrics and credits: ${base}/works

## Notes

${noteLines}

## Site

- [About](${base}/about): who Erik is and how he works
- [Live](${base}/live): upcoming shows and dates
- [Shop](${base}/shop): merch and prints
- [Contact](${base}/contact): get in touch

## Optional

- [Sitemap](${base}/sitemap.xml): the exhaustive, machine-readable page list
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
