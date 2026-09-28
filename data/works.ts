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
  /** Optional 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD'. Orders releases within a year (drives the Song Concierge's "Latest release"). */
  releaseDate?: string;
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
  lyricsTranslations?: Partial<Record<'en' | 'de' | 'es' | 'sv' | 'fi' | 'fr' | 'it' | 'pt', string>>;
  story?: string;
  description?: string;
  /** Translations of `description`, keyed by site locale (the base `description` language is not repeated here) */
  descriptionTranslations?: Partial<Record<'en' | 'de' | 'es' | 'sv' | 'fi' | 'fr' | 'it' | 'pt', string>>;
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
      fr:
`On s'appelle régulièrement
Elle me demande toujours comment je vais
Et c'est elle qui sait me comprendre

Toujours le calme dans ma tempête
À travers la joie, à travers la peine

Si petit j'étais alors
Sans défense dans ta main
Maintenant je suis là
Pour toi

Il sent le pouls
Fait confiance au ressenti
Que le chemin mène toujours à la maison

Si petit j'étais alors
Sans défense dans ta main
Maintenant je suis là
Pour toi

Ta volonté forte
Ça peut être difficile pour moi
D'accepter nos limites

Si petite tu étais alors
Sans défense dans ma main
Maintenant nous sommes là
Pour toi

Le bonheur vient, le bonheur s'en va
Où que nous en soyons dans la vie
Nous sommes là l'un pour l'autre
Nous sommes là`,
      it:
`Ci sentiamo regolarmente
Lei mi chiede sempre come sto
Ed è lei che sa capirmi

Sempre la calma nella mia tempesta
Attraverso la gioia, attraverso il dolore

Così piccolo ero allora
Indifeso nella tua mano
Ora sono qui
Per te

Lui sente il polso
Si fida della sensazione
Che la strada porti sempre a casa

Così piccolo ero allora
Indifeso nella tua mano
Ora sono qui
Per te

La tua forte volontà
Può essere difficile per me
Accettare i nostri confini

Così piccola eri allora
Indifesa nella mia mano
Ora siamo qui
Per te

La felicità va, la felicità viene
Ovunque siamo nella vita
Ci siamo l'uno per l'altra
Ci siamo`,
      pt:
`Ligamos um para o outro regularmente
Ela pergunta sempre como estou
E é ela quem me sabe compreender

Sempre a calma na minha tempestade
Através da alegria, através da tristeza

Tão pequeno era eu então
Indefeso na tua mão
Agora estou aqui
Por ti

Ele sente o pulso
Confia no sentimento
De que o caminho leva sempre a casa

Tão pequeno era eu então
Indefeso na tua mão
Agora estou aqui
Por ti

A tua vontade forte
Pode ser difícil para mim
Aceitar os nossos limites

Tão pequena eras tu então
Indefesa na minha mão
Agora estamos aqui
Por ti

A felicidade vem, a felicidade vai
Onde quer que estejamos na vida
Estamos aqui um para o outro
Estamos aqui`,
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
    descriptionTranslations: {
      de:   'Geschrieben über Emils Familie: seine Verbindung zu seiner Frau und seiner Tochter, und zu seinen eigenen Eltern. Ein generationenübergreifendes Lied darüber, wie Menschen einander durchs Leben tragen, durch Freude oder Trauer. „Lyckan kommer, lyckan går / var vi än i livet står / finns vi där för varandra.“',
      sv:   'Skriven om Emils familj: hans band till sin fru och dotter, och till sina egna föräldrar. En generationsöverskridande låt om hur människor bär varandra genom livet, i glädje eller sorg. "Lyckan kommer, lyckan går / var vi än i livet står / finns vi där för varandra."',
      es:   'Escrita sobre la familia de Emil: su vínculo con su esposa e hija, y con sus propios padres. Una canción intergeneracional sobre cómo las personas se sostienen unas a otras a lo largo de la vida, en la alegría o en el duelo. «Lyckan kommer, lyckan går / var vi än i livet står / finns vi där för varandra».',
      fi:   'Kirjoitettu Emilin perheestä: hänen siteestään vaimoonsa ja tyttäreensä sekä omiin vanhempiinsa. Sukupolvien välinen laulu siitä, miten ihmiset kantavat toisiaan elämän läpi, ilossa tai surussa. ”Lyckan kommer, lyckan går / var vi än i livet står / finns vi där för varandra.”',
      fr:   'Écrite sur la famille d\'Emil : son lien avec sa femme et sa fille, et avec ses propres parents. Une chanson intergénérationnelle sur la façon dont on se porte les uns les autres à travers la vie, dans la joie comme dans le deuil. « Lyckan kommer, lyckan går / var vi än i livet står / finns vi där för varandra. »',
      it:   'Scritta sulla famiglia di Emil: il suo legame con la moglie e la figlia, e con i propri genitori. Una canzone tra generazioni su come le persone si sostengono a vicenda lungo la vita, nella gioia o nel lutto. «Lyckan kommer, lyckan går / var vi än i livet står / finns vi där för varandra».',
      pt:   'Escrita sobre a família de Emil: o seu vínculo com a esposa e a filha, e com os próprios pais. Uma canção entre gerações sobre como as pessoas se amparam ao longo da vida, na alegria ou no luto. «Lyckan kommer, lyckan går / var vi än i livet står / finns vi där för varandra».',
    },
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
      fr:
`J'aimerais parler de la société
J'aimerais parler de paix
J'aimerais parler d'humanité
tout ce qu'on ferait par amour, tout ce qu'on ferait pour qu'on se souvienne de nous

Brille comme le soleil de minuit
et tiens une lumière dans le noir
Je donnerai mon amour aux solitaires
Je donnerai mon amour, la seule chose à laquelle je veux consacrer mon attention
c'est de faire battre ton cœur deux fois

J'aimerais me lever comme Mandela
J'aimerais écrire une chanson comme celle de John Lennon
J'aimerais parler comme Martin Luther King
tout ce qu'on ferait par amour, tout ce qu'on ferait pour qu'on se souvienne de nous

Brille comme le soleil de minuit
et tiens une lumière dans le noir
Je donnerai mon amour aux solitaires
Je donnerai mon amour, la seule chose à laquelle je veux consacrer mon attention
c'est de faire battre ton cœur deux fois`,
      it:
`Vorrei parlare della società
Vorrei parlare di pace
Vorrei parlare di umanità
quanto faremmo per amore, quanto faremmo per essere ricordati

Splendi come il sole di mezzanotte
e tieni alta una luce nel buio
Darò il mio amore ai solitari
Darò il mio amore, l'unica cosa a cui voglio dedicare la mia attenzione
è far battere il tuo cuore due volte

Vorrei alzarmi in piedi come Mandela
Vorrei scrivere una canzone come quella di John Lennon
Vorrei parlare come Martin Luther King
quanto faremmo per amore, quanto faremmo per essere ricordati

Splendi come il sole di mezzanotte
e tieni alta una luce nel buio
Darò il mio amore ai solitari
Darò il mio amore, l'unica cosa a cui voglio dedicare la mia attenzione
è far battere il tuo cuore due volte`,
      pt:
`Gostaria de falar sobre a sociedade
Gostaria de falar sobre paz
Gostaria de falar sobre humanidade
tanto que faríamos por amor, tanto que faríamos para sermos lembrados

Brilha como o sol da meia-noite
e ergue uma luz na escuridão
Darei o meu amor aos solitários
Darei o meu amor, a única coisa a que quero dar a minha atenção
é fazer o teu coração bater duas vezes

Gostaria de me levantar como Mandela
Gostaria de escrever uma canção como a de John Lennon
Gostaria de falar como Martin Luther King
tanto que faríamos por amor, tanto que faríamos para sermos lembrados

Brilha como o sol da meia-noite
e ergue uma luz na escuridão
Darei o meu amor aos solitários
Darei o meu amor, a única coisa a que quero dar a minha atenção
é fazer o teu coração bater duas vezes`,
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
      fr:
`Deux suivent le un
Et toi tu suis le fusil

Les pensées remplissent nos têtes
Les esprits deviennent fous
Capture une image
Quand tu perds le contrôle
En observant un instant

Et quand plus rien n'a de sens
Affiche juste un sourire

Trouve une clé vers le soulagement
Quand le temps l'enferme dehors
Ralentis un mouvement
Attrape le reflet du passé
En cherchant une ligne vraie

Et quand plus rien d'autre n'a de sens
Du tout
Affiche juste un sourire

Regarde autour de toi
Tout va bien
Qu'est-ce qui ne va pas là maintenant
Tout va bien

Deux suivent le un
Et toi tu suis le fusil`,
      it:
`Due seguono l'uno
E tu segui il fucile

I pensieri riempiono le nostre teste
Le menti stanno impazzendo
Cattura un'immagine
Quando perdi il controllo
Osservando un momento

E quando niente ha più senso
Metti solo un sorriso

Trova una chiave per il sollievo
Quando il tempo la tiene fuori
Rallenta un movimento
Cogli il riflesso del passato
Cercando una linea vera

E quando nient'altro ha senso
Per niente
Metti solo un sorriso

Guardati intorno
Va tutto bene
Cosa c'è che non va adesso
Va tutto bene

Due seguono l'uno
E tu segui il fucile`,
      pt:
`Dois seguem o um
E tu segues a arma

Pensamentos enchem as nossas cabeças
As mentes estão a enlouquecer
Captura uma imagem
Quando perdes o controlo
Observando um momento

E quando nada faz sentido
Basta pôr um sorriso

Encontra uma chave para o alívio
Quando o tempo a tranca lá fora
Abranda um movimento
Apanha o reflexo do passado
Procurando uma linha verdadeira

E quando mais nada faz sentido
De todo
Basta pôr um sorriso

Olha à tua volta
Está tudo bem
O que está errado agora
Está tudo bem

Dois seguem o um
E tu segues a arma`,
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
      fr:
`J'ai regardé le soleil se coucher, se coucher dans la mer
Je te disais qu'on doit être libres, on doit être libres
les gens disent qu'on doit avoir de l'espoir, tu dois avoir de l'espoir
J'ai un rayon de lumière au-dessus de ma tête sur le chemin du retour

J'ai un rayon de lumière au-dessus de ma tête sur le chemin du retour ce soir
un rayon de lumière au-dessus de ma tête sur le chemin du retour
J'ai un rayon de lumière au-dessus de ma tête sur le chemin du retour ce soir
un rayon de lumière au-dessus de ma tête sur le chemin du retour

et donc on écoute le son des vagues de l'océan qui rongent le rivage
ouais, on écoute le souffle de la paix qui enveloppe tout
on a besoin d'une pierre à aiguiser pour polir notre folie parfaite
et donc on écoute le son de la réalité pour éclairer la route

J'ai un rayon de lumière au-dessus de ma tête sur le chemin du retour ce soir
un rayon de lumière au-dessus de ma tête sur le chemin du retour
J'ai un rayon de lumière au-dessus de ma tête sur le chemin du retour ce soir
un rayon de lumière au-dessus de ma tête sur le chemin du retour`,
      it:
`Ho guardato il sole tramontare, giù nel mare
Ti dicevo che dobbiamo essere liberi, dobbiamo essere liberi
la gente dice che dobbiamo avere speranza, devi avere speranza
Ho un raggio di luce sopra la testa sulla strada di casa

Ho un raggio di luce sopra la testa sulla strada di casa stanotte
un raggio di luce sopra la testa sulla strada di casa
Ho un raggio di luce sopra la testa sulla strada di casa stanotte
un raggio di luce sopra la testa sulla strada di casa

e così ascoltiamo il suono delle onde dell'oceano che consumano la riva
sì, ascoltiamo il respiro della pace che avvolge tutto
abbiamo bisogno di una pietra dura per smussare la nostra perfetta follia
e così ascoltiamo il suono della realtà per illuminare la strada

Ho un raggio di luce sopra la testa sulla strada di casa stanotte
un raggio di luce sopra la testa sulla strada di casa
Ho un raggio di luce sopra la testa sulla strada di casa stanotte
un raggio di luce sopra la testa sulla strada di casa`,
      pt:
`Tenho observado o sol a pôr-se, lá no mar
Tenho-te dito que temos de ser livres, temos de ser livres
as pessoas dizem que temos de ter esperança, tens de ter esperança
Tenho um raio de luz sobre a minha cabeça a caminho de casa

Tenho um raio de luz sobre a minha cabeça a caminho de casa esta noite
um raio de luz sobre a minha cabeça a caminho de casa
Tenho um raio de luz sobre a minha cabeça a caminho de casa esta noite
um raio de luz sobre a minha cabeça a caminho de casa

e por isso ouvimos o som das ondas do oceano a comerem a costa
sim, ouvimos a respiração da paz que envolve tudo
precisamos de uma pedra áspera para aparar a nossa loucura perfeita
e por isso ouvimos o som da realidade para iluminar o caminho

Tenho um raio de luz sobre a minha cabeça a caminho de casa esta noite
um raio de luz sobre a minha cabeça a caminho de casa
Tenho um raio de luz sobre a minha cabeça a caminho de casa esta noite
um raio de luz sobre a minha cabeça a caminho de casa`,
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
      fr:
