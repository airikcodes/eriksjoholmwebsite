export type EventType =
  | 'concert'
  | 'storytelling-performance'
  | 'festival'
  | 'private'
  | 'other';

export interface LiveEvent {
  id: string;
  /** Performance or show title — omit for standard concerts */
  title?: string;
  /** ISO date string YYYY-MM-DD */
  date?: string;
  /** Optional time, shown after the date, e.g. '15:30–16:30' */
  time?: string;
  venue?: string;
  /** Optional small line under the venue, e.g. co-performers, language, age */
  note?: string;
  city: string;
  country: string;
  eventType: EventType;
  ticketUrl?: string;
  eventUrl?: string;
  /** Slugs of works featured in this show */
  relatedWorks?: string[];
  /** Upcoming events have a date in the future; past events are historical records */
  status: 'upcoming' | 'past';
}

export const events: LiveEvent[] = [
  // ── Upcoming ────────────────────────────────────────────────────────────────
  {
    id:        'dai-heidelberg-2026',
    title:     'Storytelling mit Musik – Freedombird',
    date:      '2026-10-11',
    time:      '15:30–16:30',
    venue:     'DAI Heidelberg · International Children\'s Book Festival',
    city:      'Heidelberg',
    country:   'Germany',
    note:      'With Kathleen Rappolt · German & English · ages 8+',
    eventType: 'storytelling-performance',
    ticketUrl: 'https://dai-heidelberg.reservix.de/p/reservix/group/549365',
    eventUrl:  'https://dai-heidelberg.de/en/events/2026-international-childrens-book-festival-58858/',
    status:    'upcoming',
  },

  // ── Past ────────────────────────────────────────────────────────────────────
  {
    id:        'glod-2022',
    title:     'GLENN — The Things We Don\'t Speak About',
    city:      'Vasa',
    country:   'Finland',
    venue:     'GLÖD Storytelling Festival',
    eventType: 'storytelling-performance',
    status:    'past',
    relatedWorks: ['glenn-the-things-we-dont-speak-about'],
  },
  {
    id:        'amsterdam-storytelling-festival',
    city:      'Amsterdam',
    country:   'Netherlands',
    venue:     'Amsterdam Storytelling Festival',
    eventType: 'storytelling-performance',
    status:    'past',
  },
  {
    id:        'mezrab',
    city:      'Amsterdam',
    country:   'Netherlands',
    venue:     'Mezrab',
    eventType: 'concert',
    status:    'past',
  },
  {
    id:        'arbogast',
    city:      'Mölltorp',
    country:   'Sweden',
    venue:     'Arbogast Festival',
    eventType: 'festival',
    status:    'past',
  },
  {
    id:        'tussenland',
    city:      'Zwolle',
    country:   'Netherlands',
    venue:     'Tüssenland Festival',
    eventType: 'festival',
    status:    'past',
  },
  {
    id:        'wohnzimmer-vienna',
    city:      'Vienna',
    country:   'Austria',
    venue:     'Währinge Wohnzimmer',
    eventType: 'concert',
    status:    'past',
  },
];

export const upcomingEvents = events
  .filter((e) => e.status === 'upcoming')
  .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));

export const pastEvents = events
  .filter((e) => e.status === 'past');
