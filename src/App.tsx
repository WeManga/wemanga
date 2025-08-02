// src/App.tsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollingMessage from './components/ScrollingMessage';
import HomePage from './components/HomePage';
import AnimeDetail from './components/AnimeDetail';
import VideoPlayer from './components/VideoPlayer';
import SeriesPage from './components/SeriesPage';
import FilmsPage from './components/FilmsPage';
import { Anime, Episode, Season } from './types';
import { animes } from './data/animes';
import { saveContinueWatching } from './utils/cookies';

type AppState = 'home' | 'series' | 'films' | 'detail' | 'player';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [filter, setFilter] = useState<'all' | 'serie' | 'film'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleHomeClick = () => {
    setCurrentState('home');
    setFilter('all');
    setSearchQuery('');
    setSelectedAnime(null);
    setSelectedEpisode(null);
    setSelectedSeason(null);
    scrollToTop();
  };

  const handleFilterChange = (newFilter: 'all' | 'serie' | 'film') => {
    setFilter(newFilter);
    setSearchQuery('');
    setCurrentState(newFilter === 'serie' ? 'series' : newFilter === 'film' ? 'films' : 'home');
    scrollToTop();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentState('home');
    scrollToTop();
  };

  const handlePlayAnime = (anime: Anime) => {
    const firstSeason = anime.seasons[0];
    const firstEpisode = firstSeason.episodes[0];
    setSelectedAnime(anime);
    setSelectedSeason(firstSeason);
    setSelectedEpisode(firstEpisode);
    setCurrentState('player');
    scrollToTop();
  };

  const handleAnimeDetail = (anime: Anime) => {
    setSelectedAnime(anime);
    setCurrentState('detail');
    scrollToTop();
  };

  const handlePlayEpisode = (episode: Episode, season: Season) => {
    setSelectedEpisode(episode);
    setSelectedSeason(season);
    setCurrentState('player');
    scrollToTop();
  };

  const handleBack = () => {
    setCurrentState(currentState === 'player' ? 'detail' : 'home');
    scrollToTop();
  };

  const handleNextEpisode = () => {
    if (!selectedEpisode || !selectedSeason) return;
    const index = selectedSeason.episodes.findIndex(ep => ep.id === selectedEpisode.id);
    if (index < selectedSeason.episodes.length - 1) {
      setSelectedEpisode(selectedSeason.episodes[index + 1]);
    }
  };

  const handlePreviousEpisode = () => {
    if (!selectedEpisode || !selectedSeason) return;
    const index = selectedSeason.episodes.findIndex(ep => ep.id === selectedEpisode.id);
    if (index > 0) {
      setSelectedEpisode(selectedSeason.episodes[index - 1]);
    }
  };

  const handleProgress = (progress: number) => {
    if (selectedAnime && selectedSeason && selectedEpisode) {
      saveContinueWatching({
        animeId: selectedAnime.id,
        seasonId: selectedSeason.id,
        episodeId: selectedEpisode.id,
        progress,
        timestamp: Date.now(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {currentState !== 'player' && (
        <>
          <ScrollingMessage />
          <Navbar
            activeFilter={filter}
            onFilterChange={handleFilterChange}
            onHomeClick={handleHomeClick}
            onSearch={handleSearch}
          />
        </>
      )}

      {currentState === 'home' && (
        <HomePage
          filter={filter}
          searchQuery={searchQuery}
          onPlayAnime={handlePlayAnime}
          onAnimeDetail={handleAnimeDetail}
        />
      )}

      {currentState === 'series' && (
        <SeriesPage
          searchQuery={searchQuery}
          onPlayAnime={handlePlayAnime}
          onAnimeDetail={handleAnimeDetail}
        />
      )}

      {currentState === 'films' && (
        <FilmsPage
          searchQuery={searchQuery}
          onPlayAnime={handlePlayAnime}
          onAnimeDetail={handleAnimeDetail}
        />
      )}

      {currentState === 'detail' && selectedAnime && (
        <AnimeDetail
          anime={selectedAnime}
          onBack={handleBack}
          onPlayEpisode={handlePlayEpisode}
        />
      )}

      {currentState === 'player' && selectedEpisode && selectedSeason && (
        <VideoPlayer
          episode={selectedEpisode}
          season={selectedSeason}
          onBack={handleBack}
          onNextEpisode={handleNextEpisode}
          onPreviousEpisode={handlePreviousEpisode}
          hasNextEpisode={
            selectedSeason.episodes.findIndex(ep => ep.id === selectedEpisode.id) <
            selectedSeason.episodes.length - 1
          }
          hasPreviousEpisode={
            selectedSeason.episodes.findIndex(ep => ep.id === selectedEpisode.id) > 0
          }
          onProgress={handleProgress}
        />
      )}
    </div>
  );
}

export default App;
