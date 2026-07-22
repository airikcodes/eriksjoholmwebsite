import BeehiivForm from './BeehiivForm';
import { getDictionary, hasLocale } from '@/lib/dictionaries';

export type KeepInTouchVariant = 'generic' | 'works' | 'work' | 'live' | 'notes' | 'note';

interface Props {
  variant?: KeepInTouchVariant;
  locale?: string;
  overrideHeading?: string;
  overrideBody?: string;
}

export default async function KeepInTouch({ variant = 'generic', locale = 'en', overrideHeading, overrideBody }: Props) {
  const safeLocale = hasLocale(locale) ? locale : 'en';
  const t = await getDictionary(safeLocale);
  const kit = t.keepInTouch as Record<string, string>;
  const frm = t.form as Record<string, string>;

  const displayHeading = overrideHeading ?? kit.heading;
  const displayBody    = overrideBody    ?? kit[variant] ?? kit.generic;

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
      <BeehiivForm
        subscribeLabel={frm.subscribe}
        successMsg={frm.success}
        errorMsg={frm.error}
      />
    </div>
  );
}
