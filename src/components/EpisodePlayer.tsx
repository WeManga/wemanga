import React from "react";
import VideoPlayer from "./VideoPlayer";
import { Episode, Season } from "../types";

interface EpisodePlayerProps {
  episode: Episode;
  season: Season;
  onBack: () => void;
  onNextEpisode: () => void;
  onPreviousEpisode: () => void;
  hasNextEpisode: boolean;
  hasPreviousEpisode: boolean;
  onProgress: (progress: number) => void;
}

const EpisodePlayer: React.FC<EpisodePlayerProps> = (props) => {
  // Pour l’instant, on délègue tout à VideoPlayer
  return <VideoPlayer {...props} />;
};

export default EpisodePlayer;
