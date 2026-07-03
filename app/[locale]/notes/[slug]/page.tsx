import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import KeepInTouch from '@/components/KeepInTouch';
import { getPostBySlug, getPosts, cleanBeehiivHtml } from '@/lib/beehiiv';
import { getDictionary, hasLocale } from '@/lib/dictionaries';

export const revalidate = 3600;

const locales = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];

export async function generateStaticParams() {
  const posts = await getPosts();
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = `${post.title} — Erik Sjøholm`;
  const description = post.subtitle || 'Notes from the song-garden by Erik Sjøholm.';
  const image = post.thumbnail_url ?? '/images/portrait.jpg';

  return {
    title,
    description,
    alternates: { canonical: `https://eriksjoholm.com/notes/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://eriksjoholm.com/notes/${slug}`,
      images: [{ url: image, alt: post.title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

function formatDate(unix: number, locale: string): string {
  return new Date(unix * 1000).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function NotePost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const [t, post] = await Promise.all([
    getDictionary(locale),
    getPostBySlug(slug),
  ]);

  if (!post) notFound();

  const n = t.notes;
  const html = cleanBeehiivHtml(post.free_web_content ?? '', post.subtitle);
  const date = formatDate(post.publish_date, locale);

  return (
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>

      {/* Fixed background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/bg/bg-03.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.06,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Header ── */}
          <div style={{ paddingTop: '5.5rem', paddingBottom: '3.5rem' }}>
            <BackNav href="/notes" label={n.backToNotes} />

            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.48rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#7A6F62',
              marginBottom: '1.5rem',
            }}>
              {date}
            </p>

            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 3.75rem)',
                color: '#E8E0D4',
                letterSpacing: '0.01em',
                lineHeight: 1.05,
                marginBottom: post.subtitle ? '1.25rem' : 0,
              }}
            >
              {post.title}
            </h1>

            {post.subtitle && (
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.95rem',
                color: '#7A6F62',
                lineHeight: 1.75,
                maxWidth: '44ch',
              }}>
                {post.subtitle}
              </p>
            )}

            <span className="block" style={{ width: '2rem', height: '1px', background: '#C8922A', marginTop: '2.5rem' }} />
          </div>

          {/* ── Post body ── */}
          {html ? (
            <div
              className="notes-content"
              style={{ paddingBottom: '5rem' }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <div style={{
              paddingBottom: '5rem',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.9rem',
              color: '#7A6F62',
            }}>
              <p>Read the full letter on <a href={post.web_url} target="_blank" rel="noopener noreferrer" style={{ color: '#C8922A' }}>Beehiiv →</a></p>
            </div>
          )}

          {/* ── Keep in touch ── */}
          <div style={{
            borderTop:     '1px solid rgba(255,255,255,0.07)',
            paddingTop:    '4rem',
            paddingBottom: '2rem',
          }}>
            <KeepInTouch variant="note" />
          </div>

          {/* ── Back link ── */}
          <div style={{ paddingTop: '3rem', paddingBottom: '9rem' }}>
            <a
              href="/notes"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.48rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#7A6F62',
                borderBottom: '1px solid rgba(122,111,98,0.35)',
                paddingBottom: '2px',
                textDecoration: 'none',
              }}
              className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
            >
              ← {n.backToNotes}
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
