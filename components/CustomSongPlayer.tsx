import type { FeaturedCustomSong } from '@/data/customSongs';

interface Props {
  songs: FeaturedCustomSong[];
  playlistUrl: string;
}

export default function CustomSongPlayer({ songs, playlistUrl }: Props) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {songs.map((song) => (
          <iframe
            key={song.title}
            src={song.embedSrc}
            title={song.title}
            allowFullScreen
            frameBorder="0"
            style={{ width: '100%', height: '235px', display: 'block' }}
          />
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
