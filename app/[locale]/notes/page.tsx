import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import NoteCard from '@/components/NoteCard';
import KeepInTouch from '@/components/KeepInTouch';
import { getNotes } from '@/lib/notes';
import { getDictionary, hasLocale } from '@/lib/dictionaries';

export const revalidate = false; // static — revalidated only on redeploy

export const metadata: Metadata = {
  title: 'Notes — Erik Sjøholm',
  description:
    'An artistic travelogue — stories behind songs, reflections from the road, poems, and recording notes. By Erik Sjøholm.',
  alternates: { canonical: 'https://eriksjoholm.com/notes' },
  openGraph: {
    title: 'Notes — Erik Sjøholm',
    description: 'An artistic travelogue — stories behind songs, reflections from the road, poems, and recording notes.',
    url: 'https://eriksjoholm.com/notes',
    images: [{ url: '/images/portrait.jpg', width: 800, height: 800, alt: 'Erik Sjøholm' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes — Erik Sjøholm',
    images: ['/images/portrait.jpg'],
  },
};

export default async function NotesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const n = t.notes;

  const notes = await getNotes();

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
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Hero ── */}
          <div style={{ paddingTop: '5.5rem', paddingBottom: '3.5rem' }}>
            <BackNav />
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.48rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '1.25rem',
            }}>
              {n.eyebrow}
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize:     'clamp(2.8rem, 8vw, 5.5rem)',
                color:        '#E8E0D4',
                letterSpacing:'0.02em',
                lineHeight:   0.95,
                marginBottom: '1.75rem',
              }}
            >
              {n.title}
            </h1>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize:   '0.875rem',
              color:      '#7A6F62',
              lineHeight: 1.85,
              maxWidth:   '44ch',
            }}>
              {n.description}
            </p>
          </div>

          {/* ── Note list ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {notes.length === 0 ? (
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize:   '0.875rem',
                color:      '#7A6F62',
                paddingTop: '3.5rem',
              }}>
                {n.noPostsYet}
              </p>
            ) : (
              <div>
                {notes.map((note) => (
                  <NoteCard key={note.slug} note={note} locale={locale} readMoreLabel={n.readMore} />
                ))}
              </div>
            )}
          </div>

          {/* ── Keep in touch ── */}
          <div style={{
            borderTop:     '1px solid rgba(255,255,255,0.07)',
            paddingTop:    '4rem',
            paddingBottom: '9rem',
          }}>
            <KeepInTouch variant="notes" locale={locale} />
          </div>

        </div>
      </div>
    </main>
  );
}
