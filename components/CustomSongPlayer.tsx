import type { FeaturedCustomSong } from '@/data/customSongs';

interface Props {
  songs: FeaturedCustomSong[];
  playlistUrl: string;
}

export default function CustomSongPlayer({ songs, playlistUrl }: Props) {
  return (
    <div>
      <ul style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: '2.5rem' }}>
        {songs.map((song) => (
          <li
            key={song.discoCode}
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <a
              href={`https://s.disco.ac/${song.discoCode}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        'grid',
                gridTemplateColumns: '52px 1fr auto',
                gap:            '1.25rem',
                alignItems:     'center',
                padding:        '1.25rem 0',
                textDecoration: 'none',
              }}
              className="group"
            >
              <img
                src={song.artworkUrl}
                alt=""
                width={52}
                height={52}
                style={{ width: 52, height: 52, objectFit: 'cover', opacity: 0.85 }}
              />
              <p
                className="font-[family-name:var(--font-cormorant)] font-light group-hover:text-[#C8922A] transition-colors duration-200"
                style={{ fontSize: 'clamp(1rem, 2.4vw, 1.3rem)', color: '#E8E0D4', lineHeight: 1.2 }}
              >
                {song.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                <span style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize:   '0.5rem',
                  color:      'rgba(200,146,42,0.4)',
                  lineHeight: 1,
                }}>
                  ▶
                </span>
                <span style={{
                  fontFamily:    'var(--font-inter)',
                  fontSize:      '0.55rem',
                  letterSpacing: '0.08em',
                  color:         '#7A6F62',
                }}>
                  {song.duration}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

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
