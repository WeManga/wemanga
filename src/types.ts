export interface Episode {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

export interface Season {
  id: number;
  number: number;
  title: string;
  episodes: Episode[];
}

export interface Anime {
  id: number;
  title: string;
  description: string;
  poster: string;
  banner: string;
  genre: string[];
  year: number;
  rating: number;
  type: 'serie' | 'film';
  category?: 'nouveaute' | 'classique';
  seasons: Season[];
  status: string;
}

export interface ContinueWatching {
  animeId: number;
  seasonId: number;
  episodeId: number;
  progress: number;
  timestamp: number;
}