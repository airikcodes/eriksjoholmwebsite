'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/locales';

function currentLocale(pathname: string): string {
  for (const { code } of LOCALES) {
    if (pathname === `/${code}` || pathname.startsWith(`/${code}/`)) return code;
  }
  return DEFAULT_LOCALE;
}

/**
 * Language selector for the homepage hero. A single button (current language) opens a
 * small dropdown listing every language on click — same switching logic as the one in
 * the menu (cookie + locale-prefixed route), just collapsed so it doesn't take up a full
 * row of the hero by default.
 */
export default function HeroLanguages() {
  const pathname = usePathname();
  const router   = useRouter();
  const current  = currentLocale(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function switchLocale(next: string) {
    setOpen(false);
    if (next === current) return;
    let base = pathname;
    if (current !== DEFAULT_LOCALE) base = pathname.slice(current.length + 1) || '/';
    const target = next === DEFAULT_LOCALE ? base : `/${next}${base === '/' ? '' : base}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    router.push(target);
  }

  const currentName = LOCALES.find((l) => l.code === current)?.name ?? current;

  return (
    <div ref={rootRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${currentName}. Press to change.`}
        className="hero-lang"
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '0.45rem',
          background:     'none',
          border:         '1px solid var(--lang-idle, rgba(232,224,212,0.5))',
          borderRadius:   '999px',
          cursor:         'pointer',
          fontFamily:     'var(--font-inter)',
          fontSize:       '0.62rem',
          letterSpacing:  '0.24em',
          textTransform:  'uppercase',
          padding:        '0.6rem 1.1rem',
          lineHeight:     1,
          color:          'var(--lang-active, #E8E0D4)',
          textShadow:     'var(--lang-halo, 0 1px 8px rgba(13,11,9,0.85))',
          transition:     'border-color 150ms ease, background-color 150ms ease',
        }}
      >
        {current}
        <span
          aria-hidden="true"
          style={{
            display:        'inline-block',
            transform:      open ? 'rotate(180deg)' : 'none',
            transition:     'transform 150ms ease',
            fontSize:       '0.65rem',
            lineHeight:     1,
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language"
          style={{
            position:      'absolute',
            top:            'calc(100% + 0.6rem)',
            left:           '50%',
            transform:      'translateX(-50%)',
            display:        'grid',
            gridTemplateColumns: 'repeat(2, auto)',
            gap:            '0.2rem 1.5rem',
            padding:        '0.9rem 1.25rem',
            borderRadius:   '1rem',
            background:     'rgba(20,16,12,0.92)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow:      '0 12px 32px rgba(0,0,0,0.35)',
            zIndex:         20,
          }}
        >
          {LOCALES.map(({ code, name }) => {
            const active = code === current;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => switchLocale(code)}
                lang={code}
                style={{
                  background:          'none',
                  border:              'none',
                  cursor:              active ? 'default' : 'pointer',
                  textAlign:           'left',
                  whiteSpace:          'nowrap',
                  fontFamily:          'var(--font-inter)',
                  fontSize:            '0.68rem',
                  letterSpacing:       '0.06em',
                  padding:             '0.35rem 0.2rem',
                  lineHeight:          1.4,
                  color:               active ? '#F3EDE3' : 'rgba(243,237,227,0.72)',
                  textDecoration:      active ? 'underline' : 'none',
                  textDecorationColor: '#C8922A',
                  textUnderlineOffset: '4px',
                  transition:          'color 150ms ease',
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
