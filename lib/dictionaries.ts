import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((m) => m.default),
  de: () => import('../dictionaries/de.json').then((m) => m.default),
  es: () => import('../dictionaries/es.json').then((m) => m.default),
  sv: () => import('../dictionaries/sv.json').then((m) => m.default),
  fi: () => import('../dictionaries/fi.json').then((m) => m.default),
  it: () => import('../dictionaries/it.json').then((m) => m.default),
  fr: () => import('../dictionaries/fr.json').then((m) => m.default),
  pt: () => import('../dictionaries/pt.json').then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (l: string): l is Locale => l in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
