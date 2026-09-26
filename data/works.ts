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
  lyricsTranslations?: Partial<Record<'en' | 'de' | 'es' | 'sv' | 'fi', string>>;
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
I’d like to write a song like John Lennon’s
I’d like to speak like Martin Luther King
so much we’d do for love, so much we’d do to be remembered

Shine like the midnight sun
and hold up a light in the dark
I’ll give my love for the lonely
I’ll give my love for the only thing I wanna give my attention to
is to make your heart beat twice`,
    lyricsTranslations: {
      de:
`Ich möchte über die Gesellschaft sprechen
Ich möchte über Frieden sprechen
Ich möchte über die Menschlichkeit sprechen
so viel würden wir für die Liebe tun, so viel, um in Erinnerung zu bleiben

Leuchte wie die Mitternachtssonne
und halte ein Licht in die Dunkelheit
Ich schenke meine Liebe den Einsamen
Ich schenke meine Liebe, denn das Einzige, dem ich meine Aufmerksamkeit schenken will,
ist, dein Herz doppelt schlagen zu lassen

Ich möchte aufstehen wie Mandela
Ich möchte einen Song schreiben wie John Lennon
Ich möchte sprechen wie Martin Luther King
so viel würden wir für die Liebe tun, so viel, um in Erinnerung zu bleiben

Leuchte wie die Mitternachtssonne
und halte ein Licht in die Dunkelheit
Ich schenke meine Liebe den Einsamen
Ich schenke meine Liebe, denn das Einzige, dem ich meine Aufmerksamkeit schenken will,
ist, dein Herz doppelt schlagen zu lassen`,
      es:
`Me gustaría hablar de la sociedad
Me gustaría hablar de la paz
Me gustaría hablar de la humanidad
tanto haríamos por amor, tanto haríamos por ser recordados

Brilla como el sol de medianoche
y sostén una luz en la oscuridad
Daré mi amor a los solitarios
Daré mi amor, porque lo único a lo que quiero dedicar mi atención
es a hacer que tu corazón lata dos veces

Me gustaría levantarme como Mandela
Me gustaría escribir una canción como John Lennon
Me gustaría hablar como Martin Luther King
tanto haríamos por amor, tanto haríamos por ser recordados

Brilla como el sol de medianoche
y sostén una luz en la oscuridad
Daré mi amor a los solitarios
Daré mi amor, porque lo único a lo que quiero dedicar mi atención
es a hacer que tu corazón lata dos veces`,
      fi:
`Haluaisin puhua yhteiskunnasta
Haluaisin puhua rauhasta
Haluaisin puhua ihmisyydestä
niin paljon tekisimme rakkauden vuoksi, niin paljon tekisimme tullaksemme muistetuiksi

Loista kuin keskiyön aurinko
ja kohota valo pimeyteen
Annan rakkauteni yksinäisille
Annan rakkauteni, sillä ainoa asia, johon haluan kohdistaa huomioni,
on saada sydämesi lyömään kahdesti

Haluaisin nousta seisomaan kuten Mandela
Haluaisin kirjoittaa laulun kuten John Lennon
Haluaisin puhua kuten Martin Luther King
niin paljon tekisimme rakkauden vuoksi, niin paljon tekisimme tullaksemme muistetuiksi

Loista kuin keskiyön aurinko
ja kohota valo pimeyteen
Annan rakkauteni yksinäisille
Annan rakkauteni, sillä ainoa asia, johon haluan kohdistaa huomioni,
on saada sydämesi lyömään kahdesti`,
      sv:
`Jag vill prata om samhället
Jag vill prata om fred
Jag vill prata om mänskligheten
så mycket vi skulle göra för kärlek, så mycket vi skulle göra för att bli ihågkomna

Lys som midnattssolen
och håll upp ett ljus i mörkret
Jag ger min kärlek åt de ensamma
Jag ger min kärlek åt det enda jag vill ägna min uppmärksamhet åt
nämligen att få ditt hjärta att slå två gånger

Jag vill stå upp som Mandela
Jag vill skriva en sång som John Lennon
Jag vill tala som Martin Luther King
så mycket vi skulle göra för kärlek, så mycket vi skulle göra för att bli ihågkomna

Lys som midnattssolen
och håll upp ett ljus i mörkret
Jag ger min kärlek åt de ensamma
Jag ger min kärlek åt det enda jag vill ägna min uppmärksamhet åt
nämligen att få ditt hjärta att slå två gånger`,
    },
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
    lyricsTranslations: {
      de:
`Zwei folgen dem Einen
Und du folgst der Waffe

Gedanken füllen unsere Köpfe
Der Verstand dreht durch
Halte ein Bild fest
Wenn du außer Kontrolle bist
Einen Moment beobachtend

Und wenn nichts mehr einen Sinn ergibt
Setz einfach ein Lächeln auf

Finde einen Schlüssel zur Erleichterung
Wenn die Zeit ihn aussperrt
Verlangsame eine Bewegung
Fang das Spiegelbild der Vergangenheit ein
Auf der Suche nach einer wahren Linie

Und wenn sonst nichts mehr einen Sinn ergibt
Überhaupt nichts
Setz einfach ein Lächeln auf

Sieh dich um
Alles ist gut
Was ist gerade falsch
Alles ist gut

Zwei folgen dem Einen
Und du folgst der Waffe`,
      es:
`Dos siguen al uno
Y tú sigues al arma

Los pensamientos llenan nuestras cabezas
Las mentes se vuelven locas
Captura una imagen
Cuando estás fuera de control
Observando un instante

Y cuando nada tiene sentido
Simplemente ponte una sonrisa

Encuentra una llave hacia el alivio
Cuando el tiempo la deja fuera
Ralentiza un movimiento
Atrapa el reflejo del pasado
Buscando una línea verdadera

Y cuando nada más tiene sentido
En absoluto
Simplemente ponte una sonrisa

Mira a tu alrededor
Todo está bien
Qué pasa ahora mismo
Todo está bien

Dos siguen al uno
Y tú sigues al arma`,
      fi:
`Kaksi seuraa yhtä
Ja sinä seuraat asetta

Ajatukset täyttävät päämme
Mielet menevät sekaisin
Vangitse kuva
Kun olet hallinnan ulottumattomissa
Katsoen hetkeä

Ja kun mikään ei ole järkevää
Pane vain hymy huulillesi

Etsi avain helpotukseen
Kun aika sulkee sen ulos
Hidasta liikettä
Tavoita menneen heijastus
Etsien todellista linjaa

Ja kun mikään muukaan ei ole järkevää
Ollenkaan
Pane vain hymy huulillesi

Katso ympärillesi
Kaikki on hyvin
Mikä nyt on vialla
Kaikki on hyvin

Kaksi seuraa yhtä
Ja sinä seuraat asetta`,
      sv:
`Två följer den ene
Och du följer geväret

Tankar fyller våra huvuden
Sinnena blir galna
Fånga en bild
När du är utom kontroll
Betrakta ett ögonblick

Och när ingenting ger någon mening
Sätt bara på dig ett leende

Hitta en nyckel till lättnad
När tiden stänger ute det
Sakta ner en rörelse
Fånga spegelbilden av det förflutna
Sök en sann linje

Och när ingenting annat ger någon mening
Alls
Sätt bara på dig ett leende

Se dig omkring
Allt är bra
Vad är fel just nu
Allt är bra

Två följer den ene
Och du följer geväret`,
    },
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
    lyricsTranslations: {
      de:
`Ich habe zugesehen, wie die Sonne untergeht, unten im Meer
Ich habe dir gesagt, wir müssen frei sein, wir müssen frei sein
die Leute sagen, wir müssen Hoffnung haben, du musst Hoffnung haben
Ich habe einen Lichtstrahl über meinem Kopf auf meinem Weg nach Hause

Ich habe einen Lichtstrahl über meinem Kopf auf meinem Weg nach Hause heute Nacht
ein Lichtstrahl über meinem Kopf auf meinem Weg nach Hause
Ich habe einen Lichtstrahl über meinem Kopf auf meinem Weg nach Hause heute Nacht
ein Lichtstrahl über meinem Kopf auf meinem Weg nach Hause

und so lauschen wir dem Klang der Meereswellen, die das Ufer auffressen
ja, wir lauschen dem Atem des Friedens, der alles umgibt
wir brauchen einen Schleifstein, um unseren perfekten Wahnsinn zu schärfen
und so lauschen wir dem Klang der Wirklichkeit, um den Weg zu erhellen

Ich habe einen Lichtstrahl über meinem Kopf auf meinem Weg nach Hause heute Nacht
ein Lichtstrahl über meinem Kopf auf meinem Weg nach Hause
Ich habe einen Lichtstrahl über meinem Kopf auf meinem Weg nach Hause heute Nacht
ein Lichtstrahl über meinem Kopf auf meinem Weg nach Hause`,
      es:
`He estado viendo cómo el sol se pone, allá en el mar
Te he estado diciendo que tenemos que ser libres, tenemos que ser libres
la gente dice que tenemos que tener esperanza, tienes que tener esperanza
Tengo un rayo de luz sobre mi cabeza de camino a casa

Tengo un rayo de luz sobre mi cabeza de camino a casa esta noche
un rayo de luz sobre mi cabeza de camino a casa
Tengo un rayo de luz sobre mi cabeza de camino a casa esta noche
un rayo de luz sobre mi cabeza de camino a casa

y así escuchamos el sonido de las olas del océano devorando la orilla
sí, escuchamos la respiración de la paz que lo envuelve todo
necesitamos una piedra de afilar para pulir nuestra perfecta locura
y así escuchamos el sonido de la realidad para iluminar el camino

Tengo un rayo de luz sobre mi cabeza de camino a casa esta noche
un rayo de luz sobre mi cabeza de camino a casa
Tengo un rayo de luz sobre mi cabeza de camino a casa esta noche
un rayo de luz sobre mi cabeza de camino a casa`,
      fi:
`Olen katsonut auringon laskevan, alas mereen
Olen sanonut sinulle, että meidän täytyy olla vapaita, meidän täytyy olla vapaita
ihmiset sanovat, että meillä täytyy olla toivoa, sinulla täytyy olla toivoa
Minulla on valonsäde pääni päällä matkalla kotiin

Minulla on valonsäde pääni päällä matkalla kotiin tänä yönä
valonsäde pääni päällä matkalla kotiin
Minulla on valonsäde pääni päällä matkalla kotiin tänä yönä
valonsäde pääni päällä matkalla kotiin

