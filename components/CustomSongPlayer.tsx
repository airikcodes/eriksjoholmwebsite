import type { FeaturedCustomSong } from '@/data/customSongs';

interface Props {
  songs: FeaturedCustomSong[];
  playlistUrl: string;
}

export default function CustomSongPlayer({ songs, playlistUrl }: Props) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        {songs.map((song) => (
          <div key={song.title}>
            {/* responsive 480:235 wrapper */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: `${(235 / 480) * 100}%` }}>
              <iframe
                src={song.embedSrc}
                title={song.title}
                allowFullScreen
                frameBorder="0"
                style={{
                  position: 'absolute',
                  inset:    0,
                  width:    '100%',
                  height:   '100%',
                }}
              />
            </div>
          </div>
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
        }}
        className="hover:text-[#C8922A] hover:border-[#C8922A] transition-colors duration-200"
      >
        Hear more examples →
      </a>
    </div>
  );
}
