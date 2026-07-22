import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import KeepInTouch from '@/components/KeepInTouch';
import { getNote, getNoteSlugs, formatNoteDate } from '@/lib/notes';
import { getDictionary, hasLocale } from '@/lib/dictionaries';

export const revalidate = false; // static — revalidated only on redeploy

const LOCALES = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];

export async function generateStaticParams() {
  const slugs = await getNoteSlugs();
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return {};

  const title = `${note.title} — Erik Sjøholm`;
  const description = note.excerpt ?? 'Notes by Erik Sjøholm.';
  const image = note.coverImage ?? '/images/portrait.jpg';

  return {
    title,
    description,
    alternates: { canonical: `https://eriksjoholm.com/notes/${slug}` },
    openGraph: {
      title,
      description,
      url:    `https://eriksjoholm.com/notes/${slug}`,
      images: [{ url: image, alt: note.title }],
      type:   'article',
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
      images:      [image],
    },
  };
}

export default async function NotePost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const [t, note] = await Promise.all([
    getDictionary(locale),
    getNote(slug),
  ]);

  if (!note) notFound();

  const n = t.notes;
  const date = formatNoteDate(note.date, locale);

  return (
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>

      {/* Fixed background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{
          position:           'absolute', inset: 0,
          backgroundImage:    'url(/images/bg/bg-03.jpg)',
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          opacity:            0.06,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Header ── */}
          <div style={{ paddingTop: '5.5rem', paddingBottom: '3.5rem' }}>
            <BackNav href="/notes" label={n.backToNotes} />

            {date && (
              <p style={{
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.48rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color:         '#7A6F62',
                marginBottom:  '1.5rem',
              }}>
                {date}
              </p>
            )}

            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize:     'clamp(2.2rem, 6vw, 3.75rem)',
                color:        '#E8E0D4',
                letterSpacing:'0.01em',
                lineHeight:   1.05,
                marginBottom: note.excerpt ? '1.25rem' : 0,
              }}
            >
              {note.title}
            </h1>

            {note.excerpt && (
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize:   '0.95rem',
                color:      '#7A6F62',
                lineHeight: 1.75,
                maxWidth:   '44ch',
              }}>
                {note.excerpt}
              </p>
            )}

            <span className="block" style={{ width: '2rem', height: '1px', background: '#C8922A', marginTop: '2.5rem' }} />
          </div>

          {/* ── Body ── */}
          {note.contentHtml ? (
            <div
              className="notes-content"
              style={{ paddingBottom: '5rem' }}
              dangerouslySetInnerHTML={{ __html: note.contentHtml }}
            />
          ) : null}

          {/* ── Keep in touch ── */}
          <div style={{
            borderTop:     '1px solid rgba(255,255,255,0.07)',
            paddingTop:    '4rem',
            paddingBottom: '2rem',
          }}>
            <KeepInTouch variant="note" locale={locale} />
          </div>

          {/* ── Back link ── */}
          <div style={{ paddingTop: '3rem', paddingBottom: '9rem' }}>
            <a
              href="/notes"
              style={{
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.48rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color:         '#7A6F62',
                borderBottom:  '1px solid rgba(122,111,98,0.35)',
                paddingBottom: '2px',
                textDecoration:'none',
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
