import React, { useEffect, useRef, useState } from "react";
// ... tes imports

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  // ... props
}) => {
  const [showAd, setShowAd] = useState(true); // afficher la pub au départ

  // Fonction pour insérer le script pub
  useEffect(() => {
    if (!showAd) return; // si pas de pub, on ne fait rien

    const script = document.createElement("script");
    script.src = "https://groleegni.net/401/9692467";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Nettoyer le script après la pub (quand showAd devient false)
      document.body.removeChild(script);
    };
  }, [showAd]);

  // Gérer la fin de la pub (par exemple au bout de 10 secondes)
  useEffect(() => {
    if (!showAd) return;

    const timer = setTimeout(() => {
      setShowAd(false); // cacher la pub et montrer la vidéo
    }, 10000); // 10 secondes, tu peux ajuster ou rendre dynamique

    return () => clearTimeout(timer);
  }, [showAd]);

  // Reste de ton code (identique)
  // ...

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

      {/* Si showAd = true, on affiche la pub (div vide ou script injecté) */}
      {showAd ? (
        <div
          id="ad-container"
          style={{
            width: "100%",
            height: "360px", // taille pub, adapte si besoin
            backgroundColor: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 18,
          }}
        >
          {/* Le script injecté va insérer la pub ici */}
          Publicité en cours...
        </div>
      ) : (
        // Sinon on affiche le lecteur vidéo
        <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-[#111] shadow-lg">
          <div className="relative pb-[56.25%]">
            {videoType === "video" && (
              <video
                ref={videoRef}
                src={episode.videoUrl}
                controls
                autoPlay
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
                hasPreviousEpisode ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              ← Épisode précédent
            </button>

            <button
              onClick={onNextEpisode}
              disabled={!hasNextEpisode}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                hasNextEpisode ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              Épisode suivant →
            </button>
          </div>
        </div>
      )}

      {/* Bannière pub après le lecteur */}
      <AdBanner id="playerBottom" />
    </div>
  );
};

export default VideoPlayer;
