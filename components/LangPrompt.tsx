'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const STORAGE_KEY    = 'lang-prompt-v1';
const DEFAULT_LOCALE = 'en';
const ALL_LOCALES    = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];
const SUPPORTED      = ALL_LOCALES.filter(l => l !== DEFAULT_LOCALE);

// Questions in the visitor's language
const QUESTION: Record<string, string> = {
  de: 'Auf Deutsch lesen?',
  es: '¿Leer en Español?',
  sv: 'Läs på Svenska?',
  fi: 'Lue Suomeksi?',
  it: 'Leggere in Italiano?',
  fr: 'Lire en Français?',
  pt: 'Ler em Português?',
};

// Affirmative in the visitor's language
const YES: Record<string, string> = {
  de: 'Ja',
  es: 'Sí',
  sv: 'Ja',
  fi: 'Kyllä',
  it: 'Sì',
  fr: 'Oui',
  pt: 'Sim',
};

// Dismiss labels for screen readers (in the visitor's language)
const DISMISS_LABEL: Record<string, string> = {
  de: 'Sprachvorschlag schließen',
  es: 'Descartar sugerencia de idioma',
  sv: 'Stäng språkförslag',
  fi: 'Sulje kieliehdotus',
  it: 'Chiudi suggerimento lingua',
  fr: 'Fermer la suggestion de langue',
  pt: 'Fechar sugestão de idioma',
};

function stripLocale(pathname: string): string {
  for (const l of ALL_LOCALES) {
    if (pathname === `/${l}`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export default function LangPrompt({
  detectedLocale,
  currentLocale,
}: {
  detectedLocale: string;
  currentLocale:  string;
}) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    if (!SUPPORTED.includes(detectedLocale))    return;
    if (detectedLocale === currentLocale)        return;
    // Small delay so the page paints first
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, [detectedLocale, currentLocale]);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, 'dismissed');
    setVisible(false);
  }

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
    document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    const base   = stripLocale(pathname);
    const target = detectedLocale === DEFAULT_LOCALE ? base : `/${detectedLocale}${base === '/' ? '' : base}`;
    if (target === pathname) { router.refresh(); } else { router.push(target); }
  }

  if (!visible) return null;

  const question    = QUESTION[detectedLocale] ?? '';
  const yes         = YES[detectedLocale]      ?? 'Yes';
  const dismissLabel = DISMISS_LABEL[detectedLocale] ?? 'Dismiss language suggestion';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={question}
      style={{
        position:             'fixed',
        bottom:               'max(2rem, calc(env(safe-area-inset-bottom, 0px) + 1.5rem))',
        right:                'max(1.5rem, env(safe-area-inset-right, 0px))',
        zIndex:               30,
        display:              'flex',
        alignItems:           'center',
        gap:                  '1rem',
        background:           'rgba(16,12,9,0.97)',
        border:               '1px solid rgba(255,255,255,0.08)',
        padding:              '0.75rem 0.9rem 0.75rem 1.25rem',
        backdropFilter:       'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        maxWidth:             'calc(100vw - 3rem)',
        animation:            'promptIn 350ms cubic-bezier(0.4,0,0.2,1) forwards',
      }}
    >
      <span
        className="font-[family-name:var(--font-cormorant)] font-light"
        style={{ fontSize: '1rem', color: 'rgba(232,224,212,0.65)', letterSpacing: '0.01em', lineHeight: 1, whiteSpace: 'nowrap' }}
      >
        {question}
      </span>

      <button
        onClick={accept}
        style={{
          background:    'none',
          border:        'none',
          borderBottom:  '1px solid rgba(200,146,42,0.4)',
          cursor:        'pointer',
          color:         '#C8922A',
          fontFamily:    'var(--font-inter)',
          fontSize:      '0.5rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          padding:       '0 0 1px',
          lineHeight:    1,
          flexShrink:    0,
          transition:    'color 150ms, border-color 150ms',
        }}
      >
        {yes}
      </button>

      <button
        onClick={dismiss}
        aria-label={dismissLabel}
        style={{
          background:  'none',
          border:      'none',
          cursor:      'pointer',
          color:       'rgba(122,111,98,0.45)',
          fontSize:    '1rem',
          lineHeight:  1,
          padding:     '0.1rem 0.2rem',
          flexShrink:  0,
          transition:  'color 150ms',
        }}
      >
        ×
      </button>
    </div>
  );
}
