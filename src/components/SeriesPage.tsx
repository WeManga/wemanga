import React from 'react';
import { Anime } from '../types';
import { animes } from '../data/animes';
import AnimeCard from './AnimeCard';
import AdBanner from './AdBanner';

interface SeriesPageProps {
  searchQuery?: string;
  onPlayAnime: (anime: Anime) => void;
  onAnimeDetail: (anime: Anime) => void;
}

const SeriesPage: React.FC<SeriesPageProps> = ({ searchQuery = '', onPlayAnime, onAnimeDetail }) => {
  const seriesAnimes = animes.filter(anime => {
    const isSerie = anime.type === 'serie';
    const matchesSearch = searchQuery === '' || 
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return isSerie && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-8 py-12"> 
        {/* Bannière publicitaire avant le titre */}
        <AdBanner />
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-center flex flex-col items-center text-white text-4xl font-bold mb-4">
            {searchQuery ? `Séries - Résultats pour "${searchQuery}"` : 'Séries Anime'}
          </h1>
          <p className="text-center flex flex-col items-center text-gray-400 text-lg">
            {searchQuery 
              ? `${seriesAnimes.length} série${seriesAnimes.length > 1 ? 's' : ''} trouvée${seriesAnimes.length > 1 ? 's' : ''}`
              : 'Découvrez notre collection de séries anime avec plusieurs saisons et épisodes'
            }
          </p>
          {!searchQuery && (
            <div className="text-center flex flex-col items-center mt-4 text-gray-500">
            {seriesAnimes.length} série{seriesAnimes.length > 1 ? 's' : ''} disponible{seriesAnimes.length > 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Series Grid */}
        <div className="overflow-x-auto scrollbar-hide pb-4 md:overflow-visible">
          <div className="flex gap-6 justify-start px-4 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
          {seriesAnimes.map(anime => (
            <div
              key={anime.id}
              className="group relative bg-gray-900 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer flex-shrink-0 w-64 md:w-auto"
              onClick={() => onAnimeDetail(anime)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAnime(anime);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200"
                    >
                      <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAnimeDetail(anime);
                      }}
                      className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Badge série */}
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    SÉRIE
                  </span>
                </div>
                
                {/* Badge statut */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    anime.status === 'En cours' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-white'
                  }`}>
                    {anime.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-3 line-clamp-1">
                  {anime.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{anime.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-yellow-500 font-medium">{anime.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genre.slice(0, 3).map((g, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs"
                    >
                      {g}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {anime.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{anime.seasons.length} saison{anime.seasons.length > 1 ? 's' : ''}</span>
                  <span>
                    {anime.seasons.reduce((total, season) => total + season.episodes.length, 0)} épisodes
                  </span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {seriesAnimes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">
              {searchQuery ? 'Aucune série trouvée' : 'Aucune série disponible'}
            </div>
            <p className="text-gray-500">
              {searchQuery ? 'Essayez avec d\'autres mots-clés' : 'Revenez bientôt pour découvrir de nouvelles séries !'}
            </p>
          </div>
        )}
      </div>
      
      {/* Bannière publicitaire avant Footer */}
      <AdBanner />
    </div>
  );
};

export default SeriesPage;