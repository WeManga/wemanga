import { ContinueWatching } from '../types';

const CONTINUE_WATCHING_KEY = 'continueWatching';

export const saveContinueWatching = (data: ContinueWatching): void => {
  try {
    const existingData = getContinueWatching();
    const updatedData = existingData.filter(item => 
      !(item.animeId === data.animeId && item.seasonId === data.seasonId && item.episodeId === data.episodeId)
    );
    updatedData.unshift(data);
    localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(updatedData.slice(0, 10)));
  } catch (error) {
    console.error('Error saving continue watching data:', error);
  }
};

export const getContinueWatching = (): ContinueWatching[] => {
  try {
    const data = localStorage.getItem(CONTINUE_WATCHING_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting continue watching data:', error);
    return [];
  }
};

export const removeContinueWatching = (animeId: number, seasonId: number, episodeId: number): void => {
  try {
    const existingData = getContinueWatching();
    const filteredData = existingData.filter(item => 
      !(item.animeId === animeId && item.seasonId === seasonId && item.episodeId === episodeId)
    );
    localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(filteredData));
  } catch (error) {
    console.error('Error removing continue watching data:', error);
  }
};