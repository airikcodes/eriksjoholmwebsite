'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const LOCALES = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];
const DEFAULT_LOCALE = 'en';

const SUBTITLES: Record<string, string> = {
  '/about':   'the story so far',
  '/works':   'songs and recordings',
  '/live':    'shows and dates',
  '/notes':   'journal entries',
  '/shop':    'merch and prints',
  '/contact': 'get in touch',
};

// Ordered list of nav paths — defines the 01-06 folio numbering
const NAV_PATHS = ['/about', '/works', '/live', '/notes', '/shop', '/contact'];

function getLocale(pathname: string): string {
  for (const l of LOCALES) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return l;
  }
  return DEFAULT_LOCALE;
}

// Strip locale prefix to get a bare path, e.g. /sv/works/lycka → /works/lycka
function barePath(pathname: string): string {
  for (const l of LOCALES) {
    if (pathname === `/${l}`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

// Return 1-based index into NAV_PATHS, or null for homepage / unlisted pages
function pageNumber(pathname: string): number | null {
  const bare = barePath(pathname);
  for (let i = 0; i < NAV_PATHS.length; i++) {
    if (bare === NAV_PATHS[i] || bare.startsWith(`${NAV_PATHS[i]}/`)) return i + 1;
  }
  return null;
}

interface NavItem {
  label: string;
  href: string;
}

export default function TopBar({ navItems }: { navItems: NavItem[] }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const current   = getLocale(pathname);
  const folio     = pageNumber(pathname);

  const [open, setOpen]             = useState(false);
  const [hoveredEntry, setHovered]  = useState<number | null>(null);
  const toggleRef  = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape; trap Tab focus inside the overlay
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        );
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Lock body scroll; focus first link when overlay opens
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      requestAnimationFrame(() => {
        overlayRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();
      });
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function close() {
    setOpen(false);
    setHovered(null);
    toggleRef.current?.focus();
  }

  function switchLocale(next: string) {
    let base = pathname;
    if (current !== DEFAULT_LOCALE) {
      base = pathname.slice(current.length + 1) || '/';
    }
    const target =
      next === DEFAULT_LOCALE ? base : `/${next}${base === '/' ? '' : base}`;
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    if (target === pathname) { router.refresh(); } else { router.push(target); }
    close();
  }

  return (
    <>
      {/* ── Toggle + folio ──────────────────────────────────────────────── */}
      <div style={{
        position:    'fixed',
        top:         'max(1.5rem, calc(env(safe-area-inset-top, 0px) + 0.75rem))',
        right:       'max(1.5rem, env(safe-area-inset-right, 0px))',
        zIndex:      60,
        display:     'flex',
        alignItems:  'center',
        gap:         '1.25rem',
      }}>

        {/* Folio — page number in the index, e.g. "03 / 06". Hidden on
            the overlay is open and on pages outside the six nav entries. */}
        {folio !== null && (
          <span
            aria-hidden="true"
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{
              fontSize:      '0.75rem',
              letterSpacing: '0.08em',
              color:         'rgba(232,224,212,0.3)',
              lineHeight:    1,
              userSelect:    'none',
              opacity:       open ? 0 : 1,
              transition:    'opacity 200ms ease',
            }}
          >
            {String(folio).padStart(2, '0')} / {String(NAV_PATHS.length).padStart(2, '0')}
          </span>
        )}

        {/* Menu toggle */}
        <button
          ref={toggleRef}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="nav-overlay"
          style={{
            background:    'none',
            border:        'none',
            cursor:        'pointer',
            color:         open ? 'rgba(255,255,255,0.9)' : 'rgba(200,146,42,0.75)',
            fontFamily:    'var(--font-inter)',
            fontSize:      '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding:       '0.3rem 0',
            lineHeight:    1,
            transition:    'color 180ms ease',
          }}
        >
          {open ? 'Close' : 'Menu'}
        </button>

      </div>

      {/* ── Overlay ─────────────────────────────────────────────────────── */}
      <div
        id="nav-overlay"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        style={{
          position:             'fixed',
          inset:                0,
          zIndex:               55,
          background:           'rgba(10, 8, 6, 0.97)',
          backdropFilter:       'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          overflowY:            'auto',
          display:              'flex',
          flexDirection:        'column',
          justifyContent:       'center',
          padding:              'clamp(4rem, 8vh, 5rem) clamp(2.5rem, 8vw, 5rem)',
          opacity:              open ? 1 : 0,
          pointerEvents:        open ? 'auto' : 'none',
          transition:           'opacity 220ms ease',
        }}
      >
        <div style={{ width: '100%', maxWidth: '620px' }}>

          {/* ── INDEX kicker ──────────────────────────────────────────────── */}
          <p style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      '0.45rem',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color:         '#7A6F62',
            marginBottom:  '2rem',
            userSelect:    'none',
          }}>
            Index
          </p>

          {/* ── Nav entries ───────────────────────────────────────────────── */}
          <nav aria-label="Main navigation">
            {/* Top hairline */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            {navItems.map((item, i) => {
              const hot = hoveredEntry === i;
              return (
                <div
                  key={item.href}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    tabIndex={open ? 0 : -1}
                    style={{
                      display:        'block',
                      textDecoration: 'none',
                      padding:        'clamp(0.85rem, 2vh, 1.15rem) 0',
                      outline:        'none',
                    }}
                  >
                    {/* Title row: label + leader dots + number */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                      <span
                        className="font-[family-name:var(--font-cormorant)] font-light"
                        style={{
                          fontSize:      'clamp(1.4rem, 3vw, 2rem)',
                          letterSpacing: '0.02em',
                          color:         hot ? '#E8E0D4' : 'rgba(232,224,212,0.65)',
                          lineHeight:    1.15,
                          transition:    'color 150ms ease',
                          flexShrink:    0,
                        }}
                      >
                        {item.label}
                      </span>

                      {/* Dotted leader */}
                      <span style={{
                        flex:         1,
                        display:      'block',
                        borderBottom: `1px dotted ${hot ? 'rgba(200,146,42,0.4)' : 'rgba(140,128,118,0.2)'}`,
                        margin:       '0 0.85rem 0.3em',
                        transition:   'border-color 150ms ease',
                      }} />

                      {/* Two-digit number */}
                      <span style={{
                        fontFamily:    'var(--font-inter)',
                        fontSize:      '0.72rem',
                        letterSpacing: '0.1em',
                        color:         hot ? 'rgba(200,146,42,0.75)' : 'rgba(140,128,118,0.3)',
                        lineHeight:    1,
                        paddingBottom: '0.15em',
                        flexShrink:    0,
                        transition:    'color 150ms ease',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Subtitle */}
                    <p style={{
                      fontFamily:    'var(--font-inter)',
                      fontSize:      '0.67rem',
                      fontStyle:     'italic',
                      letterSpacing: '0.01em',
                      color:         hot ? 'rgba(140,128,118,0.8)' : 'rgba(140,128,118,0.38)',
                      marginTop:     '0.3rem',
                      transition:    'color 150ms ease',
                    }}>
                      {SUBTITLES[item.href] ?? ''}
                    </p>
                  </Link>

                  {/* Hairline divider */}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />
                </div>
              );
            })}
          </nav>

          {/* ── Footer row ────────────────────────────────────────────────── */}
          <div style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            flexWrap:       'wrap',
            gap:            '0.75rem 1.5rem',
            paddingTop:     '1.5rem',
          }}>
            {/* See also */}
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.62rem',
              fontStyle:     'italic',
              color:         'rgba(140,128,118,0.45)',
              letterSpacing: '0.02em',
            }}>
              see also —{' '}
              <Link
                href="/storyteller"
                onClick={close}
                tabIndex={open ? 0 : -1}
                style={{ color: 'inherit', textDecoration: 'none' }}
                className="hover:text-[#C8922A] transition-colors duration-150"
              >
                Storyteller
              </Link>
              {' · '}
              <Link
                href="/sync"
                onClick={close}
                tabIndex={open ? 0 : -1}
                style={{ color: 'inherit', textDecoration: 'none' }}
                className="hover:text-[#C8922A] transition-colors duration-150"
              >
                Sync licensing
              </Link>
            </p>

            {/* Locale codes */}
            <div
              role="group"
              aria-label="Language selector"
              style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}
            >
              {LOCALES.map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  aria-label={`Switch to ${l.toUpperCase()}`}
                  aria-current={l === current ? 'true' : undefined}
                  tabIndex={open ? 0 : -1}
                  style={{
                    background:      'none',
                    border:          'none',
                    cursor:          'pointer',
                    color:           l === current ? 'rgba(255,255,255,0.85)' : 'rgba(140,128,118,0.35)',
                    fontFamily:      'var(--font-inter)',
                    fontSize:        '0.58rem',
                    letterSpacing:   '0.18em',
                    textTransform:   'uppercase',
                    padding:         '0.25rem 0.2rem',
                    lineHeight:      1,
                    textDecoration:  l === current ? 'underline' : 'none',
                    textUnderlineOffset: '3px',
                    transition:      'color 150ms ease',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