ja niin kuuntelemme meren aaltojen ääntä, jotka syövät rantaa
niin, kuuntelemme rauhan hengitystä, joka ympäröi kaiken
tarvitsemme hiomakiven teroittamaan täydellisen hulluutemme
ja niin kuuntelemme todellisuuden ääntä valaistaksemme tien

Minulla on valonsäde pääni päällä matkalla kotiin tänä yönä
valonsäde pääni päällä matkalla kotiin
Minulla on valonsäde pääni päällä matkalla kotiin tänä yönä
valonsäde pääni päällä matkalla kotiin`,
      sv:
`Jag har suttit och sett solen gå ner, ner i havet
Jag har sagt till dig att vi måste vara fria, vi måste vara fria
folk säger att vi måste ha hopp, du måste ha hopp
Jag har en ljusstråle över mitt huvud på väg hem

Jag har en ljusstråle över mitt huvud på väg hem i natt
en ljusstråle över mitt huvud på väg hem
Jag har en ljusstråle över mitt huvud på väg hem i natt
en ljusstråle över mitt huvud på väg hem

och så lyssnar vi till ljudet av havets vågor som äter av stranden
ja, vi lyssnar till fridens andetag som omger allt
vi behöver en slipsten för att slipa vår perfekta galenskap
och så lyssnar vi till verklighetens ljud för att lysa upp vägen

Jag har en ljusstråle över mitt huvud på väg hem i natt
en ljusstråle över mitt huvud på väg hem
Jag har en ljusstråle över mitt huvud på väg hem i natt
en ljusstråle över mitt huvud på väg hem`,
    },
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
    lyricsTranslations: {
      de:
`Ich harke durch die Asche eines niedergebrannten Feuers
Finde die Spuren eines Teils meines Lebens
Einst in Schwarz auf Weiß geschrieben, ein Zeichen
Du und ich hatten ein neues Leben geplant

Wie das Feuer brannte unsere Liebe einst so hell
Die Flamme erlosch, es gab kein Licht mehr
Kein Funke
Keine Glut
Die es wieder entfachen könnte
Jetzt bleiben nur noch einsame Nächte

Einsame Nächte, einsame Nächte
Die Asche unserer Träume
Einsame Nächte, einsame Nächte
Alles Gute
Nimmt ein Ende

Es stand in den Sternen geschrieben, als unsere Liebe hell strahlte
Unsere Seelen trafen sich und tanzten bis zum Morgenlicht
Unsere Liebe hörte auf und wir waren fertig
Verblasst wie Nebel in der Morgensonne

Wie das Feuer brannte unsere Liebe einst so hell
Die Flamme erlosch, es gab kein Licht mehr
Kein Funke
Keine Glut
Die es wieder entfachen könnte
Jetzt bleiben nur noch einsame Nächte

Einsame Nächte, einsame Nächte
Die Asche unserer Träume
Einsame Nächte, einsame Nächte
Alles Gute
Nimmt ein Ende

Ich ahnte nicht, dass es so weit kommen würde
Verraten durch die Lust auf einen gestohlenen Kuss
Du hast ein anderes Leben ohne mich geplant
Auf der Flucht vor einer Zukunft, die es nie geben wird

Einsame Nächte, einsame Nächte
Die Asche unserer Liebe
Einsame Nächte, einsame Nächte
Alles Gute
Nimmt ein Ende

Einsame Nächte, einsame Nächte
Die Asche unserer Träume
Einsame Nächte, einsame Nächte
Alles Gute
Nimmt ein Ende`,
      es:
`Rastrillando entre las cenizas de un fuego consumido
Encuentro las huellas de una parte de mi vida
Escrito una vez en blanco y negro, una señal
Tú y yo habíamos planeado una nueva vida

Como el fuego, nuestro amor ardió una vez con tanta fuerza
La llama murió, no hubo luz
Ni una chispa
Ni una brasa
Que pudiera volver a encenderla
Ahora lo único que queda son noches solitarias

Noches solitarias, noches solitarias
Las cenizas de nuestros sueños
Noches solitarias, noches solitarias
Todas las cosas buenas
Llegan a su fin

Estaba escrito en las estrellas cuando nuestro amor brillaba
Nuestras almas se encontraron y bailaron hasta la luz de la mañana
Nuestro amor se acabó y terminamos
Se desvaneció como la niebla bajo el sol de la mañana

Como el fuego, nuestro amor ardió una vez con tanta fuerza
La llama murió, no hubo luz
Ni una chispa
Ni una brasa
Que pudiera volver a encenderla
Ahora lo único que queda son noches solitarias

Noches solitarias, noches solitarias
Las cenizas de nuestros sueños
Noches solitarias, noches solitarias
Todas las cosas buenas
Llegan a su fin

Poco imaginaba que acabaría así
Traicionado por el deseo de un beso robado
Planeando otra vida sin mí
Huyendo de un futuro que nunca será

Noches solitarias, noches solitarias
Las cenizas de nuestro amor
Noches solitarias, noches solitarias
Todas las cosas buenas
Llegan a su fin

Noches solitarias, noches solitarias
Las cenizas de nuestros sueños
Noches solitarias, noches solitarias
Todas las cosas buenas
Llegan a su fin`,
      fi:
`Haravoin sammuneen tulen tuhkaa
Löydän jäljet yhdestä osasta elämääni
Kirjoitettuna kerran mustavalkoisena, merkki
Sinä ja minä olimme suunnitelleet uuden elämän

Kuin tuli, rakkautemme paloi kerran niin kirkkaasti
Liekki sammui, valoa ei ollut
Ei kipinää
Ei hiillosta
Joka voisi sytyttää sen uudelleen
Nyt jäljellä on vain yksinäisiä öitä

Yksinäisiä öitä, yksinäisiä öitä
Unelmiemme tuhka
Yksinäisiä öitä, yksinäisiä öitä
Kaikki hyvä
Päättyy aikanaan

Se oli kirjoitettu tähtiin, kun rakkautemme loisti kirkkaana
Sielumme kohtasivat ja tanssivat aamunkoittoon asti
Rakkautemme loppui ja olimme valmiit
Haihtui kuin sumu aamuauringossa

Kuin tuli, rakkautemme paloi kerran niin kirkkaasti
Liekki sammui, valoa ei ollut
Ei kipinää
Ei hiillosta
Joka voisi sytyttää sen uudelleen
Nyt jäljellä on vain yksinäisiä öitä

Yksinäisiä öitä, yksinäisiä öitä
Unelmiemme tuhka
Yksinäisiä öitä, yksinäisiä öitä
Kaikki hyvä
Päättyy aikanaan

En arvannut, että tähän päädyttäisiin
Varastetun suudelman himo petti
Suunnitellen toista elämää ilman minua
Paetessa tulevaisuutta, jota ei koskaan tule

Yksinäisiä öitä, yksinäisiä öitä
Rakkautemme tuhka
Yksinäisiä öitä, yksinäisiä öitä
Kaikki hyvä
Päättyy aikanaan

Yksinäisiä öitä, yksinäisiä öitä
Unelmiemme tuhka
Yksinäisiä öitä, yksinäisiä öitä
Kaikki hyvä
Päättyy aikanaan`,
      sv:
`Krattar i askan efter en utbrunnen eld
Hittar spåren av en del av mitt liv
Skrivet en gång i svart på vitt, ett tecken
Du och jag hade planerat ett nytt liv

Som elden brann vår kärlek en gång så starkt
Lågan dog, det fanns inget ljus
Ingen gnista
Ingen glöd
Som kunde tända den på nytt
Nu är allt som finns kvar ensamma nätter

Ensamma nätter, ensamma nätter
Askan av våra drömmar
Ensamma nätter, ensamma nätter
Allt gott
Får ett slut

Det stod skrivet i stjärnorna när vår kärlek strålade
Våra själar möttes och dansade till morgonljuset
Vår kärlek tog slut och vi var färdiga
Bleknade som dimma i morgonsolen

Som elden brann vår kärlek en gång så starkt
Lågan dog, det fanns inget ljus
Ingen gnista
Ingen glöd
Som kunde tända den på nytt
Nu är allt som finns kvar ensamma nätter

Ensamma nätter, ensamma nätter
Askan av våra drömmar
Ensamma nätter, ensamma nätter
Allt gott
Får ett slut

Lite anade jag att det skulle sluta så här
Förrådd av lusten efter en stulen kyss
Planerade ett annat liv utan mig
Flydde från en framtid som aldrig blir

Ensamma nätter, ensamma nätter
Askan av vår kärlek
Ensamma nätter, ensamma nätter
Allt gott
Får ett slut

Ensamma nätter, ensamma nätter
Askan av våra drömmar
Ensamma nätter, ensamma nätter
Allt gott
Får ett slut`,
    },
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
    lyricsTranslations: {
      de:
`sha boom sha boom shiriki boom owayo wee // 4x

Matsawana kam, um mich zu sehen
sie nahm meinen Tempel
mitten in der Nacht
sie nahm mein Leben

Matsawana, Matsawana

sha boom sha boom shiriki boom owayo wee // 4x

vom Tag an, als ich geboren wurde
Matsawana-naa-na
hielt sie mich in ihren Armen
Matsawana-naa-na
sie führte mich durch das Leben
Matsawana-naa-na
dann nimmt sie mich fort
Matsawana-naa-na

sha boom sha boom shiriki boom owayo wee // 4x

Matsawana kam, um mich zu sehen…

Matsawana, Matsawana

SOLO

Away wue wue wue wue
sie nahm meinen Tempel
Away wue wue wue wue
sie nahm mein Leben

Matsawana, Matsawana

Ein Schattenwolf (kam zu mir) in der Nacht
starrte mich im Dunkeln an
Ich sah nur die Spiegelungen zweier heller Augen
und ich wusste, es war dasselbe wie zuvor`,
      es:
`sha boom sha boom shiriki boom owayo wee // 4x

Matsawana vino a verme
se llevó mi templo
en medio de la noche
se llevó mi vida

Matsawana, Matsawana

sha boom sha boom shiriki boom owayo wee // 4x

desde el día en que nací
Matsawana-naa-na
me sostuvo en sus brazos
Matsawana-naa-na
me guió por la vida
Matsawana-naa-na
luego me lleva lejos
Matsawana-naa-na

sha boom sha boom shiriki boom owayo wee // 4x

Matsawana vino a verme…

Matsawana, Matsawana

SOLO

Away wue wue wue wue
se llevó mi templo
Away wue wue wue wue
se llevó mi vida

Matsawana, Matsawana

Un lobo sombra (vino a mí) de noche
me miró fijamente en la oscuridad
Solo vi los reflejos de dos ojos brillantes
y supe que era lo mismo de antes`,
      fi:
`sha boom sha boom shiriki boom owayo wee // 4x

