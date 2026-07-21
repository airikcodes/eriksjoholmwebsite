'use client';

import { usePathname, useRouter } from 'next/navigation';

const locales = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];
const defaultLocale = 'en';

function getLocaleFromPath(pathname: string): string {
  for (const l of locales) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return l;
  }
  return defaultLocale;
}

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = getLocaleFromPath(pathname);

  function switchTo(next: string) {
    let base = pathname;
    if (current !== defaultLocale) {
      base = pathname.slice(current.length + 1) || '/';
    }
    const target =
      next === defaultLocale ? base : `/${next}${base === '/' ? '' : base}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    if (target === pathname) {
      router.refresh();
    } else {
      router.push(target);
    }
  }

  return (
    <div
      role="navigation"
      aria-label="Language selector"
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 10,
        display: 'flex',
        gap: '0.3rem',
        alignItems: 'center',
      }}
    >
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-label={`Switch to ${l.toUpperCase()}`}
          aria-current={l === current ? 'true' : undefined}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: l === current ? 'rgba(255,255,255,0.85)' : 'rgba(140,128,118,0.4)',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            fontFamily: 'var(--font-inter)',
            textTransform: 'uppercase',
            padding: '0.3rem 0.1rem',
            lineHeight: 1,
            transition: 'color 180ms ease',
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
