// Lyrics search for the Song Concierge.
//
// Builds a small in-memory index of every lyric line (original language plus the
// en/de/es/sv/fi translations already stored in data/works.ts) and ranks songs by how
// well a free-text query matches those lines. Because translations are indexed too,
// someone typing English can land on a Swedish song (and vice-versa).
//
// Deliberately lexical (no API, no cost, deterministic, instant). The result carries
// the best-matching line so the UI can show *why* a song was suggested. An embedding /
// LLM re-rank can be layered on top later without changing this module's shape.

import { works, type Work } from '../data/works';

type LineLang = 'en' | 'de' | 'es' | 'sv' | 'fi';

interface IndexedLine {
  slug:  string;
  lang:  LineLang;
  orig:  boolean;
  text:  string;
  stems: string[];
  set:   Set<string>;
}

export interface LyricHit {
  slug:        string;
  title:       string;
  meta?:       string;
  coverImage?: string;
  spotifyUrl?: string;
  tidalUrl?:   string;
  description?: string;
  line:        string;
  lang:        LineLang;
  orig:        boolean;
  score:       number;
}

// Words that carry no meaning for matching (several languages) plus query filler.
const STOP = new Set((
  // en
  'a an the and or but if of to in on at for from by with as is are was were be been am it its this that these those i me my we our you your he she they them his her their not no so do does did have has had will would can could should just very too also than then there here what when where who why how about into out up down over again all any some more most me' +
  // filler in queries
  ' song songs play something someone looking find need give want tune track music feel feeling like lyrics line' +
  // sv
  ' och att det som en ett jag du han hon vi ni de dem mig dig sig min mitt mina din ditt dina har hade ska skulle kan kunde inte men för på av med till från om så då här där när hur vad vem var är vara blir bli' +
  // de
  ' der die das und oder aber ich du er sie es wir ihr mein dein sein ihr nicht kein ist sind war waren mit von zu im am ein eine einen dem den des auch nur noch schon wie was wer wo' +
  // es
  ' el la los las un una unos unas y o pero yo tu mi su nos que de del en con por para es son era eran no si se lo le les me te como cuando donde quien' +
  // fi
  ' ja tai mutta minä sinä hän me te he on ovat oli ei että kun kuin niin vain jo vielä'
).split(/\s+/).filter(Boolean));

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function tokens(s: string): string[] {
  return normalize(s).match(/[a-z0-9]+/g) ?? [];
}

// Cheap stemmer: first 5 letters of longer words, so walk/walking/walked and
// Swedish/German inflections still meet in the middle.
function stem(t: string): string {
  return t.length > 5 ? t.slice(0, 5) : t;
}

function contentStems(s: string): string[] {
  return tokens(s).filter((t) => t.length > 1 && !STOP.has(t)).map(stem);
}

// Rough query-language detection from function words, so an English query doesn't
// match Spanish "sea" (= "be") or Swedish "hem" false friends. Unknown -> search all.
const HINTS: Record<LineLang, Set<string>> = {
  en: new Set('the and to of is in for with my you your i me about that this what when like want something feel love it are was'.split(' ')),
  sv: new Set('och att det som jag inte en ett är är du min mitt vad när för med på om av har'.split(' ')),
  de: new Set('der die das und ich nicht ist mit von zu ein eine was wenn für auf mein dein'.split(' ')),
  es: new Set('el la los las que y de con por para una un es en mi tu su como cuando algo'.split(' ')),
  fi: new Set('ja on ei että minä sinä kun kuin mutta jotain'.split(' ')),
};

function detectLang(query: string): LineLang | null {
  const toks = normalize(query).match(/[a-z]+/g) ?? [];
  let best: LineLang | null = null, bestN = 0, tie = false;
  for (const l of Object.keys(HINTS) as LineLang[]) {
    const n = toks.filter((t) => HINTS[l].has(t)).length;
    if (n > bestN) { best = l; bestN = n; tie = false; } else if (n === bestN && n > 0) tie = true;
  }
  return bestN > 0 && !tie ? best : null;
}

function langOf(w: Work): LineLang {
  return (w.language ?? '').toLowerCase().startsWith('swed') ? 'sv' : 'en';
}

