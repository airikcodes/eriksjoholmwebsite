export interface FeaturedCustomSong {
  title:        string;
  artworkUrl:   string;
  streamingUrl: string;
}

export const featuredCustomSongs: FeaturedCustomSong[] = [
  {
    title:        'Julia (I Love You More)',
    artworkUrl:   'https://s3.eu-central-1.amazonaws.com/l2-disco-data-eu/media/businesses/26337-erik-sjholm/artwork/f8329cdb-ba1e-4751-a605-487e7c622da6.jpeg',
    streamingUrl: 'https://s.disco.ac/maohljkcfryg',
  },
  {
    title:        'Lilia',
    artworkUrl:   'https://s3.eu-central-1.amazonaws.com/l2-disco-data-eu/media/businesses/26337-erik-sjholm/artwork/515042ae-0c6e-424f-8531-fd9c7d0e0ed8.jpeg',
    streamingUrl: 'https://s.disco.ac/fbnywgiqjoqa',
  },
  {
    title:        'Adrianna Rose',
    artworkUrl:   'https://s3.eu-central-1.amazonaws.com/l2-disco-data-eu/media/businesses/26337-erik-sjholm/artwork/95858a07-b5a8-4a98-9e21-72a4af7782ad.jpeg',
    streamingUrl: 'https://s.disco.ac/urmoakankjcy',
  },
];

export const CUSTOM_SONGS_PLAYLIST_URL = 'https://s.disco.ac/gpjjamnlavyi';
