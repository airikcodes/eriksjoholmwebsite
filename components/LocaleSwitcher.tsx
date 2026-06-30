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
    router.push(target);
  }

  return (
    <select
      value={current}
      onChange={(e) => switchTo(e.target.value)}
      aria-label="Language"
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 10,
        background: 'transparent',
        border: '1px solid rgba(140, 128, 118, 0.3)',
        borderRadius: '2px',
        color: 'rgba(140, 128, 118, 0.7)',
        fontSize: '0.48rem',
        letterSpacing: '0.2em',
        cursor: 'pointer',
        padding: '0.35rem 0.5rem',
        fontFamily: 'var(--font-inter)',
        textTransform: 'uppercase',
        appearance: 'none',
        WebkitAppearance: 'none',
      }}
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