`Je fouille dans les cendres d'un feu éteint
Je retrouve les traces d'une part de ma vie
Écrit autrefois en noir et blanc, un signe
Toi et moi avions prévu une vie nouvelle

Comme le feu, notre amour a brûlé si fort autrefois
La flamme est morte, il n'y avait plus de lumière
Plus d'étincelle
Plus de braise
Qui puisse à nouveau s'enflammer
Maintenant il ne reste que des nuits solitaires

Nuits solitaires, nuits solitaires
Les cendres de nos rêves
Nuits solitaires, nuits solitaires
Toutes les bonnes choses
Ont une fin

C'était écrit dans les étoiles, notre amour brillait
Nos âmes se sont rencontrées et ont dansé jusqu'à l'aube
Notre amour s'est arrêté et tout était fini
Effacé comme une brume sous le soleil du matin

Comme le feu, notre amour a brûlé si fort autrefois
La flamme est morte, il n'y avait plus de lumière
Plus d'étincelle
Plus de braise
Qui puisse à nouveau s'enflammer
Maintenant il ne reste que des nuits solitaires

Nuits solitaires, nuits solitaires
Les cendres de nos rêves
Nuits solitaires, nuits solitaires
Toutes les bonnes choses
Ont une fin

Je ne savais pas que ça finirait ainsi
Trahi par le désir d'un baiser volé
Tu préparais une autre vie sans moi
Fuyant un avenir qui n'existera jamais

Nuits solitaires, nuits solitaires
Les cendres de notre amour
Nuits solitaires, nuits solitaires
Toutes les bonnes choses
Ont une fin

Nuits solitaires, nuits solitaires
Les cendres de nos rêves
Nuits solitaires, nuits solitaires
Toutes les bonnes choses
Ont une fin`,
      it:
`Frugo tra le ceneri di un fuoco spento
Trovo le tracce di una parte della mia vita
Scritto un tempo in bianco e nero, un segno
Io e te avevamo progettato una vita nuova

Come il fuoco, il nostro amore un tempo bruciava così forte
La fiamma si è spenta, non c'era più luce
Nessuna scintilla
Nessuna brace
Che potesse riaccendersi
Ora tutto ciò che resta sono notti solitarie

Notti solitarie, notti solitarie
Le ceneri dei nostri sogni
Notti solitarie, notti solitarie
Tutte le cose belle
Hanno una fine

Era scritto nelle stelle, il nostro amore risplendeva
Le nostre anime si sono incontrate e hanno danzato fino all'alba
Il nostro amore si è fermato e tutto è finito
Svanito come una nebbia nel sole del mattino

Come il fuoco, il nostro amore un tempo bruciava così forte
La fiamma si è spenta, non c'era più luce
Nessuna scintilla
Nessuna brace
Che potesse riaccendersi
Ora tutto ciò che resta sono notti solitarie

Notti solitarie, notti solitarie
Le ceneri dei nostri sogni
Notti solitarie, notti solitarie
Tutte le cose belle
Hanno una fine

Non sapevo che sarebbe finita così
Tradito dal desiderio per un bacio rubato
Stavi progettando un'altra vita senza di me
In fuga da un futuro che non esisterà mai

Notti solitarie, notti solitarie
Le ceneri del nostro amore
Notti solitarie, notti solitarie
Tutte le cose belle
Hanno una fine

Notti solitarie, notti solitarie
Le ceneri dei nostri sogni
Notti solitarie, notti solitarie
Tutte le cose belle
Hanno una fine`,
      pt:
`Remexo nas cinzas de um fogo apagado
Encontro os vestígios de uma parte da minha vida
Escrito uma vez em preto e branco, um sinal
Tu e eu tínhamos planeado uma vida nova

Como o fogo, o nosso amor um dia ardeu tão forte
A chama morreu, já não havia luz
Nenhuma faísca
Nenhuma brasa
Que pudesse voltar a acender
Agora tudo o que resta são noites solitárias

Noites solitárias, noites solitárias
As cinzas dos nossos sonhos
Noites solitárias, noites solitárias
Todas as coisas boas
Chegam ao fim

Estava escrito nas estrelas, o nosso amor brilhava
As nossas almas encontraram-se e dançaram até à luz da manhã
O nosso amor parou e tudo tinha terminado
Desvanecido como uma névoa sob o sol da manhã

Como o fogo, o nosso amor um dia ardeu tão forte
A chama morreu, já não havia luz
Nenhuma faísca
Nenhuma brasa
Que pudesse voltar a acender
Agora tudo o que resta são noites solitárias

Noites solitárias, noites solitárias
As cinzas dos nossos sonhos
Noites solitárias, noites solitárias
Todas as coisas boas
Chegam ao fim

Mal sabia eu que chegaria a isto
Traído pelo desejo de um beijo roubado
Planeando outra vida sem mim
Fugindo de um futuro que nunca existirá

Noites solitárias, noites solitárias
As cinzas do nosso amor
Noites solitárias, noites solitárias
Todas as coisas boas
Chegam ao fim

Noites solitárias, noites solitárias
As cinzas dos nossos sonhos
Noites solitárias, noites solitárias
Todas as coisas boas
Chegam ao fim`,
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
      fr:
`sha boom sha boom shiriki boom owayo wee // 4x

Matsawana est venue me voir
elle a pris mon temple
au milieu de la nuit
elle a pris ma vie

Matsawana, Matsawana

sha boom sha boom shiriki boom owayo wee // 4x

depuis le jour de ma naissance
Matsawana-naa-na
elle me tient dans ses bras
Matsawana-naa-na
elle me guide à travers la vie
Matsawana-naa-na
puis elle m'emmène au loin
Matsawana-naa-na

sha boom sha boom shiriki boom owayo wee // 4x

Matsawana est venue me voir…

Matsawana, Matsawana

SOLO

Away wue wue wue wue
elle a pris mon temple
Away wue wue wue wue
elle a pris ma vie

Matsawana, Matsawana

Un loup d'ombre (est venu à moi) dans la nuit
m'a fixé dans le noir
je n'ai vu que le reflet de deux yeux brillants
et j'ai su que c'était comme avant`,
      it:
`sha boom sha boom shiriki boom owayo wee // 4x

Matsawana è venuta a trovarmi
ha preso il mio tempio
nel cuore della notte
ha preso la mia vita

Matsawana, Matsawana

sha boom sha boom shiriki boom owayo wee // 4x

dal giorno in cui sono nato
Matsawana-naa-na
mi tiene tra le sue braccia
Matsawana-naa-na
mi guida attraverso la vita
Matsawana-naa-na
poi mi porta via
Matsawana-naa-na

sha boom sha boom shiriki boom owayo wee // 4x

Matsawana è venuta a trovarmi…

Matsawana, Matsawana

ASSOLO

Away wue wue wue wue
ha preso il mio tempio
Away wue wue wue wue
ha preso la mia vita

Matsawana, Matsawana

Un lupo d'ombra (è venuto da me) nella notte
mi ha fissato nel buio
ho visto solo il riflesso di due occhi luminosi
e ho capito che era come prima`,
      pt:
`sha boom sha boom shiriki boom owayo wee // 4x

Matsawana veio me ver
ela tomou o meu templo
no meio da noite
ela tomou a minha vida

Matsawana, Matsawana

sha boom sha boom shiriki boom owayo wee // 4x

desde o dia em que nasci
Matsawana-naa-na
ela segura-me nos seus braços
Matsawana-naa-na
ela guia-me pela vida
Matsawana-naa-na
depois ela leva-me embora
Matsawana-naa-na

sha boom sha boom shiriki boom owayo wee // 4x

Matsawana veio me ver…

Matsawana, Matsawana

SOLO

Away wue wue wue wue
ela tomou o meu templo
Away wue wue wue wue
ela tomou a minha vida

Matsawana, Matsawana

Um lobo-sombra (veio até mim) à noite
olhou fixamente para mim na escuridão
só vi o reflexo de dois olhos brilhantes
e soube que era como antes`,
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
      fr:
`Tu veux te rapprocher vraiment
tu veux du vrai ?
Tu veux apprendre à connaître quelqu'un
sans laisser personne te connaître

tu vois, il y a un et deux
partagé moitié-moitié
tu donnes et tu reçois
et elle donne et elle reçoit

et tu fais des compromis
aussi responsables que nous sommes
et tu apprends à vivre
en te comprenant l'un l'autre

eh bien tu aimes ton propre rythme
quand tu es seul
et tu voudrais le garder pour toi
quand tu regardes une vue magnifique

mais il y a un et deux
partagé moitié-moitié
tu donnes et tu reçois
et elle donne et elle reçoit

et tu fais des compromis
aussi responsables que nous sommes
et tu apprends à vivre
en te comprenant l'un l'autre`,
      it:
`Vuoi avvicinarti davvero
vuoi qualcosa di vero?
Vuoi conoscere qualcuno
senza lasciare che nessuno ti conosca

vedi, c'è uno e due
diviso a metà ciascuno
tu dai e prendi
e lei dà e prende

e fai un compromesso
per quanto siamo responsabili
e impari a vivere
capendovi a vicenda

be', ti piace il tuo ritmo
quando sei per conto tuo
e vorresti tenertelo stretto
quando guardi una vista stupenda

ma c'è uno e due
diviso a metà ciascuno
tu dai e prendi
e lei dà e prende

e fai un compromesso
per quanto siamo responsabili
e impari a vivere
capendovi a vicenda`,
      pt:
`Queres chegar bem perto
queres algo real?
Queres conhecer alguém
sem deixar que ninguém te conheça

vês, há um e dois
dividido meio a meio
tu dás e recebes
e ela dá e recebe

e fazes um compromisso
tão responsáveis quanto somos
e aprendes a viver
compreendendo-vos um ao outro

bem, gostas do teu ritmo
quando estás sozinho
e gostarias de o guardar só para ti
quando olhas para uma vista deslumbrante

mas há um e dois
dividido meio a meio
tu dás e recebes
e ela dá e recebe

e fazes um compromisso
tão responsáveis quanto somos
e aprendes a viver
compreendendo-vos um ao outro`,
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
      fr:
`Repose tes os
jusqu'à ce que le sentiment grandisse
repose ton cœur
jusqu'à ce que l'étincelle vienne

relâche
relâche
relâche
relâche

Ferme les yeux
et prends une grande respiration
suis ton corps
une fois que tu le sens
trouve un peu de paix
trouve un peu de paix

relâche
relâche

Je pourrais te tromper en faisant un geste
plus rapide que ce que les yeux ou les oreilles peuvent saisir
poursuis-tu quelque chose
que tu ne peux pas atteindre

fais attention à tout ce qui t'entoure
laisse tes pieds prendre l'équilibre du sol
soudain tu es net et clair
comme une nuit étoilée

relâche
relâche`,
      it:
`Riposa le tue ossa
finché la sensazione non cresce
riposa il tuo cuore
finché non trovi la scintilla

lasciati andare
lasciati andare
lasciati andare
lasciati andare

Chiudi gli occhi
e fai un respiro profondo
segui il tuo corpo
una volta che lo senti
trova un po' di pace
trova un po' di pace

lasciati andare
lasciati andare

Potrei ingannarti con una mossa
più veloce di quanto occhi o orecchie possano cogliere
stai inseguendo qualcosa
che non riesci a raggiungere

fai attenzione a tutto ciò che ti circonda
lascia che i tuoi piedi trovino l'equilibrio del suolo
all'improvviso sei nitido e chiaro
come una notte stellata

lasciati andare
lasciati andare`,
      pt:
`Descansa os teus ossos
até a sensação crescer
descansa o teu coração
até sentires a faísca

alivia
alivia
alivia
alivia

Fecha os olhos
e respira fundo
segue o teu corpo
assim que o sentires
encontra um pouco de paz
encontra um pouco de paz

alivia
alivia

Eu poderia enganar-te com um movimento
mais rápido do que os olhos ou os ouvidos conseguem captar
estás a seguir algo
que não consegues alcançar

repara em tudo ao teu redor
deixa os teus pés equilibrarem-se no chão
de repente estás nítido e claro
como uma noite estrelada

alivia
alivia`,
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
      fr:
`Hier, j'étais assis seul
j'ai regardé autour de moi, tout ce que tu as fait
Hier, j'ai réalisé combien je t'aime

Hier, j'ai pensé à toi
à ce que tu fais et, comment tu le fais
Hier, j'ai pensé à toi

Me laisserais-tu t'atteindre ?
Me laisserais-tu t'atteindre ?

Hier, je me suis réveillé pour te voir
je me suis réveillé pour t'entendre, je me suis réveillé pour te sentir
Hier, j'ai réalisé, combien j'ai besoin de toi

Me laisserais-tu t'atteindre ?
Me laisserais-tu t'atteindre ?

J'ai pensé au sentiment et, j'ai pensé à la foi
j'ai pensé aux raisons pour lesquelles, les gens abandonnent
j'ai pensé à la liberté, laisserais-tu, quelqu'un s'approcher de toi ?

Me laisserais-tu t'atteindre ?
Me laisserais-tu t'atteindre ?`,
      it:
