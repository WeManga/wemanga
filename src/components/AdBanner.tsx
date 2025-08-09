import React from 'react';

interface AdBannerProps {
  id: string;
  className?: string;
}

const urls: { [key: string]: string } = {
  homeTop: 'https://otieu.com/4/9691962',
  homeClassics: 'https://otieu.com/4/9691962',
  homeCatalog: 'https://otieu.com/4/9691962',
  homeBottom: 'https://otieu.com/4/9691962',
  seriesTop: 'https://otieu.com/4/9692384',
  seriesBottom: 'https://otieu.com/4/9692384',
  filmsTop: 'https://www.profitableratecpm.com/qeith0eve?key=645019c901b69978a1618a62f5ed5571',
  filmsBottom: 'https://www.profitableratecpm.com/v269kae51?key=1f3e4fb205f3473733b252968b96bd21',
  playerTop: 'https://www.profitableratecpm.com/hi3izs3u5u?key=29fe0c6ef8a0941343562387a22b9bc4',
  playerBottom: 'https://www.profitableratecpm.com/bkn63wpz?key=74d6b49d2b10bfdc736f8e970982c4c4',
};

const AdBanner: React.FC<AdBannerProps> = ({ id, className }) => {
  const url = urls[id];
  if (!url) return null;

  return (
    <div className={`w-full flex justify-center my-6 ${className || ''}`}>
      <iframe
        src={url}
        width="728"
        height="90"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay"
      />
    </div>
  );
};

export default AdBanner;
