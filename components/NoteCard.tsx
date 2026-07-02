import Link from 'next/link';
import Image from 'next/image';
import type { BeehiivPost } from '@/lib/beehiiv';

function formatDate(unix: number, locale: string): string {
  return new Date(unix * 1000).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function NoteCard({ post, locale }: { post: BeehiivPost; locale: string }) {
  const date = formatDate(post.publish_date, locale);

  return (
    <Link
      href={`/notes/${post.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      className="group"
    >
      <article
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          display: 'grid',
          gridTemplateColumns: post.thumbnail_url ? '1fr auto' : '1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        <div>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.42rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#7A6F62',
            marginBottom: '0.75rem',
          }}>
            {date}
          </p>

          <h2
            className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
            style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 1.75rem)',
              color: '#E8E0D4',
              lineHeight: 1.15,
              marginBottom: post.subtitle ? '0.65rem' : 0,
            }}
          >
            {post.title}
          </h2>

          {post.subtitle && (
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.8rem',
              color: '#7A6F62',
              lineHeight: 1.7,
              maxWidth: '52ch',
            }}>
              {post.subtitle}
            </p>
          )}
        </div>

        {post.thumbnail_url && (
          <div style={{
            width: '80px',
            height: '80px',
            flexShrink: 0,
            overflow: 'hidden',
            opacity: 0.7,
          }}
          className="group-hover:opacity-100 transition-opacity duration-200"
          >
            <Image
              src={post.thumbnail_url}
              alt=""
              width={80}
              height={80}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        )}
      </article>
    </Link>
  );
}