`Ieri, sedevo da solo
mi sono guardato intorno, a tutto quello che hai fatto
Ieri, ho capito quanto ti amo

Ieri, ho pensato a te
a cosa stai facendo e, come lo fai
Ieri, ho pensato a te

Mi lasceresti raggiungerti?
Mi lasceresti raggiungerti?

Ieri, mi sono svegliato per vederti
mi sono svegliato per sentirti, mi sono svegliato per percepirti
Ieri, ho capito, quanto ho bisogno di te

Mi lasceresti raggiungerti?
Mi lasceresti raggiungerti?

Ho pensato al sentimento e, ho pensato alla fede
ho pensato ai motivi per cui, le persone si arrendono
ho pensato alla libertà, lasceresti, che qualcuno ti si avvicini?

Mi lasceresti raggiungerti?
Mi lasceresti raggiungerti?`,
      pt:
`Ontem, sentei-me sozinho
olhei à minha volta, para tudo o que fizeste
Ontem, percebi o quanto te amo

Ontem, pensei em ti
no que estás a fazer e, como o fazes
Ontem, pensei em ti

Deixarias que eu te alcançasse?
Deixarias que eu te alcançasse?

Ontem, acordei para te ver
acordei para te ouvir, acordei para te sentir
Ontem, percebi, o quanto preciso de ti

Deixarias que eu te alcançasse?
Deixarias que eu te alcançasse?

Pensei no sentimento e, pensei na fé
pensei nas razões pelas quais, as pessoas desistem
pensei na liberdade, deixarias, alguém se aproximar de ti?

Deixarias que eu te alcançasse?
Deixarias que eu te alcançasse?`,
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
      fr:
`partage tes soucis, laisse sortir tes soucis maintenant
partage tes peines, laisse partir tes peines
partage ton cœur maintenant, dis-moi ce que tu ressens à l'intérieur
tout va bien, je suis là pour toi, je suis là pour toi
on est là pour toi, on est là pour toi, on est là pour toi…

parle, mon frère, dis-moi ce qu'il y a dans ton cœur
oh ma sœur,
parle, mon frère, dis-moi ce qu'il y a dans ton cœur
oh ma sœur,

quand je reste au fond, je te laisse partir
je reste seul, et je deviens froid
faute de paix à la maison
dans mon âme, je vieillis, je m'alourdis
et il n'y a pas d'amour pas d'amour pas d'amour tant que je ne sais pas

parle, mon frère, dis-moi ce qu'il y a dans ton cœur
oh ma sœur,
parle, mon frère, dis-moi ce qu'il y a dans ton cœur
oh ma sœur,

les rêves deviennent réels en partageant ton cœur
et on devient libres en partageant notre amour

alors parle, mon frère
parle, ma sœur

laisse sortir tes sentiments
laisse ton cœur se déverser`,
      it:
`condividi le tue preoccupazioni, lasciale uscire adesso
condividi i tuoi affanni, lasciali andare
condividi il tuo cuore adesso, dimmi cosa senti dentro
va tutto bene, ci sono io per te, ci sono io per te
ci siamo noi per te, ci siamo noi per te, ci siamo noi per te…

parla, fratello, dimmi cosa hai nel cuore
oh sorella,
parla, fratello, dimmi cosa hai nel cuore
oh sorella,

quando resto giù, ti lascio andare
resto solo, e mi raffreddo
per mancanza di pace in casa
nella mia anima, invecchio, divento pesante
e non c'è amore non c'è amore non c'è amore finché non lo so

parla, fratello, dimmi cosa hai nel cuore
oh sorella,
parla, fratello, dimmi cosa hai nel cuore
oh sorella,

i sogni diventano realtà condividendo il tuo cuore
e diventiamo liberi condividendo il nostro amore

quindi parla, fratello
parla, sorella

lascia uscire i tuoi sentimenti
lascia che il tuo cuore si riversi`,
      pt:
`partilha as tuas preocupações, deixa-as sair agora
partilha os teus problemas, deixa-os ir
partilha o teu coração agora, diz-me como te sentes por dentro
está tudo bem, eu estou aqui por ti, eu estou aqui por ti
nós estamos aqui por ti, nós estamos aqui por ti, nós estamos aqui por ti…

fala, irmão, diz-me o que tens no coração
oh irmã,
fala, irmão, diz-me o que tens no coração
oh irmã,

quando fico em baixo, deixo-te ir
fico sozinho, e fico frio
por falta de paz em casa
na minha alma, envelheço, fico pesado
e não há amor não há amor não há amor até eu saber

fala, irmão, diz-me o que tens no coração
oh irmã,
fala, irmão, diz-me o que tens no coração
oh irmã,

os sonhos tornam-se reais ao partilhar o teu coração
e ficamos livres ao partilhar o nosso amor

por isso fala, irmão
fala, irmã

deixa sair os teus sentimentos
deixa o teu coração transbordar`,
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
      fr:
`Je veux parler du temps
tel que je le sens bouger
Je veux parler de la ligne,
que je vois chaque jour
Je veux parler du temps
Tout tourne en rond

Comme un océan, les temps changent
Et nous naviguons à travers les vagues
Comme nous tournons autour du soleil
Nous reviendrons là où tout a commencé

Pour rester stable, pour rester capable
Continuer à tourner, continuer à bouger
c'est une question d'équilibre entre opposés
ils restent aussi bas, aussi haut
jusqu'à la fin des temps semble-t-il

Comme un océan, les temps changent
Et nous naviguons à travers les vagues
Comme nous tournons autour du soleil
Nous reviendrons là où tout a commencé`,
      it:
`Voglio parlare dei tempi
mentre li sento muoversi
Voglio parlare della linea,
che vedo ogni giorno
Voglio parlare dei tempi
Tutto gira intorno

Come un oceano, i tempi cambiano
E navighiamo attraverso le onde
Come giriamo intorno al sole
Torneremo dove abbiamo iniziato

Per restare stabili, per restare capaci
Continuare a girare, continuare a muoversi
è una questione di equilibrio tra opposti
restano tanto in basso, quanto in alto
fino alla fine dei tempi, sembra

Come un oceano, i tempi cambiano
E navighiamo attraverso le onde
Come giriamo intorno al sole
Torneremo dove abbiamo iniziato`,
      pt:
`Quero falar sobre os tempos
como os sinto a mover-se
Quero falar sobre a linha,
que vejo todos os dias
Quero falar sobre os tempos
Tudo gira em torno

Como um oceano, os tempos mudam
E navegamos através das ondas
Como giramos à volta do sol
Voltaremos a onde começámos

Para nos mantermos estáveis, para nos mantermos capazes
Continuar a girar, continuar a mover
é uma questão de equilíbrio entre opostos
mantêm-se tão baixos, quanto altos
até ao fim dos tempos, parece

Como um oceano, os tempos mudam
E navegamos através das ondas
Como giramos à volta do sol
Voltaremos a onde começámos`,
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
      fr:
`Bienvenue à la maison, entre dans le vestibule
enlève tes chaussures, accroche ta veste
petit devient grand, tu es bien plus vieux depuis que tu es parti

viens t'asseoir, installe-toi sur le canapé
raconte-moi tout, tout ce qui s'est passé
tu as dit que tu avais rencontré quelqu'un qui se rapprochait de toi un peu plus chaque jour

tu as dit que je savais sans doute qui il était…

cours, cours, cours, il ne manque plus rien maintenant
tombe, tombe, tombe dans les bras l'un de l'autre
prends ma main et tiens-la toute la vie
cours, cours, cours, des cœurs grands en flammes
tombe, tombe, tombe ensemble dans un rêve
et fais-en une réalité

tu as vu ce qu'on a fait, on a tout rénové
la cuisine est grande maintenant, il y a de la place pour bien plus
ici on peut respirer, ici on peut vivre, dans le calme et la paix

tu veux des petites crêpes ? on peut aussi les partager
tu te souviens de la fois où on les a toutes brûlées
je veux chanter toutes les chansons qu'on chantait
elles parlent d'une journée ordinaire

tous les souvenirs qu'on a…

cours, cours, cours, il ne manque plus rien maintenant
tombe, tombe, tombe dans les bras l'un de l'autre
prends ma main et tiens-la toute la vie
cours, cours, cours, des cœurs grands en flammes
tombe, tombe, tombe ensemble dans un rêve
et fais-en une réalité

pour un avenir à deux, les étoiles scintillent dans la nuit
d'un amour si grand…`,
      it:
`Bentornato a casa, entra nell'ingresso
togliti le scarpe, appendi la giacca
il piccolo diventa grande, sei molto più vecchio da quando sei partito

vieni a sederti, siediti sul divano
raccontami tutto, tutto quello che è successo
hai detto che avevi conosciuto uno che ti si avvicinava un po' di più ogni giorno

hai detto che di sicuro sapevo chi era…

corri, corri, corri, ora non manca più niente
cadi, cadi, cadi tra le braccia l'uno dell'altra
prendi la mia mano e tienila per tutta la vita
corri, corri, corri, cuori grandi in fiamme
cadi, cadi, cadi insieme in un sogno
e rendilo realtà

hai visto cosa abbiamo fatto, abbiamo ristrutturato
la cucina è grande adesso, ci sta molto di più
qui possiamo respirare, qui possiamo vivere, in pace e tranquillità

vuoi delle frittelle? possiamo anche dividerle
ti ricordi quella volta che le abbiamo bruciate tutte
voglio cantare tutte le canzoni che cantavamo
parlano di un giorno qualunque

tutti i ricordi che abbiamo…

corri, corri, corri, ora non manca più niente
cadi, cadi, cadi tra le braccia l'uno dell'altra
prendi la mia mano e tienila per tutta la vita
corri, corri, corri, cuori grandi in fiamme
cadi, cadi, cadi insieme in un sogno
e rendilo realtà

per un futuro in due, le stelle scintillano nella notte
di un amore così grande…`,
      pt:
`Bem-vindo a casa, entra no hall
tira os teus sapatos, pendura o teu casaco
o pequeno cresce, estás bem mais velho desde que partiste

vem sentar-te, senta-te no sofá
conta-me tudo, tudo o que aconteceu
disseste que conheceste alguém que se aproximava mais de ti a cada dia

disseste que eu decerto sabia quem ele era…

corre, corre, corre, agora não falta nada
cai, cai, cai nos braços um do outro
pega na minha mão e segura-a por toda a vida
corre, corre, corre, corações grandes em chamas
cai, cai, cai juntos num sonho
e torna-o realidade

viste o que fizemos, renovámos
a cozinha é grande agora, cabe muito mais
aqui podemos respirar, aqui podemos viver, em paz e sossego

queres panquecas? também podemos dividir
lembras-te daquela vez em que as queimámos todas
quero cantar todas as canções que cantávamos
falam de um dia comum

todas as memórias que temos…

corre, corre, corre, agora não falta nada
cai, cai, cai nos braços um do outro
pega na minha mão e segura-a por toda a vida
corre, corre, corre, corações grandes em chamas
cai, cai, cai juntos num sonho
e torna-o realidade

por um futuro a dois, as estrelas cintilam na noite
de um amor tão grande…`,
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
    descriptionTranslations: {
      de:   'Über Emils Kindheitsjahre in Pargas – das Erwachsenwerden und die Anfänge seines Musizierens.',
      sv:   'Om Emils barndomsår i Pargas, uppväxten och när han började spela musik.',
      es:   'Sobre la infancia de Emil en Pargas, creciendo y empezando a tocar música.',
      fi:   'Emilin lapsuusvuosista Paraisilla, kasvamisesta ja musiikin soittamisen aloittamisesta.',
      fr:   'Sur les années d\'enfance d\'Emil à Pargas, sa croissance et ses débuts en musique.',
      it:   'Sull\'infanzia di Emil a Pargas, sulla crescita e sui suoi primi passi nella musica.',
      pt:   'Sobre a infância de Emil em Pargas, crescendo e começando a tocar música.',
    },
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
      fr:
`C'est silencieux là-bas près du marais
Lisse comme un miroir et froid
Je rentre à la maison
En pleine nuit, sans réponse

Je marche vers le bas, vers l'eau
Tandis que le brouillard s'installe
Le cri du plongeon résonne
Sur le lac

Comme le sable dans ma main
Mon temps s'écoule
Comment doit-on vivre sa vie ?
Qui prend mes décisions ?

Comme le sable dans ma main
Reste-t-il quelque chose ?
Quand la vie qu'on vit
S'écoule
Comme le sable dans ma main

Je reste assis, en bas sur la plage
Dans un souffle intemporel
Au-dessus
Un satellite passe

Je sens l'odeur de l'automne
Comme quand la nuit devient jour
Peut-on renaître
À l'aube ?

Comme le sable dans ma main
Mon temps s'écoule
Comment doit-on vivre sa vie ?
Qui prend mes décisions ?

Comme le sable dans ma main
Reste-t-il quelque chose ?
Quand la vie qu'on vit
S'écoule
Comme le sable dans ma main

Comment doit-on vivre sa vie ?
Qui prend mes décisions ?
Quand la vie qu'on vit
S'écoule

Comme le sable dans ma main`,
      it:
