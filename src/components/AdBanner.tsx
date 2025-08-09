import React from 'react';

interface AdBannerProps {
  id: string;
  className?: string;
}

const urls: { [key: string]: string } = {
  homeTop: 'https://otieu.com/4/9691962',
  homeClassics: 'https://www.profitableratecpm.com/q5gvxneh?key=0fcb2820527b80ee08f776218cee82d9',
  homeCatalog: 'https://www.profitableratecpm.com/f5dcmeijf?key=ae05b8e83b116293e4e9dfcae2b98c14',
  homeBottom: 'https://www.profitableratecpm.com/jd3u29qy?key=a77bac4003cf2f4a2e675dfc206fff89',
  seriesTop: 'https://www.profitableratecpm.com/h33ns6axj?key=79c42dfb3c0d602f602329dc68c40c12',
  seriesBottom: 'https://www.profitableratecpm.com/v5503e0p?key=e1681898885ce1a63a9df8c24fb3b047',
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
