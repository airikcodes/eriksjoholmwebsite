import BeehiivForm from './BeehiivForm';

export type KeepInTouchVariant = 'generic' | 'works' | 'work' | 'live' | 'notes' | 'note';

const copy: Record<KeepInTouchVariant, { heading: string; body: string }> = {
  generic: {
    heading: 'Keep in touch',
    body:    'Join my mailing list for occasional notes, new songs, concerts, and updates.',
  },
  works: {
    heading: 'Keep in touch',
    body:    'Hear about new songs, recordings, and the stories behind them.',
  },
  work: {
    heading: 'Keep in touch',
    body:    'Hear what I make next.',
  },
  live: {
    heading: 'Keep in touch',
    body:    'Get notified about upcoming concerts and live performances.',
  },
  notes: {
    heading: 'Keep in touch',
    body:    'Receive new notes and stories in your inbox.',
  },
  note: {
    heading: 'Keep in touch',
    body:    'Receive future notes in your inbox.',
  },
};

interface Props {
  variant?: KeepInTouchVariant;
  overrideHeading?: string;
  overrideBody?: string;
}

export default function KeepInTouch({ variant = 'generic', overrideHeading, overrideBody }: Props) {
  const { heading, body } = copy[variant];
  const displayHeading = overrideHeading ?? heading;
  const displayBody    = overrideBody    ?? body;

  return (
    <div>
      <p style={{
        fontFamily:     'var(--font-cormorant, Georgia, serif)',
        fontSize:       'clamp(1.5rem, 3.5vw, 2.25rem)',
        fontWeight:     300,
        color:          '#E8E0D4',
        letterSpacing:  '0.01em',
        lineHeight:     1.1,
        marginBottom:   '1rem',
      }}>
        {displayHeading}
      </p>
      <p style={{
        fontFamily:   'var(--font-inter)',
        fontSize:     '0.875rem',
        color:        '#7A6F62',
        lineHeight:   1.8,
        maxWidth:     '40ch',
        marginBottom: '2rem',
      }}>
        {displayBody}
      </p>
      <BeehiivForm />
    </div>
  );
}