`C'è silenzio giù vicino alla palude
Liscia come uno specchio e fredda
Torno a casa
Nel cuore della notte, senza risposta

Cammino giù, giù verso l'acqua
Mentre la nebbia avvolge tutto
Il grido dello strolaga riecheggia
Sul lago

Come la sabbia nella mia mano
Il mio tempo scorre via
Come si dovrebbe vivere la vita?
Chi prende le mie decisioni?

Come la sabbia nella mia mano
Resta qualcosa?
Quando la vita che viviamo
Scorre via
Come la sabbia nella mia mano

Resto seduto, giù sulla spiaggia
In un respiro senza tempo
Sopra
Passa un satellite

Sento il profumo dell'autunno
Come quando la notte diventa giorno
Possiamo rinascere
All'alba?

Come la sabbia nella mia mano
Il mio tempo scorre via
Come si dovrebbe vivere la vita?
Chi prende le mie decisioni?

Come la sabbia nella mia mano
Resta qualcosa?
Quando la vita che viviamo
Scorre via
Come la sabbia nella mia mano

Come si dovrebbe vivere la vita?
Chi prende le mie decisioni?
Quando la vita che viviamo
Scorre via

Come la sabbia nella mia mano`,
      pt:
`Está silencioso lá em baixo junto ao pântano
Liso como um espelho e frio
Volto para casa
A meio da noite, sem resposta

Caminho para baixo, para baixo até à água
Enquanto a névoa se instala
Ecoa o grito da mobelha
Sobre o lago

Como a areia na minha mão
O meu tempo escoa-se
Como se deve viver a vida?
Quem toma as minhas decisões?

Como a areia na minha mão
Fica alguma coisa?
Quando a vida que vivemos
Se escoa
Como a areia na minha mão

Fico sentado, lá em baixo na praia
Numa respiração intemporal
Por cima
Passa um satélite

Sinto o cheiro do outono
Como quando a noite se torna dia
Podemos renascer
Ao amanhecer?

Como a areia na minha mão
O meu tempo escoa-se
Como se deve viver a vida?
Quem toma as minhas decisões?

Como a areia na minha mão
Fica alguma coisa?
Quando a vida que vivemos
Se escoa
Como a areia na minha mão

Como se deve viver a vida?
Quem toma as minhas decisões?
Quando a vida que vivemos
Se escoa

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
    descriptionTranslations: {
      de:   'Inspiriert von Majors träsk in Malax, wo Eriks Vater aufgewachsen ist und wo Eriks Schwester heute mit ihrer Familie lebt. Entstanden aus Gesprächen mit seinem Vater über das Vergehen der Zeit, die Sterblichkeit, und einen melancholischen Versuch, den Tod anzunehmen.',
      sv:   'Inspirerad av Majors träsk i Malax, där Eriks pappa växte upp och där Eriks syster nu bor med sin familj. Skriven utifrån samtal med hans pappa om tidens gång, dödligheten, och ett melankoliskt försök att acceptera döden.',
      es:   'Inspirada en Majors träsk, en Malax, donde el padre de Erik creció y donde ahora vive la hermana de Erik con su familia. Escrita a partir de conversaciones con su padre sobre el paso del tiempo, la mortalidad, y un intento melancólico de aceptar la muerte.',
      fi:   'Innoittajana Majors träsk Maalahdessa, jossa Erikin isä kasvoi ja jossa Erikin sisko nykyään asuu perheineen. Kirjoitettu keskusteluista isänsä kanssa ajan kulumisesta, kuolevaisuudesta ja haikeasta yrityksestä hyväksyä kuolema.',
      fr:   'Inspirée par Majors träsk à Malax, où le père d\'Erik a grandi et où sa sœur vit aujourd\'hui avec sa famille. Née de conversations avec son père sur le passage du temps, la mortalité, et une tentative mélancolique d\'accepter la mort.',
      it:   'Ispirata a Majors träsk, a Malax, dove è cresciuto il padre di Erik e dove oggi vive la sorella di Erik con la sua famiglia. Nata da conversazioni con suo padre sullo scorrere del tempo, la mortalità, e un malinconico tentativo di accettare la morte.',
      pt:   'Inspirada em Majors träsk, em Malax, onde o pai de Erik cresceu e onde a irmã de Erik agora vive com a família. Escrita a partir de conversas com o pai sobre a passagem do tempo, a mortalidade, e uma tentativa melancólica de aceitar a morte.',
    },
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
      fr:
`Je suis passé prendre le Vasabladet et j'ai frappé à ta porte
tu étais assis à manger ton porridge du matin comme d'habitude
puis on a dirigé nos pas vers le centre du village
parfois à travers la forêt, derrière la haie, par-dessus les tombes de guerre

Quand les feuilles d'automne tombaient sur le sol de l'érablière
on marchait là, en pensant à
Quand le soleil d'hiver brillait sur les murs couverts de neige
on était allongés là, à faire des anges dans la neige

Le long du chemin

Tu m'as emmené à Malax IF et tu as dit,
passe-la à Robban ou à Basti, et puis j'ai marqué contre mon camp,
en tant que défenseur on est plus près de son propre but...
ils me l'ont sûrement raconté après,

qu'on devait avancer, qu'on devait s'écouter l'un l'autre
qu'on devait viser l'espace vide et courir aussi vite qu'on peut
on peut gagner n'importe quoi,
si on joue ensemble

Le long du chemin

On a construit des châteaux et des forteresses tout autour de la cour de Storm
c'étaient des boucliers et des épées, c'étaient des héros et du drame,
on défendait notre foyer contre une sombre fantaisie

Qu'est-ce qu'il reste à expliquer, juste une poésie simple
sur le fait d'être là, tout simplement, sur le fait de vivre comme un seul « nous »
que je suis heureux ici avec toi, à chaque instant qu'on a la chance de partager

Le long du chemin
Le long du chemin`,
      it:
`Sono passato a prendere il Vasabladet e ho bussato alla tua porta
eri seduto a mangiare la tua pappa d'avena del mattino come al solito
poi abbiamo diretto i nostri passi verso il centro del paese
a volte attraverso il bosco, dietro la siepe, oltre le tombe di guerra

Quando le foglie d'autunno cadevano sul pavimento dell'acero
camminavamo lì, pensando a
Quando il sole d'inverno splendeva sui muri coperti di neve
eravamo sdraiati lì, a fare angeli nella neve

Lungo la strada

Mi hai portato al Malax IF e hai detto,
passala a Robban o a Basti, e poi ho fatto un autogol,
da difensore si è più vicini alla propria porta...
me l'hanno raccontato dopo, probabilmente,

che dovevamo andare avanti, dovevamo ascoltarci a vicenda
dovevamo puntare allo spazio vuoto e correre più veloce che potevamo
possiamo vincere qualsiasi cosa,
se giochiamo insieme

Lungo la strada

Abbiamo costruito castelli e fortezze tutto intorno al cortile di Storm
erano scudi e spade, erano eroi e dramma,
difendevamo la nostra casa da una fantasia oscura

Cosa resta da spiegare, solo una semplice poesia
sull'essere qui, semplicemente, sul vivere come un unico "noi"
che sono felice qui con te, in ogni momento che possiamo condividere

Lungo la strada
Lungo la strada`,
      pt:
`Fui buscar o Vasabladet e bati à tua porta
estavas sentado a comer a tua papa da manhã como sempre
depois seguimos os nossos passos até ao centro da vila
às vezes pela floresta, atrás da sebe, por cima das sepulturas de guerra

Quando as folhas de outono caíam sobre o chão do bosque de bordos
caminhávamos ali, a pensar em
Quando o sol de inverno brilhava sobre os muros cobertos de neve
deitávamo-nos ali, a fazer anjos na neve

Ao longo do caminho

Levaste-me ao Malax IF e disseste,
passa a bola ao Robban ou ao Basti, e depois marquei um autogolo,
como defesa estamos mais perto da nossa própria baliza...
contaram-me isso depois, provavelmente,

que devíamos avançar, devíamos ouvir-nos um ao outro
devíamos apontar ao espaço vazio e correr o mais rápido que pudéssemos
podemos vencer qualquer coisa,
se jogarmos juntos

Ao longo do caminho

Construímos castelos e fortalezas por todo o pátio do Storm
eram escudos e espadas, eram heróis e drama,
defendíamos o nosso lar contra uma fantasia sombria

O que resta para explicar, apenas uma poesia simples
sobre estar aqui, simplesmente, sobre viver como um único "nós"
que sou feliz aqui contigo, em cada momento que temos para partilhar

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
    descriptionTranslations: {
      de:   'Der Titeltrack, über Eriks Verbindung zu seinem besten Kindheitsfreund Viktor – die beiden kennen sich, seit sie ein paar Monate alt waren. Das Lied begann als die Rede, die Erik bei Viktors Hochzeit hielt.',
      sv:   'Titelspåret, om Eriks band till sin barndomsvän Viktor – de två har känt varandra sedan de var några månader gamla. Låten började som talet Erik höll på Viktors bröllop.',
      es:   'El tema que da título al álbum, sobre el vínculo de Erik con su mejor amigo de la infancia, Viktor: se conocen desde que tenían apenas unos meses. La canción nació como el discurso que Erik dio en la boda de Viktor.',
      fi:   'Levyn nimikappale, Erikin siteestä lapsuudenystäväänsä Viktoriin – he ovat tunteneet toisensa muutaman kuukauden ikäisestä lähtien. Laulu sai alkunsa puheesta, jonka Erik piti Viktorin häissä.',
      fr:   'La chanson-titre, sur le lien d\'Erik avec son meilleur ami d\'enfance, Viktor — ils se connaissent depuis qu\'ils avaient quelques mois. La chanson est née du discours qu\'Erik a prononcé au mariage de Viktor.',
      it:   'La title track, sul legame di Erik con il suo migliore amico d\'infanzia, Viktor: i due si conoscono da quando avevano pochi mesi. La canzone è nata dal discorso che Erik ha tenuto al matrimonio di Viktor.',
      pt:   'A faixa-título, sobre a ligação de Erik com o seu melhor amigo de infância, Viktor — os dois se conhecem desde que tinham poucos meses de vida. A canção nasceu do discurso que Erik fez no casamento de Viktor.',
    },
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
      fr:
`Réserve un billet
Faisons un petit voyage
Vers des horizons ouverts
J'ai une aventure qui m'attend

On peut s'envoler pour le Népal
Traverser la Russie en train
Prendre un bateau en Nouvelle-Zélande
Voler haut et plonger bas

Libre comme un oiseau
Libre comme le vent
Ici dans le monde
Je suis libre, libre
Libre comme un oiseau

Saute dans mon kayak
On peut pagayer le long de la Haute Côte
Rêver des hautes montagnes
J'ai toujours envie de randonner

Grimper au sommet du Kilimandjaro
Reprendre son souffle à Zanzibar
Faire trempette en Méditerranée
Il reste tant de destinations

Libre comme un oiseau
Libre comme le vent
Ici dans le monde
Je suis libre, ici je suis libre
Libre comme un oiseau

Un voyage autour du monde
Mon esprit est encore jeune
Je vais voyager autour du monde avant de
Prendre mon dernier souffle

Libre comme un oiseau
Libre comme le vent
Ici dans le monde
Je suis libre, ici je suis libre
Libre comme un oiseau`,
      it:
`Prenota un biglietto
Facciamo un piccolo viaggio
Verso orizzonti aperti
Ho un'avventura in programma

Possiamo volare in Nepal
Attraversare la Russia in treno
Prendere una barca in Nuova Zelanda
Volare alto e tuffarci in basso

Libero come un uccello
Libero come il vento
Qui nel mondo
Sono libero, libero
Libero come un uccello

Salta nel mio kayak
Possiamo remare lungo l'Alta Costa
Desiderare le alte montagne
Sento sempre la voglia di camminare

Salire in cima al Kilimangiaro
Riprendere fiato a Zanzibar
Fare un tuffo nel Mediterraneo
Ci sono ancora così tante mete

Libero come un uccello
Libero come il vento
Qui nel mondo
Sono libero, qui sono libero
Libero come un uccello

Un viaggio intorno al mondo
La mia mente è ancora giovane
Viaggerò intorno al mondo prima di
Fare il mio ultimo respiro

Libero come un uccello
Libero come il vento
Qui nel mondo
Sono libero, qui sono libero
Libero come un uccello`,
      pt:
