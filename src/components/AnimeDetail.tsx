import React, { useState } from 'react';
import { Play, ArrowLeft, Star, Calendar, Clock } from 'lucide-react';
import { Anime, Episode, Season } from '../types';

interface AnimeDetailProps {
  anime: Anime;
  onBack: () => void;
  onPlayEpisode: (episode: Episode, season: Season) => void;
}

const AnimeDetail: React.FC<AnimeDetailProps> = ({ anime, onBack, onPlayEpisode }) => {
  const [selectedSeason, setSelectedSeason] = useState(anime.seasons[0]);

  return (
    <div className="min-h-screen bg-black pt-4">
      {/* Header */}
      <div className="relative z-10 p-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Retour</span>
        </button>
      </div>

      {/* Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={anime.banner}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-center flex flex-col items-center text-white text-4xl md:text-6xl font-bold mb-4">{anime.title}</h1>
            <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-6 text-white mb-6">
              <div className="flex items-center space-x-2">
                <Star size={20} className="text-yellow-500" fill="currentColor" />
                <span>{anime.rating}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar size={20} />
                <span>{anime.year}</span>
              </div>
              <span className="bg-red-600 px-3 py-1 rounded text-sm">{anime.status}</span>
            </div>
            </div>
            
            <div className="flex justify-center mt-6">
            <button
              onClick={() => onPlayEpisode(selectedSeason.episodes[0], selectedSeason)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg flex items-center space-x-3 transition-colors duration-200 text-lg font-semibold"
            >
              <Play size={24} fill="white" />
              <span>Regarder maintenant</span>
            </button>
          </div>
        </div>
      </div>
      </div>


      <div className="max-w-6xl mx-auto p-8">
        {/* Description and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-center flex flex-col items-center text-white text-2xl font-bold mb-4">Synopsis</h2>
            <p className="text-center flex flex-col items-center text-gray-300 text-lg leading-relaxed mb-6">{anime.description}</p>

            <div className="flex justify-center mt-6">
            <div className="flex flex-wrap gap-2">
              {anime.genre.map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-white text-xl font-bold mb-4">Informations</h3>
            <div className="space-y-3 text-gray-300">
              <div>
                <span className="text-gray-400">Type:</span> {anime.type === 'serie' ? 'Série' : 'Film'}
              </div>
              <div>
                <span className="text-gray-400">Année:</span> {anime.year}
              </div>
              <div>
                <span className="text-gray-400">Statut:</span> {anime.status}
              </div>
              <div>
                <span className="text-gray-400">Note:</span> {anime.rating}/10
              </div>
              {anime.type === 'serie' && (
                <div>
                  <span className="text-gray-400">Saisons:</span> {anime.seasons.length}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seasons */}
        {anime.type === 'serie' && anime.seasons.length > 1 && (
          <div className="mb-8">
            <h2 className="text-white text-2xl font-bold mb-6">Saisons</h2>
            <div className="flex flex-wrap gap-4">
              {anime.seasons.map((season) => (
                <button
                  key={season.id}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                    selectedSeason.id === season.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {season.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Episodes */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-6">
            {anime.type === 'serie' ? `Épisodes - ${selectedSeason.title}` : 'Film'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedSeason.episodes.map((episode, index) => (
              <div
                key={episode.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors duration-200 cursor-pointer group"
                onClick={() => onPlayEpisode(episode, selectedSeason)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Play size={32} className="text-white" fill="white" />
                  </div>
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {anime.type === 'serie' ? `Ép. ${index + 1}` : 'Film'}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{episode.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-3">{episode.description}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>{episode.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail; 