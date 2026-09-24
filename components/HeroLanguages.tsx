'use client';

import { usePathname, useRouter } from 'next/navigation';

const LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'sv', name: 'Svenska' },
  { code: 'es', name: 'Español' },
];
const DEFAULT_LOCALE = 'en';

function currentLocale(pathname: string): string {
  for (const { code } of LOCALES) {
    if (pathname === `/${code}` || pathname.startsWith(`/${code}/`)) return code;
  }
  return DEFAULT_LOCALE;
}

/**
 * Language selector for the homepage hero — every language is visible at once,
 * so visitors don't have to open the menu to find it. Same switching logic as
 * the one in the menu (cookie + locale-prefixed route).
 */
export default function HeroLanguages() {
  const pathname = usePathname();
  const router   = useRouter();
  const current  = currentLocale(pathname);

  function switchLocale(next: string) {
    if (next === current) return;
    let base = pathname;
    if (current !== DEFAULT_LOCALE) base = pathname.slice(current.length + 1) || '/';
    const target = next === DEFAULT_LOCALE ? base : `/${next}${base === '/' ? '' : base}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    router.push(target);
  }

  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display:        'flex',
        justifyContent: 'center',
        flexWrap:       'wrap',
        gap:            '0.35rem 1.1rem',
        padding:        '0 1rem',
        width:          '100%',
      }}
    >
      {LOCALES.map(({ code, name }) => {
        const active = code === current;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchLocale(code)}
            title={name}
            lang={code}
            aria-label={name}
            aria-current={active ? 'true' : undefined}
            className="hero-lang"
            style={{
              background:          'none',
              border:              'none',
              cursor:              active ? 'default' : 'pointer',
              fontFamily:          'var(--font-inter)',
              fontSize:            '0.62rem',
              letterSpacing:       '0.24em',
              textTransform:       'uppercase',
              padding:             '0.5rem 0.15rem',
              lineHeight:          1,
              color:               active ? '#E8E0D4' : 'rgba(232,224,212,0.5)',
              textDecoration:      active ? 'underline' : 'none',
              textDecorationColor: '#C8922A',
              textUnderlineOffset: '6px',
              textShadow:          '0 1px 8px rgba(13,11,9,0.85)',
              transition:          'color 150ms ease',
            }}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