`Reserva um bilhete
Vamos fazer uma pequena viagem
Rumo a horizontes abertos
Tenho uma aventura à espera

Podemos voar para o Nepal
Atravessar a Rússia de comboio
Apanhar um barco na Nova Zelândia
Voar alto e mergulhar fundo

Livre como um pássaro
Livre como o vento
Aqui no mundo
Estou livre, livre
Livre como um pássaro

Salta para o meu caiaque
Podemos remar ao longo da Costa Alta
Ansiar pelas montanhas altas
Sinto sempre vontade de caminhar

Subir ao topo do Kilimanjaro
Recuperar o fôlego em Zanzibar
Dar um mergulho no Mediterrâneo
Ainda há tantos destinos por conhecer

Livre como um pássaro
Livre como o vento
Aqui no mundo
Estou livre, aqui estou livre
Livre como um pássaro

Uma viagem à volta do mundo
A minha mente ainda é jovem
Vou viajar à volta do mundo antes de
Dar o meu último suspiro

Livre como um pássaro
Livre como o vento
Aqui no mundo
Estou livre, aqui estou livre
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
    descriptionTranslations: {
      de:   'Über Eriks Mutter, für die Reisen Freiheit bedeutet – Kajak, Wandern, Zug, Bus, Flugzeug, Fahrrad, immer in Bewegung, mit welchem Mittel auch immer.',
      sv:   'Om Eriks mamma, för vilken resande är frihet – kajak, vandring, tåg, buss, flyg, cykel, alltid i rörelse på vilket sätt hon än kan.',
      es:   'Sobre la madre de Erik, para quien viajar es libertad: kayak, senderismo, tren, autobús, avión, bicicleta, siempre en movimiento por cualquier medio posible.',
      fi:   'Erikin äidistä, jolle matkustaminen on vapautta – kajakki, vaellus, juna, bussi, lento, pyörä, aina liikkeessä millä tahansa keinolla.',
      fr:   'Sur la mère d\'Erik, pour qui voyager est synonyme de liberté — kayak, randonnée, train, bus, avion, vélo, toujours en mouvement, par tous les moyens possibles.',
      it:   'Sulla madre di Erik, per cui viaggiare è libertà: kayak, escursioni, treno, autobus, aereo, bicicletta, sempre in movimento con qualsiasi mezzo possibile.',
      pt:   'Sobre a mãe de Erik, para quem viajar é liberdade — caiaque, caminhadas, trem, ônibus, avião, bicicleta, sempre em movimento, por qualquer meio possível.',
    },
  },
  {
    id:            'stanna',
    slug:          'stanna',
    title:         'Stanna',
    workType:      'collaboration',
    year:          2026,
    releaseDate:   '2026-09',   // TODO: confirm exact release date — makes Stanna the newest release
    releaseStatus: 'released',
    featured:      false,
    language:      'Swedish',
    meta:          '2026 · with Emil Nordström · Swedish',
    album:         'langs-med-vagen-album',
    coverImage:    'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02260f62f2a1fc9602fa2d662c',
    spotifyUrl:    'https://open.spotify.com/track/6BYAYynES64GQgdBpHXvii',
    tidalUrl:      tidalSearch('Stanna Sjøholm Nordström'),
    description:
`Stanna is a song about wanting time to stand still. The chorus wishes we could stay here forever, like a stone statue in the city, unchanged and untouched by the years.

But the song doesn't stay in that wish. It turns to a harder question: what is it that stays? Is a memory all that's left of everything we were, and everything we had?

For me, the song comes from the people in my life: my parents, my relationships, the different versions of myself. You invest so much time in someone, and then one day that version of them is gone. Sometimes it's slow change. Sometimes it's an illness, and you miss the healthy person they used to be. You can't get that version back, and you can't get your own back either. Stanna sits in that frustration, and in the tenderness underneath it.

It's a single from the album Längs med vägen, written together with my co-writer.`,
    descriptionTranslations: {
      sv:
`Stanna handlar om att vilja att tiden ska stå still. I refrängen önskar man att man kunde stanna kvar för alltid, som en stenstaty i stan, oförändrad och orörd av åren.

Men låten stannar inte i den önskan. Den vänder sig till en svårare fråga: vad är det som stannar kvar? Är ett minne allt som finns kvar av allt vi var, och allt vi hade?

För mig kommer låten från människorna i mitt liv: mina föräldrar, mina relationer, mina olika versioner av mig själv. Man investerar så mycket tid i någon, och sedan en dag är den versionen av dem borta. Ibland är det en långsam förändring. Ibland är det en sjukdom, och man saknar den friska person som de en gång var. Man kan inte få tillbaka den versionen, och man kan inte få tillbaka sin egen heller. Stanna ligger i den frustrationen, och i ömheten som finns under den.

Det är en singel från albumet Längs med vägen, skriven tillsammans med min medförfattare.`,
      de:
`Stanna ist ein Lied über den Wunsch, dass die Zeit stillsteht. Im Refrain wünscht man sich, für immer hier bleiben zu können, wie eine steinerne Statue in der Stadt, unverändert und unberührt von den Jahren.

Aber das Lied bleibt nicht bei diesem Wunsch. Es wendet sich einer schwierigeren Frage zu: Was bleibt eigentlich? Ist eine Erinnerung alles, was von allem übrig bleibt, was wir waren, und allem, was wir hatten?

Für mich kommt das Lied von den Menschen in meinem Leben: meinen Eltern, meinen Beziehungen, den verschiedenen Versionen meiner selbst. Man investiert so viel Zeit in jemanden, und eines Tages ist diese Version von ihm verschwunden. Manchmal ist es ein langsamer Wandel. Manchmal ist es eine Krankheit, und man vermisst den gesunden Menschen, der er einmal war. Diese Version bekommt man nicht zurück, und die eigene auch nicht. Stanna sitzt in dieser Frustration, und in der Zärtlichkeit, die darunterliegt.

Es ist eine Single aus dem Album Längs med vägen, geschrieben zusammen mit meinem Co-Autor.`,
      es:
`Stanna es una canción sobre el deseo de que el tiempo se detenga. El estribillo desea que pudiéramos quedarnos aquí para siempre, como una estatua de piedra en la ciudad, inalterada e intacta por los años.

Pero la canción no se queda en ese deseo. Se vuelve hacia una pregunta más difícil: ¿qué es lo que permanece? ¿Es un recuerdo todo lo que queda de todo lo que fuimos, y de todo lo que tuvimos?

Para mí, la canción nace de las personas en mi vida: mis padres, mis relaciones, las distintas versiones de mí mismo. Inviertes tanto tiempo en alguien, y de repente, un día, esa versión de ellos desaparece. A veces es un cambio lento. A veces es una enfermedad, y extrañas a la persona sana que solían ser. No puedes recuperar esa versión, ni tampoco la tuya propia. Stanna se sitúa en esa frustración, y en la ternura que hay debajo de ella.

Es un sencillo del álbum Längs med vägen, escrito junto a mi coautor.`,
      fi:
`Stanna kertoo halusta pysäyttää aika. Kertosäkeessä toivotaan, että voisimme jäädä tänne ikuisesti, kuin kivipatsas kaupungissa, muuttumattomana ja vuosien koskemattomana.

Mutta laulu ei jää siihen toiveeseen. Se kääntyy vaikeampaan kysymykseen: mikä oikeastaan pysyy? Onko muisto kaikki, mitä jää jäljelle siitä, keitä olimme, ja kaikesta, mitä meillä oli?

Minulle laulu syntyy elämäni ihmisistä: vanhemmistani, ihmissuhteistani, itseni eri versioista. Sijoitat niin paljon aikaa johonkuhun, ja sitten eräänä päivänä se versio hänestä on poissa. Joskus se on hidasta muutosta. Joskus se on sairaus, ja kaipaat sitä tervettä ihmistä, joka hän ennen oli. Sitä versiota ei saa takaisin, eikä omaansakaan. Stanna asuu siinä turhautumisessa, ja sen alla olevassa hellyydessä.

Se on single albumilta Längs med vägen, kirjoitettu yhdessä kanssakirjoittajani kanssa.`,
      fr:
`Stanna parle de l'envie que le temps s'arrête. Dans le refrain, on souhaite pouvoir rester ici pour toujours, comme une statue de pierre dans la ville, inchangée et intacte au fil des années.

Mais la chanson ne s'arrête pas à ce souhait. Elle se tourne vers une question plus difficile : qu'est-ce qui reste ? Un souvenir est-il tout ce qui subsiste de tout ce que nous étions, et de tout ce que nous avions ?

Pour moi, cette chanson vient des gens de ma vie : mes parents, mes relations, les différentes versions de moi-même. On investit tellement de temps dans quelqu'un, et puis un jour cette version de lui disparaît. Parfois, c'est un changement lent. Parfois, c'est une maladie, et la personne en bonne santé qu'ils étaient nous manque. On ne peut pas retrouver cette version, ni la sienne propre. Stanna se tient dans cette frustration, et dans la tendresse qui se cache dessous.

C'est un single de l'album Längs med vägen, écrit avec mon co-auteur.`,
      it:
`Stanna parla del desiderio che il tempo si fermi. Nel ritornello si vorrebbe restare qui per sempre, come una statua di pietra in città, immutata e intatta dagli anni.

Ma la canzone non si ferma a quel desiderio. Si rivolge a una domanda più difficile: cos'è che resta? Un ricordo è tutto ciò che rimane di tutto quello che eravamo, e di tutto quello che avevamo?

Per me, questa canzone nasce dalle persone della mia vita: i miei genitori, le mie relazioni, le diverse versioni di me stesso. Si investe così tanto tempo in qualcuno, e poi un giorno quella versione di loro non c'è più. A volte è un cambiamento lento. A volte è una malattia, e ti manca la persona sana che erano un tempo. Non puoi riavere quella versione, e non puoi riavere nemmeno la tua. Stanna resta in quella frustrazione, e nella tenerezza che si nasconde sotto.

È un singolo dall'album Längs med vägen, scritto insieme al mio co-autore.`,
      pt:
`Stanna fala sobre querer que o tempo pare. No refrão, deseja-se poder ficar aqui para sempre, como uma estátua de pedra na cidade, inalterada e intocada pelos anos.

Mas a canção não fica só nesse desejo. Ela se volta para uma pergunta mais difícil: o que é que permanece? Será que uma lembrança é tudo o que resta de tudo o que fomos, e de tudo o que tivemos?

Para mim, a canção vem das pessoas da minha vida: meus pais, meus relacionamentos, as diferentes versões de mim mesmo. Investimos tanto tempo em alguém, e então um dia aquela versão dela desaparece. Às vezes é uma mudança lenta. Às vezes é uma doença, e sentimos falta da pessoa saudável que ela costumava ser. Não é possível recuperar aquela versão, nem a nossa própria. Stanna vive nessa frustração, e na ternura que existe por baixo dela.

É um single do álbum Längs med vägen, escrito junto com meu co-autor.`,
    },
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
      fr:
`Serre-moi fort, toi
Tant que je suis encore là
Serre-moi fort, toi
Si tu tiens à moi
Seras-tu là pour moi ?
Même si je change
Avec le temps, avec le temps

Tu t'éloignes de moi
Même si je ne le veux pas
Bien sûr que je te comprends
C'est juste comme ça que ça se passe
Tout le monde change
Avec le temps, avec le temps

Si tu pouvais rester
Si on pouvait rester
Pour toujours, comme une statue de pierre en ville

Qu'est-ce qui reste ?
Qu'est-ce qui demeure ?
Seulement un souvenir de tout ce qu'on était
Est-ce tout ce qu'il nous reste ?

Lâcher prise
Oser dire oui
Je me souviens encore du jour
Des mots que tu as dits
Te souviendras-tu de moi ?
Même si on a changé

Si tu pouvais rester
Si on pouvait rester
Pour toujours, comme une statue de pierre en ville

Qu'est-ce qui reste ?
Qu'est-ce qui demeure ?
Seulement un souvenir de tout ce qu'on était
Est-ce tout ce qu'il nous reste ?`,
      it:
`Tienimi stretto, tu
Finché sono ancora qui
Tienimi stretto, tu
Se mi hai a cuore
Ci sarai per me?
Anche se cambio
Con i tempi, con i tempi

Ti stai allontanando da me
Anche se non voglio
Certo che ti capisco
È solo così che vanno le cose
Tutti cambiano
Con i tempi, con i tempi

Se tu potessi restare
Se potessimo restare
Per sempre, come una statua di pietra in città

Cos'è che resta?
Cos'è che rimane?
Solo un ricordo di tutto quello che eravamo
È tutto ciò che abbiamo?

Lasciare andare
Osare dire sì
Ricordo ancora il giorno
Le parole che hai detto
Ti ricorderai di me?
Anche se siamo cambiati

Se tu potessi restare
Se potessimo restare
Per sempre, come una statua di pietra in città

Cos'è che resta?
Cos'è che rimane?
Solo un ricordo di tutto quello che eravamo
È tutto ciò che abbiamo?`,
      pt:
