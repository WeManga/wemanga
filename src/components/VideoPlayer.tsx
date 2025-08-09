import React, { useEffect } from "react";
// ... tes imports habituels

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
  const bannerUrl = season?.banner || episode.thumbnail || "";

  // Injection du script pub une seule fois au montage
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://groleegni.net/401/9692467";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans pb-10">
      <ScrollingMessage />

      <div className="px-6 pt-14">
        <button
          onClick={onBack}
          className="text-white hover:text-gray-300 bg-transparent px-2 py-1 rounded transition"
        >
          ← Retour
        </button>
      </div>

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

      {/* Ici on place la pub avant le lecteur */}
      <div
        id="pub-container"
        className="w-full max-w-4xl mx-auto mb-6 bg-gray-900 rounded-lg text-center p-4"
        style={{ minHeight: 100, color: "#fff" }}
      >
        {/* Le script injecté devrait afficher la pub ici ou ailleurs selon son code */}
        <p>Publicité affichée ici (script injecté)</p>
      </div>

      {/* Lecteur vidéo comme avant */}
      <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-[#111] shadow-lg">
        {/* ... tout ton code de lecteur vidéo comme tu as déjà */}
        {/* Pour rappel, pas besoin de changer cette partie */}
      </div>

      <AdBanner id="playerBottom" />
    </div>
  );
};

export default VideoPlayer;
