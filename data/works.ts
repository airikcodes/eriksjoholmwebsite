export type WorkType = 'song' | 'album' | 'ep' | 'single' | 'storytelling' | 'collaboration';
export type ReleaseStatus = 'released' | 'unreleased';

export interface WorkCredit {
  role: string;
  name: string;
}

export interface Work {
  id: string;
  slug: string;
  title: string;
  workType: WorkType;
  year?: number;
  releaseStatus: ReleaseStatus;
  featured: boolean;
  featuredOrder?: number;
  language?: string;
  /** Short descriptor displayed in lists, e.g. "2024 · with Mistasy" */
  meta?: string;
  /** If this work belongs to an album/project, its slug */
  album?: string;
  coverImage?: string;
  spotifyUrl?: string;
  tidalUrl?: string;
  lyrics?: string;
  story?: string;
  description?: string;
  credits?: WorkCredit[];
  /** Slugs of related Notes on the website */
  relatedNotes?: string[];
}

const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp';
const TIDAL_ARTIST   = 'https://tidal.com/artist/47687355';

function tidalSearch(q: string): string {
  return `https://tidal.com/search?q=${encodeURIComponent(q + ' Erik Sjøholm')}`;
}

export const works: Work[] = [
  {
    id:            'lycka',
    slug:          'lycka',
    title:         'Lycka',
    workType:      'song',
    year:          2025,
    releaseStatus: 'released',
    featured:      true,
    featuredOrder: 1,
    language:      'Swedish',
    meta:          '2025 · Swedish',
    spotifyUrl:    SPOTIFY_ARTIST,
    tidalUrl:      tidalSearch('Lycka'),
  },
  {
    id:            'night-is-long',
    slug:          'the-night-is-long',
    title:         'The Night Is Long (That Never Finds The Day)',
    workType:      'song',
    year:          2024,
    releaseStatus: 'released',
    featured:      true,
    featuredOrder: 2,
    meta:          '2024',
    spotifyUrl:    'https://open.spotify.com/track/2hApCQl0DQfhkEutJFOxVV',
    tidalUrl:      tidalSearch('The Night Is Long'),
  },
  {
    id:            'midnight-sun',
    slug:          'midnight-sun',
    title:         'Midnight Sun',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      true,
    featuredOrder: 3,
    meta:          'with Mistasy',
    spotifyUrl:    'https://open.spotify.com/track/7KAFu2ouup81IBB6AnQZkM',
    tidalUrl:      tidalSearch('Midnight Sun'),
  },
  {
    id:            'ashes',
    slug:          'ashes',
    title:         'Ashes',
    workType:      'song',
    releaseStatus: 'released',
    featured:      false,
    spotifyUrl:    'https://open.spotify.com/track/6tcU3CmHiLKfbRNyTL5Evo',
    tidalUrl:      tidalSearch('Ashes'),
  },
  {
    id:            'matsawana',
    slug:          'matsawana',
    title:         'Matsawana',
    workType:      'song',
    releaseStatus: 'released',
    featured:      false,
    spotifyUrl:    'https://open.spotify.com/track/0ap55kADfSNkisbVEWJWrr',
    tidalUrl:      tidalSearch('Matsawana'),
  },
  {
    id:            'magari',
    slug:          'magari',
    title:         'Magari',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    language:      'Italian / English',
    meta:          'with Mistasy · Italian / English',
    spotifyUrl:    'https://open.spotify.com/track/37US5z8tYa3VWQoqiRAjRF',
    tidalUrl:      tidalSearch('Magari'),
  },
  {
    id:            'gone',
    slug:          'gone',
    title:         'Gone',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    meta:          'with Mistasy',
    spotifyUrl:    'https://open.spotify.com/track/0Ii1bB6sc3ZyXUE5QGzqgB',
    tidalUrl:      tidalSearch('Gone'),
  },
  {
    id:            'wake-up',
    slug:          'wake-up',
    title:         'Wake Up',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    meta:          'with Mistasy',
    spotifyUrl:    'https://open.spotify.com/track/5QKRx4B5ToIdKAcmaw093P',
    tidalUrl:      tidalSearch('Wake Up'),
  },
  {
    id:            'valkommenhem',
    slug:          'valkommenhem',
    title:         'Välkommen hem',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          'with The Sjöholm Family Band · Swedish',
    spotifyUrl:    'https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr',
    tidalUrl:      tidalSearch('Välkommen hem'),
  },
  {
    id:            'barndomsaren',
    slug:          'barndomsaren',
    title:         'Barndomsåren / Pargas 98',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          'with Emil Nordström · Swedish',
    spotifyUrl:    'https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu',
    tidalUrl:      tidalSearch('Barndomsåren Pargas'),
  },
];

export const featuredWorks = works
  .filter((w) => w.featured)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