`Abraça-me com força, tu
Enquanto ainda estou aqui
Abraça-me com força, tu
Se gostas de mim
Estarás lá por mim?
Mesmo que eu mude
Com os tempos, com os tempos

Estás a afastar-te de mim
Mesmo que eu não queira
Claro que te compreendo
É assim que as coisas são
Todos mudam
Com os tempos, com os tempos

Se pudesses ficar
Se pudéssemos ficar
Para sempre, como uma estátua de pedra na cidade

O que é que fica?
O que é que permanece?
Apenas uma lembrança de tudo o que fomos
É tudo o que temos?

Deixar ir
Ousar dizer sim
Ainda me lembro do dia
As palavras que disseste
Vais lembrar-te de mim?
Mesmo que tenhamos mudado

Se pudesses ficar
Se pudéssemos ficar
Para sempre, como uma estátua de pedra na cidade

O que é que fica?
O que é que permanece?
Apenas uma lembrança de tudo o que fomos
É tudo o que temos?`,
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
      fr:
`Il n'y a pas de rime
Il n'y a pas de raison
Quant à qui il mord
Il fait ce qu'il veut
Le chien sombre
M'attend-il ?
J'espère qu'on ne se rencontrera jamais

Car le chien sombre attend
Le chien sombre attend
Et ça n'a vraiment pas d'importance
Que ce soit le jour ou la nuit
Car le chien sombre attend...
M'attend-il ?

Là où les ombres tombent
À l'intérieur de mon esprit
Un chasseur silencieux
Attend son heure
Quand il frappe
Que faudra-t-il ?
Le chien sombre
Pourrait sceller ton destin

Le chien sombre attend
Le chien sombre attend
Et ça n'a vraiment pas d'importance
Que ce soit le jour ou la nuit
Car le chien sombre attend...
M'attend-il ?

Tous mes souvenirs joyeux
S'effacent douloureusement
Tu es mon plus sombre ennemi
M'attends-tu ?
M'attends-tu ?

Le chien sombre attend
Le chien sombre attend
Et ça n'a vraiment pas d'importance
Que ce soit le jour ou la nuit
Car le chien sombre attend
Le chien sombre attend
Le chien sombre attend
Et ça n'a vraiment pas d'importance
Que ce soit le jour ou la nuit
Car le chien sombre attend`,
      it:
`Non c'è rima
Non c'è ragione
Su chi morde
Fa quello che vuole
Il cane oscuro
Mi sta aspettando?
Spero che non ci incontreremo mai

Perché il cane oscuro aspetta
Il cane oscuro aspetta
E non importa davvero
Se è giorno o notte
Perché il cane oscuro aspetta...
Mi sta aspettando?

Dove cadono le ombre
Dentro la mia mente
Un cacciatore silenzioso
Aspetta il suo momento
Quando colpisce
Cosa ci vorrà?
Il cane oscuro
Potrebbe sigillare il tuo destino

Il cane oscuro aspetta
Il cane oscuro aspetta
E non importa davvero
Se è giorno o notte
Perché il cane oscuro aspetta...
Mi sta aspettando?

Tutti i miei ricordi gioiosi
Stanno svanendo dolorosamente
Sei il mio nemico più oscuro
Mi stai aspettando?
Mi stai aspettando?

Il cane oscuro aspetta
Il cane oscuro aspetta
E non importa davvero
Se è giorno o notte
Perché il cane oscuro aspetta
Il cane oscuro aspetta
Il cane oscuro aspetta
E non importa davvero
Se è giorno o notte
Perché il cane oscuro aspetta`,
      pt:
`Não há rima
Não há razão
Para quem ele morde
Faz o que lhe apetece
O cão sombrio
Estará à minha espera?
Espero que nunca nos encontremos

Porque o cão sombrio está à espera
O cão sombrio está à espera
E não importa mesmo
Se é dia ou noite
Porque o cão sombrio está à espera...
Estará à minha espera?

Onde as sombras caem
Dentro da minha mente
Um caçador silencioso
Aguarda a sua hora
Quando atacar
O que será preciso?
O cão sombrio
Pode selar o teu destino

O cão sombrio está à espera
O cão sombrio está à espera
E não importa mesmo
Se é dia ou noite
Porque o cão sombrio está à espera...
Estará à minha espera?

Todas as minhas memórias felizes
Estão a desvanecer-se dolorosamente
Tu és o meu inimigo mais sombrio
Estás à minha espera?
Estás à minha espera?

O cão sombrio está à espera
O cão sombrio está à espera
E não importa mesmo
Se é dia ou noite
Porque o cão sombrio está à espera
O cão sombrio está à espera
O cão sombrio está à espera
E não importa mesmo
Se é dia ou noite
Porque o cão sombrio está à espera`,
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
      fr:
`La maison du peuple
Jadis fière, telle qu'elle se dressait
Nous vivons dans un
Désert de miroirs
Où rien de ce que nous voyons
N'est ce qu'il paraît être

Les oiseaux ont cessé de chanter à Lafayette Park
Quand un sombre oiseau de guerre a illuminé le parc

Alors le gaz toxique
A étouffé les voix de la paix
Et la bible tenue bien haut
Dans la main de la bête
Les oiseaux ont cessé de chanter à Lafayette Park
Quand l'oiseau de guerre a illuminé l'obscurité

Le diable s'est avancé vers l'église
Et a fièrement brandi
Un livre qu'il disait être la bible
Mais qui n'était que l'art du vol

Alors le gaz toxique
A fait monter les larmes aux yeux
Les troupes de choc armées
De matraques et de gaz
Ont ouvert un chemin dans la foule
Pour que le diable puisse passer
Jusqu'aux marches de St. John's

A étouffé les voix de la paix
La bible tenue bien haut
Dans la main du voleur

Je ne veux pas de pitié
Je veux du changement
Je ne suis pas triste
Je ne suis pas désolé
Je suis en colère
Je suis fatigué`,
      it:
`La casa del popolo
Un tempo fiera, così come si ergeva
Viviamo in un
Deserto di specchi
Dove niente di ciò che vediamo
È ciò che sembra

Gli uccelli hanno smesso di cantare a Lafayette Park
Quando un uccello oscuro di guerra ha illuminato il parco

Così il gas velenoso
Ha soffocato le voci della pace
E la bibbia tenuta alta
Nella mano della bestia
Gli uccelli hanno smesso di cantare a Lafayette Park
Quando l'uccello di guerra ha illuminato il buio

Il diavolo si è avvicinato alla chiesa
E ha orgogliosamente sollevato
Un libro che diceva essere la bibbia
Ma che era solo l'arte del furto

Così il gas velenoso
Ha portato lacrime agli occhi
Le truppe d'assalto armate
Di manganelli e gas
Hanno aperto un varco tra la folla
Perché il diavolo potesse passare
Fino ai gradini di St. John's

Ha soffocato le voci della pace
La bibbia tenuta alta
Nella mano del ladro

Non voglio pietà
Voglio cambiamento
Non sono triste
Non mi dispiace
Sono arrabbiato
Sono stanco`,
      pt:
`A casa do povo
Outrora orgulhosa, tal como se erguia
Vivemos num
Deserto de espelhos
Onde nada do que vemos
É o que parece

Os pássaros pararam de cantar em Lafayette Park
Quando um sombrio pássaro de guerra iluminou o parque

Então o gás venenoso
Sufocou as vozes da paz
E a bíblia erguida bem alto
Na mão da besta
Os pássaros pararam de cantar em Lafayette Park
Quando o pássaro de guerra iluminou a escuridão

O diabo caminhou até à igreja
E ergueu orgulhosamente
Um livro que disse ser a bíblia
Mas que era apenas a arte do roubo

Então o gás venenoso
Trouxe lágrimas aos olhos
As tropas de choque armadas
Com cassetetes e gás
Abriram um caminho na multidão
Para que o diabo pudesse passar
Até aos degraus de St. John's

Sufocou as vozes da paz
A bíblia erguida bem alto
Na mão do ladrão

Não quero pena
Quero mudança
Não estou triste
Não sinto pena
Estou zangado
Estou cansado`,
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
      fr:
`J'ai entendu les pas des ombres ramper lentement le long du couloir
J'ai entendu l'ombre silencieuse frapper si doucement à la porte
Mon esprit m'a-t-il seulement trompé ?
Ai-je entendu des voix crier ?
Dans l'obscurité des ombres
Il n'y avait rien du tout

Quand ils veulent garder le pouvoir dans un jeu, ils gardent le ballon
Pour conserver leur pouvoir et leur influence, ils se fichent du reste
Mon esprit m'a-t-il seulement trompé ?
Ai-je entendu les voix crier ?
Dans l'obscurité des ombres
Il n'y avait rien du tout

Quand les enfants pauvres allaient à l'école, ils n'avaient pas de livres, juste des murs froids et humides
Tandis que les enfants riches recevaient l'argent et plus encore pour construire leurs salles dorées
Le gouvernement leur a-t-il dit d'arrêter cela ?
As-tu entendu nos voix crier ?
Dans l'obscurité des ombres
Il n'y avait rien du tout

Refusez-leur l'éducation, sont-ils stupides, ils ne savent rien
Que la vérité n'est pas les mensonges que tu racontes, les faits que tu ne montres jamais
La vérité est la clé de la liberté pour
Que nos voix soient entendues
Depuis l'obscurité des ombres
Laissez-les entendre notre cri de liberté
Depuis l'obscurité des ombres
Laissez-les entendre notre cri de liberté

Dans l'obscurité des ombres
Il n'y avait rien du tout

Ils criaient pour être guidés
Mais personne n'entendit leurs cris
Gardez-les tous dans l'obscurité et
Dans l'obscurité des ombres
Il n'y avait rien du tout`,
      it:
`Ho sentito i passi delle ombre strisciare lentamente lungo il corridoio
Ho sentito l'ombra silenziosa bussare così delicatamente alla porta
La mia mente mi ha solo ingannato?
Ho sentito delle voci gridare?
Nel buio delle ombre
Non c'era proprio niente

Quando vogliono mantenere il potere in un gioco, tengono la palla
Per conservare il loro potere e la loro influenza, del resto non gliene importa niente
La mia mente mi ha solo ingannato?
Ho sentito le voci gridare?
Nel buio delle ombre
Non c'era proprio niente

Quando i bambini poveri andavano a scuola non avevano libri, solo muri freddi e umidi
Mentre i bambini ricchi ricevevano i soldi e ancora di più per costruire le loro sale dorate
Il governo ha detto loro di smettere?
Hai sentito le nostre voci gridare?
Nel buio delle ombre
Non c'era proprio niente

Negategli l'istruzione, sono stupidi, non sanno niente
Che la verità non sono le menzogne che racconti, i fatti che non mostri mai
La verità è la chiave della libertà perché
Le nostre voci vengano sentite
Dal buio delle ombre
Fateli sentire il nostro grido di libertà
Dal buio delle ombre
Fateli sentire il nostro grido di libertà

Nel buio delle ombre
Non c'era proprio niente

Gridavano in cerca di una guida
Ma nessuno sentì il loro grido
Tenete tutti loro nel buio e
Nel buio delle ombre
Non c'era proprio niente`,
      pt:
`Ouvi os passos das sombras se arrastando lentamente pelo corredor
Ouvi a sombra silenciosa bater tão delicadamente na porta
Será que minha mente só me enganou?
Ouvi vozes gritando?
Na escuridão das sombras
Não havia nada ali

Quando querem manter o poder num jogo, eles guardam a bola
Para manter seu poder e sua influência, não se importam nem um pouco com o resto
Será que minha mente só me enganou?
Ouvi as vozes gritando?
Na escuridão das sombras
Não havia nada ali

Quando as crianças pobres iam à escola não tinham livros, só paredes frias e úmidas
Enquanto as crianças ricas recebiam o dinheiro e mais ainda para construir seus salões dourados
O governo disse a eles para parar com isso?
Você ouviu nossas vozes gritando?
Na escuridão das sombras
Não havia nada ali

Neguem-lhes a educação, são burros, não sabem nada
Que a verdade não são as mentiras que você conta, os fatos que você nunca mostra
A verdade é a chave da liberdade para
Que nossas vozes sejam ouvidas
Da escuridão das sombras
Deixem-os ouvir nosso grito de liberdade
Da escuridão das sombras
Deixem-os ouvir nosso grito de liberdade

Na escuridão das sombras
Não havia nada ali

Eles gritaram por orientação
Mas ninguém ouviu seus gritos
Mantenham todos eles na escuridão e
Na escuridão das sombras
Não havia nada ali`,
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
      fr:
