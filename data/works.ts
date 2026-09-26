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
  /** Translations of `lyrics`, keyed by site locale (the original language is not repeated here) */
  lyricsTranslations?: Partial<Record<'en' | 'de' | 'es' | 'sv' | 'fi' | 'it' | 'fr' | 'pt', string>>;
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
    lyrics:
`Vi ringer regelbundet
Hon frågar alltid hur jag mår
Och hon är den som kan förstå mig

Alltid lugnet i min storm
Genom glädje, genom sorg

Så liten var jag då
Hjälplös i din hand
Nu finns jag här
För dig

Han känner pulsen
Litar på känslan
Att vägen alltid leder hem

Så liten var jag då
Hjälplös i din hand
Nu finns jag här
För dig

Din starka vilja
De kan va svårt för mig
Att acceptera våra gränser

Så liten var du då
Hjälplös i min hand
Nu finns vi här
För dig

Lyckan kommer, lyckan går
Var vi än i livet står
Finns vi där för varandra
Finns vi där`,
    lyricsTranslations: {
      en:
`We call each other regularly
She always asks how I'm doing
And she's the one who can understand me

Always the calm in my storm
Through joy, through sorrow

So small I was then
Helpless in your hand
Now I'm here
For you

He feels the pulse
Trusts the feeling
That the road always leads home

So small I was then
Helpless in your hand
Now I'm here
For you

Your strong will
It can be hard for me
To accept our limits

So small you were then
Helpless in my hand
Now we're here
For you

Happiness comes, happiness goes
Wherever we stand in life
We are there for each other
We are there`,
      de:
`Wir telefonieren regelmäßig
Sie fragt immer, wie es mir geht
Und sie ist die, die mich verstehen kann

Immer die Ruhe in meinem Sturm
Durch Freude, durch Trauer

So klein war ich damals
Hilflos in deiner Hand
Jetzt bin ich da
Für dich

Er spürt den Puls
Vertraut dem Gefühl
Dass der Weg immer nach Hause führt

So klein war ich damals
Hilflos in deiner Hand
Jetzt bin ich da
Für dich

Dein starker Wille
Es kann schwer für mich sein
Unsere Grenzen zu akzeptieren

So klein warst du damals
Hilflos in meiner Hand
Jetzt sind wir da
Für dich

Das Glück kommt, das Glück geht
Wo wir im Leben auch stehen
Sind wir füreinander da
Sind wir da`,
      es:
`Nos llamamos con regularidad
Ella siempre me pregunta cómo estoy
Y es la que puede entenderme

Siempre la calma en mi tormenta
En la alegría, en el dolor

Tan pequeño era yo entonces
Indefenso en tu mano
Ahora estoy aquí
Para ti

Él siente el pulso
Confía en el presentimiento
De que el camino siempre lleva a casa

Tan pequeño era yo entonces
Indefenso en tu mano
Ahora estoy aquí
Para ti

Tu fuerte voluntad
Puede ser difícil para mí
Aceptar nuestros límites

Tan pequeña eras tú entonces
Indefensa en mi mano
Ahora estamos aquí
Para ti

La felicidad viene, la felicidad se va
Estemos donde estemos en la vida
Estamos ahí el uno para el otro
Estamos ahí`,
      fi:
`Soitamme toisillemme säännöllisesti
Hän kysyy aina, mitä minulle kuuluu
Ja hän on se, joka osaa ymmärtää minua

Aina tyyneys myrskyssäni
Ilon läpi, surun läpi

Niin pieni olin silloin
Avuton sinun kädessäsi
Nyt olen tässä
Sinua varten

Hän tuntee sykkeen
Luottaa tunteeseen
Että tie vie aina kotiin

Niin pieni olin silloin
Avuton sinun kädessäsi
Nyt olen tässä
Sinua varten

Sinun vahva tahtosi
Voi olla minulle vaikeaa
Hyväksyä rajamme

Niin pieni olit silloin
Avuton minun kädessäni
Nyt olemme tässä
Sinua varten

Onni tulee, onni menee
Missä elämässä sitten seisommekin
Olemme siellä toisiamme varten
Olemme siellä`,
      it:
`Ci sentiamo regolarmente
Lei mi chiede sempre come sto
Ed è lei che riesce a capirmi

Sempre la calma nella mia tempesta
Attraverso la gioia, attraverso il dolore

Così piccolo ero allora
Indifeso nella tua mano
Ora sono qui
Per te

Lui sente il battito
Si fida del sentimento
Che la strada porta sempre a casa

Così piccolo ero allora
Indifeso nella tua mano
Ora sono qui
Per te

La tua forte volontà
Per me può essere difficile
Accettare i nostri limiti

Così piccola eri allora
Indifesa nella mia mano
Ora siamo qui
Per te

La felicità viene, la felicità va
Ovunque siamo nella vita
Ci siamo l'uno per l'altro
Ci siamo`,
      fr:
`On s'appelle régulièrement
Elle me demande toujours comment je vais
Et c'est elle qui sait me comprendre

Toujours le calme dans ma tempête
Dans la joie, dans le chagrin

Si petit j'étais alors
Sans défense dans ta main
Maintenant je suis là
Pour toi

Il sent le pouls
Fait confiance au sentiment
Que le chemin mène toujours à la maison

Si petit j'étais alors
Sans défense dans ta main
Maintenant je suis là
Pour toi

Ta forte volonté
Peut être difficile pour moi
D'accepter nos limites

Si petite tu étais alors
Sans défense dans ma main
Maintenant nous sommes là
Pour toi

Le bonheur vient, le bonheur s'en va
Où que nous en soyons dans la vie
Nous sommes là l'un pour l'autre
Nous sommes là`,
      pt:
`Ligamo-nos com regularidade
Ela pergunta sempre como estou
E é ela quem consegue compreender-me

Sempre a calma na minha tempestade
Na alegria, na tristeza

Tão pequeno eu era então
Indefeso na tua mão
Agora estou aqui
Por ti

Ele sente o pulso
Confia no sentimento
De que o caminho leva sempre a casa

Tão pequeno eu era então
Indefeso na tua mão
Agora estou aqui
Por ti

A tua forte vontade
Pode ser difícil para mim
Aceitar os nossos limites

Tão pequena eras então
Indefesa na minha mão
Agora estamos aqui
Por ti

A felicidade vem, a felicidade vai
Onde quer que estejamos na vida
Estamos lá uns pelos outros
Estamos lá`,
    },
    credits: [
      { name: 'Erik Sjøholm',      role: 'Lyrics, lead vocals, backing vocals' },
      { name: 'Emil Nordström',    role: 'Lyrics, production, arrangement, mixing, acoustic guitar' },
      { name: 'Anders Sjölind',    role: 'String arrangements' },
      // TODO: add Krista's surname before publishing
      { name: 'Krista',            role: 'Violin, viola' },
      { name: 'Emma Strömbäck',    role: 'Cello' },
      { name: 'Johnny Nordström',  role: 'Piano' },
      { name: 'Tuukka Aitoaho',    role: 'Drums' },
      { name: 'Stefan Lindblom',   role: 'Ukulele bass' },
      { name: 'Stefan Backas',     role: 'Recording engineering' },
      { name: 'Maria Triana',      role: 'Mastering (Amsterdam)' },
    ],
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
    credits: [
      { name: 'Erik Sjøholm',      role: 'Lyrics, lead vocals, backing vocals' },
      { name: 'Emil Nordström',    role: 'Lyrics, production, arrangement, mixing, acoustic and electric guitar' },
      { name: 'Johnny Nordström',  role: 'Electric piano, organ' },
      { name: 'Tuukka Aitoaho',    role: 'Drums, percussion' },
      { name: 'Stefan Lindblom',   role: 'Bass' },
      { name: 'Anders Sjölind',    role: 'Trumpet (including solo), trombone' },
      { name: 'Robin Käldström',   role: 'Saxophone' },
      { name: 'Stefan Backas',     role: 'Recording engineering' },
      { name: 'Maria Triana',      role: 'Mastering (Amsterdam)' },
    ],
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
    lyrics:
