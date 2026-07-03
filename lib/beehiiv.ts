import 'server-only';
import sanitizeHtml from 'sanitize-html';

const API_BASE = 'https://api.beehiiv.com/v2';

function env(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing env var: ${key}`);
  return val;
}

export interface BeehiivPost {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  status: string;
  created: number;
  publish_date: number;
  thumbnail_url: string | null;
  web_url: string;
  free_web_content?: string;
  authors: string[];
  content?: { free?: { web?: string } };
}

interface BeehiivListResponse {
  data: BeehiivPost[];
  page: number;
  limit: number;
  total_results: number;
}

interface BeehiivSingleResponse {
  data: BeehiivPost;
}

export async function getPosts(): Promise<BeehiivPost[]> {
  const pubId = env('BEEHIIV_PUBLICATION_ID');
  const apiKey = env('BEEHIIV_API_KEY');

  const res = await fetch(
    `${API_BASE}/publications/${pubId}/posts?status=confirmed&limit=100&platform=web&order_by=publish_date&direction=desc`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 3600, tags: ['beehiiv-posts'] },
    }
  );

  if (!res.ok) {
    console.error(`Beehiiv list error: ${res.status} ${await res.text()}`);
    return [];
  }

  const json: BeehiivListResponse = await res.json();
  return json.data ?? [];
}

export async function getPostBySlug(slug: string): Promise<BeehiivPost | null> {
  const pubId = env('BEEHIIV_PUBLICATION_ID');
  const apiKey = env('BEEHIIV_API_KEY');

  // Fetch the list to resolve slug → id (cached)
  const posts = await getPosts();
  const stub = posts.find((p) => p.slug === slug);
  if (!stub) return null;

  const res = await fetch(
    `${API_BASE}/publications/${pubId}/posts/${stub.id}?expand[]=free_web_content`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 3600, tags: ['beehiiv-posts'] },
    }
  );

  if (!res.ok) return null;

  const json: BeehiivSingleResponse = await res.json();
  const post = json.data ?? null;
  if (!post) return null;

  // Content lives in content.free.web — free_web_content is always null
  post.free_web_content = post.content?.free?.web ?? '';
  return post;
}

// ── HTML sanitization ────────────────────────────────────────────────────────

const STYLE_ALLOWLIST: Record<string, RegExp[]> = {
  img:   [/^width$/, /^max-width$/, /^height$/, /^object-fit$/, /^float$/, /^margin$/],
  a:     [/^background(-color)?$/, /^color$/, /^padding$/, /^border-radius$/, /^display$/, /^text-align$/],
  td:    [/^width$/, /^padding$/, /^vertical-align$/, /^text-align$/],
  table: [/^width$/, /^max-width$/, /^border-spacing$/, /^border-collapse$/],
};

const ALLOWED_FOR_ALL = [/^text-align$/];

function filterStyle(tag: string, styles: Record<string, string>): Record<string, string> {
  const tagRules = STYLE_ALLOWLIST[tag] ?? [];
  const allowed = [...tagRules, ...ALLOWED_FOR_ALL];
  return Object.fromEntries(
    Object.entries(styles).filter(([prop]) =>
      allowed.some((re) => re.test(prop))
    )
  );
}

function preProcessBeehiivHtml(html: string): string {
  // Strip embedded <style> and <script> blocks (and their content)
  html = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

  // Extract <body> content from full HTML documents
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) html = bodyMatch[1];

  // Remove the Beehiiv post <h1> (we render the title in the page header)
  html = html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi, '');

  return html;
}

export function cleanBeehiivHtml(html: string, subtitle?: string | null): string {
  if (!html) return '';

  html = preProcessBeehiivHtml(html);

  return sanitizeHtml(html, {
    allowedTags: [
      // h1 intentionally omitted — rendered separately in page header
      'h2','h3','h4','h5','h6',
      'p','br','hr',
      'ul','ol','li',
      'blockquote','pre','code',
      'strong','b','em','i','u','s','sub','sup',
      'a','img',
      'figure','figcaption',
      'div','span','section',
      'table','thead','tbody','tr','th','td',
      'video','source',
    ],
    allowedAttributes: {
      '*':     ['class', 'id', 'style'],
      'a':     ['href', 'target', 'rel', 'class', 'id', 'style'],
      'img':   ['src', 'alt', 'width', 'height', 'class', 'id', 'style', 'loading'],
      'video': ['src', 'controls', 'width', 'height', 'style'],
      'source':['src', 'type'],
      'td':    ['colspan', 'rowspan', 'class', 'id', 'style'],
      'th':    ['colspan', 'rowspan', 'scope', 'class', 'id', 'style'],
      'table': ['class', 'id', 'style'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    transformTags: {
      'a': (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          target: '_blank',
          rel: 'noopener noreferrer',
          style: filterStyleStr('a', attribs.style),
        },
      }),
      'img': (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          loading: 'lazy',
          style: filterStyleStr('img', attribs.style),
        },
      }),
      'div':   (tagName, attribs) => ({ tagName, attribs: { ...attribs, style: '' } }),
      'table': (tagName, attribs) => ({ tagName, attribs: { ...attribs, style: filterStyleStr('table', attribs.style) } }),
      'td':    (tagName, attribs) => ({ tagName, attribs: { ...attribs, style: filterStyleStr('td', attribs.style) } }),
      'p':    stripStyle,
      'h2':   stripStyle,
      'h3':   stripStyle,
      'span': stripStyle,
    },
    exclusiveFilter: (frame) => {
      // Remove Beehiiv byline and social sharing blocks
      const cls = frame.attribs?.class ?? '';
      if (cls.includes('bh__byline')) return true;

      // Remove h2 that is Beehiiv's subtitle (we render post.subtitle separately)
      if (frame.tag === 'h2' && subtitle && frame.text?.trim() === subtitle.trim()) return true;

      // Remove tracking pixels (1×1 images or Beehiiv tracking URLs)
      if (frame.tag === 'img') {
        const w = parseInt(frame.attribs.width ?? '99', 10);
        const h = parseInt(frame.attribs.height ?? '99', 10);
        if (w <= 1 || h <= 1) return true;
        if (/beehiiv\.com\/.*(open|track|pixel)/i.test(frame.attribs.src ?? '')) return true;
      }

      // Remove unsubscribe / footer blocks
      if (['div', 'p', 'section', 'td'].includes(frame.tag)) {
        const text = (frame.text ?? '').toLowerCase();
        if (text.includes('unsubscribe') && text.includes('email')) return true;
      }

      return false;
    },
  });
}

function parseStyle(style?: string): Record<string, string> {
  if (!style) return {};
  return Object.fromEntries(
    style.split(';')
      .map((s) => s.split(':').map((p) => p.trim()))
      .filter(([k, v]) => k && v)
      .map(([k, v]) => [k.toLowerCase(), v])
  );
}

function styleToString(styles: Record<string, string>): string {
  return Object.entries(styles).map(([k, v]) => `${k}:${v}`).join(';');
}

function filterStyleStr(tag: string, style?: string): string {
  return styleToString(filterStyle(tag, parseStyle(style)));
}

function stripStyle(tagName: string, attribs: sanitizeHtml.Attributes) {
  return { tagName, attribs: { ...attribs, style: '' } };
}