let lines: IndexedLine[] | null = null;
let idf: Map<string, number> | null = null;

function build() {
  if (lines && idf) return;
  const out: IndexedLine[] = [];
  const add = (slug: string, lang: LineLang, orig: boolean, text: string) => {
    for (const raw of text.split('\n')) {
      const t = raw.trim();
      if (t.length < 3) continue;
      const stems = contentStems(t);
      if (!stems.length) continue;
      out.push({ slug, lang, orig, text: t, stems, set: new Set(stems) });
    }
  };
  for (const w of works) {
    if (!w.lyrics) continue;
    add(w.slug, langOf(w), true, w.lyrics);
    for (const [lang, text] of Object.entries(w.lyricsTranslations ?? {})) {
      if (text) add(w.slug, lang as LineLang, false, text);
    }
  }
  const df = new Map<string, number>();
  for (const l of out) for (const s of l.set) df.set(s, (df.get(s) ?? 0) + 1);
  const N = out.length;
  const m = new Map<string, number>();
  for (const [s, n] of df) m.set(s, Math.log(1 + N / (1 + n)));
  lines = out;
  idf = m;
}

export function searchLyrics(query: string, limit = 3): LyricHit[] {
  build();
  const q = query.slice(0, 200);
  const qs = [...new Set(contentStems(q))];
  if (!qs.length || !lines || !idf) return [];
  const qOrder = contentStems(q); // keeps order for adjacent-pair bonus
  const qLang = detectLang(q);

  interface Best { line: IndexedLine; score: number; matched: number; extra: number }
  const perSong = new Map<string, Best>();
  const seenExtra = new Map<string, number[]>();

  for (const l of lines) {
    if (qLang && l.lang !== qLang) continue;
    let score = 0, matched = 0;
    for (const s of qs) if (l.set.has(s)) { score += idf.get(s) ?? 0; matched++; }
    if (!matched) continue;
    // adjacency bonus: two consecutive query words appearing consecutively in the line
    for (let i = 0; i < qOrder.length - 1; i++) {
      for (let j = 0; j < l.stems.length - 1; j++) {
        if (l.stems[j] === qOrder[i] && l.stems[j + 1] === qOrder[i + 1]) {
          score += 0.5 * (idf.get(qOrder[i]) ?? 0);
          break;
        }
      }
    }
    // no language detected: original lines count fully, translations slightly less
    if (!qLang && !l.orig) score *= 0.9;
    if (l.orig) score += 0.05;

    const cur = perSong.get(l.slug);
    if (!cur) {
      perSong.set(l.slug, { line: l, score, matched, extra: 0 });
    } else if (score > cur.score) {
      const prev = cur.score;
      cur.line = l; cur.score = score; cur.matched = matched;
      const arr = seenExtra.get(l.slug) ?? []; arr.push(prev); seenExtra.set(l.slug, arr);
    } else {
      const arr = seenExtra.get(l.slug) ?? []; arr.push(score); seenExtra.set(l.slug, arr);
    }
  }

  const ranked: Array<{ slug: string; best: Best; total: number }> = [];
  for (const [slug, best] of perSong) {
    const extras = (seenExtra.get(slug) ?? []).sort((a, b) => b - a).slice(0, 2);
    const total = best.score + 0.25 * extras.reduce((a, b) => a + b, 0);
    // Qualify: two distinct query words in one line, or one clearly distinctive word.
    if (best.matched >= 2 || (qs.length === 1 && best.score >= 3.5) || best.score >= 5) {
      ranked.push({ slug, best, total });
    }
  }
  ranked.sort((a, b) => b.total - a.total);

  const bySlug = new Map(works.map((w) => [w.slug, w]));
  return ranked.slice(0, limit).flatMap(({ slug, best, total }) => {
    const w = bySlug.get(slug);
    if (!w) return [];
    return [{
      slug,
      title:       w.title,
      meta:        w.meta,
      coverImage:  w.coverImage,
      spotifyUrl:  w.spotifyUrl,
      tidalUrl:    w.tidalUrl,
      description: w.description,
      line:        best.line.text,
      lang:        best.line.lang,
      orig:        best.line.orig,
      score:       Math.round(total * 100) / 100,
    }];
  });
}