`De är tyst ner vid träsket
Spegelblankt och kallt
Kommer hem
Mitt i natten, utan svar

Vandrar ner, ner till vattnet
Medan dimman sveper in
Ekar storlommens skrik
Över sjön

Som sanden i min hand
Min tid den rinner ut
Hur skall man leva livet?
Vem tar mina beslut?

Som sanden i min hand
Lämnar något kvar?
När livet som vi lever
Rinner ut
Som sanden i min hand

Sitter kvar, ner vid stranden
I ett tidlöst andetag
Ovanför
Drar en satellit förbi

Känner doften av hösten
Som när natten blir till dag
Kan vi födas igen
I gryningen?

Som sanden i min hand
Min tid den rinner ut
Hur skall man leva livet?
Vem tar mina beslut?

Som sanden i min hand
Lämnar något kvar?
När livet som vi lever
Rinner ut
Som sanden i min hand

Hur skall man leva livet?
Vem tar mina beslut?
När livet som vi lever
Rinner ut

Som sanden i min hand`,
    lyricsTranslations: {
      en:
`It's quiet down by the marsh
Mirror-smooth and cold
Coming home
In the middle of the night, without an answer

Walking down, down to the water
As the mist rolls in
The cry of the loon echoes
Over the lake

Like the sand in my hand
My time is running out
How should one live life?
Who makes my decisions?

Like the sand in my hand
Does anything remain?
As the life we live
Runs out
Like the sand in my hand

Sitting still, down by the shore
In a timeless breath
Above
A satellite drifts by

Feeling the scent of autumn
Like when night turns to day
Can we be born again
At dawn?

Like the sand in my hand
My time is running out
How should one live life?
Who makes my decisions?

Like the sand in my hand
Does anything remain?
As the life we live
Runs out
Like the sand in my hand

How should one live life?
Who makes my decisions?
As the life we live
Runs out

Like the sand in my hand`,
      de:
`Es ist still unten am Moor
Spiegelglatt und kalt
Ich komme heim
Mitten in der Nacht, ohne Antwort

Ich gehe hinunter, hinunter zum Wasser
Während der Nebel hereinzieht
Der Ruf des Prachttauchers hallt
Über den See

Wie der Sand in meiner Hand
Meine Zeit rinnt dahin
Wie soll man das Leben leben?
Wer trifft meine Entscheidungen?

Wie der Sand in meiner Hand
Bleibt etwas zurück?
Wenn das Leben, das wir leben
Verrinnt
Wie der Sand in meiner Hand

Ich sitze noch da, unten am Ufer
In einem zeitlosen Atemzug
Darüber
Zieht ein Satellit vorbei

Ich rieche den Duft des Herbstes
Wie wenn die Nacht zum Tag wird
Können wir wieder geboren werden
In der Morgendämmerung?

Wie der Sand in meiner Hand
Meine Zeit rinnt dahin
Wie soll man das Leben leben?
Wer trifft meine Entscheidungen?

Wie der Sand in meiner Hand
Bleibt etwas zurück?
Wenn das Leben, das wir leben
Verrinnt
Wie der Sand in meiner Hand

Wie soll man das Leben leben?
Wer trifft meine Entscheidungen?
Wenn das Leben, das wir leben
Verrinnt

Wie der Sand in meiner Hand`,
      es:
`Todo está en silencio junto a la ciénaga
Lisa como un espejo y fría
Vuelvo a casa
En mitad de la noche, sin respuesta

Bajo caminando, bajo hasta el agua
Mientras la niebla lo envuelve todo
Resuena el grito del colimbo ártico
Sobre el lago

Como la arena en mi mano
Mi tiempo se acaba
¿Cómo se debe vivir la vida?
¿Quién toma mis decisiones?

Como la arena en mi mano
¿Queda algo?
Cuando la vida que vivimos
Se escurre
Como la arena en mi mano

Me quedo sentado, junto a la orilla
En un aliento atemporal
Arriba
Pasa un satélite

Siento el olor del otoño
Como cuando la noche se hace día
¿Podemos nacer de nuevo
En el amanecer?

Como la arena en mi mano
Mi tiempo se acaba
¿Cómo se debe vivir la vida?
¿Quién toma mis decisiones?

Como la arena en mi mano
¿Queda algo?
Cuando la vida que vivimos
Se escurre
Como la arena en mi mano

¿Cómo se debe vivir la vida?
¿Quién toma mis decisiones?
Cuando la vida que vivimos
Se escurre

Como la arena en mi mano`,
      fi:
`Hiljaista on alhaalla lammella
Peilikirkasta ja kylmää
Tulen kotiin
Keskellä yötä, ilman vastausta

Kävelen alas, alas veden luo
Kun sumu verhoaa kaiken
Kuikan huuto kaikuu
Järven yllä

Kuin hiekka kädessäni
Aikani valuu loppuun
Miten elämää pitäisi elää?
Kuka tekee päätökseni?

Kuin hiekka kädessäni
Jääkö jotain jäljelle?
Kun elämä jota elämme
Valuu loppuun
Kuin hiekka kädessäni

Istun yhä alhaalla rannalla
Ajattomassa hengenvedossa
Yläpuolella
Satelliitti lipuu ohi

Tunnen syksyn tuoksun
Kuin kun yö muuttuu päiväksi
Voimmeko syntyä uudelleen
Aamunkoitteessa?

Kuin hiekka kädessäni
Aikani valuu loppuun
Miten elämää pitäisi elää?
Kuka tekee päätökseni?

Kuin hiekka kädessäni
Jääkö jotain jäljelle?
Kun elämä jota elämme
Valuu loppuun
Kuin hiekka kädessäni

Miten elämää pitäisi elää?
Kuka tekee päätökseni?
Kun elämä jota elämme
Valuu loppuun

Kuin hiekka kädessäni`,
      it:
`È silenzio laggiù vicino alla palude
Liscia come uno specchio e fredda
Torno a casa
A notte fonda, senza risposta

Scendo camminando, giù fino all'acqua
Mentre la nebbia avvolge tutto
Echeggia il grido della strolaga
Sopra il lago

Come la sabbia nella mia mano
Il mio tempo scorre via
Come si deve vivere la vita?
Chi prende le mie decisioni?

Come la sabbia nella mia mano
Resta qualcosa?
Quando la vita che viviamo
Scorre via
Come la sabbia nella mia mano

Resto seduto, giù sulla riva
In un respiro senza tempo
Sopra
Passa un satellite

Sento il profumo dell'autunno
Come quando la notte diventa giorno
Possiamo nascere di nuovo
All'alba?

Come la sabbia nella mia mano
Il mio tempo scorre via
Come si deve vivere la vita?
Chi prende le mie decisioni?

Come la sabbia nella mia mano
Resta qualcosa?
Quando la vita che viviamo
Scorre via
Come la sabbia nella mia mano

Come si deve vivere la vita?
Chi prende le mie decisioni?
Quando la vita che viviamo
Scorre via

Come la sabbia nella mia mano`,
      fr:
`Tout est silencieux près du marais
Lisse comme un miroir et froid
Je rentre à la maison
En pleine nuit, sans réponse

Je descends, je descends vers l'eau
Tandis que la brume enveloppe tout
Le cri du plongeon arctique résonne
Sur le lac

Comme le sable dans ma main
Mon temps s'écoule
Comment faut-il vivre sa vie ?
Qui prend mes décisions ?

Comme le sable dans ma main
Reste-t-il quelque chose ?
Quand la vie que nous vivons
S'écoule
Comme le sable dans ma main

Je reste assis, en bas sur la rive
Dans un souffle intemporel
Au-dessus
Un satellite passe

Je sens l'odeur de l'automne
Comme quand la nuit devient jour
Pouvons-nous renaître
À l'aube ?

Comme le sable dans ma main
Mon temps s'écoule
Comment faut-il vivre sa vie ?
Qui prend mes décisions ?

Comme le sable dans ma main
Reste-t-il quelque chose ?
Quand la vie que nous vivons
S'écoule
Comme le sable dans ma main

Comment faut-il vivre sa vie ?
Qui prend mes décisions ?
Quand la vie que nous vivons
S'écoule

Comme le sable dans ma main`,
      pt:
`Está silencioso junto ao pântano
Liso como um espelho e frio
Volto para casa
No meio da noite, sem resposta

Desço a caminhar, desço até à água
Enquanto o nevoeiro envolve tudo
Ecoa o grito da mobelha-árctica
Sobre o lago

Como a areia na minha mão
O meu tempo escorre
Como se deve viver a vida?
Quem toma as minhas decisões?

Como a areia na minha mão
Fica alguma coisa?
Quando a vida que vivemos
Escorre
Como a areia na minha mão

Fico sentado, junto à margem
Num sopro intemporal
Por cima
Passa um satélite

Sinto o cheiro do outono
Como quando a noite se torna dia
Podemos nascer de novo
Ao amanhecer?

Como a areia na minha mão
O meu tempo escorre
Como se deve viver a vida?
Quem toma as minhas decisões?

Como a areia na minha mão
Fica alguma coisa?
Quando a vida que vivemos
Escorre
Como a areia na minha mão

Como se deve viver a vida?
Quem toma as minhas decisões?
Quando a vida que vivemos
Escorre

Como a areia na minha mão`,
    },
    credits: [
      { name: 'Erik Sjøholm',      role: 'Lyrics, lead vocals, backing vocals, acoustic guitar' },
      { name: 'Emil Nordström',    role: 'Lyrics, production, arrangement, mixing, electric and baritone guitar' },
      { name: 'Anders Sjölind',    role: 'Horn arrangements, trumpet, trombone, horn' },
      { name: 'Robin Käldström',   role: 'Saxophone, clarinet, flute' },
      { name: 'Johnny Nordström',  role: 'Piano' },
      { name: 'Tuukka Aitoaho',    role: 'Drums, percussion' },
      { name: 'Stefan Lindblom',   role: 'Bass' },
      { name: 'Stefan Backas',     role: 'Recording engineering' },
      { name: 'Maria Triana',      role: 'Mastering (Amsterdam)' },
    ],
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
    lyrics:
