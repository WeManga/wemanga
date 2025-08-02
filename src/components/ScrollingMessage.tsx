// src/components/ScrollingMessage.tsx
import React from 'react';
import { Heart, Shield } from 'lucide-react';

const ScrollingMessage: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 overflow-hidden">
      <div className="animate-scroll whitespace-nowrap will-change-transform">
        <div className="inline-flex items-center space-x-8 text-sm font-medium px-4">
          <div className="flex items-center space-x-2">
            <Heart size={16} className="text-red-200" />
            <span>Soutenez WeManga ! Désactivez votre bloqueur de pub</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield size={16} className="text-red-200" />
            <span>Aucune pub sur les vidéos - Seulement sur le site</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart size={16} className="text-red-200" />
            <span>Votre soutien nous aide à maintenir le service gratuit</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield size={16} className="text-red-200" />
            <span>Publicités non-intrusives pour une meilleure expérience</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart size={16} className="text-red-200" />
            <span>Merci de nous aider à continuer !</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingMessage;