Matsawana tuli tapaamaan minua
hän vei temppelini
keskellä yötä
hän vei elämäni

Matsawana, Matsawana

sha boom sha boom shiriki boom owayo wee // 4x

siitä päivästä asti kun synnyin
Matsawana-naa-na
hän piti minua sylissään
Matsawana-naa-na
hän ohjasi minut läpi elämän
Matsawana-naa-na
sitten hän vie minut pois
Matsawana-naa-na

sha boom sha boom shiriki boom owayo wee // 4x

Matsawana tuli tapaamaan minua…

Matsawana, Matsawana

SOLO

Away wue wue wue wue
hän vei temppelini
Away wue wue wue wue
hän vei elämäni

Matsawana, Matsawana

Varjosusi (tuli luokseni) yöllä
tuijotti minua pimeässä
Näin vain kahden kirkkaan silmän heijastukset
ja tiesin sen olevan sama kuin ennen`,
      sv:
`sha boom sha boom shiriki boom owayo wee // 4x

Matsawana kom för att träffa mig
hon tog mitt tempel
mitt i natten
hon tog mitt liv

Matsawana, Matsawana

sha boom sha boom shiriki boom owayo wee // 4x

från den dag jag föddes
Matsawana-naa-na
hon höll mig i sin famn
Matsawana-naa-na
hon vägledde mig genom livet
Matsawana-naa-na
sedan tar hon mig bort
Matsawana-naa-na

sha boom sha boom shiriki boom owayo wee // 4x

Matsawana kom för att träffa mig…

Matsawana, Matsawana

SOLO

Away wue wue wue wue
hon tog mitt tempel
Away wue wue wue wue
hon tog mitt liv

Matsawana, Matsawana

