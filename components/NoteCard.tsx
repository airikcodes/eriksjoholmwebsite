import Link from 'next/link';
import Image from 'next/image';
import type { Note } from '@/lib/notes';
import { formatNoteDate } from '@/lib/notes';

export default function NoteCard({ note, locale, readMoreLabel = 'Read →' }: { note: Note; locale: string; readMoreLabel?: string }) {
  const date = formatNoteDate(note.date, locale);

  return (
    <Link
      href={`/notes/${note.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      className="group"
    >
      <article
        style={{
          borderBottom:        '1px solid rgba(255,255,255,0.07)',
          paddingTop:          '2.75rem',
          paddingBottom:       '2.75rem',
          display:             'grid',
          gridTemplateColumns: note.coverImage ? '1fr 96px' : '1fr',
          gap:                 '2rem',
          alignItems:          'start',
        }}
      >
        <div>
          {date && (
            <p style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.45rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
              marginBottom:  '0.85rem',
            }}>
              {date}
            </p>
          )}

          <h2
            className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
            style={{
              fontSize:     'clamp(1.35rem, 3vw, 1.9rem)',
              color:        '#E8E0D4',
              lineHeight:   1.1,
              marginBottom: note.excerpt ? '0.7rem' : '1rem',
              letterSpacing:'0.01em',
            }}
          >
            {note.title}
          </h2>

          {note.excerpt && (
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize:   '0.82rem',
              color:      '#7A6F62',
              lineHeight: 1.75,
              maxWidth:   '48ch',
              marginBottom: '1rem',
            }}>
              {note.excerpt}
            </p>
          )}

          <span
            className="group-hover:text-[#C8922A] transition-colors duration-200"
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.45rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#7A6F62',
            }}
          >
            {readMoreLabel}
          </span>
        </div>

        {note.coverImage && (
          <div
            style={{
              width:     '96px',
              height:    '96px',
              overflow:  'hidden',
              flexShrink: 0,
              opacity:   0.65,
            }}
            className="group-hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src={note.coverImage}
              alt=""
              width={96}
              height={96}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        )}
      </article>
    </Link>
  );
}
