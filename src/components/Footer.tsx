import React from 'react';
import { Heart, Github, Mail, Star } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">
                WM
              </div>
              <span className="text-2xl font-bold text-white">WeManga</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Votre plateforme de streaming anime préférée. Découvrez les meilleurs animes 
              en VF et VOSTFR, des classiques aux dernières nouveautés.
            </p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors">
                <Heart size={18} />
                <span className="text-sm">Fait avec passion</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Séries Anime
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Films Anime
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Nouveautés
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Classiques
                </a>
              </li>
            </ul>
          </div>

          {/* Genres populaires */}
          <div>
            <h3 className="text-white font-semibold mb-4">Genres Populaires</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Romance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Fantastique
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Comédie
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Drame
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Statistiques */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-500 mb-1">500+</div>
              <div className="text-gray-400 text-sm">Animes disponibles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500 mb-1">10K+</div>
              <div className="text-gray-400 text-sm">Épisodes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500 mb-1">50K+</div>
              <div className="text-gray-400 text-sm">Utilisateurs actifs</div>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="text-yellow-500" size={20} fill="currentColor" />
                <span className="text-2xl font-bold text-yellow-500">4.8</span>
              </div>
              <div className="text-gray-400 text-sm">Note moyenne</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 WeManga. Tous droits réservés.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;