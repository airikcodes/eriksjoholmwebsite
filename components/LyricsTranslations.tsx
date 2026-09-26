'use client';

import { useState } from 'react';

const LANGUAGE_NAMES: Record<string, string> = {
  sv: 'Svenska',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fi: 'Suomi',
};

// The word "translation" in each site language, shown next to a translated lyric
const TRANSLATION_WORD: Record<string, string> = {
  en: 'Translation',
  de: 'Übersetzung',
  es: 'Traducción',
  fi: 'Käännös',
};

// Languages we offer lyric translations in (the original language is always shown too)
const ORDER = ['sv', 'en', 'de', 'es', 'fi'];

export default function LyricsTranslations({
  original,
  originalLanguage = 'sv',
  translations,
  label,
}: {
  original: string;
  originalLanguage?: string;
  translations: Record<string, string>;
  label: string;
}) {
  const available = ORDER.filter(
    (code) => code === originalLanguage || translations[code],
  );
  // The song's original language is always shown first; translations are an option
  const [active, setActive] = useState<string>(originalLanguage);

  const isOriginal = active === originalLanguage;
  const text = isOriginal ? original : translations[active];

  return (
    <div style={{ borderTop: '1px solid rgba(var(--fg-rgb),0.07)', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <p style={{
        fontFamily:    'var(--font-inter)',
        fontSize:      '0.7rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color:         'var(--color-ink-meta)',
        marginBottom:  '1.5rem',
      }}>
        {label}
      </p>

      <div
        role="tablist"
        aria-label={label}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.25rem', marginBottom: '2rem' }}
      >
        {available.map((code) => {
          const selected = code === active;
          return (
            <button
              key={code}
              type="button"
              role="tab"
              aria-selected={selected}
              lang={code}
              onClick={() => setActive(code)}
              className="hover:text-[color:var(--color-ink-primary)] transition-colors duration-200"
              style={{
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         selected ? '#C8922A' : 'var(--color-ink-meta)',
                background:    'none',
                border:        'none',
                borderBottom:  selected ? '1px solid #C8922A' : '1px solid transparent',
                padding:       '0 0 3px',
                cursor:        'pointer',
              }}
            >
              {LANGUAGE_NAMES[code]}
            </button>
          );
        })}
      </div>

      {!isOriginal && (
        <p style={{
          fontFamily:    'var(--font-inter)',
          fontSize:      '0.62rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'var(--color-ink-meta)',
          marginBottom:  '1.25rem',
        }}>
          {TRANSLATION_WORD[active]} · {LANGUAGE_NAMES[originalLanguage]} → {LANGUAGE_NAMES[active]}
        </p>
      )}

      <div style={{ borderLeft: '1px solid rgba(200,146,42,0.2)', paddingLeft: '1.5rem' }}>
        <p
          lang={active}
          role="tabpanel"
          className="font-[family-name:var(--font-cormorant)] font-light italic"
          style={{
            fontSize:   'clamp(1rem, 2vw, 1.2rem)',
            color:      'rgba(var(--ink-rgb),0.75)',
            lineHeight: 2.1,
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
