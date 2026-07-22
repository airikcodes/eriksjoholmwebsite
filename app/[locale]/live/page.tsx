import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import KeepInTouch from '@/components/KeepInTouch';
import { upcomingEvents, pastEvents } from '@/data/events';
import { getDictionary, hasLocale } from '@/lib/dictionaries';

export const metadata: Metadata = {
  title: 'Live — Erik Sjøholm',
  description:
    'Upcoming concerts, storytelling performances, and past stages across Europe by Erik Sjøholm.',
  alternates: { canonical: 'https://eriksjoholm.com/live' },
  openGraph: {
    title: 'Live — Erik Sjøholm',
    description: 'Concerts, storytelling performances, and live appearances.',
    url: 'https://eriksjoholm.com/live',
    images: [{ url: '/images/portrait.jpg', width: 800, height: 800, alt: 'Erik Sjøholm' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live — Erik Sjøholm',
    images: ['/images/portrait.jpg'],
  },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function LivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const l = t.live;

  return (
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>

      {/* Fixed background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{
          position:           'absolute', inset: 0,
          backgroundImage:    'url(/images/bg/bg-04.jpg)',
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          opacity:            0.08,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Hero ── */}
          <div style={{ paddingTop: '5.5rem', paddingBottom: '5rem' }}>
            <BackNav />
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.48rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '1.25rem',
            }}>
              {l.eyebrow}
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize:     'clamp(3rem, 9vw, 6rem)',
                color:        '#E8E0D4',
                letterSpacing:'0.02em',
                lineHeight:   0.95,
              }}
            >
              {l.title}
            </h1>
            <span className="block" style={{ width: '2rem', height: '1px', background: '#C8922A', marginTop: '2.5rem' }} />
          </div>

          {/* ── Upcoming ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.45rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '3rem',
            }}>
              {l.upcoming.label}
            </p>

            {upcomingEvents.length === 0 ? (
              <>
                <p
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{
                    fontSize:     'clamp(1.4rem, 3.5vw, 2rem)',
                    color:        '#E8E0D4',
                    lineHeight:   1.3,
                    marginBottom: '1.5rem',
                  }}
                >
                  {l.upcoming.noShows}
                </p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize:   '0.875rem',
                  color:      '#7A6F62',
                  lineHeight: 1.85,
                  maxWidth:   '44ch',
                  marginBottom: '3rem',
                }}>
                  {l.upcoming.notesFirst}
                </p>
              </>
            ) : (
              <ul style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: '3rem' }}>
                {upcomingEvents.map((event) => (
                  <li
                    key={event.id}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1.75rem 0' }}
                  >
                    <div>
                      {event.title && (
                        <p
                          className="font-[family-name:var(--font-cormorant)] font-light"
                          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#E8E0D4', marginBottom: '0.35rem' }}
                        >
                          {event.title}
                        </p>
                      )}
                      <p style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize:   '0.65rem',
                        color:      '#7A6F62',
                        letterSpacing: '0.08em',
                      }}>
                        {event.venue ? `${event.venue} · ` : ''}{event.city}, {event.country}
                      </p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                      {event.date && (
                        <p style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize:   '0.62rem',
                          color:      '#C8922A',
                          letterSpacing: '0.08em',
                          marginBottom: event.ticketUrl ? '0.5rem' : 0,
                        }}>
                          {formatDate(event.date)}
                        </p>
                      )}
                      {event.ticketUrl && (
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '0.45rem',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: '#7A6F62',
                            borderBottom: '1px solid rgba(122,111,98,0.3)',
                            paddingBottom: '2px',
                          }}
                          className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
                        >
                          Tickets →
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <KeepInTouch variant="live" locale={locale} />
          </div>

          {/* ── Songs of the Seasons ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.45rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '1.25rem',
            }}>
              {l.concertSeries.label}
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize:     'clamp(2rem, 5vw, 3.5rem)',
                color:        '#E8E0D4',
                lineHeight:   1.05,
                marginBottom: '2rem',
              }}
            >
              Songs of<br />the Seasons
            </h2>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize:   '0.875rem',
              color:      '#7A6F62',
              lineHeight: 1.9,
              maxWidth:   '50ch',
              marginBottom: '2rem',
            }}>
              {l.concertSeries.desc1}
            </p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize:   '0.875rem',
              color:      '#7A6F62',
              lineHeight: 1.9,
              maxWidth:   '50ch',
              marginBottom: '2.5rem',
            }}>
              {l.concertSeries.desc2}
            </p>
          </div>

          {/* ── Past stages ── */}
          {pastEvents.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '5rem' }}>
              <p style={{
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.45rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color:         '#7A6F62',
                marginBottom:  '0',
              }}>
                {l.pastStages}
              </p>
              <ul style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '1.25rem' }}>
                {pastEvents.map((event) => (
                  <li
                    key={event.id}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1.6rem 0' }}
                  >
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: '#E8E0D4' }}
                    >
                      {event.venue ?? event.title ?? event.city}
                    </p>
                    <p style={{
                      fontFamily:    'var(--font-inter)',
                      fontSize:      '0.62rem',
                      color:         '#7A6F62',
                      letterSpacing: '0.08em',
                      flexShrink:    0,
                      marginTop:     '0.3rem',
                    }}>
                      {event.city}, {event.country}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Contact for shows ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5rem', paddingBottom: '9rem' }}>
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.45rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '1.25rem',
            }}>
              {l.getInTouch.label}
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize:     'clamp(2rem, 5vw, 3.5rem)',
                color:        '#E8E0D4',
                lineHeight:   1.05,
                marginBottom: '1.75rem',
              }}
            >
              {l.getInTouch.heading}
            </h2>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize:   '0.875rem',
              color:      '#7A6F62',
              lineHeight: 1.9,
              maxWidth:   '48ch',
              marginBottom: '2rem',
            }}>
              {l.getInTouch.desc}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <a
                href="mailto:erik@eriksjoholm.com"
                className="font-[family-name:var(--font-cormorant)] font-light hover:text-[#E8E0D4] transition-colors duration-200"
                style={{
                  fontSize:     'clamp(1.1rem, 2.5vw, 1.45rem)',
                  letterSpacing:'0.03em',
                  color:        '#C8922A',
                }}
              >
                erik@eriksjoholm.com
              </a>
              <Link
                href="/contact"
                style={{
                  fontFamily:    'var(--font-inter)',
                  fontSize:      '0.55rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color:         '#7A6F62',
                  borderBottom:  '1px solid rgba(122,111,98,0.35)',
                  paddingBottom: '2px',
                  display:       'inline-block',
                }}
                className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
              >
                {l.getInTouch.contactPage}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
