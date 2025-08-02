import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.profitableratecpm.com/w10hh3jj?key=c6bcdb41a9c6df1077cf7048072493e5';
    script.async = true;

    if (adRef.current) {
      adRef.current.innerHTML = ''; // Vide avant d'ajouter
      adRef.current.appendChild(script);
    }

    return () => {
      // Nettoyage lors du démontage
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <div className="bg-gray-900 rounded-lg p-4 max-w-4xl w-full">
        <div className="text-center">
          <div ref={adRef} className="min-h-[100px] flex items-center justify-center">
            {/* Contenu temporaire pendant le chargement */}
            <div className="text-gray-500 text-sm">Chargement de la publicité...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
