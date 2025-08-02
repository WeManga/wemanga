import React, { useEffect } from 'react';

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  useEffect(() => {
    // Script pour charger les publicités
    const script = document.createElement('script');
    script.src = 'https://www.profitableratecpm.com/w10hh3jj?key=c6bcdb41a9c6df1077cf7048072493e5';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Nettoyage du script lors du démontage du composant
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <div className="bg-gray-900 rounded-lg p-4 max-w-4xl w-full">
        <div className="text-center">
          {/* Zone où la publicité sera injectée */}
          <div id="ad-banner" className="min-h-[100px] flex items-center justify-center">
            <div className="text-gray-500 text-sm">
              Publicité
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