`Bienvenue dans ce monde
Tu es une beauté à contempler
Ton voyage vient de commencer
Tes histoires vont se dérouler

Suis un chemin que tu choisis
Découvre qui tu es
Les erreurs ne doivent pas te définir mais
Te rendre plus fort en apprenant

Tu sais que c'est ton monde
C'est ton moment d'explorer
Tu peux réussir partout
Tu sais que c'est ton monde
C'est ton moment d'explorer
Tu peux ouvrir n'importe quelle porte

Ta vie est à toi de la vivre
Alors fais le grand saut avec foi
Trouve ce qui te rend heureux
Le reste se mettra en place

Notre amour t'aide à trouver ton chemin
Un jour tu laisseras ta marque
Alors continue à chercher le bonheur
Suis tous tes rêves

Tu sais que c'est ton monde
C'est ton moment d'explorer
Tu peux réussir partout
Tu sais que c'est ton monde
C'est ton moment d'explorer
Tu peux ouvrir n'importe quelle porte

Tu sais que c'est ton monde
C'est ton moment d'explorer
Tu peux réussir partout
Tu sais que c'est ton monde
C'est ton moment d'explorer
Tu peux ouvrir n'importe quelle porte

Georgie
Georgie
Tu peux ouvrir n'importe quelle porte
Georgie
Tu peux ouvrir n'importe quelle porte`,
      it:
`Benvenuto in questo mondo
Sei una bellezza da guardare
Il tuo viaggio è appena iniziato
Le tue storie si sveleranno

Segui una strada che scegli tu
Scopri chi sei
Gli errori non devono definirti ma
Renderti più forte mentre impari

Sai che questo è il tuo mondo
È il tuo momento di esplorare
Puoi farcela ovunque
Sai che questo è il tuo mondo
È il tuo momento di esplorare
Puoi aprire qualsiasi porta

La tua vita è tua da vivere
Quindi fai il salto con fede
Trova ciò che ti rende felice
Il resto andrà al suo posto

Il nostro amore ti aiuta a trovare la strada
Un giorno lascerai il tuo segno
Quindi continua a cercare la felicità
Segui tutti i tuoi sogni

Sai che questo è il tuo mondo
È il tuo momento di esplorare
Puoi farcela ovunque
Sai che questo è il tuo mondo
È il tuo momento di esplorare
Puoi aprire qualsiasi porta

Sai che questo è il tuo mondo
È il tuo momento di esplorare
Puoi farcela ovunque
Sai che questo è il tuo mondo
È il tuo momento di esplorare
Puoi aprire qualsiasi porta

Georgie
Georgie
Puoi aprire qualsiasi porta
Georgie
Puoi aprire qualsiasi porta`,
      pt:
`Bem-vindo a este mundo
Você é uma beleza de se ver
Sua jornada apenas começou
Suas histórias vão se revelar

Siga um caminho que você escolhe
Descubra quem você é
Os erros não devem te definir, mas
Te tornar mais forte enquanto aprende

Você sabe que este é o seu mundo
É a sua hora de explorar
Você pode se sair bem em qualquer lugar
Você sabe que este é o seu mundo
É a sua hora de explorar
Você pode abrir qualquer porta

Sua vida é sua para viver
Então dê o salto com fé
Encontre o que te traz alegria
O resto se encaixa

Nosso amor te ajuda a encontrar o caminho certo
Um dia você deixará sua marca
Então continue buscando a felicidade
Siga todos os seus sonhos

Você sabe que este é o seu mundo
É a sua hora de explorar
Você pode se sair bem em qualquer lugar
Você sabe que este é o seu mundo
É a sua hora de explorar
Você pode abrir qualquer porta

Você sabe que este é o seu mundo
É a sua hora de explorar
Você pode se sair bem em qualquer lugar
Você sabe que este é o seu mundo
É a sua hora de explorar
Você pode abrir qualquer porta

Georgie
Georgie
Você pode abrir qualquer porta
Georgie
Você pode abrir qualquer porta`,
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
      fr:
`Il y a une tristesse dans tes yeux
Je vois les traces des larmes que tu pleures
Ton masque souriant ne peut pas les cacher
Peu importe comment tu essaies

Tu étais assise seule sous les étoiles
Tu souhaitais quelque chose sous la lune
Un amour qui te ramènerait à la maison
Il ne pouvait pas arriver assez vite

L'hiver arrive
Tu es dans le froid
Tout ce que tu as à faire est
Prendre ma main
Il y a un feu à l'intérieur
Pour te garder en sécurité et au chaud
Il y a une promesse dans mon cœur
Que je te donnerai tout mon amour
Je peux seulement te promettre
Que je te donne tout mon amour
Et tout ce que je suis
Et tout ce que je suis

Quand nous sommes si loin l'un de l'autre
Nous partageons deux cœurs aimants
Nous regardons vers la lune de minuit
Et souhaitons quelque chose sous les mêmes étoiles

L'hiver arrive
Tu es dans le froid
Tout ce que tu as à faire est
Prendre ma main
Il y a un feu à l'intérieur
Pour te garder en sécurité et au chaud
Il y a une promesse dans mon cœur
Que je te donnerai tout mon amour
Je peux seulement te promettre
Que je te donne tout mon amour
Et tout ce que je suis
Et tout ce que je suis

Tout ce que tu as à faire est
Prendre ma main

Quand les choses deviennent difficiles pour toi
Et qu'il n'y a plus de jeux à jouer
Je suis toujours à tes côtés
Même si je suis à mille lieues

L'hiver arrive
Tu es dans le froid
Tout ce que tu as à faire est
Prendre ma main
Tout ce que tu as à faire est
Prendre ma main`,
      it:
`C'è una tristezza nei tuoi occhi
Vedo le tracce delle lacrime che piangi
La tua maschera sorridente non può nasconderle
Non importa come ci provi

Sedevi da sola sotto le stelle
Desideravi qualcosa sotto la luna
Un amore che ti avrebbe portato a casa
Non poteva arrivare abbastanza presto

L'inverno sta arrivando
Sei fuori al freddo
Tutto quello che devi fare è
Prendere la mia mano
C'è un fuoco dentro
Per tenerti al sicuro e al caldo
C'è una promessa nel mio cuore
Che ti darò tutto il mio amore
Posso solo prometterti
Che ti do tutto il mio amore
E tutto ciò che sono
E tutto ciò che sono

Quando siamo così lontani l'uno dall'altro
Condividiamo due cuori innamorati
Guardiamo verso la luna di mezzanotte
E desideriamo qualcosa sotto le stesse stelle

L'inverno sta arrivando
Sei fuori al freddo
Tutto quello che devi fare è
Prendere la mia mano
C'è un fuoco dentro
Per tenerti al sicuro e al caldo
C'è una promessa nel mio cuore
Che ti darò tutto il mio amore
Posso solo prometterti
Che ti do tutto il mio amore
E tutto ciò che sono
E tutto ciò che sono

Tutto quello che devi fare è
Prendere la mia mano

Quando le cose si fanno difficili per te
E non ci sono più giochi da giocare
Sono sempre al tuo fianco
Anche se sono a mille miglia di distanza

L'inverno sta arrivando
Sei fuori al freddo
Tutto quello che devi fare è
Prendere la mia mano
Tutto quello che devi fare è
Prendere la mia mano`,
      pt:
`Há uma tristeza em seus olhos
Vejo os rastros das lágrimas que você chora
Sua máscara sorridente não pode escondê-las
Não importa como você tente

Você estava sentada sozinha sob as estrelas
Desejava algo sob a lua
Um amor que te traria para casa
Ele não podia chegar rápido o suficiente

O inverno está chegando
Você está no frio
Tudo o que você precisa fazer é
Segurar minha mão
Há um fogo por dentro
Para te manter segura e aquecida
Há uma promessa no meu coração
De que eu vou te dar todo o meu amor
Só posso te prometer
Que eu te dou todo o meu amor
E tudo o que eu sou
E tudo o que eu sou

Quando estamos tão longe um do outro
Compartilhamos dois corações amorosos
Olhamos para a lua da meia-noite
E desejamos algo sob as mesmas estrelas

O inverno está chegando
Você está no frio
Tudo o que você precisa fazer é
Segurar minha mão
Há um fogo por dentro
Para te manter segura e aquecida
Há uma promessa no meu coração
De que eu vou te dar todo o meu amor
Só posso te prometer
Que eu te dou todo o meu amor
E tudo o que eu sou
E tudo o que eu sou

Tudo o que você precisa fazer é
Segurar minha mão

Quando as coisas ficam difíceis para você
E não há mais brincadeiras para brincar
Estou sempre ao seu lado
Mesmo que eu esteja a mil milhas de distância

O inverno está chegando
Você está no frio
Tudo o que você precisa fazer é
Segurar minha mão
Tudo o que você precisa fazer é
Segurar minha mão`,
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
      fr:
`Quand la neige douce commence à tomber
Oh ! toute cette beauté
À la lueur douce du feu chaleureux
Il n'y a aucun endroit où je préférerais être

Je célèbre le réveillon de Noël avec toi
Tandis que les étoiles les plus brillantes brillent à travers
Dans tes bras, tout semble si juste
Enveloppés d'amour, une nuit tout à fait spéciale
Oh ! c'est Noël, le réveillon avec toi
Chaque souhait et chaque rêve se réalisent
Juste nous deux, notre amour renouvelé
Oh, c'est le réveillon de Noël avec toi

Les rues de la ville sont douces et blanches
Des lumières scintillantes éclairent la nuit
Chaque chant de Noël chanté lentement
Me ramène à quand nous étions jeunes

Je célèbre le réveillon de Noël avec toi
Tandis que les étoiles les plus brillantes brillent à travers
Dans tes bras, tout semble si juste
Enveloppés d'amour, une nuit tout à fait spéciale
Oh ! c'est Noël, le réveillon avec toi
Chaque souhait et chaque rêve se réalisent
Juste nous deux, notre amour renouvelé
Oh, c'est le réveillon de Noël avec toi

Laisse les cloches sonner, laisse-les résonner
Pour cet amour qui est le tien et le mien
Sous le gui
Là où nos cœurs brillent

Je célèbre le réveillon de Noël avec toi
Tandis que les étoiles les plus brillantes brillent à travers
Dans tes bras, tout semble si juste
Enveloppés d'amour, une nuit tout à fait spéciale
Oh ! c'est Noël, le réveillon avec toi
Oh ! c'est Noël, le réveillon
Juste nous deux, notre amour renouvelé
Oh, c'est le réveillon de Noël avec toi

Oui, c'est encore le réveillon de Noël
Avec ton amour, nous sommes unis à nouveau
Serre-moi près de toi, toute la nuit
Oh ! c'est le réveillon de Noël avec toi`,
      it:
`Quando la neve soffice comincia a cadere
Oh! tutta quella bellezza
Al dolce chiarore del caldo focolare
Non c'è nessun posto dove vorrei essere di più

Festeggio la vigilia di Natale con te
Mentre le stelle più luminose brillano attraverso
Tra le tue braccia tutto sembra così giusto
Avvolti nell'amore, una notte davvero speciale
Oh! è Natale, la vigilia con te
Ogni desiderio e ogni sogno si realizza
Solo noi due, il nostro amore rinnovato
Oh, è la vigilia di Natale con te

Le strade della città sono soffici e bianche
Luci scintillanti illuminano la notte
Ogni canto di Natale cantato piano
Mi riporta a quando eravamo giovani

Festeggio la vigilia di Natale con te
Mentre le stelle più luminose brillano attraverso
Tra le tue braccia tutto sembra così giusto
Avvolti nell'amore, una notte davvero speciale
Oh! è Natale, la vigilia con te
Ogni desiderio e ogni sogno si realizza
Solo noi due, il nostro amore rinnovato
Oh, è la vigilia di Natale con te

Lascia che le campane suonino, lasciale risuonare
Per questo amore che è tuo e mio
Sotto il vischio
Dove i nostri cuori ardono

Festeggio la vigilia di Natale con te
Mentre le stelle più luminose brillano attraverso
Tra le tue braccia tutto sembra così giusto
Avvolti nell'amore, una notte davvero speciale
Oh! è Natale, la vigilia con te
Oh! è Natale, la vigilia
Solo noi due, il nostro amore rinnovato
Oh, è la vigilia di Natale con te

Sì, è di nuovo la vigilia di Natale
Con il tuo amore siamo di nuovo uniti
Tienimi vicino, per tutta la notte
Oh! è la vigilia di Natale con te`,
      pt:
`Quando a neve suave começa a cair
Ah! toda aquela beleza
Junto ao brilho suave da lareira acesa
Não há lugar onde eu preferiria estar

Estou celebrando a véspera de Natal com você
Enquanto as estrelas mais brilhantes brilham através
Em seus braços tudo parece tão certo
Envoltos em amor, uma noite muito especial
Ah! é Natal, a véspera com você
Cada desejo e cada sonho se realiza
Só nós dois, nosso amor renovado
Ah, é véspera de Natal com você

As ruas da cidade estão suaves e brancas
Luzes cintilantes iluminam a noite
Cada canção de Natal cantada devagar
Me leva de volta a quando éramos jovens

Estou celebrando a véspera de Natal com você
Enquanto as estrelas mais brilhantes brilham através
Em seus braços tudo parece tão certo
Envoltos em amor, uma noite muito especial
Ah! é Natal, a véspera com você
Cada desejo e cada sonho se realiza
Só nós dois, nosso amor renovado
Ah, é véspera de Natal com você

Deixe os sinos tocarem, deixe-os ressoar
Por este amor que é seu e meu
Sob o visco
Onde nossos corações brilham

Estou celebrando a véspera de Natal com você
Enquanto as estrelas mais brilhantes brilham através
Em seus braços tudo parece tão certo
Envoltos em amor, uma noite muito especial
Ah! é Natal, a véspera com você
Ah! é Natal, a véspera
Só nós dois, nosso amor renovado
Ah, é véspera de Natal com você

Sim, é véspera de Natal outra vez
Com seu amor estamos unidos de novo
Me abrace, a noite toda
Ah! é véspera de Natal com você`,
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
      fr:
