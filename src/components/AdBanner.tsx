import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
  url?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  url = 'https://www.profitableratecpm.com/z8jj97wv?key=21713001843103ea1def6c2e4b45be45',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = '100px';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.title = 'Ad Frame';
    iframe.loading = 'eager';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';

    const randomParam = Math.floor(Math.random() * 1000000);

    if (url) {
      iframe.src = `${url}?${randomParam}&ref=${encodeURIComponent(window.location.hostname)}`;
    } else {
      iframe.srcdoc = `
        <html>
        <body style="margin:0;display:flex;align-items:center;justify-content:center;background:#111;color:#666;font-family:sans-serif;">
        <div style="text-align:center;">
        <div style="font-size:14px;">Publicité</div>
        </div>
        </body>
        </html>
      `;
    }

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
      className={`min-h-[100px] w-full my-6 bg-transparent ${className}`}
    />
  );
};

export default AdBanner;
