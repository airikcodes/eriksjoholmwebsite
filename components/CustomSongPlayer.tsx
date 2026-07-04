import type { FeaturedCustomSong } from '@/data/customSongs';

interface Props {
  songs: FeaturedCustomSong[];
  playlistUrl: string;
}

export default function CustomSongPlayer({ songs, playlistUrl }: Props) {
  return (
    <div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: '2.5rem' }}>
        {songs.map((song, i) => (
          <a
            key={song.title}
            href={song.streamingUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:             'grid',
              gridTemplateColumns: '2rem 52px 1fr auto',
              gap:                 '1.25rem',
              alignItems:          'center',
              padding:             '1.5rem 0',
              borderBottom:        '1px solid rgba(255,255,255,0.06)',
              textDecoration:      'none',
            }}
            className="group"
          >
            <span style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.48rem',
              color:         'rgba(200,146,42,0.35)',
              letterSpacing: '0.08em',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <img
              src={song.artworkUrl}
              alt=""
              width={52}
              height={52}
              style={{ width: 52, height: 52, objectFit: 'cover', opacity: 0.85 }}
            />
            <p
              className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
              style={{
                fontSize:      'clamp(1.1rem, 2.8vw, 1.55rem)',
                color:         '#E8E0D4',
                lineHeight:    1.2,
                letterSpacing: '0.01em',
              }}
            >
              {song.title}
            </p>
            <span style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.5rem',
              letterSpacing: '0.18em',
              color:         '#7A6F62',
              flexShrink:    0,
            }}>
              →
            </span>
          </a>
        ))}
      </div>

      <a
        href={playlistUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display:        'inline-block',
          fontFamily:     'var(--font-inter)',
          fontSize:       '0.48rem',
          letterSpacing:  '0.2em',
          textTransform:  'uppercase',
          color:          '#7A6F62',
          borderBottom:   '1px solid rgba(122,111,98,0.3)',
          paddingBottom:  '2px',
          textDecoration: 'none',
          marginBottom:   '2.5rem',
        }}
        className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
      >
        Hear more examples →
      </a>
    </div>
  );
}