En skuggvarg (kom till mig) om natten
stirrade på mig i mörkret
Jag såg bara reflexerna av två klara ögon
och jag visste att det var detsamma som förr`,
    },
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
when you’re looking at a gorgeous sight

but there´s one and two
split fifty each
you give and take
and she gives and takes

and you compromise
as much responsible we are
and you learn to live
in understanding of each other`,
    lyricsTranslations: {
      de:
`Willst du ganz nah kommen
willst du etwas Echtes?
Willst du jemanden kennenlernen
ohne dass irgendjemand dich kennenlernt

siehst du, da sind eins und zwei
halbe-halbe
du gibst und nimmst
und sie gibt und nimmt

und du gehst Kompromisse ein
so verantwortungsvoll, wie wir sind
und du lernst zu leben
im Verständnis füreinander

nun, du magst deinen Flow
wenn du allein unterwegs bist
und du würdest ihn gern eng halten
wenn du einen prachtvollen Anblick vor dir hast

siehst du, da sind eins und zwei
halbe-halbe
du gibst und nimmst
und sie gibt und nimmt

und du gehst Kompromisse ein
so verantwortungsvoll, wie wir sind
und du lernst zu leben
im Verständnis füreinander`,
      es:
`¿Quieres acercarte de verdad
quieres algo real?
¿Quieres llegar a conocer a alguien
sin dejar que nadie te conozca a ti?

verás, están el uno y el dos
a medias, cincuenta cada uno
das y recibes
y ella da y recibe

y haces concesiones
tan responsables como somos
y aprendes a vivir
entendiéndoos el uno al otro

bueno, te gusta tu ritmo
cuando estás a solas
y te gustaría mantenerlo firme
cuando contemplas una vista espléndida

verás, están el uno y el dos
a medias, cincuenta cada uno
das y recibes
y ella da y recibe

y haces concesiones
tan responsables como somos
y aprendes a vivir
entendiéndoos el uno al otro`,
      fi:
`Haluatko tulla oikein lähelle
haluatko jotain oikeaa?
Haluatko oppia tuntemaan jonkun
antamatta kenenkään tuntea sinua

näethän, on yksi ja kaksi
jaettuna viisikymmentä kummallekin
sinä annat ja otat
ja hän antaa ja ottaa

ja sinä teet kompromisseja
niin vastuullisia kuin olemmekin
ja opit elämään
toisiasi ymmärtäen

no, pidät omasta flowstasi
kun olet omillasi
ja haluaisit pitää sen tiukkana
kun katsot upeaa näkyä

näethän, on yksi ja kaksi
jaettuna viisikymmentä kummallekin
sinä annat ja otat
ja hän antaa ja ottaa

ja sinä teet kompromisseja
niin vastuullisia kuin olemmekin
ja opit elämään
toisiasi ymmärtäen`,
      sv:
`Vill du komma riktigt nära
vill du ha något äkta?
Vill du lära känna någon
utan att låta någon lära känna dig

du förstår, det finns ett och två
delat femtio var
du ger och tar
och hon ger och tar

och du kompromissar
så ansvarsfulla som vi nu är
och du lär dig leva
i förståelse för varandra

nåväl, du gillar ditt flow
när du är på egen hand
och du vill gärna hålla det tajt
när du ser en praktfull syn

du förstår, det finns ett och två
delat femtio var
du ger och tar
och hon ger och tar

och du kompromissar
så ansvarsfulla som vi nu är
och du lär dig leva
i förståelse för varandra`,
    },
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
    lyricsTranslations: {
      de:
`Ruh deine Knochen aus
bis das Gefühl wächst
ruh dein Herz aus
bis der Funke kommt

lass es locker
lass es locker
lass es locker
lass es locker

Schließ die Augen
und atme tief ein
folge deinem Körper
sobald du ihn zu fassen bekommst
finde etwas Frieden
finde etwas Frieden

lass es locker
lass es locker

Ich könnte dich täuschen mit einer Bewegung
schneller, als Augen oder Ohren sie berühren können
folgst du etwas, das
du nicht erreichen kannst

achte auf alles um dich herum
lass deine Füße das Gleichgewicht des Bodens finden
plötzlich bist du scharf und klar
wie eine Sternennacht

lass es locker
lass es locker`,
      es:
`Descansa tus huesos
hasta que crezca la sensación
descansa tu corazón
hasta que llegue la chispa

tómalo con calma
tómalo con calma
tómalo con calma
tómalo con calma

Cierra los ojos
y respira hondo
sigue a tu cuerpo
cuando lo alcances
encuentra algo de paz
encuentra algo de paz

tómalo con calma
tómalo con calma

Podría engañarte con un movimiento
más rápido de lo que ojos u oídos pueden tocar
¿sigues algo así
que no puedes alcanzar?

presta atención a todo lo que te rodea
deja que tus pies tomen el equilibrio del suelo
de pronto estás nítido y claro
como una noche estrellada

tómalo con calma
tómalo con calma`,
      fi:
`Lepuuta luitasi
kunnes tunne kasvaa
lepuuta sydäntäsi
kunnes kipinä syttyy

ota rennommin
ota rennommin
ota rennommin
ota rennommin

Sulje silmäsi
ja hengitä syvään
seuraa kehoasi
kun olet saanut sen kiinni
löydä rauhaa
löydä rauhaa

ota rennommin
ota rennommin

Voisin huijata sinua liikkeellä
nopeammalla kuin silmät tai korvat ehtivät koskea
seuraatko jotain sellaista
mitä et voi tavoittaa

ota huomioon kaikki ympärilläsi
anna jalkojesi tasapainottua maahan
yhtäkkiä olet terävä ja kirkas
kuin tähtikirkas yö

ota rennommin
ota rennommin`,
      sv:
`Vila dina ben
tills känslan växer
vila ditt hjärta
tills gnistan tänds

ta det lugnt
ta det lugnt
ta det lugnt
ta det lugnt

Blunda
och ta ett djupt andetag
följ din kropp
när du väl fångat den
hitta lite frid
hitta lite frid

ta det lugnt
ta det lugnt

Jag skulle kunna lura dig med ett steg
snabbare än ögon eller öron hinner röra
följer du något sådant
som du inte kan nå

ta vara på allt omkring dig
låt fötterna finna balans mot marken
plötsligt är du skarp och klar
som en stjärnklar natt

ta det lugnt
ta det lugnt`,
    },
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
    lyricsTranslations: {
      de:
`Gestern saß ich allein
ich sah mich um, auf alles, was du getan hast
Gestern wurde mir klar, wie sehr ich dich liebe

Gestern dachte ich an dich
daran, was du tust und wie du es tust
Gestern ich, ich dachte an dich

Würdest du mich dich erreichen lassen?
Würdest du mich dich erreichen lassen?

Gestern wachte ich auf, um dich zu sehen
ich wachte auf, um dich zu hören, ich wachte auf, um dich zu spüren
Gestern ich, wurde mir klar, wie sehr ich dich brauche

Würdest du mich dich erreichen lassen?
Würdest du mich dich erreichen lassen?

Ich dachte an Gefühl und ich dachte an Glauben
ich dachte an die Gründe, warum Menschen im Stich lassen
ich dachte an Freiheit, würdest du jemanden nah an dich heranlassen?

Würdest du mich dich erreichen lassen?
Würdest du mich dich erreichen lassen?`,
      es:
`Ayer me senté a solas
miré a mi alrededor, todo lo que has hecho
Ayer me di cuenta de cuánto te quiero

Ayer pensé en ti
en lo que haces y en cómo lo haces
Ayer yo, yo pensé en ti

¿Me dejarías alcanzarte?
¿Me dejarías alcanzarte?

Ayer desperté para verte
desperté para oírte, desperté para sentirte
Ayer yo, me di cuenta de cuánto te necesito

¿Me dejarías alcanzarte?
¿Me dejarías alcanzarte?

Pensé en el sentir y pensé en la fe
pensé en las razones por las que la gente abandona
pensé en la libertad, ¿dejarías que alguien se acercara a ti?

¿Me dejarías alcanzarte?
¿Me dejarías alcanzarte?`,
      fi:
`Eilen istuin yksin
katselin ympärilleni, kaikkea mitä olet tehnyt
Eilen tajusin, kuinka paljon rakastan sinua

Eilen ajattelin sinua
sitä mitä teet ja miten sen teet
Eilen minä, ajattelin sinua

Antaisitko minun tavoittaa sinut?
Antaisitko minun tavoittaa sinut?

Eilen heräsin nähdäkseni sinut
heräsin kuullakseni sinut, heräsin tuntemaan sinut
Eilen minä, tajusin, kuinka paljon tarvitsen sinua

Antaisitko minun tavoittaa sinut?
Antaisitko minun tavoittaa sinut?

Ajattelin tunnetta ja ajattelin uskoa
ajattelin syitä, miksi ihmiset hylkäävät
ajattelin vapautta, antaisitko jonkun tulla lähelle sinua?

Antaisitko minun tavoittaa sinut?
Antaisitko minun tavoittaa sinut?`,
      sv:
`Igår satt jag ensam
jag såg mig omkring, på allt du gjort
Igår förstod jag hur mycket jag älskar dig

Igår tänkte jag på dig
på vad du gör och hur du gör det
Igår jag, jag tänkte på dig

Skulle du låta mig nå dig?
Skulle du låta mig nå dig?

Igår vaknade jag för att se dig
jag vaknade för att höra dig, jag vaknade för att känna dig
Igår jag, förstod, hur mycket jag behöver dig

Skulle du låta mig nå dig?
Skulle du låta mig nå dig?

Jag tänkte på känslor och jag tänkte på tro
jag tänkte på skälen till varför människor sviker
jag tänkte på frihet, skulle du låta någon komma nära dig?

Skulle du låta mig nå dig?
Skulle du låta mig nå dig?`,
    },
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
it’s alright, I’ve got you, I’ve got you
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
    lyricsTranslations: {
      de:
`teile deine Sorgen, lass deine Sorgen jetzt raus
teile deine Nöte, lass deine Nöte los
teile dein Herz jetzt, lass mich wissen, wie es in dir aussieht
ist schon gut, ich hab dich, ich hab dich
wir haben dich, wir haben dich, wir haben dich…

sprich dich aus, Bruder, sag mir, was dir auf dem Herzen liegt
oh Schwester,
sprich dich aus, Bruder, sag mir, was dir auf dem Herzen liegt
oh Schwester,

wenn ich mich klein mache, lasse ich dich los
ich bleibe allein und werde kalt
weil es zu Hause keinen Frieden gibt
in meiner Seele werde ich alt, ich werde schwer
und da ist keine Liebe keine Liebe keine Liebe, bis ich es dich wissen lasse

sprich dich aus, Bruder, sag mir, was dir auf dem Herzen liegt
oh Schwester,
sprich dich aus, Bruder, sag mir, was dir auf dem Herzen liegt
oh Schwester,

Träume werden wahr, wenn du dein Herz teilst
und wir werden frei, wenn wir unsere Liebe teilen

also sprich dich aus, Bruder
sprich, Schwester

lass deine Gefühle raus
lass dein Herz überfließen`,
      es:
`comparte tus preocupaciones, deja salir tus preocupaciones ahora
comparte tus problemas, deja ir tus problemas
comparte tu corazón ahora, dime cómo te sientes por dentro
está bien, te tengo, te tengo
te tenemos, te tenemos, te tenemos…

habla, hermano, dime qué llevas en el corazón
oh hermana,
habla, hermano, dime qué llevas en el corazón
oh hermana,

cuando me quedo abajo, te dejo ir
me quedo solo y me enfrío
por no tener paz en casa
en mi alma envejezco, me vuelvo pesado
y no hay amor no hay amor no hay amor hasta que te lo hago saber

habla, hermano, dime qué llevas en el corazón
oh hermana,
habla, hermano, dime qué llevas en el corazón
oh hermana,

los sueños se hacen realidad al compartir el corazón
y nos volvemos libres al compartir nuestro amor

así que habla, hermano
habla, hermana

deja salir tus sentimientos
deja que tu corazón se desborde`,
      fi:
`jaa huolesi, päästä huolesi ulos nyt
jaa murheesi, päästä murheesi menemään
jaa sydämesi nyt, kerro minulle miltä sinusta sisällä tuntuu
kaikki on hyvin, minä pidän susta huolen, minä pidän susta huolen
me pidämme susta huolen, me pidämme susta huolen, me pidämme susta huolen…

puhu, veli, kerro mitä sydämelläsi on
voi sisko,
puhu, veli, kerro mitä sydämelläsi on
voi sisko,

kun vetäydyn syrjään, päästän sinusta irti
jään yksin ja kylmenen
koska kotona ei ole rauhaa
sielussani vanhenen, tulen raskaaksi
eikä ole rakkautta ei rakkautta ei rakkautta ennen kuin annan tietää

puhu, veli, kerro mitä sydämelläsi on
voi sisko,
puhu, veli, kerro mitä sydämelläsi on
voi sisko,

unelmat toteutuvat kun jakaa sydämensä
ja meistä tulee vapaita kun jaamme rakkautemme

joten puhu, veli
puhu, sisko

päästä tunteesi ulos
anna sydämesi vuotaa yli`,
      sv:
`dela dina bekymmer, släpp ut dina bekymmer nu
dela dina bördor, låt dina bördor gå
dela ditt hjärta nu, låt mig veta hur du mår inuti
det är okej, jag har dig, jag har dig
vi har dig, vi har dig, vi har dig…

säg det, bror, berätta vad du bär på hjärtat
åh syster,
säg det, bror, berätta vad du bär på hjärtat
åh syster,

när jag håller mig nere, släpper jag dig
jag förblir ensam, och blir kall
av brist på frid hemma
i min själ åldras jag, jag blir tung
och det finns ingen kärlek ingen kärlek ingen kärlek förrän jag låter dig veta

säg det, bror, berätta vad du bär på hjärtat
åh syster,
säg det, bror, berätta vad du bär på hjärtat
åh syster,

drömmar blir verkliga när man delar sitt hjärta
och vi blir fria när vi delar vår kärlek

så säg det, bror
säg det, syster

låt dina känslor komma ut
låt ditt hjärta rinna över`,
    },
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
    lyricsTranslations: {
      de:
`Ich will über die Zeiten sprechen
während ich spüre, wie sie sich bewegen
Ich will über die Linie sprechen,
die ich jeden Tag sehe
Ich will über die Zeiten sprechen
Alles dreht sich im Kreis

Wie ein Ozean wandeln sich die Zeiten
und wir segeln über die Wellen
So wie wir die Sonne umkreisen
werden wir dorthin zurückkehren, wo wir begannen

Um stabil zu bleiben, um fähig zu bleiben
sich weiterdrehen, in Bewegung bleiben
es geht um ein Gleichgewicht zwischen Gegensätzen
sie halten sich so tief, so hoch
bis ans Ende der Zeit, so scheint es

Wie ein Ozean wandeln sich die Zeiten
und wir segeln über die Wellen
So wie wir die Sonne umkreisen
werden wir dorthin zurückkehren, wo wir begannen`,
      es:
`Quiero hablar de los tiempos
mientras siento cómo se mueven
Quiero hablar de la línea,
que veo cada día
Quiero hablar de los tiempos
Todo da vueltas

Como un océano, los tiempos cambian
y navegamos sobre las olas
Como giramos alrededor del sol
volveremos al lugar donde empezamos

Para mantenerse estable, para mantenerse capaz
seguir girando, seguir moviéndose
se trata de un equilibrio entre opuestos
se mantienen así de bajo, así de alto
hasta el fin de los tiempos, parece

Como un océano, los tiempos cambian
y navegamos sobre las olas
Como giramos alrededor del sol
volveremos al lugar donde empezamos`,
      fi:
`Haluan puhua ajoista
kun tunnen niiden liikkuvan
Haluan puhua siitä linjasta,
jonka näen joka päivä
Haluan puhua ajoista
Kaikki kiertää kehää

Kuin meri, ajat muuttuvat
ja me purjehdimme aaltojen yli
Kuten kierrämme aurinkoa
palaamme sinne mistä aloitimme

Pysyäkseen vakaana, pysyäkseen kykenevänä
pyöriä edelleen, liikkua edelleen
kyse on tasapainosta vastakohtien välillä
ne pysyvät niin matalalla, niin korkealla
aikojen loppuun asti, näyttää siltä

Kuin meri, ajat muuttuvat
ja me purjehdimme aaltojen yli
Kuten kierrämme aurinkoa
palaamme sinne mistä aloitimme`,
      sv:
`Jag vill prata om tiderna
när jag känner hur de rör sig
Jag vill prata om linjen,
som jag ser varje dag
Jag vill prata om tiderna
Allt går i cirklar

Som ett hav förändras tiderna
och vi seglar över vågorna
Som vi cirklar runt solen
ska vi återvända dit vi började

För att hålla balansen, för att orka
fortsätta snurra, fortsätta röra sig
det handlar om en balans mellan motsatser
de håller sig så lågt, så högt
tills tidens slut verkar det

Som ett hav förändras tiderna
och vi seglar över vågorna
Som vi cirklar runt solen
ska vi återvända dit vi började`,
    },
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
    lyricsTranslations: {
      en:
`Welcome home, step into the hallway
take off your shoes, hang up your jacket
the little one has grown big, you're a lot older since you left

come sit down, sit on the sofa
tell me everything, everything that has happened
you said you'd met a guy who had come closer to you every day

you said I probably knew who he was…

run, run, run, now nothing is missing
fall, fall, fall into each other's arms
take my hand and hold it for life
run, run, run, hearts big and on fire
fall, fall, fall together in a dream
and make it reality

have you seen what we've done, we've renovated
the kitchen is big now, there's room for many more
here we can breathe, here we can live, in peace and quiet

would you like some pancakes? we can share, too
do you remember the time we burned them all
I want to sing all the songs we sang
they're about an ordinary day

all the memories we have…

run, run, run, now nothing is missing
fall, fall, fall into each other's arms
take my hand and hold it for life
run, run, run, hearts big and on fire
fall, fall, fall together in a dream
and make it reality

about a future for two, the stars twinkle in the night
of a love so great…`,
      de:
`Willkommen zu Hause, tritt ein in den Flur
zieh deine Schuhe aus, häng deine Jacke auf
aus Klein wird Groß, du bist viel älter, seit du fort bist

komm, setz dich, nimm Platz auf dem Sofa
erzähl mir alles, alles, was passiert ist
du hast gesagt, du hast einen Typen getroffen, der dir mit jedem Tag näher gekommen ist

du hast gesagt, ich wüsste wohl, wer er war…

lauf, lauf, lauf, jetzt fehlt nichts
fall, fall, fall einander in die Arme
nimm meine Hand und halte sie ein Leben lang
lauf, lauf, lauf, Herzen groß und in Flammen
fall, fall, fall zusammen in einen Traum
und mach ihn zur Wirklichkeit

habt ihr gesehen, was wir gemacht haben, wir haben renoviert
die Küche ist jetzt groß, da passen viel mehr Leute rein
hier können wir atmen, hier können wir leben, in Ruhe und Frieden

willst du ein paar Pfannkuchen? wir können auch teilen
weißt du noch, als wir sie alle verbrannt haben
ich will all die Lieder singen, die wir gesungen haben
sie handeln von einem ganz normalen Tag

alle Erinnerungen, die wir haben…

lauf, lauf, lauf, jetzt fehlt nichts
fall, fall, fall einander in die Arme
nimm meine Hand und halte sie ein Leben lang
lauf, lauf, lauf, Herzen groß und in Flammen
fall, fall, fall zusammen in einen Traum
und mach ihn zur Wirklichkeit

von einer Zukunft zu zweit, die Sterne funkeln in der Nacht
von einer so großen Liebe…`,
      es:
`Bienvenido a casa, entra al recibidor
quítate los zapatos, cuelga tu chaqueta
el pequeño se ha hecho grande, eres mucho mayor desde que te fuiste

ven, siéntate, siéntate en el sofá
cuéntamelo todo, todo lo que ha pasado
dijiste que habías conocido a un chico que se te había acercado más cada día

dijiste que yo probablemente sabía quién era…

corre, corre, corre, ahora no falta nada
cae, cae, cae en los brazos del otro
toma mi mano y agárrala de por vida
corre, corre, corre, corazones grandes en llamas
cae, cae, cae juntos en un sueño
y hazlo realidad

¿habéis visto lo que hemos hecho? hemos reformado
la cocina es grande ahora, caben muchos más
aquí podemos respirar, aquí podemos vivir, en calma y en paz

¿quieres unas tortitas? también podemos compartir
¿te acuerdas de aquella vez que las quemamos todas?
quiero cantar todas las canciones que cantábamos
tratan de un día cualquiera

todos los recuerdos que tenemos…

corre, corre, corre, ahora no falta nada
cae, cae, cae en los brazos del otro
toma mi mano y agárrala de por vida
corre, corre, corre, corazones grandes en llamas
cae, cae, cae juntos en un sueño
y hazlo realidad

de un futuro para dos, las estrellas brillan en la noche
de un amor tan grande…`,
      fi:
`Tervetuloa kotiin, astu eteiseen
riisu kenkäsi, ripusta takkisi
pienestä tuli iso, olet paljon vanhempi kuin lähtiessäsi

tule istumaan, istu sohvalle
kerro kaikesta, kaikesta mitä on tapahtunut
sanoit tavanneesi tyypin, joka oli tullut lähemmäs sinua joka päivä

sanoit että minä kai tiesin kuka hän oli…

juokse, juokse, juokse, nyt ei puutu mitään
putoa, putoa, putoa toistenne syliin
ota käteni ja pidä siitä kiinni elämän loppuun asti
juokse, juokse, juokse, sydämet suuret ja tulessa
putoa, putoa, putoa yhdessä uneen
ja tee siitä totta

oletteko nähneet mitä olemme tehneet, olemme remontoineet
keittiö on nyt iso, sinne mahtuu paljon useampi
täällä voimme hengittää, täällä voimme elää, rauhassa

haluatko lettuja? voimme myös jakaa
muistatko sen kerran kun poltimme ne kaikki
haluan laulaa kaikki laulut jotka lauloimme
ne kertovat tavallisesta päivästä

kaikki muistot joita meillä on…

juokse, juokse, juokse, nyt ei puutu mitään
putoa, putoa, putoa toistenne syliin
ota käteni ja pidä siitä kiinni elämän loppuun asti
juokse, juokse, juokse, sydämet suuret ja tulessa
putoa, putoa, putoa yhdessä uneen
ja tee siitä totta

tulevaisuudesta kahdelle, tähdet tuikkivat yössä
niin suuresta rakkaudesta…`,
    },
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
'Cause the dark dog is waiting...
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
'Cause the dark dog is waiting...
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
    lyricsTranslations: {
      de:
`Es gibt keinen Reim
Es gibt keinen Grund
Wen er beißt
Tut, was ihm gefällt
Der dunkle Hund
Wartet er auf mich?
Ich hoffe, wir begegnen uns nie

Denn der dunkle Hund wartet
Der dunkle Hund wartet
Und es spielt eigentlich keine Rolle
Ob es Tag oder Nacht ist
Denn der dunkle Hund wartet ....
Wartet er auf mich?

Wo Schatten fallen
In meinem Kopf
Ein stummer Jäger
Wartet auf seine Zeit
Wenn er zuschlägt
Was wird er nehmen?
Der dunkle Hund
Kann dein Schicksal besiegeln

Der dunkle Hund wartet
Der dunkle Hund wartet
Und es spielt eigentlich keine Rolle
Ob es Tag oder Nacht ist
Denn der dunkle Hund wartet ....
Wartet er auf mich?

Alle meine frohen Erinnerungen
Verblassen schmerzhaft
Du bist mein dunkelster Feind
Wartest du auf mich?
Wartest du auf mich?

Der dunkle Hund wartet
Der dunkle Hund wartet
Und es spielt eigentlich keine Rolle
Ob es Tag oder Nacht ist
Denn der dunkle Hund wartet
Der dunkle Hund wartet
Der dunkle Hund wartet
Und es spielt eigentlich keine Rolle
Ob es Tag oder Nacht ist
Denn der dunkle Hund wartet`,
      es:
`No hay rima
No hay razón
En cuanto a quién muerde
Hace lo que le place
El perro oscuro
¿Me estará esperando?
Espero que nunca nos encontremos

Porque el perro oscuro espera
El perro oscuro espera
Y en realidad no importa
Si es de día o de noche
Porque el perro oscuro espera ....
¿Me estará esperando?

Donde caen las sombras
Dentro de mi mente
Un cazador silencioso
Espera su momento
Cuando ataca
¿Qué se llevará?
El perro oscuro
Podría sellar tu destino

El perro oscuro espera
El perro oscuro espera
Y en realidad no importa
Si es de día o de noche
Porque el perro oscuro espera ....
¿Me estará esperando?

Todos mis recuerdos felices
Se desvanecen dolorosamente
Eres mi peor enemigo
¿Me estás esperando?
¿Me estás esperando?

El perro oscuro espera
El perro oscuro espera
Y en realidad no importa
Si es de día o de noche
Porque el perro oscuro espera
El perro oscuro espera
El perro oscuro espera
Y en realidad no importa
Si es de día o de noche
Porque el perro oscuro espera`,
      fi:
`Ei ole riimiä
Ei ole syytä
Sille, ketä se puree
Tekee mielensä mukaan
Musta koira
Odottaako se minua?
Toivon, ettemme koskaan kohtaa

Sillä musta koira odottaa
Musta koira odottaa
Eikä sillä oikeastaan ole väliä
Onko päivä vai yö
Sillä musta koira odottaa ....
Odottaako se minua?

Missä varjot lankeavat
Mieleni sisällä
Hiljainen metsästäjä
Odottaa hetkeään
Kun se iskee
Mitä se vie?
Musta koira
Voisi sinetöidä kohtalosi

Musta koira odottaa
Musta koira odottaa
Eikä sillä oikeastaan ole väliä
Onko päivä vai yö
Sillä musta koira odottaa ....
Odottaako se minua?

Kaikki iloiset muistoni
Haalistuvat tuskallisesti
Olet pahin vihollinen
Odotatko minua?
Odotatko minua?

Musta koira odottaa
Musta koira odottaa
Eikä sillä oikeastaan ole väliä
Onko päivä vai yö
Sillä musta koira odottaa
Musta koira odottaa
Musta koira odottaa
Eikä sillä oikeastaan ole väliä
Onko päivä vai yö
Sillä musta koira odottaa`,
      sv:
`Det finns inget rim
Det finns ingen reson
Över vem den biter
Gör som den behagar
Den mörka hunden
Väntar den på mig?
Jag hoppas vi aldrig möts

För den mörka hunden väntar
Den mörka hunden väntar
Och det spelar egentligen ingen roll
Om det är dag eller natt
För den mörka hunden väntar ....
Väntar den på mig?

Där skuggor faller
Inuti mitt sinne
En tyst jägare
Väntar på sin tid
När den slår till
Vad krävs det?
Den mörka hunden
Kan besegla ditt öde

Den mörka hunden väntar
Den mörka hunden väntar
Och det spelar egentligen ingen roll
Om det är dag eller natt
För den mörka hunden väntar ....
Väntar den på mig?

Alla mina glada minnen
bleknar smärtsamt
Du är min värsta fiende
Väntar du på mig?
Väntar du på mig?

Den mörka hunden väntar
Den mörka hunden väntar
Och det spelar egentligen ingen roll
Om det är dag eller natt
För den mörka hunden väntar
Den mörka hunden väntar
Den mörka hunden väntar
Och det spelar egentligen ingen roll
Om det är dag eller natt
För den mörka hunden väntar`,
    },
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
    lyricsTranslations: {
      de:
`Das Haus des Volkes
Einst stolz, wie es dastand
Wir leben in einer
Wildnis aus Spiegeln
Wo nichts, was wir sehen
So ist, wie es scheint

Die Vögel verstummten im Lafayette Park
Als ein dunkler Kriegsvogel den Park erleuchtete

Da erstickte das Giftgas
Die Stimmen des Friedens
Und die Bibel hoch erhoben
In der Hand der Bestie
Die Vögel verstummten im Lafayette Park
Als der Kriegsvogel die Dunkelheit erleuchtete

Der Teufel ging hinauf zur Kirche
Und hielt stolz empor
Ein Buch, von dem er sagte, es sei die Bibel
Doch es war nur die Kunst des Stehlens

Da trieb das Giftgas
Tränen in die Augen
Die Sturmtruppen, bewaffnet
Mit Schlagstöcken und Gas
Bahnten einen Weg durch die Menge
Damit der Teufel passieren konnte
Zu den Stufen von St. Johns

Erstickte die Stimmen des Friedens
Die Bibel hoch erhoben
In der Hand des Diebes

Ich will kein Mitleid
Ich will Veränderung
Ich bin nicht traurig
Es tut mir nicht leid
Ich bin wütend
Ich bin müde`,
      es:
`La casa del pueblo
Antaño orgullosa cuando se alzaba
Vivimos en un
Yermo de espejos
Donde nada de lo que vemos
Es lo que parece

Los pájaros dejaron de cantar en Lafayette Park
Mientras un pájaro oscuro de guerra iluminaba el parque

Así el gas venenoso
Ahogó las voces de la paz
Y la Biblia en alto
En la mano de la bestia
Los pájaros dejaron de cantar en Lafayette Park
Mientras el pájaro de guerra iluminaba la oscuridad

El diablo subió a la iglesia
Y sostuvo con orgullo en alto
Un libro que dijo que era la Biblia
Pero era solo el arte del robo

Así el gas venenoso
Trajo lágrimas a los ojos
Las tropas de asalto, armadas
Con porras y gas
Abrieron un camino entre la multitud
Para que el diablo pudiera pasar
Hasta las escaleras de St. Johns

Ahogó las voces de la paz
La Biblia en alto
En la mano del ladrón

No quiero lástima
Quiero un cambio
No estoy triste
No lo siento
Estoy enfadado
Estoy cansado`,
      fi:
`Kansan talo
Kerran ylpeänä seisonut
Elämme
Peilien erämaassa
Missä mikään näkemämme
Ei ole sitä miltä näyttää

Linnut lakkasivat laulamasta Lafayette Parkissa
Kun tumma sodan lintu valaisi puiston

Niin myrkkykaasu
Tukahdutti rauhan äänet
Ja Raamattu korkealla
Pedon kädessä
Linnut lakkasivat laulamasta Lafayette Parkissa
Kun sodan lintu valaisi pimeyden

Paholainen käveli kirkolle
Ja nosti ylpeänä korkealle
Kirjan, jonka hän sanoi olevan Raamattu
Mutta se oli vain varastamisen taitoa

Niin myrkkykaasu
Toi kyyneleet silmiin
Rynnäkköjoukot aseistettuina
Pamppuilla ja kaasulla
Raivasivat tien väkijoukon läpi
Jotta paholainen pääsi ohi
St. Johnsin portaille

Tukahdutti rauhan äänet
Raamattu korkealla
Varkaan kädessä

En halua sääliä
Haluan muutosta
En ole surullinen
En pahoittele
Olen vihainen
Olen väsynyt`,
      sv:
`Folkets hus
En gång stolt där det stod
Vi lever i en
Vildmark av speglar
Där inget vi ser
Är vad det verkar

Fåglarna slutade sjunga i Lafayette Park
När en mörk krigsfågel lyste upp parken

Så den giftiga gasen
Kvävde fredens röster
Och bibeln hölls högt
I odjurets hand
Fåglarna slutade sjunga i Lafayette Park
När krigsfågeln lyste upp mörkret

Djävulen gick fram till kyrkan
Och höll stolt upp
En bok som han sa var bibeln
Men som bara var stöldens konst

Så den giftiga gasen
Fick tårarna att rinna
Stormtrupperna, beväpnade
Med batonger och gas
Röjde en väg genom folkmassan
Så att djävulen kunde passera
Till trappan vid St. Johns

Kvävde fredens röster
Bibeln hållen högt
I tjuvens hand

Jag vill inte ha medlidande
Jag vill ha förändring
Jag är inte ledsen
Jag ber inte om ursäkt
Jag är arg
Jag är trött`,
    },
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
    lyricsTranslations: {
      de:
`Ich hörte die Schattenschritte langsam den Flur entlangschleichen
Ich hörte den stillen Schatten so sanft an die Tür klopfen
Hat mein Verstand mir nur einen Streich gespielt?
Habe ich Stimmen rufen gehört?
In der Dunkelheit der Schatten
War da überhaupt nichts

Wenn sie die Macht behalten wollen, behalten sie in einem Spiel den Ball
Um ihre Macht und ihren Einfluss zu wahren, geben sie dem Rest einen Dreck
Hat mein Verstand mir nur einen Streich gespielt?
Habe ich die Stimmen rufen gehört?
In der Dunkelheit der Schatten
War da überhaupt nichts

Als die armen Kinder zur Schule gingen, hatten sie keine Bücher, nur kalte, feuchte Wände
Während die reichen Kinder das Geld bekamen und mehr, um ihre goldenen Hallen zu bauen
Hat die Regierung Halt gesagt?
Hast du unsere Stimmen rufen gehört?
In der Dunkelheit der Schatten
War da überhaupt nichts

Verwehre ihnen Bildung, wenn sie dumm sind, werden sie nichts wissen
Dass die Wahrheit nicht die Lügen sind, die du erzählst, die Fakten, die du nie zeigen wirst
Wahrheit ist der Schlüssel zur Freiheit für
Damit unsere Stimmen gehört werden
Aus der Dunkelheit der Schatten
Lass sie unseren Freiheitsruf hören
Aus der Dunkelheit der Schatten
Lass sie unseren Freiheitsruf hören

In der Dunkelheit der Schatten
War da überhaupt nichts

Sie riefen nach Orientierung
Doch niemand hörte ihren Ruf
Halte sie alle im Dunkeln und
In der Dunkelheit der Schatten
War da überhaupt nichts`,
      es:
`Oí los pasos de las sombras arrastrándose despacio por el pasillo
Oí a la sombra silenciosa llamar tan suavemente a la puerta
¿Me estaba jugando una mala pasada mi mente?
¿Oí algunas voces llamar?
En la oscuridad de las sombras
No había nada allí en absoluto

Cuando quieren conservar el poder en un juego, se quedan con la pelota
Para mantener su poder e influencia, al resto no le dan una mierda
¿Me estaba jugando una mala pasada mi mente?
¿Oí las voces llamar?
En la oscuridad de las sombras
No había nada allí en absoluto

Cuando los niños pobres iban a la escuela no tenían libros, solo paredes frías y húmedas
Mientras los niños ricos recibían el dinero y más para construir sus salones dorados
¿Dijo el gobierno que se acabara esto?
¿Oíste nuestras voces llamar?
En la oscuridad de las sombras
No había nada allí en absoluto

Niégales la educación: si son tontos, no sabrán
Que la verdad no son las mentiras que cuentas, los hechos que nunca mostrarás
La verdad es la llave de la libertad para
Para hacer oír nuestras voces
Desde la oscuridad de las sombras
Que oigan nuestro grito de libertad
Desde la oscuridad de las sombras
Que oigan nuestro grito de libertad

En la oscuridad de las sombras
No había nada allí en absoluto

Pedían a gritos una guía
Pero nadie oyó su llamada
Mantenlos a todos en la oscuridad y
En la oscuridad de las sombras
No había nada allí en absoluto`,
      fi:
`Kuulin varjojen askelten hiipivän hitaasti käytävää pitkin
Kuulin hiljaisen varjon kolkuttavan niin hellästi ovelle
Näyttelikö mieleni minulle vain kepposia?
Kuulinko joitain ääniä kutsuvan?
Varjojen pimeydessä
Siellä ei ollut mitään ollenkaan

Kun he haluavat pitää vallan, he pitävät pelissä pallon
Säilyttääkseen valtansa ja vaikutusvaltansa he eivät anna muille penniäkään
Näyttelikö mieleni minulle vain kepposia?
Kuulinko äänten kutsuvan?
Varjojen pimeydessä
Siellä ei ollut mitään ollenkaan

Kun köyhät lapset menivät kouluun, heillä ei ollut kirjoja, vain kylmät, kosteat seinät
Kun rikkaat lapset saivat rahat ja enemmänkin rakentaakseen kultaiset salinsa
Sanoiko hallitus, että lopettakaa tämä?
Kuulitko äänemme kutsuvan?
Varjojen pimeydessä
Siellä ei ollut mitään ollenkaan

Kiellä heiltä koulutus, jos he ovat tyhmiä, he eivät tiedä
Ettei totuus ole valheet, joita kerrot, faktat, joita et koskaan näytä
Totuus on vapauden avain
Jotta äänemme kuuluisivat
Varjojen pimeydestä
Kuulkoot he vapaushuutomme
Varjojen pimeydestä
Kuulkoot he vapaushuutomme

Varjojen pimeydessä
Siellä ei ollut mitään ollenkaan

He huusivat opastusta
Mutta kukaan ei kuullut heidän huutoaan
Pidä heidät kaikki pimeässä ja
Varjojen pimeydessä
Siellä ei ollut mitään ollenkaan`,
      sv:
`Jag hörde skuggornas fotsteg krypa sakta nerför korridoren
Jag hörde den tysta skuggan knacka så försiktigt på dörren
Lurade mitt sinne mig bara?
Hörde jag några röster ropa?
I skuggornas mörker
Fanns det ingenting där alls

När de vill behålla makten i ett spel behåller de bollen
För att behålla sin makt och sitt inflytande ger de resten inte ett skit
Lurade mitt sinne mig bara?
Hörde jag rösterna ropa?
I skuggornas mörker
Fanns det ingenting där alls

När de fattiga barnen gick i skolan hade de inga böcker, bara kalla, fuktiga väggar
Medan de rika barnen fick pengarna och mer därtill för att bygga sina gyllene salar
Sa regeringen åt dem att sluta med det här?
Hörde du våra röster ropa?
I skuggornas mörker
Fanns det ingenting där alls

Neka dem utbildning, är de dumma vet de ingenting
Att sanningen inte är lögnerna du berättar, fakta du aldrig visar
Sanningen är nyckeln till frihet för
Så att våra röster blir hörda
Från skuggornas mörker
Låt dem höra vårt frihetsrop
Från skuggornas mörker
Låt dem höra vårt frihetsrop

I skuggornas mörker
Fanns det ingenting där alls

De ropade efter vägledning
Men ingen hörde deras rop
Håll dem alla i mörker och
I skuggornas mörker
Fanns det ingenting där alls`,
    },
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
    lyricsTranslations: {
      de:
`Willkommen in dieser Welt
Du bist ein Anblick voller Schönheit
Deine Reise hat gerade erst begonnen
Deine Geschichten werden sich entfalten

Geh einen Weg, den du selbst wählst
Entdecke, wer du bist
Fehler sollen dich nicht definieren, sondern
dich stärker machen, während du lernst

Du weißt, das ist deine Welt
Es ist deine Zeit, zu entdecken
Du kannst es überall schaffen
Du weißt, das ist deine Welt
Es ist deine Zeit, zu entdecken
Du kannst jede Tür öffnen

Dein Leben gehört dir, um es zu leben
Also wag den Sprung ins Vertrauen
Finde, was dir Freude bringt
Der Rest fügt sich von selbst

Unsere Liebe wird dir den Weg weisen
Eines Tages wirst du deine Spuren hinterlassen
Also strebe weiter nach Glück
Folge all deinen Träumen

Du weißt, das ist deine Welt
Es ist deine Zeit, zu entdecken
Du kannst es überall schaffen
Du weißt, das ist deine Welt
Es ist deine Zeit, zu entdecken
Du kannst jede Tür öffnen

Du weißt, das ist deine Welt
Es ist deine Zeit, zu entdecken
Du kannst es überall schaffen
Du weißt, das ist deine Welt
Es ist deine Zeit, zu entdecken
Du kannst jede Tür öffnen

Georgie
Georgie
Du kannst jede Tür öffnen
Georgie
Du kannst jede Tür öffnen`,
      es:
`Bienvenido a este mundo
Eres una belleza digna de contemplar
Tu viaje apenas comienza
Tus historias se irán desplegando

Recorre el camino que tú elijas
Descubre quién eres
Los errores no deben definirte, sino
hacerte más fuerte mientras aprendes

Sabes que este es tu mundo
Es tu momento de explorar
Puedes lograrlo donde sea
Sabes que este es tu mundo
Es tu momento de explorar
Puedes abrir cualquier puerta

Tu vida es tuya para vivirla
Así que da el salto de fe
Encuentra lo que te da alegría
Lo demás encajará solo

Nuestro amor te ayudará a guiarte
Dejarás tu huella algún día
Así que sigue buscando la felicidad
Sigue todos tus sueños

Sabes que este es tu mundo
Es tu momento de explorar
Puedes lograrlo donde sea
Sabes que este es tu mundo
Es tu momento de explorar
Puedes abrir cualquier puerta

Sabes que este es tu mundo
Es tu momento de explorar
Puedes lograrlo donde sea
Sabes que este es tu mundo
Es tu momento de explorar
Puedes abrir cualquier puerta

Georgie
Georgie
Puedes abrir cualquier puerta
Georgie
Puedes abrir cualquier puerta`,
      fi:
`Tervetuloa tähän maailmaan
Olet kaunis katsella
Matkasi on vasta alussa
Tarinasi avautuvat

Kulje polkua, jonka itse valitset
Löydä kuka olet
Virheet eivät saa määritellä sinua vaan
tehdä sinusta vahvemman oppiessasi

Tiedät, että tämä on sinun maailmasi
On sinun aikasi tutkia
Voit pärjätä missä tahansa
Tiedät, että tämä on sinun maailmasi
On sinun aikasi tutkia
Voit avata minkä tahansa oven

Elämäsi on sinun elettäväsi
Ota siis luottamuksen loikka
Löydä se, mikä tuo sinulle iloa
Loppu loksahtaa paikoilleen

Rakkautemme auttaa sinua löytämään tiesi
Jonain päivänä jätät jälkesi
Joten pyri edelleen onneen
Seuraa kaikkia unelmiasi

Tiedät, että tämä on sinun maailmasi
On sinun aikasi tutkia
Voit pärjätä missä tahansa
Tiedät, että tämä on sinun maailmasi
On sinun aikasi tutkia
Voit avata minkä tahansa oven

Tiedät, että tämä on sinun maailmasi
On sinun aikasi tutkia
Voit pärjätä missä tahansa
Tiedät, että tämä on sinun maailmasi
On sinun aikasi tutkia
Voit avata minkä tahansa oven

Georgie
Georgie
Voit avata minkä tahansa oven
Georgie
Voit avata minkä tahansa oven`,
      sv:
`Välkommen till den här världen
Du är en skönhet att skåda
Din resa har just börjat
Dina berättelser ska utvecklas

Gå en väg som du väljer
Upptäck vem du är
Misstag ska inte definiera dig utan
Göra dig starkare medan du lär

Du vet att det här är din värld
Det är din tid att utforska
Du kan klara dig överallt
Du vet att det här är din värld
Det är din tid att utforska
Du kan öppna vilken dörr som helst

Ditt liv är ditt att leva
Så ta språnget i tro
Hitta det som ger dig glädje
Resten faller på plats

Vår kärlek hjälper dig att hitta rätt
Du sätter ditt avtryck en dag
Så fortsätt sträva efter lycka
Följ alla dina drömmar

Du vet att det här är din värld
Det är din tid att utforska
Du kan klara dig överallt
Du vet att det här är din värld
Det är din tid att utforska
Du kan öppna vilken dörr som helst

Du vet att det här är din värld
Det är din tid att utforska
Du kan klara dig överallt
Du vet att det här är din värld
Det är din tid att utforska
Du kan öppna vilken dörr som helst

Georgie
Georgie
Du kan öppna vilken dörr som helst
Georgie
Du kan öppna vilken dörr som helst`,
    },
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
I'll give you all my love
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
I'll give you all my love
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
    lyricsTranslations: {
      de:
`In deinen Augen liegt Traurigkeit
Ich sehe die Spuren der Tränen, die du weinst
Die Maske deines Lächelns kann sie nicht verbergen
So sehr du es auch versuchst

Du saßest allein unter den Sternen
Hast dir etwas gewünscht unter dem Mond
Eine Liebe, die dich nach Hause bringt
Sie konnte nicht früh genug kommen

Der Winter kommt
Du stehst draußen in der Kälte
Alles, was du tun musst, ist
Nimm meine Hand
Da ist ein Feuer in mir
Das dich sicher und warm hält
Da ist ein Versprechen in meinem Herzen
Dass ich dir all meine Liebe schenke
Nur eines kann ich dir versprechen
Ich gebe dir meine ganze Liebe
Und alles, was ich bin
Und alles, was ich bin

Wenn wir so weit voneinander entfernt sind
Teilen wir zwei liebende Herzen
Wir schauen zum Mitternachtsmond auf
Und wünschen uns etwas unter denselben Sternen

Der Winter kommt
Du stehst draußen in der Kälte
Alles, was du tun musst, ist
Nimm meine Hand
Da ist ein Feuer in mir
Das dich sicher und warm hält
Da ist ein Versprechen in meinem Herzen
Dass ich dir all meine Liebe schenke
Nur eines kann ich dir versprechen
Ich gebe dir meine ganze Liebe
Und alles, was ich bin
Und alles, was ich bin

Alles, was du tun musst, ist
Nimm meine Hand

Wenn Ärger auf dich zukommt
Und es keine Spiele mehr zu spielen gibt
Werde ich immer an deiner Seite sein
Auch wenn ich tausend Meilen entfernt bin

Der Winter kommt
Du stehst draußen in der Kälte
Alles, was du tun musst, ist
Nimm meine Hand
Alles, was du tun musst, ist
Nimm meine Hand`,
      es:
`Hay una tristeza en tus ojos
Veo las huellas de las lágrimas que lloras
La máscara de tu sonrisa no puede ocultarlas
Aunque lo intentes

Te sentaste sola bajo las estrellas
Pediste un deseo bajo la luna
Por un amor que te llevara a casa
No podía llegar lo bastante pronto

Se acerca el invierno
Estás afuera, en el frío
Todo lo que tienes que hacer es
Tomar mi mano
Hay un fuego dentro
Para mantenerte a salvo y abrigada
Hay una promesa en mi corazón
De que te daré todo mi amor
Solo puedo prometerte
Que te daré todo mi amor
Y todo lo que soy
Y todo lo que soy

Cuando estamos tan lejos el uno del otro
Compartimos dos corazones enamorados
Miramos hacia la luna de medianoche
Y pedimos un deseo a las mismas estrellas

Se acerca el invierno
Estás afuera, en el frío
Todo lo que tienes que hacer es
Tomar mi mano
Hay un fuego dentro
Para mantenerte a salvo y abrigada
Hay una promesa en mi corazón
De que te daré todo mi amor
Solo puedo prometerte
Que te daré todo mi amor
Y todo lo que soy
Y todo lo que soy

Todo lo que tienes que hacer es
Tomar mi mano

Cuando los problemas lleguen a ti
Y ya no haya juegos que jugar
Siempre estaré a tu lado
Aunque esté a mil millas de distancia

Se acerca el invierno
Estás afuera, en el frío
Todo lo que tienes que hacer es
Tomar mi mano
Todo lo que tienes que hacer es
Tomar mi mano`,
      fi:
`Silmissäsi on surua
Näen kyynelten jäljet, joita itket
Hymysi naamio ei voi peittää niitä
Vaikka yrität

Istuit yksin tähtien alla
Toivoit jotakin kuun alla
Rakkautta, joka toisi sinut kotiin
Se ei voinut tulla tarpeeksi pian

Talvi on tulossa
Olet ulkona kylmässä
Sinun tarvitsee vain
Ottaa kädestäni
Sisälläni on tuli
Joka pitää sinut turvassa ja lämpimänä
Sydämessäni on lupaus
Että annan sinulle kaiken rakkauteni
Voin vain luvata sinulle
Että annan sinulle kaiken rakkauteni
Ja kaiken mitä olen
Ja kaiken mitä olen

Kun olemme niin kaukana toisistamme
Jaamme kaksi rakastavaa sydäntä
Katsomme ylös keskiyön kuuhun
Ja toivomme samojen tähtien alla

Talvi on tulossa
Olet ulkona kylmässä
Sinun tarvitsee vain
Ottaa kädestäni
Sisälläni on tuli
Joka pitää sinut turvassa ja lämpimänä
Sydämessäni on lupaus
Että annan sinulle kaiken rakkauteni
Voin vain luvata sinulle
Että annan sinulle kaiken rakkauteni
Ja kaiken mitä olen
Ja kaiken mitä olen

Sinun tarvitsee vain
Ottaa kädestäni

Kun vaikeudet kohtaavat sinut
Eikä enää ole leikittäviä leikkejä
Olen aina vierelläsi
Vaikka olen tuhannen mailin päässä

Talvi on tulossa
Olet ulkona kylmässä
Sinun tarvitsee vain
Ottaa kädestäni
Sinun tarvitsee vain
Ottaa kädestäni`,
      sv:
`Det finns en sorg i dina ögon
Jag ser spåren av tårarna du gråter
Din leende mask kan inte dölja dem
Hur du än försöker

Du satt ensam under stjärnorna
Önskade dig något under månen
En kärlek som skulle föra dig hem
Den kunde inte komma tillräckligt snart

Vintern kommer
Du är ute i kylan
Allt du behöver göra är att
Ta min hand
Det finns en eld inuti
För att hålla dig trygg och varm
Det finns ett löfte i mitt hjärta
Att jag ska ge dig all min kärlek
Jag kan bara lova dig
Att jag ger dig all min kärlek
Och allt jag är
Och allt jag är

När vi är så långt ifrån varandra
Delar vi två kärleksfulla hjärtan
Vi tittar upp mot midnattsmånen
Och önskar oss något under samma stjärnor

Vintern kommer
Du är ute i kylan
Allt du behöver göra är att
Ta min hand
Det finns en eld inuti
För att hålla dig trygg och varm
Det finns ett löfte i mitt hjärta
Att jag ska ge dig all min kärlek
Jag kan bara lova dig
Att jag ger dig all min kärlek
Och allt jag är
Och allt jag är

Allt du behöver göra är att
Ta min hand

När det blir svårt för dig
Och det inte finns några lekar att leka
Jag finns alltid vid din sida
Fastän jag är tusen mil bort

Vintern kommer
Du är ute i kylan
Allt du behöver göra är att
Ta min hand
Allt du behöver göra är att
Ta min hand`,
    },
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
    lyricsTranslations: {
      de:
`Wenn der sanfte Schnee zu fallen beginnt
Oh! Diese ganze Schönheit
Im warmen, sanften Schein des Feuers
Gibt es keinen Ort, an dem ich lieber wäre

Ich verbringe den Heiligabend mit dir
Während die hellsten Sterne durchscheinen
In deinen Armen fühlt es sich so richtig an
Von Liebe umhüllt, eine besondere Nacht
Oh! Es ist Weihnachten, Heiligabend mit dir
Jeder Wunsch und jeder Traum wird wahr
Nur wir zwei, unsere Liebe erneuert
Oh, es ist Heiligabend mit dir

Die Straßen der Stadt sind weich und weiß
Funkelnde Lichter erhellen die Nacht
Jedes leise gesungene Weihnachtslied
Bringt mich zurück in unsere jungen Jahre

Ich verbringe den Heiligabend mit dir
Während die hellsten Sterne durchscheinen
In deinen Armen fühlt es sich so richtig an
Von Liebe umhüllt, eine besondere Nacht
Oh! Es ist Weihnachten, Heiligabend mit dir
Jeder Wunsch und jeder Traum wird wahr
Nur wir zwei, unsere Liebe erneuert
Oh, es ist Heiligabend mit dir

Lass die Glocken läuten, lass sie erklingen
Für diese Liebe, die dein und mein ist
Unter dem Mistelzweig
Wo unsere Herzen glühen

Ich verbringe den Heiligabend mit dir
Während die hellsten Sterne durchscheinen
In deinen Armen fühlt es sich so richtig an
Von Liebe umhüllt, eine besondere Nacht
Oh! Es ist Weihnachten, Heiligabend mit dir
Oh! Es ist Weihnachten, Heiligabend
Nur wir zwei, unsere Liebe erneuert
Oh, es ist Heiligabend mit dir

Ja, es ist wieder Heiligabend
Mit deiner Liebe sind wir wieder eins
Halt mich fest, die ganze Nacht hindurch
Oh! Es ist Heiligabend mit dir`,
      es:
`Cuando la suave nieve empieza a caer
¡Oh! Qué belleza la de todo esto
Junto al cálido resplandor del fuego
No hay lugar al que prefiera ir

Paso la Nochebuena contigo
Mientras brillan las estrellas más luminosas
En tus brazos se siente tan bien
Envueltos en amor, una noche especial
¡Oh! Es Navidad, Nochebuena contigo
Cada deseo y cada sueño se hacen realidad
Solo nosotros dos, nuestro amor renovado
Oh, es Nochebuena contigo

Las calles de la ciudad son suaves y blancas
Luces centelleantes iluminan la noche
Cada villancico cantado con suavidad
Me lleva de vuelta a cuando éramos jóvenes

Paso la Nochebuena contigo
Mientras brillan las estrellas más luminosas
En tus brazos se siente tan bien
Envueltos en amor, una noche especial
¡Oh! Es Navidad, Nochebuena contigo
Cada deseo y cada sueño se hacen realidad
Solo nosotros dos, nuestro amor renovado
Oh, es Nochebuena contigo

Que suenen las campanas, que repiquen
Por este amor que es tuyo y mío
Bajo el muérdago
Donde nuestros corazones arden

Paso la Nochebuena contigo
Mientras brillan las estrellas más luminosas
En tus brazos se siente tan bien
Envueltos en amor, una noche especial
¡Oh! Es Navidad, Nochebuena contigo
¡Oh! Es Navidad, Nochebuena
Solo nosotros dos, nuestro amor renovado
Oh, es Nochebuena contigo

Sí, es Nochebuena otra vez
Con tu amor, somos uno otra vez
Abrázame fuerte, toda la noche
¡Oh! Es Nochebuena contigo`,
      fi:
`Kun pehmeä lumi alkaa sataa
Oi! Kaikki tuo kauneus
Lämpimän tulen hellässä hehkussa
Ei ole paikkaa, jonne mieluummin menisin

Vietän jouluaattoa kanssasi
Kun kirkkaimmat tähdet loistavat läpi
Sylissäsi tuntuu niin oikealta
Rakkauteen kietoutuneena, erityinen yö
Oi! On joulu, jouluaatto kanssasi
Jokainen toive ja jokainen unelma toteutuu
Vain me kaksi, rakkautemme uudistunut
Oi, on jouluaatto kanssasi

Kaupungin kadut ovat pehmeitä ja valkoisia
Tuikkivat valot valaisevat yön
Jokainen hiljaa laulettu joululaulu
Vie minut takaisin aikaan, jolloin olimme nuoria

Vietän jouluaattoa kanssasi
Kun kirkkaimmat tähdet loistavat läpi
Sylissäsi tuntuu niin oikealta
Rakkauteen kietoutuneena, erityinen yö
Oi! On joulu, jouluaatto kanssasi
Jokainen toive ja jokainen unelma toteutuu
Vain me kaksi, rakkautemme uudistunut
Oi, on jouluaatto kanssasi

Soikoot kellot, kilkuttakoot ne
Tälle rakkaudelle, joka on sinun ja minun
Misteliin alla
Missä sydämemme hehkuvat

Vietän jouluaattoa kanssasi
Kun kirkkaimmat tähdet loistavat läpi
Sylissäsi tuntuu niin oikealta
Rakkauteen kietoutuneena, erityinen yö
Oi! On joulu, jouluaatto kanssasi
Oi! On joulu, jouluaatto
Vain me kaksi, rakkautemme uudistunut
Oi, on jouluaatto kanssasi

Kyllä, on taas jouluaatto
Rakkautesi kanssa olemme taas yhtä
Pidä minua lähellä koko yön
Oi! On jouluaatto kanssasi`,
      sv:
`När den mjuka snön börjar falla
Åh! all den skönheten
Vid den varma brasans milda sken
Finns ingen plats jag hellre vill vara på

Jag firar julafton med dig
Medan de klaraste stjärnorna lyser igenom
I din famn känns det så rätt
Insvept i kärlek, en alldeles särskild natt
Åh! det är jul, julafton med dig
Varje önskan och varje dröm går i uppfyllelse
Bara vi två, vår kärlek förnyad
Åh, det är julafton med dig

Stadens gator är mjuka och vita
Blinkande ljus lyser upp natten
Varje julsång som sjungs sakta
För mig tillbaka till när vi var unga

Jag firar julafton med dig
Medan de klaraste stjärnorna lyser igenom
I din famn känns det så rätt
Insvept i kärlek, en alldeles särskild natt
Åh! det är jul, julafton med dig
Varje önskan och varje dröm går i uppfyllelse
Bara vi två, vår kärlek förnyad
Åh, det är julafton med dig

Låt klockorna ringa, låt dem klinga
För den här kärleken som är din och min
Under misteln
Där våra hjärtan glöder

Jag firar julafton med dig
Medan de klaraste stjärnorna lyser igenom
I din famn känns det så rätt
Insvept i kärlek, en alldeles särskild natt
Åh! det är jul, julafton med dig
Åh! det är jul, julafton
Bara vi två, vår kärlek förnyad
Åh, det är julafton med dig

Ja, det är julafton igen
Med din kärlek är vi ett igen
Håll mig nära, natten igenom
Åh! det är julafton med dig`,
    },
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
    lyricsTranslations: {
      de:
`Zwei folgen dem Einen
Und du folgst der Waffe

Gedanken füllen unsere Köpfe
Der Verstand dreht durch
Halte ein Bild fest
Wenn du außer Kontrolle bist
Einen Moment beobachtend

Und wenn nichts mehr einen Sinn ergibt
Setz einfach ein Lächeln auf

Finde einen Schlüssel zur Erleichterung
Wenn die Zeit ihn aussperrt
Verlangsame eine Bewegung
Fang das Spiegelbild der Vergangenheit ein
Auf der Suche nach einer wahren Linie

Und wenn sonst nichts mehr einen Sinn ergibt
Überhaupt nichts
Setz einfach ein Lächeln auf

Sieh dich um
Alles ist gut
Was ist gerade falsch
Alles ist gut

Zwei folgen dem Einen
Und du folgst der Waffe`,
      es:
`Dos siguen al uno
Y tú sigues al arma

Los pensamientos llenan nuestras cabezas
Las mentes se vuelven locas
Captura una imagen
Cuando estás fuera de control
Observando un instante

Y cuando nada tiene sentido
Simplemente ponte una sonrisa

Encuentra una llave hacia el alivio
Cuando el tiempo la deja fuera
Ralentiza un movimiento
Atrapa el reflejo del pasado
Buscando una línea verdadera

Y cuando nada más tiene sentido
En absoluto
Simplemente ponte una sonrisa

Mira a tu alrededor
Todo está bien
Qué pasa ahora mismo
Todo está bien

Dos siguen al uno
Y tú sigues al arma`,
      fi:
`Kaksi seuraa yhtä
Ja sinä seuraat asetta

Ajatukset täyttävät päämme
Mielet menevät sekaisin
Vangitse kuva
Kun olet hallinnan ulottumattomissa
Katsoen hetkeä

Ja kun mikään ei ole järkevää
Pane vain hymy huulillesi

Etsi avain helpotukseen
Kun aika sulkee sen ulos
Hidasta liikettä
Tavoita menneen heijastus
Etsien todellista linjaa

Ja kun mikään muukaan ei ole järkevää
Ollenkaan
Pane vain hymy huulillesi

Katso ympärillesi
Kaikki on hyvin
Mikä nyt on vialla
Kaikki on hyvin

Kaksi seuraa yhtä
Ja sinä seuraat asetta`,
      sv:
`Två följer den ene
Och du följer geväret

Tankar fyller våra huvuden
Sinnena blir galna
Fånga en bild
När du är utom kontroll
Betrakta ett ögonblick

Och när ingenting ger någon mening
Sätt bara på dig ett leende

Hitta en nyckel till lättnad
När tiden stänger ute det
Sakta ner en rörelse
Fånga spegelbilden av det förflutna
Sök en sann linje

Och när ingenting annat ger någon mening
Alls
Sätt bara på dig ett leende

Se dig omkring
Allt är bra
Vad är fel just nu
Allt är bra

Två följer den ene
Och du följer geväret`,
    },
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
