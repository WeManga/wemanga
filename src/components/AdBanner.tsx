import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
  url?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  url = 'https://www.profitableratecpm.com/w10hh3jj?key=c6bcdb41a9c6df1077cf7048072493e5',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = '100px';
    iframe.style.border = 'none';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';

    const randomParam = Math.floor(Math.random() * 1000000);
    iframe.src = `${url}?${randomParam}&ref=${encodeURIComponent(window.location.hostname)}`;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [url]);

return (
  <div
    ref={containerRef}
    className={`min-h-[100px] w-full my-6 ${className}`}
  />
);


export default AdBanner;
