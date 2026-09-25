import Link from 'next/link';
import { getWork } from '@/data/works';
import { STORYTELLER_URL } from '@/lib/library';

export interface PortalCopy {
  eyebrow: string;
  heading: string;
  intro:   string;
  kinds:   { album: string; ep: string; live: string; songs: string; notes: string };
  titles:  { concert: string; singles: string; stories: string };
  door:    { eyebrow: string; heading: string; body: string; cta: string };
}

const KICKER: React.CSSProperties = {
  fontFamily:    'var(--font-inter)',
  fontSize:      '0.7rem',
  fontWeight:    500,
  letterSpacing: '0.26em',
  textTransform: 'uppercase',
  color:         '#C8922A',
  marginBottom:  '0.4rem',
};

// One cool accent, reserved only for the LIVE tag — everything else stays warm gold.
const LIVE_ACCENT = '#5B9AA0';

function cover(slug: string): string | undefined {
  return getWork(slug)?.coverImage;
}

interface TileProps {
  href:      string;
  external?: boolean;
  kicker:    string;
  kickerColor?: string;
  title:     string;
  lead?:     boolean;
  className?: string;
  children:  React.ReactNode;
}

function Tile({ href, external, kicker, kickerColor, title, lead, className = '', children }: TileProps) {
  const cls = `portal-tile ${lead ? 'portal-tile--lead' : ''} ${className}`.trim();
  const inner = (
    <>
      {children}
      <span className="portal-tile-text">
        <span style={{ display: 'block', ...KICKER, ...(kickerColor ? { color: kickerColor } : {}) }}>{kicker}</span>
        <span
          className="font-[family-name:var(--font-cormorant)]"
          style={{
            display:       'block',
            fontWeight:    400,
            fontSize:      lead ? 'clamp(1.9rem, 4.2vw, 2.9rem)' : 'clamp(1.15rem, 2.4vw, 1.55rem)',
            lineHeight:    1.08,
            letterSpacing: '0.01em',
            color:         '#F1EADF',
          }}
        >
          {title}
        </span>
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${kicker}: ${title}`}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} aria-label={`${kicker}: ${title}`}>
      {inner}
    </Link>
  );
}

function Media({ src, position = 'center' }: { src?: string; position?: string }) {
  return (
    <>
      <span className="portal-tile-media" aria-hidden="true">
        {src && <img src={src} alt="" loading="lazy" style={{ objectPosition: position }} />}
      </span>
      <span className="portal-tile-shade" aria-hidden="true" />
    </>
  );
}

export default function HomePortal({
  t,
  comingSoon,
  latestNoteTitle,
}: {
  t:                PortalCopy;
  comingSoon:       string;
  latestNoteTitle?: string;
}) {
  const singlesCovers = ['stanna', 'lycka', 'barndomsaren', 'langs-med-vagen']
    .map(cover)
    .filter((c): c is string => !!c);

  return (
    <div className="portal-grid">
      {/* 1 — Längs med vägen (lead) */}
      <Tile lead href="/works/langs-med-vagen-album" kicker={`${t.kinds.album} · ${comingSoon}`} title="Längs med vägen">
        <Media src={cover('langs-med-vagen-album')} position="50% 50%" />
      </Tile>

      {/* 2 — Glenn (EP) */}
      <Tile href="/works/glenn-ep" kicker={t.kinds.ep} title="Glenn">
        <Media src={cover('glenn-ep')} />
      </Tile>

      {/* 3 — Storytelling concert (lives on its own site) */}
      <Tile external href={STORYTELLER_URL} kicker={t.kinds.live} kickerColor={LIVE_ACCENT} title={t.titles.concert}>
        <Media src="/images/home/storytelling-concert.jpg" position="62% 50%" />
      </Tile>

      {/* 4 — Singles */}
      <Tile href="/works?type=singles" kicker={t.kinds.songs} title={t.titles.singles}>
        <span className="portal-tile-media" aria-hidden="true">
          <span className="portal-mosaic">
            {singlesCovers.map((src) => (
              <img key={src} src={src} alt="" loading="lazy" />
            ))}
          </span>
        </span>
        <span className="portal-tile-shade" aria-hidden="true" />
      </Tile>

      {/* 5 — Stories (typographic; the notes have no cover art) */}
      <Tile href="/notes" kicker={t.kinds.notes} title={t.titles.stories} className="portal-tile--type">
        <span
          aria-hidden="true"
          className="font-[family-name:var(--font-cormorant)]"
          style={{
            position:   'absolute',
            top:        '0.6rem',
            left:       '1rem',
            fontSize:   'clamp(4.5rem, 10vw, 7rem)',
            lineHeight: 1,
            color:      'rgba(200,146,42,0.22)',
          }}
        >
          “
        </span>
        {latestNoteTitle && (
          <span
            className="font-[family-name:var(--font-cormorant)]"
            style={{
              position:   'absolute',
              top:        'clamp(3.4rem, 8vw, 5.2rem)',
              left:       '1.1rem',
              right:      '1.1rem',
              fontSize:   'clamp(0.95rem, 1.7vw, 1.2rem)',
              fontStyle:  'italic',
              lineHeight: 1.3,
              color:      '#B8B0A6',
            }}
          >
            {latestNoteTitle}
          </span>
        )}
      </Tile>

      {/* 6 — Walkabout */}
      <Tile href="/works/walkabout" kicker={t.kinds.album} title="Walkabout">
        <Media src={cover('walkabout')} />
      </Tile>

      {/* 7 — Stanna */}
      <Tile href="/works/stanna" kicker={t.kinds.songs} title="Stanna">
        <Media src={cover('stanna')} />
      </Tile>

      {/* The door into the library */}
      <Link href="/works" className="portal-door">
        <span>
          <span className="eyebrow-label" style={{ display: 'block', marginBottom: '0.9rem', color: '#C8922A' }}>
            {t.door.eyebrow}
          </span>
          <span
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ display: 'block', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.02, color: '#E8E0D4', marginBottom: '1rem' }}
          >
            {t.door.heading}
          </span>
          <span className="body-copy" style={{ display: 'block', maxWidth: '34ch' }}>
            {t.door.body}
          </span>
        </span>
        <span
          className="portal-door-cta"
          style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      '0.72rem',
            fontWeight:    500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color:         '#C8922A',
          }}
        >
          {t.door.cta} →
        </span>
      </Link>
    </div>
  );
}
