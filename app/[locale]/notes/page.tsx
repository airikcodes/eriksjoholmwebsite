import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import NoteCard from '@/components/NoteCard';
import BeehiivForm from '@/components/BeehiivForm';
import { getPosts } from '@/lib/beehiiv';
import { getDictionary, hasLocale } from '@/lib/dictionaries';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Notes from the song-garden — Erik Sjøholm',
  description:
    'A newsletter about songs, stories, and what it takes to keep making things. By Erik Sjøholm.',
  alternates: { canonical: 'https://eriksjoholm.com/notes' },
  openGraph: {
    title: 'Notes from the song-garden — Erik Sjøholm',
    description: 'A newsletter about songs, stories, and what it takes to keep making things.',
    url: 'https://eriksjoholm.com/notes',
    images: [{ url: '/images/portrait.jpg', width: 800, height: 800, alt: 'Erik Sjøholm' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes from the song-garden — Erik Sjøholm',
    description: 'A newsletter about songs, stories, and what it takes to keep making things.',
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

  const posts = await getPosts();

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
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Hero ── */}
          <div style={{ paddingTop: '5.5rem', paddingBottom: '4rem' }}>
            <BackNav />
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.48rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#7A6F62',
              marginBottom: '1.25rem',
            }}>
              {n.eyebrow}
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: 'clamp(3rem, 9vw, 6rem)',
                color: '#E8E0D4',
                letterSpacing: '0.02em',
                lineHeight: 0.95,
                marginBottom: '2rem',
              }}
            >
              {n.title}
            </h1>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: '#7A6F62',
              lineHeight: 1.85,
              maxWidth: '48ch',
            }}>
              {n.description}
            </p>
            <span className="block" style={{ width: '2rem', height: '1px', background: '#C8922A', marginTop: '2.5rem' }} />
          </div>

          {/* ── Subscribe form ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '4rem', paddingBottom: '4rem' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.45rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#7A6F62',
              marginBottom: '2rem',
            }}>
              {n.subscribeLabel}
            </p>
            <BeehiivForm />
          </div>

          {/* ── Post list ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingBottom: '9rem' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.45rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#7A6F62',
              paddingTop: '4rem',
              marginBottom: '0',
            }}>
              {n.archiveLabel}
            </p>

            {posts.length === 0 ? (
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                color: '#7A6F62',
                marginTop: '3rem',
              }}>
                {n.noPostsYet}
              </p>
            ) : (
              <div>
                {posts.map((post) => (
                  <NoteCard key={post.id} post={post} locale={locale} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
