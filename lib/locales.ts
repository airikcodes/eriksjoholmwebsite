export const LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'sv', name: 'Svenska' },
  { code: 'es', name: 'Español' },
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: LocaleCode = 'en';

export const LOCALE_CODES = LOCALES.map((l) => l.code);