`Jag hämta Vasabladet, och knacka på din dörr
du satt och åt din morgongröt som vanligt
sen styrd vi stegen mot köpings
ibland genom skogen, bakom häcken, över krigsgravarna

När höstlöven föll över lönnsalens golv
då gick vi där och tänkte på
När vintersolen sken över snötäckta murar
då låg vi där och vifta änglar i snön

Längs med vägen

Du tog mig med till malax if och sa,
pass ti robban eller basti, och sen gjord ja självmål,
som back är man närmare sitt eget..
dom berätta nog sen,

att vi ska röra oss framåt, vi ska lyssna på varann
vi ska sikta mot tomrum och springa allt vi kan
vi kan vinna vad som helst,
om vi spelar tillsammans

Längs med vägen

Vi byggde borgar och slott, runtom Storms gårdsplan
de va sköldar och svärd, de va hjältar å drama,
vi försvara vårt hem, mot en svart fantasi

va finns då än att förklara, en helt enkel poesi
om att bara finnas till, om att leva som ett vi
att ja e lycklig här me dej, i alla stunder vi får dela

Längs med vägen
Längs med vägen`,
    lyricsTranslations: {
      en:
`I fetched the Vasabladet and knocked on your door
You sat eating your morning porridge as usual
Then we steered our steps toward the village centre
Sometimes through the forest, behind the hedge, over the war graves

When the autumn leaves fell over the floor of the maple grove
We walked there, thinking of
When the winter sun shone over snow-covered walls
We lay there making angels in the snow

Along the road

You took me along to Malax IF and said,
pass it to Robban or Basti, and then I scored an own goal,
as a defender you're closer to your own..
they probably told me afterwards,

that we should move forward, we should listen to each other
we should aim for the empty space and run as fast as we can
we can win anything,
if we play together

Along the road

We built castles and fortresses all around Storm's yard
They were shields and swords, they were heroes and drama,
we defended our home against a dark fantasy

What is there left to explain, just simple poetry
about simply being here, about living as one "we"
that I'm happy here with you, in every moment we get to share

Along the road
Along the road`,
      de:
`Ich holte das Vasabladet und klopfte an deine Tür
Du saßt da und aßt wie immer deinen Morgenbrei
Dann lenkten wir unsere Schritte zum Dorfzentrum
Manchmal durch den Wald, hinter der Hecke, über die Kriegsgräber

Wenn das Herbstlaub auf den Boden des Ahornhains fiel
Gingen wir dort und dachten an
Wenn die Wintersonne über schneebedeckte Mauern schien
Lagen wir dort und machten Engel im Schnee

Entlang des Weges

Du nahmst mich mit zu Malax IF und sagtest:
Spiel ab an Robban oder Basti, und dann schoss ich ein Eigentor,
als Verteidiger ist man dem eigenen näher..
Sie haben es mir wohl später erzählt,

dass wir vorwärts gehen sollen, dass wir einander zuhören sollen
dass wir auf die freie Fläche zielen und rennen, so schnell wir können
wir können alles gewinnen,
wenn wir zusammenspielen

Entlang des Weges

Wir bauten Burgen und Schlösser rund um Storms Hof
Es waren Schilde und Schwerter, es waren Helden und Drama,
wir verteidigten unser Zuhause gegen eine dunkle Fantasie

Was gibt es da noch zu erklären, einfach nur Poesie
darüber, einfach da zu sein, als ein Wir zu leben
dass ich hier mit dir glücklich bin, in allen Momenten, die wir teilen dürfen

Entlang des Weges
Entlang des Weges`,
      es:
`Fui a buscar el Vasabladet y llamé a tu puerta
Estabas sentado tomando tus gachas de la mañana, como siempre
Luego encaminamos nuestros pasos hacia el centro del pueblo
A veces por el bosque, detrás del seto, sobre las tumbas de guerra

Cuando las hojas de otoño caían sobre el suelo de la arboleda de arces
Íbamos por allí pensando en
Cuando el sol de invierno brillaba sobre los muros cubiertos de nieve
Nos tumbábamos allí haciendo ángeles en la nieve

A lo largo del camino

Me llevaste al Malax IF y dijiste:
pásasela a Robban o a Basti, y luego marqué un gol en propia puerta,
de defensa estás más cerca de la tuya..
probablemente me lo contaron después,

que debemos avanzar, debemos escucharnos
debemos apuntar al espacio vacío y correr todo lo que podamos
podemos ganar lo que sea,
si jugamos juntos

A lo largo del camino

Construíamos castillos y fortalezas alrededor del patio de los Storm
Eran escudos y espadas, eran héroes y drama,
defendíamos nuestro hogar contra una fantasía oscura

¿Qué queda por explicar? Simplemente poesía
sobre existir, sobre vivir como un nosotros
que soy feliz aquí contigo, en todos los momentos que podemos compartir

A lo largo del camino
A lo largo del camino`,
      fi:
`Haen Vasabladetin ja koputin ovellesi
Istuit syömässä aamupuuroasi kuten aina
Sitten suuntasimme askeleemme kohti kylän keskustaa
Välillä metsän halki, pensasaidan takaa, sankarihautojen yli

Kun syyslehdet putosivat vaahterametsikön lattialle
Silloin kuljimme siellä ja ajattelimme
Kun talviaurinko paistoi lumipeitteisten muurien yllä
Silloin makasimme siellä tekemässä lumienkeleitä

Tietä pitkin

Otit minut mukaan Malax IF:iin ja sanoit:
syötä Robbanille tai Bastille, ja sitten tein omaan maaliin,
puolustajana on lähempänä omaansa..
he kertoivat sen kai myöhemmin,

että meidän pitää edetä, meidän pitää kuunnella toisiamme
meidän pitää tähdätä tyhjään tilaan ja juosta minkä ehdimme
voimme voittaa mitä tahansa,
jos pelaamme yhdessä

Tietä pitkin

Rakensimme linnoja ja kartanoita Stormin pihan ympärille
Ne olivat kilpiä ja miekkoja, ne olivat sankareita ja draamaa,
puolustimme kotiamme mustaa mielikuvitusta vastaan

Mitä sitä sitten on selitettävää, aivan yksinkertaista runoutta
pelkästä olemassaolosta, elämisestä yhtenä me
että olen onnellinen täällä kanssasi, kaikissa hetkissä jotka saamme jakaa

Tietä pitkin
Tietä pitkin`,
      it:
`Prendevo il Vasabladet e bussavo alla tua porta
Eri seduto a mangiare il tuo porridge del mattino, come al solito
Poi dirigevamo i nostri passi verso il centro del paese
A volte attraverso il bosco, dietro la siepe, sopra le tombe di guerra

Quando le foglie d'autunno cadevano sul pavimento del bosco di aceri
Camminavamo lì pensando a
Quando il sole d'inverno splendeva sui muri coperti di neve
Ci stendevamo lì a fare angeli nella neve

Lungo la strada

Mi portasti con te al Malax IF e dicesti:
passa a Robban o a Basti, e poi feci autogol,
da difensore sei più vicino al tuo..
me l'avranno raccontato dopo,

che dobbiamo andare avanti, dobbiamo ascoltarci
dobbiamo puntare allo spazio vuoto e correre più che possiamo
possiamo vincere qualsiasi cosa,
se giochiamo insieme

Lungo la strada

Costruivamo castelli e fortezze intorno al cortile degli Storm
Erano scudi e spade, erano eroi e dramma,
difendevamo la nostra casa da una nera fantasia

Cosa c'è ancora da spiegare, semplicemente poesia
sull'esserci e basta, sul vivere come un noi
che sono felice qui con te, in tutti i momenti che possiamo condividere

Lungo la strada
Lungo la strada`,
      fr:
`J'allais chercher le Vasabladet et je frappais à ta porte
Tu étais assis à manger ta bouillie du matin, comme d'habitude
Puis nous dirigions nos pas vers le centre du village
Parfois à travers la forêt, derrière la haie, par-dessus les tombes de guerre

Quand les feuilles d'automne tombaient sur le sol du bois d'érables
Nous marchions là en pensant à
Quand le soleil d'hiver brillait sur les murs couverts de neige
Nous nous allongions là à faire des anges dans la neige

Le long du chemin

Tu m'as emmené au Malax IF et tu as dit :
passe à Robban ou à Basti, et puis j'ai marqué contre mon camp,
en défenseur, on est plus près du sien..
ils me l'ont sans doute raconté plus tard,

que nous devons avancer, que nous devons nous écouter
que nous devons viser l'espace libre et courir aussi vite que nous pouvons
nous pouvons gagner n'importe quoi,
si nous jouons ensemble

Le long du chemin

Nous construisions des châteaux et des forteresses autour de la cour des Storm
C'étaient des boucliers et des épées, c'étaient des héros et du drame,
nous défendions notre foyer contre une sombre fantaisie

Que reste-t-il à expliquer, simplement de la poésie
sur le fait d'être là, de vivre comme un nous
que je suis heureux ici avec toi, dans tous les moments que nous pouvons partager

Le long du chemin
Le long du chemin`,
      pt:
`Ia buscar o Vasabladet e batia à tua porta
Estavas sentado a comer as tuas papas da manhã, como sempre
Depois encaminhávamos os nossos passos para o centro da aldeia
Às vezes pela floresta, atrás da sebe, por cima dos túmulos de guerra

Quando as folhas de outono caíam no chão do bosque de bordos
Passeávamos por ali a pensar em
Quando o sol de inverno brilhava sobre os muros cobertos de neve
Deitávamo-nos ali a fazer anjos na neve

Ao longo do caminho

Levaste-me contigo ao Malax IF e disseste:
passa ao Robban ou ao Basti, e depois marquei um autogolo,
como defesa estamos mais perto do nosso..
devem ter-me contado depois,

que devemos avançar, devemos ouvir-nos uns aos outros
devemos apontar ao espaço vazio e correr o mais que pudermos
podemos ganhar seja o que for,
se jogarmos juntos

Ao longo do caminho

Construíamos castelos e fortalezas à volta do pátio dos Storm
Eram escudos e espadas, eram heróis e drama,
defendíamos a nossa casa contra uma fantasia sombria

O que há ainda para explicar, simplesmente poesia
sobre existir, sobre viver como um nós
que estou feliz aqui contigo, em todos os momentos que podemos partilhar

Ao longo do caminho
Ao longo do caminho`,
    },
    credits: [
      { name: 'Erik Sjøholm',      role: 'Lyrics, lead vocals, backing vocals, acoustic guitar' },
      { name: 'Emil Nordström',    role: 'Lyrics, production, arrangement, mixing, electric guitar' },
      { name: 'Johnny Nordström',  role: 'Electric piano, organ' },
      { name: 'Tuukka Aitoaho',    role: 'Drums, percussion' },
      { name: 'Stefan Lindblom',   role: 'Bass' },
      { name: 'Stefan Backas',     role: 'Recording engineering' },
      { name: 'Maria Triana',      role: 'Mastering (Amsterdam)' },
    ],
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
    lyrics:
