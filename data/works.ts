export type WorkType = 'song' | 'album' | 'ep' | 'single' | 'storytelling' | 'collaboration';
export type ReleaseStatus = 'released' | 'unreleased' | 'upcoming';

export interface WorkCredit {
  role: string;
  name: string;
  url?: string;
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
  /** Direct public URL to an R2-hosted audio file, for in-site playback via AudioPlayer */
  audioUrl?: string;
  lyrics?: string;
  story?: string;
  description?: string;
  credits?: WorkCredit[];
  /** For albums/EPs: slugs of songs that appear on this release */
  tracks?: string[];
  /** Slugs of related Notes on the website */
  relatedNotes?: string[];
  /** Ordered list of photo paths (relative to /public) for a studio/promo gallery */
  photos?: string[];
  /** Bullet-point notes shown in a "Behind the record" section on album pages */
  behindTheRecord?: string[];
  /** Funding organisations shown at the bottom of the page */
  funders?: Array<{ name: string; url: string; logo: string; logoAlt?: string }>;
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
    album:         'langs-med-vagen-album',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e026ed0b3388394820c3aac27c5',
    spotifyUrl:    'https://open.spotify.com/track/2ALT61LKWHRLW3qvRpz3JI',
    tidalUrl:      TIDAL_ARTIST,
    audioUrl:      'https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/Lycka_Sjoholm_Nordstrom.mp3',
    description:   'Written about Emil\'s family: his bond with his wife and daughter, and with his own parents. A cross-generational song about how people carry each other through life, joy or grief. "Lyckan kommer, lyckan går / var vi än i livet står / finns vi där för varandra."',
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
    year:          2019,
    releaseStatus: 'released',
    featured:      true,
    featuredOrder: 3,
    meta:          'with Mistasy',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0248bb1b76bfb10f76e72d6cae',
    spotifyUrl:    'https://open.spotify.com/track/7KAFu2ouup81IBB6AnQZkM',
    tidalUrl:      tidalSearch('Midnight Sun'),
    lyrics:
`I’d like to talk about society
I’d like to talk about peace
I’d like to talk about humanity
so much we’d do for love, so much we’d do to be remembered

Shine like the midnight sun
and hold up a light in the dark
I’ll give my love for the lonely
I’ll give my love for the only thing I wanna give my attention to
is to make your heart beat twice

I’d like to stand up like Mandela
I’d like to write a song like John Lennons
I’d like to speak like Martin Luther King
so much we’d do for love, so much we’d do to be remembered

Shine like the midnight sun
and hold up a light in the dark
I’ll give my love for the lonely
I’ll give my love for the only thing I wanna give my attention to
is to make your heart beat twice`,
  },

  // ── Solo songs ─────────────────────────────────────────────────────────────
  {
    id:            'put-on-a-smile',
    slug:          'put-on-a-smile',
    title:         'Put On a Smile',
    workType:      'song',
    year:          2017,
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
    year:          2024,
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
    year:          2016,
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020f153dc346e5135fc50c96e1',
    spotifyUrl:    'https://open.spotify.com/track/2vsvxI57LT953u4MHHJ02I',
    tidalUrl:      tidalSearch('Ray of Light'),
    lyrics:
`I’ve been watching the sun go down, down in the sea
I’ve been telling you we’ve got to be free, we got to be free
people say we got to have hope, you got to have hope
I’ve got a ray of light over my head on my way home

I’ve got a ray of light over my head on my way home tonight
a ray of light over my head on my way home
I’ve got a ray of light over my head on my way home tonight
a ray of light over my head on my way home

and so we listen to the sound of the ocean waves eating the shore
yeah, we listen to the breathing of peace surrounding it all
we need to get a grit stone to edge our perfect insanity
and so we listen to the sound of reality to light up the road

I’ve got a ray of light over my head on my way home tonight
a ray of light over my head on my way home
I’ve got a ray of light over my head on my way home tonight
a ray of light over my head on my way home`,
  },
  {
    id:            'ashes',
    slug:          'ashes',
    title:         'Ashes',
    workType:      'song',
    year:          2024,
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0256cb815bf3ed91d4650047b2',
    spotifyUrl:    'https://open.spotify.com/track/6tcU3CmHiLKfbRNyTL5Evo',
    tidalUrl:      tidalSearch('Ashes'),
    lyrics:
`Raking through the ashes of a burnt-out fire
Find the traces of a part of my life
Written once in black and white a sign
You and I had planned a new life

Like the fire, our love once burned so bright
The flame died there was no light
No spark
No ember
That could again ignite
Now all that's left is lonely nights

Lonely nights, lonely nights
The ashes of our dreams
Lonely nights lonely nights
All good things
Come to an end

It was written in the stars as our love shone bright
Our souls met and danced 'til the morning light
Our loving stopped and we were done
Faded like a mist in the morning sun

Like the fire, our love once burned so bright
The flame died there was no light
No spark
No ember
That could again ignite
Now all that's left is lonely nights

Lonely nights, lonely nights
The ashes of our dreams
Lonely nights lonely nights
All good things
Come to an end

Little did I know it would come to this
Betrayed by desire for a stolen kiss
Planning for another life without me
Running from a future that will never be

Lonely nights, lonely nights
The ashes of our love
Lonely nights lonely nights
All good things
Come to an end

Lonely nights, lonely nights
The ashes of our dreams
Lonely nights lonely nights
All good things
Come to an end`,
  },
  {
    id:            'matsawana',
    slug:          'matsawana',
    title:         'Matsawana',
    workType:      'song',
    year:          2020,
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02350ba1fef0246915e4b7986a',
    spotifyUrl:    'https://open.spotify.com/track/0ap55kADfSNkisbVEWJWrr',
    tidalUrl:      tidalSearch('Matsawana'),
    lyrics:
`sha boom sha boom shiriki boom owayo wee // 4x

Matsawana came to see me
she took my temple
in the middle of the night
she took my life

Matsawana, Matsawana

sha boom sha boom shiriki boom owayo wee // 4x

from the day I was born
Matsawana-naa-na
she hold me in her arms
Matsawana-naa-na
she guide me through life
Matsawana-naa-na
then she take me away
Matsawana-naa-na

sha boom sha boom shiriki boom owayo wee // 4x

Matsawana came to see me…

Matsawana, Matsawana

SOLO

Away wue wue wue wue
she took my temple
Away wue wue wue wue
she took my life

Matsawana, Matsawana

A shadow wolf (came to me ) at night
stared at me in the dark
I only saw the reflections of two bright eyes
and I knew it was the same as before`,
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
    lyrics:
`Do you wanna get real close
do you wanna get some real?
Do you wanna get to know somebody
without letting anybody know you

you see, there´s one and two
split fifty each
you give and take
and she gives and takes

and you compromise
as much responsible we are
and you learn to live
in understanding of each other

well you like your flow
when you´re on your own
and you would like to keep it tight
when you’re looking at a georgious sight

but there´s one and two
split fifty each
you give and take
and she gives and takes

and you compromise
as much responsible we are
and you learn to live
in understanding of each other`,
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
    lyrics:
`Rest your bones
until the feeling grows
rest your heart
until you get the spark

ease it up
ease it up
ease it up
ease it up

Close your eyes
and take a deep breath
follow your body
once you catch it
find some peace
find some peace

ease it up
ease it up

I could fool you by making a move
faster than eyes or ears can touch
are you following something such
you can’t reach

take heed of all around
let your feet take balance of the ground
suddenly you´re sharp and clear
as a starry night

ease it up
ease it up`,
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
    lyrics:
`Yesterday, I sat alone
I looked around, at everything you’ve done
Yesterday I, realized how much I love you

Yesterday, I thought of you
Of what you’re doing and, how you do
Yesterday I, I thought of you

Would you let me reach you?
Would you let me reach you?

Yesterday, I woke up to see you
I woke up to hear you, I woke up to feel you
Yesterday I, realized, how much I need you

Would you let me reach you?
Would you let me reach you?

I thought of feeling and, I thought of faith
I thought of reasons why, people forsake
I thought of freedom, would you, let somebody get close to you?

Would you let me reach you?
Would you let me reach you?`,
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
    lyrics:
`share your worries, let your worries out now
share your troubles, let your troubles go
share your heart now, let me know how you feel inside
it’s allright, I’ve got you, I’ve got you
we’ve got ya, we’ve got ya, we’ve got ya…

speak up brother, tell me what is on your heart
oh sister,
speak up brother, tell me what is on your heart
oh sister,

when I stay low, I let you go
I stay alone, and get cold
because of no peace at home
in my soul, I grow old, I get heavy
and there is no love no love no love until I let know

speak up brother, tell me what is on your heart
oh sister,
speak up brother, tell me what is on your heart
oh sister,

dreams become real by sharing your heart
and we become free when sharing our love

so speak up brother
speak sister

let your feelings out
let your heart pour out`,
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
    lyrics:
`I want to talk about times
As I feel them move
I want to talk about the line,
that I see everyday
I want to talk about times
Everything goes around

Like an ocean, times change
And we sail across the waves
Like how we circle round the sun
We will return to where we begun

To keep stable, to keep able
Keep turning, keep moving
it’s about a balance between opposites
they keep as low, as high
until the end of time it seems

Like an ocean, times change
And we sail across the waves
Like how we circle round the sun
We will return to where we begun`,
  },

  // ── Collaborations ─────────────────────────────────────────────────────────
  {
    id:            'magari',
    slug:          'magari',
    title:         'Magari',
    workType:      'collaboration',
    year:          2024,
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
    year:          2024,
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
    year:          2024,
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
    year:          2024,
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
    year:          2023,
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
    year:          2020,
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          'with The Sjöholm Family Band · Swedish',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02788af0fc581b37226b2b54ec',
    spotifyUrl:    'https://open.spotify.com/track/5NGZlytj1yXPqCZp9zexhr',
    tidalUrl:      tidalSearch('Välkommen hem'),
    lyrics:
`Välkommen hem, stig in i tamburen
ta av dina skor, häng upp din jacka
liten blir stor, du e mycket äldre sen du for

kom slå dej ner, sätt dej i soffan
berätta om allt, allt som har hänt
du sa du ha träffa en typ som ha kommit dej närmare för varje dag

du sa ja visste nog vem han va…

spring, spring, spring nu fattas ingenting
fall, fall, fall i varandras armar
ta min hand och håll den livet ut
spring, spring, spring hjärtan store i brand
fall, fall, fall tillsammans i en dröm
och gör den till verklighet

har ni sett vad vi gjort, vi har renoverat
köket e stort nu, de ryms många flera
här kan vi andas, här kan vi leva, i lugn och fred

vill du ha lite plättar? vi kan också dela
minns du den gång, då vi brände dem hela
jag vill sjunga alla sånger vi sjöng
dom handla om en vanlig dag

alla minnen som vi har…

spring, spring, spring nu fattas ingenting
fall, fall, fall i varandras armar
ta min hand och håll den livet ut
spring, spring, spring hjärtan store i brand
fall, fall, fall tillsammans i en dröm
och gör den till verklighet

om en framtid för två, tindrar stjärnorna i natten
av en kärlek så stor…`,
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
    album:         'langs-med-vagen-album',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e028cc91fad2d8dc06c518ecf27',
    spotifyUrl:    'https://open.spotify.com/track/2x00pPFmK8lgkyPeW401Gu',
    tidalUrl:      tidalSearch('Barndomsåren Pargas'),
    audioUrl:      'https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/Barndoms%C3%A5ren%20%28Pargas%2098%29_Sjoholm_Nordstrom.mp3',
    description:   'About Emil\'s childhood years in Pargas, growing up and starting to play music.',
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
    album:         'langs-med-vagen-album',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a3617845d60b2e0a31a33e4d',
    spotifyUrl:    'https://open.spotify.com/track/5sxlnPchl6ib1vOrjJanxz',
    tidalUrl:      tidalSearch('Sanden I Min Hand'),
    audioUrl:      'https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/Sanden%20i%20mind%20hand__Sjoholm_Nordstrom.mp3',
    description:   'Inspired by Majors träsk in Malax, where Erik\'s father grew up and where Erik\'s sister now lives with her family. Written out of conversations with his father about the passing of time, mortality, and a melancholic attempt to accept death.',
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
    album:         'langs-med-vagen-album',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a76303c4d3c06fcf1bfaf925',
    spotifyUrl:    'https://open.spotify.com/track/5xGo3coakkLQsrq5V3ArIp',
    tidalUrl:      tidalSearch('Längs Med Vägen'),
    audioUrl:      'https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/L%C3%A4ngs%20med%20v%C3%A4gen__Sjoholm_Nordstrom.mp3',
    description:   'The title track, about Erik\'s connection to his childhood best friend Viktor — the two have known each other since they were a few months old. The song began as the speech Erik gave at Viktor\'s wedding.',
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
    album:         'langs-med-vagen-album',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e023a7b1d4dc5e3fe9605191636',
    spotifyUrl:    'https://open.spotify.com/track/0GOPIKvZioFI9CWyBwkt5S',
    tidalUrl:      tidalSearch('Fri Som En Fågel'),
    audioUrl:      'https://pub-6f6cd6567cbc4f74936c2036ae7bca61.r2.dev/Fri%20Som%20En%20F%C3%A5gel_Sjoholm_Nordstrom.mp3',
    description:   'About Erik\'s mother, for whom travel is freedom — kayak, hiking, train, bus, flight, bike, staying in motion by any means she can.',
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
    lyrics:
`There is no rhyme
There's no reason
As to who it bites
Does what it pleases
The dark dog
Is it waiting for me?
I hope we never meet

'Cause the dark dog is waiting
The dark dog is waiting
And it doesn't really matter
If it's day or night
'Cause the dark dog is waiting ....
Is it waiting for me?

Where shadows fall
Inside my mind
A silent hunter
Bides it's time
When it strikes
What will it take?
The dark dog
Could seal your fate

The dark dog is waiting
The dark dog is waiting
And it doesn't really matter
If it's day or night
'Cause the dark dog is waiting ....
Is it waiting for me?

All my joyful memories
Are fading painfully
You're my darkest enemy
Are you waiting for me?
Are you waiting for me?

The dark dog is waiting
The dark dog is waiting
And it doesn't really matter
If it's day or night
'Cause the dark dog is waiting
The dark dog is waiting
The dark dog is waiting
And it doesn't really matter
If it's day or night
'Cause the dark dog is waiting`,
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
    lyrics:
`The house of the people
Once proud as it stood
We're living in a
Wilderness of mirrors
Where nothing we see
Is what it seems

The birds stopped singing in Lafayette Park
As a dark bird of war light up the park

So the poisonous gas
Chocked the voices of peace
And the bible held high
In the hand of the beast
The birds stopped singing in the Lafayette Park
As the bird of war light up the dark

The devil walked up to the church
And proudly held aloft
A book he said was the bible
But was just the art of the steal

So the poisonous gas
Brought tears to the eyes
The storm troopers armed
With batons and gas
Cleared a path through the crowd
So the devil could pass
To the steps of St. Johns

Choked the voices of peace
The bible held up high
In the hand of the thief

I don't want pity
I want change
I'm not sad
I'm not sorry
I'm angry
I'm tired`,
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
    lyrics:
`I heard the shadow footsteps slowly creeping down the hall
I heard the silent shadow knock so gently on the door
Was my mind just playing tricks on me?
Did I hear some voices call?
In the darkness of the shadows
There was nothing there at all

When they want to hold the power in a game they keep the ball
To retain their power and influence they give the rest fuck all
Was my mind just playing tricks on me?
Did I hear the voices call?
In the darkness of the shadows
There was nothing there at all

When the poor kids went to school they had no books just cold damp walls
While the rich kids got the cash and more to build their golden halls
Did the government say stop this?
Did you hear our voices call?
In the darkness of the shadows
There was nothing there at all

Deny them education if they're dumb they will not know
That the truth is not the lies you tell, the facts you'll never show
Truth is the key to freedom for
To make our voices heard
From the darkness of the shadows
Let them hear our freedom call
From the darkness of the shadows
Let them hear our freedom call

In the darkness of the shadows
There was nothing there at all

They were calling out for guidance
But nobody heard their call
Keep them all in darkness and
In the darkness of the shadows
There was nothing there at all`,
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
    lyrics:
`Welcome to this world
You're a beauty to behold
Your journey's just beginning
Your stories will unfold

Walk a path that you choose
Discover who you are
Mistakes should not define but
Make you stronger as you learn

You know this is your world
It's your time to explore
You can make it anywhere
You know this is your world
It's your time to explore
You can open any door

Your life is yours to live
So take a leap of faith
Find what brings you joy
The rest will fall into place

Our love will help to guide you
You'll make your mark one day
So keep striving for happiness
Follow all your dreams

You know this is your world
It's your time to explore
You can make it anywhere
You know this is your world
It's your time to explore
You can open any door

You know this is your world
It's your time to explore
You can make it anywhere
You know this is your world
It's your time to explore
You can open any door

Georgie
Georgie
You can open any door
Georgie
You can open any door`,
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
    lyrics:
`There's a sadness in your eyes
I see the tracks of the tears you cry
The mask of your smiling face can't hide them
Though you try

You sat alone under the stars
Made a wish under the moon
For a love that would bring you home
It couldn't come too soon

Winter is coming
You're outside in the cold
All you have to do is
Take my hand
There's a fire inside
To keep you safe and warm
There's a promise in my heart
That I'll give you all my love
I can only promise you
I'll give you my all my love
And all that I am
And all that I am

When we're so far apart
We share two loving hearts
We look up at the midnight moon
And wish upon the same stars

Winter is coming
You're outside in the cold
All you have to do is
Take my hand
There's a fire inside
To keep you safe and warm
There's a promise in my heart
That I'll give you all my love
I can only promise you
I'll give you my all my love
And all that I am
And all that I am

All you have to do is
Take my hand

When trouble comes your way
And there are no games to play
I'll always be beside you
Though I'm a thousand miles away

Winter is coming
You're outside in the cold
All you have to do is
Take my hand
All you have to do is
Take my hand`,
  },
  {
    id:            'christmas-eve-with-you',
    slug:          'christmas-eve-with-you',
    title:         'Christmas Eve with You',
    workType:      'collaboration',
    year:          2024,
    releaseStatus: 'released',
    featured:      false,
    meta:          'Onemac Project',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0213dfbcba11309079bae1e71b',
    spotifyUrl:    'https://open.spotify.com/track/1qCDAIZD1maMONNZSUmaFZ',
    tidalUrl:      tidalSearch('Christmas Eve with You Onemac Project'),
    lyrics:
`When the soft snow starts to fall
Oh! the beauty of it all
By the warm fire's gentle glow
There's no place I'd rather go

I'm spending Christmas Eve with you
As the brightest stars shine through
In your arms, it feels so right
Wrapped in love, a special night
Oh! it's Christmas, Christmas Eve with you
Every wish and every dream come true
Just us two, our love renewed
Oh, it's Christmas Eve with you

City streets are soft and white
Twinkling lights light up the night
Every carol softly sung
Takes me back when we were young

I'm spending Christmas Eve with you
As the brightest stars shine through
In your arms, it feels so right
Wrapped in love, a special night
Oh! it's Christmas, Christmas Eve with you
Every wish and every dream come true
Just us two, our love renewed
Oh, it's Christmas Eve with you

Let the bells ring, let them chime
For this love that's yours and mine
Underneath the mistletoe
Where our hearts are all aglow

I'm spending Christmas Eve with you
As the brightest stars shine through
In your arms, it feels so right
Wrapped in love, a special night
Oh! it's Christmas, Christmas Eve
Every wish and every dream come true
Just us two, our love renewed
Oh, it's Christmas Eve with you

Yes, it's Christmas Eve again
With your love, we're one again
Hold me close, the whole night through
Oh! it's Christmas Eve with you`,
  },
];

