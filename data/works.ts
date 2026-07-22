export type WorkType = 'song' | 'album' | 'ep' | 'single' | 'storytelling' | 'collaboration';
export type ReleaseStatus = 'released' | 'unreleased' | 'upcoming';

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
  /** For albums/EPs: slugs of songs that appear on this release */
  tracks?: string[];
  /** Slugs of related Notes on the website */
  relatedNotes?: string[];
}

const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp';
const TIDAL_ARTIST   = 'https://tidal.com/artist/47687355';

function tidalSearch(q: string): string {
  return `https://tidal.com/search?q=${encodeURIComponent(q + ' Erik Sjøholm')}`;
}

export const works: Work[] = [
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    id:            'lycka',
    slug:          'lycka',
    title:         'Lycka',
    workType:      'song',
    year:          2026,
    releaseStatus: 'released',
    featured:      true,
    featuredOrder: 1,
    language:      'Swedish',
    meta:          '2026 · Swedish',
    album:         'next-album-collaboration-with-emil-nordstrom',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e026ed0b3388394820c3aac27c5',
    spotifyUrl:    'https://open.spotify.com/track/2ALT61LKWHRLW3qvRpz3JI',
    tidalUrl:      TIDAL_ARTIST,
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
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e24ed1a9271e2c63964dfcb2',
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
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0248bb1b76bfb10f76e72d6cae',
    spotifyUrl:    'https://open.spotify.com/track/7KAFu2ouup81IBB6AnQZkM',
    tidalUrl:      tidalSearch('Midnight Sun'),
  },

  // ── Solo songs ─────────────────────────────────────────────────────────────
  {
    id:            'put-on-a-smile',
    slug:          'put-on-a-smile',
    title:         'Put On a Smile',
    workType:      'song',
    releaseStatus: 'released',
    featured:      false,
    meta:          'Piteå Sessions · with Andreas Jacobson',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d286d7c995606b8a72a60d1a',
    spotifyUrl:    'https://open.spotify.com/track/5xrdXUnVS2hEPOMXAUImj5',
    tidalUrl:      tidalSearch('Put On a Smile'),
    relatedNotes:  ['put-on-a-smile'],
    lyrics:
`Two follow the one
And you follow the gun

Thoughts are filling our heads
Minds are turning insane
Capture a picture
When you're out of control
Watching a moment

And when nothing makes no sense
Just put on a smile

Find a key to relief
When time is locking it out
Slow down a motion
Catch the reflection of past
Searching a true line

And when nothing else makes no sense
At all
Just put on a smile

Look around
Everything's fine
What's wrong right now
Everything's fine

Two follow the one
And you follow the gun`,
  },
  {
    id:            'one-last-waltz',
    slug:          'one-last-waltz',
    title:         'One Last Waltz',
    workType:      'song',
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02be9f68df643e48907377661d',
    spotifyUrl:    'https://open.spotify.com/track/5mqLS6AqVNBCxak7g4oUO8',
    tidalUrl:      tidalSearch('One Last Waltz'),
  },
  {
    id:            'ray-of-light',
    slug:          'ray-of-light',
    title:         'Ray of Light',
    workType:      'song',
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1',
    spotifyUrl:    'https://open.spotify.com/track/2vsvxI57LT953u4MHHJ02I',
    tidalUrl:      tidalSearch('Ray of Light'),
  },
  {
    id:            'ashes',
    slug:          'ashes',
    title:         'Ashes',
    workType:      'song',
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0256cb815bf3ed91d4650047b2',
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
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02350ba1fef0246915e4b7986a',
    spotifyUrl:    'https://open.spotify.com/track/0ap55kADfSNkisbVEWJWrr',
    tidalUrl:      tidalSearch('Matsawana'),
  },
  {
    id:            'min-karaste-syster',
    slug:          'min-karaste-syster',
    title:         'Min käraste syster',
    workType:      'song',
    year:          2020,
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          '2020 · Swedish',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02864010597f8253f344854c4f',
    spotifyUrl:    'https://open.spotify.com/track/7GmUYn212pKkIOhKiRHKGJ',
    tidalUrl:      tidalSearch('Min käraste syster'),
  },

  // ── Walkabout album tracks ─────────────────────────────────────────────────
  {
    id:            'compromise',
    slug:          'compromise',
    title:         'Compromise',
    workType:      'song',
    year:          2016,
    releaseStatus: 'released',
    featured:      false,
    album:         'walkabout',
    meta:          '2016 · Walkabout',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1',
    spotifyUrl:    'https://open.spotify.com/track/3RY2VzIlJA3iYHGrZR0wCW',
    tidalUrl:      tidalSearch('Compromise Walkabout'),
  },
  {
    id:            'ease-it-up',
    slug:          'ease-it-up',
    title:         'Ease It Up',
    workType:      'song',
    year:          2016,
    releaseStatus: 'released',
    featured:      false,
    album:         'walkabout',
    meta:          '2016 · Walkabout',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1',
    spotifyUrl:    'https://open.spotify.com/track/020SW1gGtspFqRALqmZPCg',
    tidalUrl:      tidalSearch('Ease It Up Walkabout'),
  },
  {
    id:            'out-of-reach',
    slug:          'out-of-reach',
    title:         'Out of Reach',
    workType:      'song',
    year:          2016,
    releaseStatus: 'released',
    featured:      false,
    album:         'walkabout',
    meta:          '2016 · Walkabout',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1',
    spotifyUrl:    'https://open.spotify.com/track/0kY3CamGuB2nWGUCqSJ3Zt',
    tidalUrl:      tidalSearch('Out of Reach Walkabout'),
  },
  {
    id:            'speak-up',
    slug:          'speak-up',
    title:         'Speak Up',
    workType:      'song',
    year:          2016,
    releaseStatus: 'released',
    featured:      false,
    album:         'walkabout',
    meta:          '2016 · Walkabout',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1',
    spotifyUrl:    'https://open.spotify.com/track/4DhaMpIF4IxovxS1mdbg3u',
    tidalUrl:      tidalSearch('Speak Up Walkabout'),
  },
  {
    id:            'waves',
    slug:          'waves',
    title:         'Waves',
    workType:      'song',
    year:          2016,
    releaseStatus: 'released',
    featured:      false,
    album:         'walkabout',
    meta:          '2016 · Walkabout',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1',
    spotifyUrl:    'https://open.spotify.com/track/3vL4KyXs2XFYXkiYCV2hg3',
    tidalUrl:      tidalSearch('Waves Walkabout'),
  },

  // ── Collaborations ─────────────────────────────────────────────────────────
  {
    id:            'magari',
    slug:          'magari',
    title:         'Magari',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    language:      'Italian / English',
    meta:          'with Mistasy · Italian / English',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0207610e85bfa96181ab8d9a68',
    spotifyUrl:    'https://open.spotify.com/track/37US5z8tYa3VWQoqiRAjRF',
    tidalUrl:      tidalSearch('Magari'),
  },
  {
    id:            'zero-one',
    slug:          'zero-one',
    title:         'Zero One',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    meta:          'with Mistasy',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0207610e85bfa96181ab8d9a68',
    spotifyUrl:    'https://open.spotify.com/track/4vAkAlXeykSjbxQcaAOtfm',
    tidalUrl:      tidalSearch('Zero One'),
  },
  {
    id:            'gone',
    slug:          'gone',
    title:         'Gone',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    meta:          'with Mistasy',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0207610e85bfa96181ab8d9a68',
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
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0207610e85bfa96181ab8d9a68',
    spotifyUrl:    'https://open.spotify.com/track/5QKRx4B5ToIdKAcmaw093P',
    tidalUrl:      tidalSearch('Wake Up'),
  },
  {
    id:            'if-you-believe',
    slug:          'if-you-believe',
    title:         'If You Believe',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    meta:          'with Mistasy',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0262c4628ac70bc7feb7571f1d',
    spotifyUrl:    'https://open.spotify.com/track/4fX8PDpstnvD1jTPLecaco',
    tidalUrl:      tidalSearch('If You Believe Mistasy'),
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
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02788af0fc581b37226b2b54ec',
    spotifyUrl:    'https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr',
    tidalUrl:      tidalSearch('Välkommen hem'),
  },
  {
    id:            'barndomsaren',
    slug:          'barndomsaren',
    title:         'Barndomsåren / Pargas 98',
    workType:      'collaboration',
    year:          2026,
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          'with Emil Nordström · Swedish',
    album:         'next-album-collaboration-with-emil-nordstrom',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e028cc91fad2d8dc06c518ecf27',
    spotifyUrl:    'https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu',
    tidalUrl:      tidalSearch('Barndomsåren Pargas'),
  },
  {
    id:            'sanden-i-min-hand',
    slug:          'sanden-i-min-hand',
    title:         'Sanden I Min Hand',
    workType:      'collaboration',
    year:          2025,
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          '2025 · with Emil Nordström · Swedish',
    album:         'next-album-collaboration-with-emil-nordstrom',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a3617845d60b2e0a31a33e4d',
    spotifyUrl:    'https://open.spotify.com/track/5sxlnPchl6ib1vOrjJanxz',
    tidalUrl:      tidalSearch('Sanden I Min Hand'),
  },
  {
    id:            'langs-med-vagen',
    slug:          'langs-med-vagen',
    title:         'Längs Med Vägen',
    workType:      'collaboration',
    year:          2026,
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          '2026 · with Emil Nordström · Swedish',
    album:         'next-album-collaboration-with-emil-nordstrom',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a76303c4d3c06fcf1bfaf925',
    spotifyUrl:    'https://open.spotify.com/track/5xGo3coakkLQsrq5V3ArIp',
    tidalUrl:      tidalSearch('Längs Med Vägen'),
  },
  {
    id:            'fri-som-en-fagel',
    slug:          'fri-som-en-fagel',
    title:         'Fri Som En Fågel',
    workType:      'collaboration',
    year:          2025,
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          '2025 · with Emil Nordström · Swedish',
    album:         'next-album-collaboration-with-emil-nordstrom',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e023a7b1d4dc5e3fe9605191636',
    spotifyUrl:    'https://open.spotify.com/track/0GOPIKvZioFI9CWyBwkt5S',
    tidalUrl:      tidalSearch('Fri Som En Fågel'),
  },
  {
    id:            'silent-empire',
    slug:          'silent-empire',
    title:         'Silent Empire',
    workType:      'collaboration',
    year:          2024,
    releaseStatus: 'released',
    featured:      false,
    meta:          '2024 · with Consuelo Scivoletto-Cordey & Peter Fleming',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d79acef0f29f2860fcb0cc8b',
    spotifyUrl:    'https://open.spotify.com/track/6kQ4hL0eGexWtC6rPb2PmH',
    tidalUrl:      tidalSearch('Silent Empire'),
  },
  {
    id:            'silent-empire-orchestral',
    slug:          'silent-empire-orchestral',
    title:         'Silent Empire (Orchestral Version)',
    workType:      'collaboration',
    year:          2024,
    releaseStatus: 'released',
    featured:      false,
    meta:          '2024 · with Consuelo Scivoletto-Cordey & Peter Fleming',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d79acef0f29f2860fcb0cc8b',
    spotifyUrl:    'https://open.spotify.com/track/3k1PGTlY3kCeLWMFZByBNN',
    tidalUrl:      tidalSearch('Silent Empire Orchestral'),
  },
  {
    id:            'dark-dog',
    slug:          'dark-dog',
    title:         'Dark Dog',
    workType:      'collaboration',
    year:          2025,
    releaseStatus: 'released',
    featured:      false,
    meta:          '2025 · Onemac Project',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e026b9585ef4d70c4d54996b0e6',
    spotifyUrl:    'https://open.spotify.com/track/41gzQJyF7HXQWy4I31K2on',
    tidalUrl:      tidalSearch('Dark Dog Onemac Project'),
  },
  {
    id:            'birds-stopped-singing',
    slug:          'birds-stopped-singing',
    title:         'The Birds Stopped Singing',
    workType:      'collaboration',
    year:          2025,
    releaseStatus: 'released',
    featured:      false,
    meta:          '2025 · Onemac Project',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e025875dad838fff17427748907',
    spotifyUrl:    'https://open.spotify.com/track/5dH4UAFiWRDeLJ0uQqNNax',
    tidalUrl:      tidalSearch('The Birds Stopped Singing Onemac Project'),
  },
  {
    id:            'in-the-darkness',
    slug:          'in-the-darkness',
    title:         'In the Darkness',
    workType:      'collaboration',
    year:          2025,
    releaseStatus: 'released',
    featured:      false,
    meta:          '2025 · Onemac Project',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d7dcc7841b6b0395cbcbce86',
    spotifyUrl:    'https://open.spotify.com/track/0QMBB1W9oJEiSX8jEfoLvN',
    tidalUrl:      tidalSearch('In the Darkness Onemac Project'),
  },
  {
    id:            'youre-my-brother',
    slug:          'youre-my-brother',
    title:         "You're My Brother",
    workType:      'collaboration',
    year:          2025,
    releaseStatus: 'released',
    featured:      false,
    meta:          '2025 · Onemac Project · with James O\'Connor',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02b9f22b380eea9d7faeffa1d3',
    spotifyUrl:    'https://open.spotify.com/track/482cy3AhbXP4uOibHZqwVo',
    tidalUrl:      tidalSearch("You're My Brother Onemac Project"),
  },
  {
    id:            'this-is-your-world',
    slug:          'this-is-your-world',
    title:         'This Is Your World',
    workType:      'collaboration',
    year:          2025,
    releaseStatus: 'released',
    featured:      false,
    meta:          '2025 · Onemac Project',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d2b9298342f4409bcb9870db',
    spotifyUrl:    'https://open.spotify.com/track/4a2P8QynLCHRqx3EMgk9dY',
    tidalUrl:      tidalSearch('This Is Your World Onemac Project'),
  },
  {
    id:            'winter-is-coming',
    slug:          'winter-is-coming',
    title:         'Winter Is Coming',
    workType:      'collaboration',
    year:          2024,
    releaseStatus: 'released',
    featured:      false,
    meta:          '2024 · Onemac Project',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0237c96ca762e4402fa5511ef0',
    spotifyUrl:    'https://open.spotify.com/track/2CsxdofuJr6kTQUScABy7P',
    tidalUrl:      tidalSearch('Winter Is Coming Onemac Project'),
  },
  {
    id:            'christmas-eve-with-you',
    slug:          'christmas-eve-with-you',
    title:         'Christmas Eve with You',
    workType:      'collaboration',
    releaseStatus: 'released',
    featured:      false,
    meta:          'Onemac Project',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0213dfbcba11309079bae1e71b',
    spotifyUrl:    'https://open.spotify.com/track/1qCDAIZD1maMONNZSUmaFZ',
    tidalUrl:      tidalSearch('Christmas Eve with You Onemac Project'),
  },
];

