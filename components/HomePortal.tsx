import Link from 'next/link';
import { getWork } from '@/data/works';
import { getLatestRelease } from '@/lib/latest-release';
import { STORYTELLER_URL } from '@/lib/library';

export interface PortalCopy {
  eyebrow: string;
  heading: string;
  intro:   string;
  kinds:   { album: string; ep: string; live: string; songs: string; notes: string };
  titles:  { concert: string; singles: string; stories: string };
  door:    { eyebrow: string; heading: string; body: string; cta: string };
}

function cover(slug: string): string | undefined {
  return getWork(slug)?.coverImage;
}

interface ItemProps {
  href:      string;
  external?: boolean;
  kicker:    string;
  title:     string;
  src?:      string;
  position?: string;
}

// One quiet item: cover, a small kind label, a title. No frame, no overlay.
function Item({ href, external, kicker, title, src, position = 'center' }: ItemProps) {
  const inner = (
    <>
      <span className="home-lib-img" aria-hidden="true">
        {src && <img src={src} alt="" loading="lazy" style={{ objectPosition: position }} />}
      </span>
      <span className="home-lib-kicker">{kicker}</span>
      <span className="home-lib-title font-[family-name:var(--font-cormorant)]">{title}</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="home-lib-item" aria-label={`${kicker}: ${title}`}>
      {inner}
    </a>
  ) : (
    <Link href={href} className="home-lib-item" aria-label={`${kicker}: ${title}`}>
      {inner}
    </Link>
  );
}

// Homepage Library: four covers and two quiet links. Everything else lives on /works.
export default function HomePortal({
  t,
  comingSoon,
  latestLabel,
}: {
  t:                PortalCopy;
  comingSoon:       string;
  latestLabel:      string;   // translated "Latest release" (the concierge chip label)
  latestNoteTitle?: string;   // kept for the caller; the minimal layout no longer shows it
}) {
  const latest = getLatestRelease();   // from data/works.ts: always the newest release
  return (
    <div className="home-lib">
      <div className="home-lib-grid">
        {latest && <Item href={`/works/${latest.slug}`} kicker={latestLabel} title={latest.title} src={latest.coverImage} />}
        <Item href="/works/langs-med-vagen-album" kicker={`${t.kinds.album} · ${comingSoon}`} title="Längs med vägen" src={cover('langs-med-vagen-album')} />
        <Item href="/works/glenn-ep" kicker={t.kinds.ep} title="Glenn" src={cover('glenn-ep')} />
        <Item external href={STORYTELLER_URL} kicker={t.kinds.live} title={t.titles.concert} src="/images/home/storytelling-concert.jpg" position="50% 50%" />
      </div>
      <div className="home-lib-links">
        <Link href="/works" className="home-lib-more">{t.door.cta}</Link>
        <Link href="/notes" className="home-lib-more">{t.titles.stories}</Link>
      </div>
    </div>
  );
}
