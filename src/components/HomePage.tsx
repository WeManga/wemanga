import React, { useState, useEffect } from 'react';
import { Play, Info, Star, Calendar } from 'lucide-react';
import { Anime, ContinueWatching } from '../types';
import { animes } from '../data/animes';
import { getContinueWatching } from '../utils/cookies';
import Footer from './Footer';
import AdBanner from './AdBanner';

interface HomePageProps {
  filter: 'all' | 'serie' | 'film';
  onPlayAnime: (anime: Anime) => void;
  onAnimeDetail: (anime: Anime) => void;
  searchQuery?: string;
}

const HomePage: React.FC<HomePageProps> = ({ filter, onPlayAnime, onAnimeDetail, searchQuery = '' }) => {
  const [continueWatchingData, setContinueWatchingData] = useState<ContinueWatching[]>([]);

  useEffect(() => {
    setContinueWatchingData(getContinueWatching());
  }, []);

  // Filtrage par type et recherche
  const filteredAnimes = animes.filter(anime => {
    const matchesFilter = filter === 'all' || anime.type === filter;
    const matchesSearch = searchQuery === '' || 
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const continueWatchingAnimes = continueWatchingData
    .map(item => {
      const anime = animes.find(a => a.id === item.animeId);
      return anime ? { anime, progress: item.progress } : null;
    })
    .filter(item => item !== null)
    .slice(0, 6);

  const nouveautes = filteredAnimes.filter(anime => anime.category === 'nouveaute');
  const classiques = filteredAnimes.filter(anime => anime.category === 'classique');
  const autresAnimes = filteredAnimes.filter(anime => !anime.category);

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-20">
        {/* Hero Section avec l'image des personnages d'anime */}
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src="/ChatGPT Image 29 juil. 2025, 02_10_36.png"
            alt="WeManga - Anime Heroes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-white text-5xl md:text-7xl font-bold mb-4">
                WeManga
              </h1>
              <p className="text-gray-300 text-xl md:text-2xl mb-8">
                Découvrez les meilleurs animes en streaming VF
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Résultats de recherche */}
          {searchQuery && (
            <section className="mb-16">
              <h2 className="text-white text-3xl font-bold mb-8 text-center">
                🔍 Résultats pour "{searchQuery}"
              </h2>
              {filteredAnimes.length > 0 ? (
                <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 justify-center md:justify-start md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
                  {filteredAnimes.map(anime => (
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
                              <Play size={24} fill="white" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAnimeDetail(anime);
                              }}
                              className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
                            >
                              <Info size={24} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            anime.type === 'serie' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-purple-600 text-white'
                          }`}>
                            {anime.type === 'serie' ? 'SÉRIE' : 'FILM'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-white font-bold text-xl mb-3 line-clamp-1">
                          {anime.title}
                        </h3>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar size={14} />
                            <span>{anime.year}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-500" fill="currentColor" />
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
                        
                        {anime.type === 'serie' && (
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{anime.seasons.length} saison{anime.seasons.length > 1 ? 's' : ''}</span>
                            <span>
                              {anime.seasons.reduce((total, season) => total + season.episodes.length, 0)} épisodes
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-xl mb-4">Aucun résultat trouvé</div>
                  <p className="text-gray-500">Essayez avec d'autres mots-clés</p>
                </div>
              )}
            </section>
          )}

          {/* Section Reprenez votre visionnage */}
          {!searchQuery && continueWatchingAnimes.length > 0 && (
            <section className="mb-16">
              <h2 className="text-white text-3xl font-bold mb-8 text-center">
                📺 Reprenez votre visionnage
              </h2>
              <div className="overflow-x-auto scrollbar-hide pb-4">
                <div className="flex gap-6 justify-start px-4 md:px-0 md:justify-center lg:justify-start">
                {continueWatchingAnimes.map(({ anime, progress }) => (
                  <div
                    key={`continue-${anime.id}`}
                    className="group relative bg-gray-900 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer flex-shrink-0 w-48 md:w-56"
                    onClick={() => onAnimeDetail(anime)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Barre de progression */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                        <div 
                          className="h-full bg-red-600 transition-all duration-300"
                          style={{ width: `${progress * 100}%` }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlayAnime(anime);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200"
                          >
                            <Play size={20} fill="white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAnimeDetail(anime);
                            }}
                            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
                          >
                            <Info size={20} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Badge continuer */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          CONTINUER
                        </span>
                      </div>
                      
                      {/* Badge type */}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          anime.type === 'serie' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-purple-600 text-white'
                        }`}>
                          {anime.type === 'serie' ? 'SÉRIE' : 'FILM'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-white font-bold text-sm mb-2 line-clamp-1">
                        {anime.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>{anime.year}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="text-yellow-500" fill="currentColor" />
                          <span className="text-yellow-500 font-medium">{anime.rating}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Progression: {Math.round(progress * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </section>
          )}

          {/* Bannière publicitaire avant Nouveautés */}
          {!searchQuery && <AdBanner />}

          {/* Section Nouveautés */}
          {!searchQuery && nouveautes.length > 0 && (
            <section className="mb-16">
              <h2 className="text-white text-3xl font-bold mb-8 text-center">
                 Nouveautés
              </h2>
              <div className="overflow-x-auto scrollbar-hide pb-4 md:overflow-visible">
                <div className="flex gap-6 justify-start px-4 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
                {nouveautes.map(anime => (
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
                            <Play size={24} fill="white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAnimeDetail(anime);
                            }}
                            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
                          >
                            <Info size={24} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Badge nouveau */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          NOUVEAU
                        </span>
                      </div>
                      
                      {/* Badge type */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          anime.type === 'serie' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-purple-600 text-white'
                        }`}>
                          {anime.type === 'serie' ? 'SÉRIE' : 'FILM'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-white font-bold text-xl mb-3 line-clamp-1">
                        {anime.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} />
                          <span>{anime.year}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-500" fill="currentColor" />
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
                      
                      {anime.type === 'serie' && (
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{anime.seasons.length} saison{anime.seasons.length > 1 ? 's' : ''}</span>
                          <span>
                            {anime.seasons.reduce((total, season) => total + season.episodes.length, 0)} épisodes
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </section>
          )}

          {/* Bannière publicitaire avant Les Classiques */}
          {!searchQuery && <AdBanner />}

          {/* Section Les Classiques */}
          {!searchQuery && classiques.length > 0 && (
            <section>
              <h2 className="text-white text-3xl font-bold mb-8 text-center">
                Les Classiques
              </h2>
              <div className="overflow-x-auto scrollbar-hide pb-4 md:overflow-visible">
                <div className="flex gap-6 justify-start px-4 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
                {classiques.map(anime => (
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
                            <Play size={24} fill="white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAnimeDetail(anime);
                            }}
                            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
                          >
                            <Info size={24} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Badge classique */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          CLASSIQUE
                        </span>
                      </div>
                      
                      {/* Badge type */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          anime.type === 'serie' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-purple-600 text-white'
                        }`}>
                          {anime.type === 'serie' ? 'SÉRIE' : 'FILM'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-white font-bold text-xl mb-3 line-clamp-1">
                        {anime.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} />
                          <span>{anime.year}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-500" fill="currentColor" />
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
                      
                      {anime.type === 'serie' && (
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{anime.seasons.length} saison{anime.seasons.length > 1 ? 's' : ''}</span>
                          <span>
                            {anime.seasons.reduce((total, season) => total + season.episodes.length, 0)} épisodes
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </section>
          )}

          {/* Bannière publicitaire avant Catalogue Complet */}
          {!searchQuery && autresAnimes.length > 0 && <AdBanner />}

          {/* Section Autres Animes (si pas de catégorie spécifique) */}
          {!searchQuery && autresAnimes.length > 0 && (
            <section className="mt-16">
              <h2 className="text-white text-3xl font-bold mb-8 text-center">
                📚 Catalogue Complet
              </h2>
              <div className="overflow-x-auto scrollbar-hide pb-4 md:overflow-visible">
                <div className="flex gap-6 justify-start px-4 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
                {autresAnimes.map(anime => (
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
                            <Play size={24} fill="white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAnimeDetail(anime);
                            }}
                            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
                          >
                            <Info size={24} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          anime.type === 'serie' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-purple-600 text-white'
                        }`}>
                          {anime.type === 'serie' ? 'SÉRIE' : 'FILM'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-white font-bold text-xl mb-3 line-clamp-1">
                        {anime.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} />
                          <span>{anime.year}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-500" fill="currentColor" />
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
                      
                      {anime.type === 'serie' && (
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{anime.seasons.length} saison{anime.seasons.length > 1 ? 's' : ''}</span>
                          <span>
                            {anime.seasons.reduce((total, season) => total + season.episodes.length, 0)} épisodes
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </section>
          )}

          {/* Message si aucune section n'est disponible */}
          {!searchQuery && nouveautes.length === 0 && classiques.length === 0 && autresAnimes.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-xl mb-4">Aucun contenu disponible</div>
              <p className="text-gray-500">Revenez bientôt pour découvrir de nouveaux animes !</p>
            </div>
          )}
        </div>
        
        {/* Bannière publicitaire avant Footer */}
        <AdBanner />
        
        <Footer />
      </div>
    </div>
  );
};

export default HomePage; 