`Deux suivent le un
Et toi tu suis le fusil

Les pensées remplissent nos têtes
Les esprits deviennent fous
Capture une image
Quand tu perds le contrôle
En observant un instant

Et quand plus rien n'a de sens
Affiche juste un sourire

Trouve une clé vers le soulagement
Quand le temps l'enferme dehors
Ralentis un mouvement
Attrape le reflet du passé
En cherchant une ligne vraie

Et quand plus rien d'autre n'a de sens
Du tout
Affiche juste un sourire

Regarde autour de toi
Tout va bien
Qu'est-ce qui ne va pas là maintenant
Tout va bien

Deux suivent le un
Et toi tu suis le fusil`,
      it:
`Due seguono l'uno
E tu segui il fucile

I pensieri riempiono le nostre teste
Le menti stanno impazzendo
Cattura un'immagine
Quando perdi il controllo
Osservando un momento

E quando niente ha più senso
Metti solo un sorriso

Trova una chiave per il sollievo
Quando il tempo la tiene fuori
Rallenta un movimento
Cogli il riflesso del passato
Cercando una linea vera

E quando nient'altro ha senso
Per niente
Metti solo un sorriso

Guardati intorno
Va tutto bene
Cosa c'è che non va adesso
Va tutto bene

Due seguono l'uno
E tu segui il fucile`,
      pt:
`Dois seguem o um
E tu segues a arma

Pensamentos enchem as nossas cabeças
As mentes estão a enlouquecer
Captura uma imagem
Quando perdes o controlo
Observando um momento

E quando nada faz sentido
Basta pôr um sorriso

Encontra uma chave para o alívio
Quando o tempo a tranca lá fora
Abranda um movimento
Apanha o reflexo do passado
Procurando uma linha verdadeira

E quando mais nada faz sentido
De todo
Basta pôr um sorriso

Olha à tua volta
Está tudo bem
O que está errado agora
Está tudo bem

Dois seguem o um
E tu segues a arma`,
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
    descriptionTranslations: {
      de:
`Längs med vägen – „entlang der Straße" – ist ein schwedischsprachiges Album von Erik Sjøholm und Emil Nordström: zwölf bis fünfzehn Lieder, geschrieben als ein Spaziergang entlang des Lebensweges – Kindheitserinnerungen am einen Ende, Gedanken übers Altwerden am anderen, und alles, was dazwischen geschieht. Die Lieder spielen an zwei Orten, die beide Songwriter geprägt haben – Österbotten, an der schwedischsprachigen Küste Finnlands, und Pargas, weiter südlich bei Åbo.

Erik und Emil lernten sich während ihres Musikstudiums in Jakobstad kennen und spielen seither zusammen – in Bands, in Orchestern, und jetzt in diesem Album. Auf der Platte sind die beiden Rollen klar getrennt: Erik schreibt die Texte und Melodien und singt die Lead-Stimme, verarbeitet persönliche Erinnerungen zu etwas, das auch ein Hörer mit einer anderen Kindheit wiedererkennen kann; Emil produziert und arrangiert und baut die Klanglandschaft, in der jedes Lied lebt.

Die Aufnahmen liefen über den Sommer 2025 in einer Handvoll ausgewählter Räume, je nachdem, was sie dem Klang hinzufügen konnten: Streicher in der Kirche von Replot, Blechbläser in Jakobstad, Percussion in Vasa, und die Kernaufnahmen in den DeeKay Records Studios in Vaskiluoto. Die Promo- und Aufnahmefotos entstanden im Midas Studio in Replot. Das Album wurde von Emil Nordström gemischt, von Stefan Backas aufgenommen und von Maria Triana in Amsterdam gemastert.`,
      sv:
`Längs med vägen är ett svenskspråkigt album av Erik Sjøholm och Emil Nordström, tolv till femton låtar skrivna som en vandring längs livets väg: barndomsminnen i ena änden, tankar om ålderdom i den andra, och allt som händer däremellan. Låtarna utspelar sig på två platser som format båda låtskrivarna – Österbotten, på den svenskspråkiga kusten i Finland, och Pargas, längre söderut nära Åbo.

Erik och Emil träffades under sina musikstudier i Jakobstad och har spelat tillsammans sedan dess – i band, i orkestrar, och nu på det här albumet. På skivan är rollerna tydligt fördelade: Erik skriver texter och melodier och sjunger lead, och omvandlar personliga minnen till något en lyssnare med en annan barndom ändå kan känna igen sig i; Emil producerar och arrangerar, och bygger ljudlandskapet varje låt får leva i.

Inspelningarna gjordes under sommaren 2025 i ett antal utvalda rum, beroende på vad de kunde tillföra ljudet: stråkar i Replot kyrka, blås i Jakobstad, slagverk i Vasa, och kärninspelningarna på DeeKay Records Studios i Vaskiluoto. Promo- och inspelningsfotona togs på Midas Studio i Replot. Albumet mixades av Emil Nordström, spelades in av Stefan Backas och mastrades av Maria Triana i Amsterdam.`,
      es:
`Längs med vägen —"a lo largo del camino"— es un álbum en sueco de Erik Sjøholm y Emil Nordström, doce a quince canciones escritas como un camino a lo largo de la vida: recuerdos de infancia en un extremo, reflexiones sobre la vejez en el otro, y todo lo que ocurre entre medio. Las canciones están ambientadas en dos lugares que marcaron a ambos autores: Österbotten, en la costa de habla sueca de Finlandia, y Pargas, más al sur, cerca de Turku.

Erik y Emil se conocieron durante sus estudios de música en Jakobstad y han tocado juntos desde entonces: en bandas, en orquestas, y ahora en este álbum. En el disco, los dos roles se dividen con claridad: Erik escribe las letras y las melodías y canta la voz principal, transformando recuerdos personales en algo que un oyente con una infancia distinta aún puede reconocer; Emil produce y arregla, construyendo el paisaje sonoro en el que vive cada canción.

La grabación se realizó durante el verano de 2025 en un puñado de espacios elegidos por lo que podían aportar al sonido: cuerdas en la iglesia de Replot, metales en Jakobstad, percusión en Vasa, y las sesiones principales en DeeKay Records Studios, en Vaskiluoto. Las fotografías promocionales y de grabación se hicieron en Midas Studio, en Replot. El álbum fue mezclado por Emil Nordström, grabado por Stefan Backas y masterizado por Maria Triana en Ámsterdam.`,
      fi:
`Längs med vägen on Erik Sjøholmin ja Emil Nordströmin ruotsinkielinen albumi, kaksitoista–viisitoista laulua, jotka on kirjoitettu kävelynä elämän tien varrella: lapsuusmuistoja toisessa päässä, vanhuuden pohdintoja toisessa, ja kaikkea siltä väliltä. Laulut sijoittuvat kahteen paikkaan, jotka ovat muovanneet molempia tekijöitä – Pohjanmaalle, Suomen ruotsinkieliselle rannikolle, ja Paraisille, etelämpänä lähellä Turkua.

Erik ja Emil tapasivat musiikkiopinnoissaan Pietarsaaressa ja ovat soittaneet yhdessä siitä lähtien – bändeissä, orkestereissa, ja nyt tällä albumilla. Levyllä roolit jakautuvat selkeästi: Erik kirjoittaa sanat ja melodiat ja laulaa päääänen, muokaten henkilökohtaisia muistoja joksikin, minkä toisenlaisen lapsuuden kokenut kuulijakin voi silti tunnistaa; Emil tuottaa ja sovittaa, rakentaen äänimaiseman, jossa jokainen kappale elää.

Äänitykset tehtiin kesällä 2025 muutamassa erikseen valitussa tilassa sen mukaan, mitä ne toisivat ääneen: jouset Replotin kirkossa, torvet Pietarsaaressa, lyömäsoittimet Vaasassa, ja pääsessiot DeeKay Records Studiosilla Vaskiluodossa. Promo- ja äänityskuvat otettiin Midas Studiolla Replotissa. Albumin miksasi Emil Nordström, äänitti Stefan Backas ja masteroi Maria Triana Amsterdamissa.`,
      fr:
`Längs med vägen — « le long du chemin » — est un album en suédois d'Erik Sjøholm et Emil Nordström, douze à quinze chansons écrites comme une marche le long du chemin de la vie : souvenirs d'enfance à une extrémité, réflexions sur la vieillesse à l'autre, et tout ce qui se passe entre les deux. Les chansons se situent dans deux endroits qui ont marqué les deux auteurs — l'Österbotten, sur la côte suédophone de la Finlande, et Pargas, plus au sud, près de Turku.

Erik et Emil se sont rencontrés pendant leurs études de musique à Jakobstad et jouent ensemble depuis — en groupes, en orchestres, et maintenant sur cet album. Sur le disque, les deux rôles se répartissent clairement : Erik écrit les paroles et les mélodies et chante en voix principale, transformant des souvenirs personnels en quelque chose qu'un auditeur ayant eu une enfance différente peut tout de même reconnaître ; Emil produit et arrange, construisant le paysage sonore dans lequel vit chaque chanson.

L'enregistrement s'est déroulé durant l'été 2025 dans une poignée de lieux choisis pour ce qu'ils pouvaient apporter au son : cordes dans l'église de Replot, cuivres à Jakobstad, percussions à Vasa, et les sessions principales aux DeeKay Records Studios à Vaskiluoto. Les photos promotionnelles et d'enregistrement ont été prises au Midas Studio à Replot. L'album a été mixé par Emil Nordström, enregistré par Stefan Backas et masterisé par Maria Triana à Amsterdam.`,
      it:
`Längs med vägen — "lungo la strada" — è un album in svedese di Erik Sjøholm ed Emil Nordström, da dodici a quindici canzoni scritte come una camminata lungo la strada della vita: ricordi d'infanzia a un'estremità, riflessioni sulla vecchiaia all'altra, e tutto ciò che accade nel mezzo. Le canzoni sono ambientate in due luoghi che hanno segnato entrambi gli autori: l'Österbotten, sulla costa svedese della Finlandia, e Pargas, più a sud, vicino a Turku.

Erik ed Emil si sono conosciuti durante gli studi musicali a Jakobstad e suonano insieme da allora — in band, in orchestre, e ora in questo album. Sul disco, i due ruoli si dividono chiaramente: Erik scrive i testi e le melodie e canta la voce principale, trasformando ricordi personali in qualcosa che anche un ascoltatore con un'infanzia diversa può riconoscere; Emil produce e arrangia, costruendo il paesaggio sonoro in cui vive ogni canzone.

Le registrazioni si sono svolte nell'estate del 2025 in una manciata di ambienti scelti per ciò che potevano aggiungere al suono: archi nella chiesa di Replot, ottoni a Jakobstad, percussioni a Vasa, e le sessioni principali ai DeeKay Records Studios a Vaskiluoto. Le foto promozionali e di registrazione sono state scattate al Midas Studio di Replot. L'album è stato mixato da Emil Nordström, registrato da Stefan Backas e masterizzato da Maria Triana ad Amsterdam.`,
      pt:
`Längs med vägen — "ao longo do caminho" — é um álbum em sueco de Erik Sjøholm e Emil Nordström, doze a quinze canções escritas como uma caminhada ao longo do caminho da vida: memórias de infância numa ponta, reflexões sobre a velhice na outra, e tudo o que acontece pelo meio. As canções situam-se em dois lugares que marcaram ambos os autores — Österbotten, na costa de língua sueca da Finlândia, e Pargas, mais a sul, perto de Turku.

Erik e Emil conheceram-se durante os estudos de música em Jakobstad e tocam juntos desde então — em bandas, em orquestras, e agora neste álbum. No disco, os dois papéis dividem-se claramente: Erik escreve as letras e as melodias e canta a voz principal, transformando memórias pessoais em algo que um ouvinte com uma infância diferente ainda consegue reconhecer; Emil produz e arranja, construindo a paisagem sonora onde cada canção vive.

As gravações decorreram durante o verão de 2025 num punhado de espaços escolhidos pelo que podiam acrescentar ao som: cordas na igreja de Replot, metais em Jakobstad, percussão em Vasa, e as sessões principais nos DeeKay Records Studios em Vaskiluoto. As fotografias promocionais e de gravação foram feitas no Midas Studio em Replot. O álbum foi mixado por Emil Nordström, gravado por Stefan Backas e masterizado por Maria Triana em Amsterdão.`,
    },
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