// ── Albums & EPs ─────────────────────────────────────────────────────────────

export const albums: Work[] = [
  {
    id:            'walkabout',
    slug:          'walkabout',
    title:         'Walkabout',
    workType:      'album',
    year:          2016,
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
    year:          2017,
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
    year:          2024,
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
    year:          2017,
    releaseStatus: 'released',
    featured:      false,
    meta:          'Piteå Sessions · with Andreas Jacobson',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d286d7c995606b8a72a60d1a',
    spotifyUrl:    'https://open.spotify.com/album/4Tu9xwfp1fx70M4IDTHVug',
    tidalUrl:      tidalSearch('Put On a Smile Piteå Sessions'),
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
    id:            'one-last-waltz-acoustic',
    slug:          'one-last-waltz-acoustic',
    title:         'One Last Waltz',
    workType:      'single',
    year:          2024,
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
    year:          2024,
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
    year:          2009,
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
    year:          2014,
    releaseStatus: 'released',
    featured:      false,
    coverImage:    'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e029fbb776b09740ed5d004d6c0',
    spotifyUrl:    'https://open.spotify.com/album/0KcyZclKHcMZFaBEsj6PVB',
    tidalUrl:      tidalSearch('The Pearl EP'),
  },

  // ── Upcoming ──────────────────────────────────────────────────────────────
  {
    id:            'langs-med-vagen-album',
    slug:          'langs-med-vagen-album',
    title:         'Längs med vägen',
    workType:      'album',
    releaseStatus: 'upcoming',
    featured:      false,
    language:      'Swedish',
    meta:          'with Emil Nordström · Swedish',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a76303c4d3c06fcf1bfaf925',
    description:
`Längs med vägen — "along the road" — is a Swedish-language album by Erik Sjøholm and Emil Nordström, twelve to fifteen songs written as a walk along the road of life: childhood memories at one end, reflections on old age at the other, and everything that happens in between. The songs are set in two places that shaped both writers — Österbotten, on the Swedish-speaking coast of Finland, and Pargas, further south near Turku.

Erik and Emil met during their music studies in Jakobstad and have been playing together ever since — in bands, in orchestras, and now in this album. On record, the two roles split cleanly: Erik writes the lyrics and melodies and sings lead, working personal memory into something a listener with a different childhood can still recognize; Emil produces and arranges, building the soundscape each song sits inside.

Recording ran through the summer of 2025 across a handful of specific rooms chosen for what they'd add to the sound: strings in Replot church, horns in Jakobstad, percussion in Vasa, and the core sessions at DeeKay Records Studios in Vaskiluoto. The promo and recording photography was shot at Midas Studio in Replot. The album was mixed by Emil Nordström, recorded by Stefan Backas, and mastered by Maria Triana in Amsterdam.`,
    credits: [
      { name: 'Erik Sjøholm',     role: 'Lead vocals, backing vocals, some guitars' },
      { name: 'Emil Nordström',   role: 'Production, arrangement, mixing, guitar', url: 'https://emilnordstrom.com/portfolio' },
      { name: 'Stefan Backas',    role: 'Recording engineering' },
      { name: 'Maria Triana',     role: 'Mastering (Amsterdam)' },
      { name: 'Johnny Nordström', role: 'Piano, keys, organ' },
      { name: 'Svante Sjöholm',   role: 'Piano' },
      { name: 'Tuukka Aitoaho',   role: 'Drums and percussion' },
      { name: 'Stefan Lindblom',  role: 'Bass' },
      { name: 'Anders Sjölind',   role: 'Horn and string arrangements, horns' },
      { name: 'Emma Strömbäck',   role: 'Cello' },
      { name: 'Robin Käldström',  role: 'Horns' },
    ],
    behindTheRecord: [
      'The album grew out of a shared goal: writing and recording entirely in Swedish, as a way of preserving stories and strengthening the Finland-Swedish language and culture the two grew up in.',
      'Fifteen songs were sketched during writing sessions in June 2025, each tagged with a tempo and feel before arrangement — "Lycka" as a 4/4 ballad, "Fri som en fågel" with a slow, African-tinged beat, "Rådarens hamn" at a medium 4/4, and so on.',
    ],
    tracks: [
      'lycka',
      'langs-med-vagen',
      'barndomsaren',
      'sanden-i-min-hand',
      'fri-som-en-fagel',
    ],
    funders: [
      {
        name:    'Svenska kulturfonden',
        url:     'https://www.kulturfonden.fi',
        logo:    '/images/svenska-kulturfonden-logo.png',
        logoAlt: 'Svenska kulturfonden',
      },
    ],
    // NOTE: lmv-21..lmv-40 were an accidental re-upload duplicating lmv-01..lmv-20
    // pixel-for-pixel (confirmed via perceptual hash, 2026-08-29) — removed from
    // both this list and the /public folder rather than kept as dead weight.
    photos: [
      '/images/langs-med-vagen/lmv-11.jpg',
      '/images/langs-med-vagen/lmv-07.jpg',
      '/images/langs-med-vagen/lmv-01.jpg',
      '/images/langs-med-vagen/lmv-04.jpg',
      '/images/langs-med-vagen/lmv-03.jpg',
      '/images/langs-med-vagen/lmv-13.jpg',
      '/images/langs-med-vagen/lmv-09.jpg',
      '/images/langs-med-vagen/lmv-16.jpg',
      '/images/langs-med-vagen/lmv-02.jpg',
      '/images/langs-med-vagen/lmv-05.jpg',
      '/images/langs-med-vagen/lmv-06.jpg',
      '/images/langs-med-vagen/lmv-08.jpg',
      '/images/langs-med-vagen/lmv-10.jpg',
      '/images/langs-med-vagen/lmv-12.jpg',
      '/images/langs-med-vagen/lmv-14.jpg',
      '/images/langs-med-vagen/lmv-15.jpg',
      '/images/langs-med-vagen/lmv-17.jpg',
      '/images/langs-med-vagen/lmv-18.jpg',
      '/images/langs-med-vagen/lmv-19.jpg',
      '/images/langs-med-vagen/lmv-20.jpg',
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