`Boka en biljett
Låt oss ta en liten tur
Ut mot öppna horisonter
Jag har ett äventyr på lur

Vi kan flyga till Nepal
Korsa Ryssland med ett tåg
Åka båt i Nya Zeeland
Flyga högt och dyka lågt

Fri som en fågel
Fri som en vind
Här ut i världen
Är jag fri, fri
Fri som en fågel

Hoppa in i min kajak
Vi kan paddla höga kusten
Längta bort till höga berg
Jag känner alltid vandrings lusten

Bestiga Kilimanjaros topp
Pusta ut i Zansibar
Ta ett dopp i medelhavet
De finns så många resmål kvar

Fri som en fågel
Fri som en vind
Här ut i världen
Är jag fri, här är jag fri
Fri som en fågel

En resa jorden runt
Mitt sinne är ännu ungt
Jag ska resa jorden runt före jag
Tar mitt sista andetag

Fri som en fågel
Fri som en vind
Här ut i världen
Är jag fri, här är jag fri
Fri som en fågel`,
    lyricsTranslations: {
      en:
`Book a ticket
Let's take a little trip
Out toward open horizons
I've got an adventure lined up

We can fly to Nepal
Cross Russia by train
Take a boat in New Zealand
Fly high and dive deep

Free as a bird
Free as the wind
Out here in the world
I am free, free
Free as a bird

Jump into my kayak
We can paddle the High Coast
Long for the high mountains
I always feel the urge to hike

Climb to the top of Kilimanjaro
Catch my breath in Zanzibar
Take a dip in the Mediterranean
There are so many destinations left

Free as a bird
Free as the wind
Out here in the world
I am free, here I am free
Free as a bird

A journey around the world
My mind is still young
I'm going to travel around the world before I
Take my last breath

Free as a bird
Free as the wind
Out here in the world
I am free, here I am free
Free as a bird`,
      de:
`Buch ein Ticket
Lass uns einen kleinen Ausflug machen
Hinaus zu offenen Horizonten
Ich habe ein Abenteuer in petto

Wir können nach Nepal fliegen
Russland mit dem Zug durchqueren
In Neuseeland Boot fahren
Hoch fliegen und tief tauchen

Frei wie ein Vogel
Frei wie der Wind
Hier draußen in der Welt
Bin ich frei, frei
Frei wie ein Vogel

Spring in mein Kajak
Wir können die Höga Kusten entlangpaddeln
Sehnsucht nach den hohen Bergen
Ich spüre immer die Wanderlust

Den Gipfel des Kilimandscharo besteigen
In Sansibar durchatmen
Ein Bad im Mittelmeer nehmen
Es gibt noch so viele Reiseziele

Frei wie ein Vogel
Frei wie der Wind
Hier draußen in der Welt
Bin ich frei, hier bin ich frei
Frei wie ein Vogel

Eine Reise um die Welt
Mein Geist ist noch jung
Ich werde um die Welt reisen, bevor ich
Meinen letzten Atemzug tue

Frei wie ein Vogel
Frei wie der Wind
Hier draußen in der Welt
Bin ich frei, hier bin ich frei
Frei wie ein Vogel`,
      es:
`Reserva un billete
Hagamos un pequeño viaje
Hacia horizontes abiertos
Tengo una aventura preparada

Podemos volar a Nepal
Cruzar Rusia en tren
Navegar en barco por Nueva Zelanda
Volar alto y bucear a fondo

Libre como un pájaro
Libre como el viento
Aquí fuera, en el mundo
Soy libre, libre
Libre como un pájaro

Sube a mi kayak
Podemos remar por la Costa Alta
Anhelar las altas montañas
Siempre siento las ganas de caminar

Subir a la cima del Kilimanjaro
Recobrar el aliento en Zanzíbar
Darse un chapuzón en el Mediterráneo
Quedan tantos destinos

Libre como un pájaro
Libre como el viento
Aquí fuera, en el mundo
Soy libre, aquí soy libre
Libre como un pájaro

Un viaje alrededor del mundo
Mi mente aún es joven
Voy a viajar alrededor del mundo antes de
Dar mi último aliento

Libre como un pájaro
Libre como el viento
Aquí fuera, en el mundo
Soy libre, aquí soy libre
Libre como un pájaro`,
      fi:
`Varaa lippu
Tehdään pieni matka
Kohti avoimia horisontteja
Minulla on seikkailu tiedossa

Voimme lentää Nepaliin
Ylittää Venäjän junalla
Matkustaa veneellä Uudessa-Seelannissa
Lentää korkealle ja sukeltaa syvälle

Vapaa kuin lintu
Vapaa kuin tuuli
Täällä maailmalla
Olen vapaa, vapaa
Vapaa kuin lintu

Hyppää kajakkiini
Voimme meloa Korkean rannikon
Kaivata korkeille vuorille
Tunnen aina vaellushalun

Kiivetä Kilimanjaron huipulle
Huokaista Sansibarissa
Pulahtaa Välimereen
Niin monta matkakohdetta on vielä jäljellä

Vapaa kuin lintu
Vapaa kuin tuuli
Täällä maailmalla
Olen vapaa, täällä olen vapaa
Vapaa kuin lintu

Matka maailman ympäri
Mieleni on vielä nuori
Aion matkustaa maailman ympäri ennen kuin
Vedän viimeisen hengenvetoni

Vapaa kuin lintu
Vapaa kuin tuuli
Täällä maailmalla
Olen vapaa, täällä olen vapaa
Vapaa kuin lintu`,
      it:
`Prenota un biglietto
Facciamo un piccolo viaggio
Verso orizzonti aperti
Ho un'avventura in serbo

Possiamo volare in Nepal
Attraversare la Russia in treno
Andare in barca in Nuova Zelanda
Volare alto e immergerci in profondità

Libero come un uccello
Libero come il vento
Qui fuori nel mondo
Sono libero, libero
Libero come un uccello

Salta nel mio kayak
Possiamo pagaiare lungo l'Alta Costa
Desiderare le alte montagne
Sento sempre la voglia di camminare

Scalare la vetta del Kilimangiaro
Riprendere fiato a Zanzibar
Fare un tuffo nel Mediterraneo
Ci sono ancora così tante mete

Libero come un uccello
Libero come il vento
Qui fuori nel mondo
Sono libero, qui sono libero
Libero come un uccello

Un viaggio intorno al mondo
La mia mente è ancora giovane
Viaggerò intorno al mondo prima di
Prendere il mio ultimo respiro

Libero come un uccello
Libero come il vento
Qui fuori nel mondo
Sono libero, qui sono libero
Libero come un uccello`,
      fr:
`Réserve un billet
Faisons un petit voyage
Vers des horizons ouverts
J'ai une aventure en réserve

On peut s'envoler pour le Népal
Traverser la Russie en train
Naviguer en bateau en Nouvelle-Zélande
Voler haut et plonger profond

Libre comme un oiseau
Libre comme le vent
Ici, dans le monde
Je suis libre, libre
Libre comme un oiseau

Saute dans mon kayak
On peut pagayer le long de la Côte Haute
Rêver de hautes montagnes
J'ai toujours envie de marcher

Gravir le sommet du Kilimandjaro
Reprendre son souffle à Zanzibar
Faire trempette en Méditerranée
Il reste tant de destinations

Libre comme un oiseau
Libre comme le vent
Ici, dans le monde
Je suis libre, ici je suis libre
Libre comme un oiseau

Un voyage autour du monde
Mon esprit est encore jeune
Je ferai le tour du monde avant de
Prendre mon dernier souffle

Libre comme un oiseau
Libre comme le vent
Ici, dans le monde
Je suis libre, ici je suis libre
Libre comme un oiseau`,
      pt:
`Reserva um bilhete
Vamos fazer uma pequena viagem
Rumo a horizontes abertos
Tenho uma aventura guardada

Podemos voar para o Nepal
Atravessar a Rússia de comboio
Andar de barco na Nova Zelândia
Voar alto e mergulhar fundo

Livre como um pássaro
Livre como o vento
Cá fora, no mundo
Sou livre, livre
Livre como um pássaro

Salta para o meu caiaque
Podemos remar pela Costa Alta
Ter saudades das montanhas altas
Sinto sempre o desejo de caminhar

Subir ao cume do Kilimanjaro
Recuperar o fôlego em Zanzibar
Dar um mergulho no Mediterrâneo
Ainda há tantos destinos

Livre como um pássaro
Livre como o vento
Cá fora, no mundo
Sou livre, aqui sou livre
Livre como um pássaro

Uma viagem à volta do mundo
A minha mente ainda é jovem
Vou viajar à volta do mundo antes de
Dar o meu último suspiro

Livre como um pássaro
Livre como o vento
Cá fora, no mundo
Sou livre, aqui sou livre
Livre como um pássaro`,
    },
    credits: [
      { name: 'Erik Sjøholm',      role: 'Lyrics, lead vocals, backing vocals, acoustic guitar' },
      { name: 'Emil Nordström',    role: 'Lyrics, production, arrangement, mixing, electric guitar' },
      { name: 'Anders Sjölind',    role: 'Horn arrangements, trumpet' },
      { name: 'Robin Käldström',   role: 'Saxophone (including solo)' },
      { name: 'Johnny Nordström',  role: 'Electric piano, synthesizer, organ' },
      { name: 'Tuukka Aitoaho',    role: 'Drums, percussion' },
      { name: 'Stefan Lindblom',   role: 'Bass' },
      { name: 'Stefan Backas',     role: 'Recording engineering' },
      { name: 'Maria Triana',      role: 'Mastering (Amsterdam)' },
    ],
    description:   'About Erik\'s mother, for whom travel is freedom — kayak, hiking, train, bus, flight, bike, staying in motion by any means she can.',
  },
  {
    id:            'stanna',
    slug:          'stanna',
    title:         'Stanna',
    workType:      'collaboration',
    year:          2026,
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          '2026 · with Emil Nordström · Swedish',
    album:         'langs-med-vagen-album',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02260f62f2a1fc9602fa2d662c',
    spotifyUrl:    'https://open.spotify.com/track/6BYAYynES64GQgdBpHXvii',
    tidalUrl:      tidalSearch('Stanna Sjøholm Nordström'),
    description:   'A Swedish-language single from the album Längs med vägen, written and composed by Erik Sjøholm and Emil Nordström. It asks what stays when people and time change: "Om du kunde stanna, om vi kunde stanna kvar."',
    credits: [
      { name: 'Erik Sjøholm',     role: 'Words and music, lead vocals, backing vocals' },
      { name: 'Emil Nordström',   role: 'Words and music, production, arrangement, mixing, guitars' },
      { name: 'Johnny Nordström', role: 'Electric piano and synthesizer' },
      { name: 'Tuukka Aitoaho',   role: 'Drums' },
      { name: 'Stefan Lindblom',  role: 'Bass' },
      { name: 'Stefan Backas',    role: 'Recording engineering' },
      { name: 'Maria Triana',     role: 'Mastering (Amsterdam)' },
    ],
    lyrics:
`Håll om mig hårt du
Medan jag finns här
Håll om mig hårt du
Om du har mig kär
Kommer du vara där för mig?
Fastän jag förändras
Med tiderna, med tiderna

Du går ifrån mig
Fast jag inte vill
Klart jag förstår dig
Det är så som det går till
Alla ska förändras
Med tiderna, med tiderna

Om du kunde stanna
Om vi kunde stanna kvar
För evigt som en stenstaty i stan

Vad är det som stannar?
Vad är det som stannar kvar?
Ett minne blott av allting som vi var
Är det allt som vi har?

Att släppa taget
Våga svara ja
Minns ännu dagen
Orden som du sa
Kommer du ihåg mig?
Fastän vi förändrats

Om du kunde stanna
Om vi kunde stanna kvar
För evigt som en stenstaty i stan

Vad är det som stannar?
Vad är det som stannar kvar?
Ett minne blott av allting som vi var
Är det allt som vi har?`,
    lyricsTranslations: {
      en:
`Hold me tight, you
While I'm still here
Hold me tight, you
If you hold me dear
Will you be there for me?
Even as I change
With the times, with the times

You're walking away from me
Though I don't want you to
Of course I understand you
That's just how it goes
Everyone changes
With the times, with the times

If you could stay
If we could stay
Forever, like a stone statue in town

What is it that stays?
What is it that remains?
Only a memory of all that we were
Is that all we have?

Letting go
Daring to say yes
I still remember the day
The words you said
Will you remember me?
Even though we've changed

If you could stay
If we could stay
Forever, like a stone statue in town

What is it that stays?
What is it that remains?
Only a memory of all that we were
Is that all we have?`,
      de:
`Halt mich fest, du
Solange ich noch hier bin
Halt mich fest, du
Wenn du mich lieb hast
Wirst du für mich da sein?
Auch wenn ich mich verändere
Mit der Zeit, mit der Zeit

Du gehst von mir fort
Obwohl ich es nicht will
Natürlich verstehe ich dich
So ist es eben
Alle verändern sich
Mit der Zeit, mit der Zeit

Wenn du bleiben könntest
Wenn wir bleiben könnten
Für immer, wie eine Steinstatue in der Stadt

Was bleibt?
Was bleibt zurück?
Nur eine Erinnerung an alles, was wir waren
Ist das alles, was wir haben?

Loszulassen
Den Mut zu haben, Ja zu sagen
Ich erinnere mich noch an den Tag
An die Worte, die du sagtest
Erinnerst du dich an mich?
Auch wenn wir uns verändert haben

Wenn du bleiben könntest
Wenn wir bleiben könnten
Für immer, wie eine Steinstatue in der Stadt

Was bleibt?
Was bleibt zurück?
Nur eine Erinnerung an alles, was wir waren
Ist das alles, was wir haben?`,
      es:
`Abrázame fuerte, tú
Mientras siga aquí
Abrázame fuerte, tú
Si me tienes cariño
¿Estarás ahí para mí?
Aunque yo cambie
Con el tiempo, con el tiempo

Te alejas de mí
Aunque yo no quiero
Claro que te entiendo
Así es como son las cosas
Todos cambiamos
Con el tiempo, con el tiempo

Si pudieras quedarte
Si pudiéramos quedarnos
Para siempre, como una estatua de piedra en la ciudad

¿Qué es lo que permanece?
¿Qué es lo que se queda?
Solo un recuerdo de todo lo que fuimos
¿Es eso todo lo que tenemos?

Soltar
Atreverse a decir que sí
Aún recuerdo el día
Las palabras que dijiste
¿Te acuerdas de mí?
Aunque hayamos cambiado

Si pudieras quedarte
Si pudiéramos quedarnos
Para siempre, como una estatua de piedra en la ciudad

¿Qué es lo que permanece?
¿Qué es lo que se queda?
Solo un recuerdo de todo lo que fuimos
¿Es eso todo lo que tenemos?`,
      fi:
`Halaa minua lujaa, sinä
Niin kauan kuin olen täällä
Halaa minua lujaa, sinä
Jos pidät minusta
Oletko siellä minua varten?
Vaikka minä muutun
Ajan myötä, ajan myötä

Sinä lähdet luotani
Vaikka en haluaisi
Totta kai ymmärrän sinua
Niin se vain menee
Kaikki muuttuvat
Ajan myötä, ajan myötä

Jos voisit jäädä
Jos voisimme jäädä
Ikuisesti kuin kivipatsas kaupungissa

Mikä jää?
Mikä jää jäljelle?
Vain muisto kaikesta mitä olimme
Onko se kaikki mitä meillä on?

Irti päästäminen
Uskaltaa vastata kyllä
Muistan vielä sen päivän
Sanat jotka sanoit
Muistatko minut?
Vaikka olemme muuttuneet

Jos voisit jäädä
Jos voisimme jäädä
Ikuisesti kuin kivipatsas kaupungissa

Mikä jää?
Mikä jää jäljelle?
Vain muisto kaikesta mitä olimme
Onko se kaikki mitä meillä on?`,
      it:
`Stringimi forte, tu
Finché sono qui
Stringimi forte, tu
Se mi vuoi bene
Ci sarai per me?
Anche se cambio
Con il tempo, con il tempo

Te ne vai da me
Anche se non voglio
Certo che ti capisco
È così che va
Tutti cambiamo
Con il tempo, con il tempo

Se tu potessi restare
Se potessimo restare
Per sempre, come una statua di pietra in città

Cosa resta?
Cosa rimane?
Solo un ricordo di tutto ciò che eravamo
È tutto ciò che abbiamo?

Lasciar andare
Osare dire sì
Ricordo ancora il giorno
Le parole che dicesti
Ti ricordi di me?
Anche se siamo cambiati

Se tu potessi restare
Se potessimo restare
Per sempre, come una statua di pietra in città

Cosa resta?
Cosa rimane?
Solo un ricordo di tutto ciò che eravamo
È tutto ciò che abbiamo?`,
      fr:
`Serre-moi fort, toi
Tant que je suis encore là
Serre-moi fort, toi
Si tu tiens à moi
Seras-tu là pour moi ?
Même si je change
Avec le temps, avec le temps

Tu t'éloignes de moi
Alors que je ne le veux pas
Bien sûr, je te comprends
C'est ainsi que les choses se passent
Tout le monde change
Avec le temps, avec le temps

Si tu pouvais rester
Si nous pouvions rester
Pour toujours, comme une statue de pierre en ville

Qu'est-ce qui reste ?
Qu'est-ce qui demeure ?
Seulement un souvenir de tout ce que nous étions
Est-ce tout ce que nous avons ?

Lâcher prise
Oser répondre oui
Je me souviens encore du jour
Des mots que tu as dits
Te souviens-tu de moi ?
Même si nous avons changé

Si tu pouvais rester
Si nous pouvions rester
Pour toujours, comme une statue de pierre en ville

Qu'est-ce qui reste ?
Qu'est-ce qui demeure ?
Seulement un souvenir de tout ce que nous étions
Est-ce tout ce que nous avons ?`,
      pt:
`Abraça-me com força, tu
Enquanto ainda estou aqui
Abraça-me com força, tu
Se gostas de mim
Estarás lá por mim?
Mesmo que eu mude
Com o tempo, com o tempo

Afastas-te de mim
Mesmo que eu não queira
Claro que te compreendo
É assim que as coisas são
Todos mudamos
Com o tempo, com o tempo

Se pudesses ficar
Se pudéssemos ficar
Para sempre, como uma estátua de pedra na cidade

O que é que fica?
O que é que permanece?
Apenas uma memória de tudo o que fomos
Será tudo o que temos?

Largar
Ter coragem de dizer sim
Ainda me lembro do dia
Das palavras que disseste
Lembras-te de mim?
Mesmo que tenhamos mudado

Se pudesses ficar
Se pudéssemos ficar
Para sempre, como uma estátua de pedra na cidade

O que é que fica?
O que é que permanece?
Apenas uma memória de tudo o que fomos
Será tudo o que temos?`,
    },
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
      'stanna',
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
