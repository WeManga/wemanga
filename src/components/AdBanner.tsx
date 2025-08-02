import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  id: string;
}

const urls: { [key: string]: string } = {
  homeTop: '<script type="text/javascript" src="https://www.profitableratecpm.com/your-original-url"></script>',
  homeClassics: '<script type="text/javascript" src="https://www.profitableratecpm.com/q5gvxneh?key=0fcb2820527b80ee08f776218cee82d9"></script>',
  homeCatalog: '<script type="text/javascript" src="https://www.profitableratecpm.com/f5dcmeijf?key=ae05b8e83b116293e4e9dfcae2b98c14"></script>',
  homeBottom: '<script type="text/javascript" src="https://www.profitableratecpm.com/jd3u29qy?key=a77bac4003cf2f4a2e675dfc206fff89"></script>',
  seriesTop: '<script type="text/javascript" src="https://www.profitableratecpm.com/h33ns6axj?key=79c42dfb3c0d602f602329dc68c40c12"></script>',
  seriesBottom: '<script type="text/javascript" src="https://www.profitableratecpm.com/v5503e0p?key=e1681898885ce1a63a9df8c24fb3b047"></script>',
  filmsTop: '<script type="text/javascript" src="https://www.profitableratecpm.com/qeith0eve?key=645019c901b69978a1618a62f5ed5571"></script>',
  filmsBottom: '<script type="text/javascript" src="https://www.profitableratecpm.com/v269kae51?key=1f3e4fb205f3473733b252968b96bd21"></script>',
  playerTop: '<script type="text/javascript" src="https://www.profitableratecpm.com/hi3izs3u5u?key=29fe0c6ef8a0941343562387a22b9bc4"></script>',
  playerBottom: '<script type="text/javascript" src="https://www.profitableratecpm.com/bkn63wpz?key=74d6b49d2b10bfdc736f8e970982c4c4"></script>',
};

const AdBanner: React.FC<AdBannerProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const html = urls[id];
    if (!html || !containerRef.current) return;

    containerRef.current.innerHTML = html;

    const scriptTag = containerRef.current.querySelector('script');
    if (scriptTag) {
      const script = document.createElement('script');
      script.src = scriptTag.src;
      script.async = true;
      script.type = 'text/javascript';
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(script);
    }
  }, [id]);

  return <div ref={containerRef} className="w-full my-6 min-h-[100px]" />;
};

export default AdBanner;
