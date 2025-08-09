import React, { useEffect, useRef, useState } from "react";
import { Episode, Season } from "../types";
import ScrollingMessage from "./ScrollingMessage";

interface VideoPlayerProps {
  episode: Episode;
  season: Season;
  onBack: () => void;
  onNextEpisode: () => void;
  onPreviousEpisode: () => void;
  hasNextEpisode: boolean;
  hasPreviousEpisode: boolean;
  onProgress: (progress: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  episode,
  season,
  onBack,
  onNextEpisode,
  onPreviousEpisode,
  hasNextEpisode,
  hasPreviousEpisode,
  onProgress,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bannerUrl = season?.banner || episode.thumbnail || "";
  const [showAd, setShowAd] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const adContainerRef = useRef<HTMLDivElement>(null);

  const getVideoType = (url: string) => {
    if (!url) return null;
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("vimeo.com")) return "vimeo";
    if (url.includes("sibnet.ru")) return "sibnet";
    if (url.includes("sendvid.com")) return "sendvid";
    if (url.match(/\.(mp4|webm|ogg)$/i)) return "video";
    return "unknown";
  };

  const videoType = getVideoType(episode.videoUrl);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || videoType !== "video") return;

    const handleTimeUpdate = () => {
      const progress = videoEl.currentTime / videoEl.duration;
      if (progress && !isNaN(progress)) onProgress(progress);
    };

    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [onProgress, videoType]);

  const getEmbedUrl = () => {
    try {
      if (videoType === "youtube") {
        const id = episode.videoUrl.includes("youtu.be")
          ? episode.videoUrl.split("youtu.be/")[1].split(/[?&]/)[0]
          : new URL(episode.videoUrl).searchParams.get("v");
        return `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0`;
      }
      if (videoType === "vimeo") {
        const match = episode.videoUrl.match(/vimeo\.com\/(\d+)/);
        return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : null;
      }
      if (videoType === "sendvid") {
        const match = episode.videoUrl.match(/sendvid\.com\/([a-zA-Z0-9]+)/);
        return match ? `https://sendvid.com/embed/${match[1]}` : null;
      }
      return episode.videoUrl;
    } catch {
      return null;
    }
  };

  // Insère ton script pub dans le container adContainerRef
  useEffect(() => {
    if (showAd && adContainerRef.current) {
      adContainerRef.current.innerHTML = "";
      const script = document.createElement("script");
      script.src = "https://groleegni.net/401/9692467";
      script.async = true;
      adContainerRef.current.appendChild(script);
    }
  }, [showAd]);

  const handleVideoPlayAttempt = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!videoStarted) {
      e.preventDefault();
      videoRef.current?.pause();
      setShowAd(true);
    }
  };

  const onAdClosed = () => {
    setShowAd(false);
    setVideoStarted(true);
    videoRef.current?.play();
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans pb-10">
      {/* Message déroulant */}
      <ScrollingMessage />

      {/* Bouton retour */}
      <div className="px-6 pt-14">
        <button
          onClick={onBack}
          className="text-white hover:text-gray-300 bg-transparent px-2 py-1 rounded transition"
        >
          ← Retour
        </button>
      </div>

      {/* Bannière visuelle */}
      {bannerUrl && (
        <div
          className="w-full h-[220px] mt-4 mb-4"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(${bannerUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Titre de l’épisode */}
      <div className="flex justify-center mb-6">
        <div className="bg-black/70 px-6 py-2 rounded-lg text-xl font-semibold shadow-md">
          {episode.title}
        </div>
      </div>

      {/* Lecteur vidéo */}
      <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-[#111] shadow-lg relative">
        <div className="relative pb-[56.25%]">
          {showAd && (
            <div
              className="absolute inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-center p-4"
              ref={adContainerRef}
            >
              {/* Pub injectée par script */}
              <button
                onClick={onAdClosed}
                className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
              >
                Fermer la pub et lire la vidéo
              </button>
            </div>
          )}

          {videoType === "video" && (
            <video
              ref={videoRef}
              src={episode.videoUrl}
              controls
              onPlay={handleVideoPlayAttempt}
              className="absolute top-0 left-0 w-full h-full"
            />
          )}

          {(videoType === "youtube" || videoType === "vimeo" || videoType === "sendvid") && (() => {
            const embedUrl = getEmbedUrl();
            return embedUrl ? (
              <iframe
                src={embedUrl}
                title="Video Player"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            ) : (
              <p className="absolute top-0">Impossible de charger la vidéo</p>
            );
          })()}

          {videoType === "sibnet" && (
            <iframe
              src={episode.videoUrl}
              title="Sibnet Player"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen"
              className="absolute top-0 left-0 w-full h-full"
            />
          )}
        </div>

        {/* Navigation épisodes */}
        <div className="flex justify-between items-center px-4 py-3 bg-[#222]">
          <button
            onClick={onPreviousEpisode}
            disabled={!hasPreviousEpisode}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              hasPreviousEpisode ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 cursor-not-allowed"
            }`}
          >
            ← Épisode précédent
          </button>

          <button
            onClick={onNextEpisode}
            disabled={!hasNextEpisode}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              hasNextEpisode ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 cursor-not-allowed"
            }`}
          >
            Épisode suivant →
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