// ── Albums & EPs ─────────────────────────────────────────────────────────────

export const albums: Work[] = [
  {
    id:            'walkabout',
    slug:          'walkabout',
    title:         'Walkabout',
    workType:      'album',
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1',
    spotifyUrl:    'https://open.spotify.com/album/0qrNPLyljfXuNkDYAxUnpU',
    tidalUrl:      tidalSearch('Walkabout'),
  },
  {
    id:            'live-in-concert-walkabout-tour',
    slug:          'live-in-concert-walkabout-tour',
    title:         'Live in Concert, Walkabout Tour',
    workType:      'album',
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0260973324ed98742709f82368',
    spotifyUrl:    'https://open.spotify.com/album/4CK56Vn6pDPAL03LIsM46Y',
    tidalUrl:      tidalSearch('Live in Concert Walkabout Tour'),
  },
  {
    id:            'gone-ep',
    slug:          'gone-ep',
    title:         'Gone',
    workType:      'ep',
    releaseStatus: 'released',
    featured:      false,
    meta:          'with Mistasy',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0207610e85bfa96181ab8d9a68',
    spotifyUrl:    'https://open.spotify.com/album/6eDrvKVbYVPSaZ7nJMd0qc',
    tidalUrl:      tidalSearch('Gone Mistasy'),
  },
  {
    id:            'put-on-a-smile-pitea-sessions',
    slug:          'put-on-a-smile-pitea-sessions',
    title:         'Put On a Smile',
    workType:      'single',
    releaseStatus: 'released',
    featured:      false,
    meta:          'Piteå Sessions · with Andreas Jacobson',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d286d7c995606b8a72a60d1a',
    spotifyUrl:    'https://open.spotify.com/album/4Tu9xwfp1fx70M4IDTHVug',
    tidalUrl:      tidalSearch('Put On a Smile Piteå Sessions'),
  },
  {
    id:            'one-last-waltz-acoustic',
    slug:          'one-last-waltz-acoustic',
    title:         'One Last Waltz',
    workType:      'single',
    releaseStatus: 'released',
    featured:      false,
    meta:          'Acoustic Version',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020e3dfd8751159faa2212d44e',
    spotifyUrl:    'https://open.spotify.com/album/5VUHYEJfX596QuUmP8E3uf',
    tidalUrl:      tidalSearch('One Last Waltz Acoustic'),
  },
  {
    id:            'one-last-waltz-alternative',
    slug:          'one-last-waltz-alternative',
    title:         'One Last Waltz',
    workType:      'single',
    releaseStatus: 'released',
    featured:      false,
    meta:          'Alternative Version',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f851d093267bc20556beb684',
    spotifyUrl:    'https://open.spotify.com/album/6r42sveobmn1YVx5p00GOI',
    tidalUrl:      tidalSearch('One Last Waltz Alternative'),
  },
  {
    id:            'one-last-waltz-pop',
    slug:          'one-last-waltz-pop',
    title:         'One Last Waltz',
    workType:      'single',
    year:          2024,
    releaseStatus: 'released',
    featured:      false,
    meta:          'Pop Version',
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e023746407039a6f55d03bc6311',
    spotifyUrl:    'https://open.spotify.com/track/5NPMsz6algbBmCJOpSw9Y5',
    tidalUrl:      tidalSearch('One Last Waltz Pop Version'),
  },
  {
    id:            'glenn-ep',
    slug:          'glenn-ep',
    title:         'Glenn',
    workType:      'ep',
    year:          2024,
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e24ed1a9271e2c63964dfcb2',
    spotifyUrl:    'https://open.spotify.com/album/0v9Nv0RIoHZjsjTwNy5PCr',
    tidalUrl:      tidalSearch('Glenn EP'),
  },
  {
    id:            'endless-ep',
    slug:          'endless-ep',
    title:         'Endless',
    workType:      'ep',
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02bcca4811e385aafa0b5972e4',
    spotifyUrl:    'https://open.spotify.com/album/0vzpOjRwZ3EyvsLyJ01eik',
    tidalUrl:      tidalSearch('Endless EP'),
  },
  {
    id:            'the-pearl-ep',
    slug:          'the-pearl-ep',
    title:         'The Pearl',
    workType:      'ep',
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e029fbb776b09740ed5d004d6c0',
    spotifyUrl:    'https://open.spotify.com/album/0KcyZclKHcMZFaBEsj6PVB',
    tidalUrl:      tidalSearch('The Pearl EP'),
  },

  // ── Upcoming ──────────────────────────────────────────────────────────────
  {
    id:            'next-album-collaboration-with-emil-nordstrom',
    slug:          'next-album-collaboration-with-emil-nordstrom',
    title:         'Next Album – Collaboration with Emil Nordström',
    workType:      'album',
    releaseStatus: 'upcoming',
    featured:      false,
    language:      'Swedish',
    meta:          'with Emil Nordström · Swedish',
    credits: [
      { name: 'Emil Nordström', role: 'Co-writer & Co-artist' },
    ],
    tracks: [
      'lycka',
      'langs-med-vagen',
      'barndomsaren',
      'sanden-i-min-hand',
      'fri-som-en-fagel',
    ],
  },
];

// ── Derived exports ───────────────────────────────────────────────────────────

export const songs = works.filter(
  (w) => w.workType === 'song' || w.workType === 'single' || w.workType === 'collaboration'
);

export const featuredWorks = works
  .filter((w) => w.featured)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

export const upcomingAlbums = albums.filter((a) => a.releaseStatus === 'upcoming');

export function getWork(slug: string): Work | undefined {
  return [...works, ...albums].find((w) => w.slug === slug);
}
