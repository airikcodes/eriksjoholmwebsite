'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const LOCALES = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];
const DEFAULT_LOCALE = 'en';

function getLocale(pathname: string): string {
  for (const l of LOCALES) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return l;
  }
  return DEFAULT_LOCALE;
}

interface NavItem {
  label: string;
  href: string;
}

export default function TopBar({ navItems }: { navItems: NavItem[] }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const current   = getLocale(pathname);

  const [open, setOpen] = useState(false);
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
          overlayRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          )
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
    toggleRef.current?.focus();
  }

  function switchLocale(next: string) {
    let base = pathname;
    if (current !== DEFAULT_LOCALE) {
      base = pathname.slice(current.length + 1) || '/';
    }
    const target =
      next === DEFAULT_LOCALE ? base : `/${next}${base === '/' ? '' : base}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    if (target === pathname) { router.refresh(); } else { router.push(target); }
    close();
  }

  return (
    <>
      {/* ── Toggle ──────────────────────────────────────────────────────── */}
      <button
        ref={toggleRef}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="nav-overlay"
        style={{
          position:    'fixed',
          top:         'max(1.5rem, calc(env(safe-area-inset-top, 0px) + 0.75rem))',
          right:       'max(1.5rem, env(safe-area-inset-right, 0px))',
          zIndex:      60,
          background:  'none',
          border:      'none',
          cursor:      'pointer',
          color:       open ? 'rgba(255,255,255,0.9)' : 'rgba(200,146,42,0.75)',
          fontFamily:  'var(--font-inter)',
          fontSize:    '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          padding:     '0.3rem 0',
          lineHeight:  1,
          transition:  'color 180ms ease',
        }}
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {/* ── Overlay ─────────────────────────────────────────────────────── */}
      <div
        id="nav-overlay"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         55,
          background:     'rgba(10, 8, 6, 0.97)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '3.5rem',
          opacity:        open ? 1 : 0,
          pointerEvents:  open ? 'auto' : 'none',
          transition:     'opacity 220ms ease',
        }}
      >
        {/* Nav links */}
        <nav
          aria-label="Main navigation"
          className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="room-link font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', letterSpacing: '0.02em' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <span style={{ width: '2rem', height: '1px', background: 'rgba(200,146,42,0.2)', display: 'block' }} />

        {/* Locale row */}
        <div
          role="group"
          aria-label="Language selector"
          style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              aria-label={`Switch to ${l.toUpperCase()}`}
              aria-current={l === current ? 'true' : undefined}
              tabIndex={open ? 0 : -1}
              style={{
                background:    'none',
                border:        'none',
                cursor:        'pointer',
                color:         l === current ? 'rgba(255,255,255,0.9)' : 'rgba(140,128,118,0.4)',
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding:       '0.4rem 0.3rem',
                lineHeight:    1,
                transition:    'color 180ms ease',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
