import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const NOTES_DIR = path.join(process.cwd(), 'content/notes');

export interface Note {
  slug:        string;
  title:       string;
  date:        string;    // ISO date string YYYY-MM-DD
  excerpt?:    string;
  coverImage?: string;
  /** Rendered HTML — only populated by getNote(), not getNotes() */
  contentHtml?: string;
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

function parseDate(raw: unknown): string {
  if (typeof raw === 'string') return raw;
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  return '';
}

/** Read all notes and return sorted newest-first (no body content) */
export async function getNotes(): Promise<Note[]> {
  if (!fs.existsSync(NOTES_DIR)) return [];

  const filenames = fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .reverse(); // reverse so newest slug (date-prefixed) comes first

  return filenames.map((filename) => {
    const raw = fs.readFileSync(path.join(NOTES_DIR, filename), 'utf-8');
    const { data } = matter(raw);
    return {
      slug:        data.slug ?? slugFromFilename(filename),
      title:       data.title ?? 'Untitled',
      date:        parseDate(data.date),
      excerpt:     data.excerpt ?? undefined,
      coverImage:  data.coverImage ?? undefined,
    };
  });
}

/** Return all note slugs (for static param generation) */
export async function getNoteSlugs(): Promise<string[]> {
  const notes = await getNotes();
  return notes.map((n) => n.slug);
}

/** Read a single note with rendered HTML body */
export async function getNote(slug: string): Promise<Note | null> {
  if (!fs.existsSync(NOTES_DIR)) return null;

  const filenames = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith('.md'));

  // Match by frontmatter slug OR filename
  for (const filename of filenames) {
    const raw = fs.readFileSync(path.join(NOTES_DIR, filename), 'utf-8');
    const { data, content } = matter(raw);
    const noteSlug = data.slug ?? slugFromFilename(filename);

    if (noteSlug !== slug) continue;

    const processed = await remark().use(remarkHtml).process(content);
    return {
      slug,
      title:       data.title ?? 'Untitled',
      date:        parseDate(data.date),
      excerpt:     data.excerpt ?? undefined,
      coverImage:  data.coverImage ?? undefined,
      contentHtml: processed.toString(),
    };
  }

  return null;
}

export function formatNoteDate(iso: string, locale: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(locale, {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
}
