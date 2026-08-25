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

interface NavSection { label: string; anchor: string; }
interface NavItem    { label: string; href: string; sections?: NavSection[]; }

export default function TopBar({ navItems }: { navItems: NavItem[] }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const current   = getLocale(pathname);
  const folio     = pageNumber(pathname);

  const [open, setOpen]             = useState(false);
  const [hoveredEntry, setHovered]  = useState<number | null>(null);
  const [menuHover, setMenuHover]   = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
  const [expanded, setExpanded]     = useState<Set<number>>(new Set<number>());
  const toggleRef     = useRef<HTMLButtonElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const langExpandRef = useRef<HTMLDivElement>(null);

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

  // Reset transient overlay state when overlay closes
  useEffect(() => {
    if (!open) {
      setLangOpen(false);
      setExpanded(new Set<number>());
    }
  }, [open]);

  // Focus first locale button when lang picker expands
  useEffect(() => {
    if (langOpen) {
      requestAnimationFrame(() => {
        langExpandRef.current?.querySelector<HTMLElement>('button')?.focus();
      });
    }
  }, [langOpen]);

  function close() {
    setOpen(false);
    setHovered(null);
    toggleRef.current?.focus();
  }

  function toggleExpand(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else { next.add(i); }
      return next;
    });
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
          className="menu-toggle-btn"
          onClick={() => setOpen((o) => !o)}
          onMouseEnter={() => setMenuHover(true)}
          onMouseLeave={() => setMenuHover(false)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="nav-overlay"
          style={{
            background:           open ? (menuHover ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.06)') : (menuHover ? 'rgba(13,11,9,0.75)' : 'rgba(13,11,9,0.55)'),
            border:                open ? (menuHover ? '1px solid rgba(255,255,255,0.28)' : '1px solid rgba(255,255,255,0.18)') : (menuHover ? '1px solid rgba(200,146,42,0.85)' : '1px solid rgba(200,146,42,0.55)'),
            borderRadius:         '2px',
            backdropFilter:       'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            cursor:               'pointer',
            color:                 open ? (menuHover ? '#ffffff' : 'rgba(255,255,255,0.9)') : (menuHover ? '#E0A83A' : '#C8922A'),
            fontFamily:           'var(--font-inter)',
            fontSize:             '0.62rem',
            letterSpacing:        '0.22em',
            textTransform:        'uppercase',
            padding:              '0.5rem 0.85rem',
            lineHeight:           1,
            display:              'flex',
            alignItems:           'center',
            gap:                  '0.55rem',
            transition:           'color 180ms ease, border-color 180ms ease, background 180ms ease',
          }}
        >
          {/* Hamburger / close lines */}
          <svg
            aria-hidden="true"
            width="12" height="9"
            viewBox="0 0 12 9"
            fill="none"
            style={{ flexShrink: 0, transition: 'opacity 180ms ease' }}
          >
            {open ? (
              /* × mark */
              <>
                <line x1="1" y1="1" x2="11" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="11" y1="1" x2="1" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              /* three bars */
              <>
                <line x1="0" y1="1"   x2="12" y2="1"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="4.5" x2="12" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="8"   x2="12" y2="8"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
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
              const hot   = hoveredEntry === i;
              const isExp = expanded.has(i);
              return (
                <div
                  key={item.href}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Title row: Link + optional expand toggle side-by-side */}
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Link
                      href={item.href}
                      onClick={close}
                      tabIndex={open ? 0 : -1}
                      style={{
                        flex:           1,
                        display:        'block',
                        textDecoration: 'none',
                        padding:        'clamp(0.85rem, 2vh, 1.15rem) 0',
                        outline:        'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                        <span
                          className="font-[family-name:var(--font-cormorant)] font-light"
                          style={{
                            fontSize:      'clamp(1.4rem, 3vw, 2rem)',
                            letterSpacing: '0.02em',
                            color:         hot ? '#E8E0D4' : 'rgba(232,224,212,0.78)',
                            lineHeight:    1.15,
                            transition:    'color 150ms ease',
                            flexShrink:    0,
                          }}
                        >
                          {item.label}
                        </span>

                        <span style={{
                          flex:         1,
                          display:      'block',
                          borderBottom: `1px dotted ${hot ? 'rgba(200,146,42,0.4)' : 'rgba(140,128,118,0.2)'}`,
                          margin:       '0 0.85rem 0.3em',
                          transition:   'border-color 150ms ease',
                        }} />

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

                    {/* Section expand toggle — only for entries with defined sections */}
                    {item.sections && (
                      <button
                        onClick={() => toggleExpand(i)}
                        tabIndex={open ? 0 : -1}
                        aria-expanded={isExp}
                        aria-controls={`nav-secs-${i}`}
                        aria-label={`${isExp ? 'Hide' : 'Show'} sections for ${item.label}`}
                        style={{
                          background:  'none',
                          border:      'none',
                          cursor:      'pointer',
                          padding:     '0 0.2rem 0 0.75rem',
                          alignSelf:   'center',
                          color:       hot ? 'rgba(140,128,118,0.6)' : 'rgba(140,128,118,0.28)',
                          lineHeight:  1,
                          transition:  'color 150ms ease',
                          flexShrink:  0,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            display:    'inline-block',
                            fontSize:   '0.65rem',
                            transition: 'transform 220ms cubic-bezier(0.4,0,0.2,1)',
                            transform:  isExp ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        >
                          ∨
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Sub-entries (section links) */}
                  {item.sections && isExp && (
                    <div
                      id={`nav-secs-${i}`}
                      style={{ paddingBottom: '0.6rem' }}
                    >
                      {item.sections.map((s) => (
                        <Link
                          key={s.anchor}
                          href={`${item.href}#${s.anchor}`}
                          onClick={close}
                          tabIndex={open ? 0 : -1}
                          className="group"
                          style={{
                            display:        'flex',
                            alignItems:     'flex-end',
                            padding:        '0.3rem 0',
                            textDecoration: 'none',
                            outline:        'none',
                          }}
                        >
                          {/* Indent */}
                          <span style={{ width: '1.75rem', flexShrink: 0 }} />
                          <span
                            className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[rgba(232,224,212,0.8)] transition-colors duration-150"
                            style={{
                              fontSize:      'clamp(0.85rem, 2vw, 1.15rem)',
                              letterSpacing: '0.02em',
                              color:         'rgba(232,224,212,0.35)',
                              lineHeight:    1.15,
                              flexShrink:    0,
                            }}
                          >
                            {s.label}
                          </span>
                          <span style={{
                            flex:         1,
                            display:      'block',
                            borderBottom: '1px dotted rgba(120,108,96,0.14)',
                            margin:       '0 0.65rem 0.25em',
                          }} />
                          <span
                            className="group-hover:text-[rgba(200,146,42,0.55)] transition-colors duration-150"
                            style={{
                              fontFamily:  'var(--font-inter)',
                              fontSize:    '0.55rem',
                              color:       'rgba(120,108,96,0.25)',
                              flexShrink:  0,
                              paddingBottom: '0.15em',
                            }}
                          >
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

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

            {/* Compact locale switcher — shows current language; expands to all on click */}
            {langOpen ? (
              <div
                ref={langExpandRef}
                role="group"
                aria-label="Language selector"
                style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', alignItems: 'center' }}
              >
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    aria-label={`Switch to ${l.toUpperCase()}`}
                    aria-current={l === current ? 'true' : undefined}
                    tabIndex={open ? 0 : -1}
                    style={{
                      background:          'none',
                      border:              'none',
                      cursor:              'pointer',
                      color:               l === current ? 'rgba(255,255,255,0.85)' : 'rgba(140,128,118,0.35)',
                      fontFamily:          'var(--font-inter)',
                      fontSize:            '0.58rem',
                      letterSpacing:       '0.18em',
                      textTransform:       'uppercase',
                      padding:             '0.25rem 0.2rem',
                      lineHeight:          1,
                      textDecoration:      l === current ? 'underline' : 'none',
                      textUnderlineOffset: '3px',
                      transition:          'color 150ms ease',
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
                <button
                  onClick={() => setLangOpen(false)}
                  tabIndex={open ? 0 : -1}
                  aria-label="Close language picker"
                  style={{
                    background: 'none',
                    border:     'none',
                    cursor:     'pointer',
                    color:      'rgba(140,128,118,0.35)',
                    fontSize:   '0.9rem',
                    lineHeight: 1,
                    padding:    '0.25rem 0.3rem',
                    transition: 'color 150ms ease',
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLangOpen(true)}
                tabIndex={open ? 0 : -1}
                aria-label={`Language: ${current.toUpperCase()}. Press to change.`}
                aria-expanded={langOpen}
                aria-haspopup="true"
                style={{
                  background:    'none',
                  border:        'none',
                  cursor:        'pointer',
                  color:         'rgba(255,255,255,0.85)',
                  fontFamily:    'var(--font-inter)',
                  fontSize:      '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding:       '0.25rem 0',
                  lineHeight:    1,
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '0.3rem',
                  transition:    'color 150ms ease',
                }}
              >
                {current.toUpperCase()}
                <span aria-hidden="true" style={{ fontSize: '0.7rem', opacity: 0.4, lineHeight: 1 }}>›</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
