export interface FeaturedCustomSong {
  title: string;
  duration: string;
  artworkUrl: string;
  discoCode: string;
}

export const featuredCustomSongs: FeaturedCustomSong[] = [
  {
    title:      'Julia (I Love You More)',
    duration:   '3:41',
    artworkUrl: 'https://s3.eu-central-1.amazonaws.com/l2-disco-data-eu/media/businesses/26337-erik-sjholm/artwork/f8329cdb-ba1e-4751-a605-487e7c622da6.jpeg',
    discoCode:  'kblogcvgrfqd',
  },
  {
    title:      'Lilia',
    duration:   '4:07',
    artworkUrl: 'https://s3.eu-central-1.amazonaws.com/l2-disco-data-eu/media/businesses/26337-erik-sjholm/artwork/515042ae-0c6e-424f-8531-fd9c7d0e0ed8.jpeg',
    discoCode:  'nxcytkktpugo',
  },
  {
    title:      'Adrianna Rose',
    duration:   '3:16',
    artworkUrl: 'https://s3.eu-central-1.amazonaws.com/l2-disco-data-eu/media/businesses/26337-erik-sjholm/artwork/95858a07-b5a8-4a98-9e21-72a4af7782ad.jpeg',
    discoCode:  'phruhguovksc',
  },
];

export const CUSTOM_SONGS_PLAYLIST_URL = 'https://s.disco.ac/gpjjamnlavyi';
