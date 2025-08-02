import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Anime } from '../types';

interface AnimeCardProps {
  anime: Anime;
  onPlay: (anime: Anime) => void;
  onInfo: (anime: Anime) => void;
  isContinueWatching?: boolean;
  progress?: number; 
}

const AnimeCard: React.FC<AnimeCardProps> = ({ 
  anime, 
  onPlay, 
  onInfo, 
  isContinueWatching = false,
  progress = 0 
}) => {
  return (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:z-10">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={anime.poster}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {isContinueWatching && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            <button
              onClick={() => onPlay(anime)}
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200"
            >
              <Play size={24} fill="white" />
            </button>
            <button
              onClick={() => onInfo(anime)}
              className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
            >
              <Info size={24} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{anime.year}</span>
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-500" fill="currentColor" />
            <span>{anime.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {anime.genre.slice(0, 2).map((g, index) => (
            <span
              key={index}
              className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
            >
              {g}
            </span>
          ))}
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2">{anime.description}</p>
        
        {anime.type === 'serie' && (
          <div className="mt-2 text-xs text-gray-500">
            {anime.seasons.length} saison{anime.seasons.length > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeCard;