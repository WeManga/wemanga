import React from 'react';
import { Search, Film, Tv, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeFilter: 'all' | 'serie' | 'film';
  onFilterChange: (filter: 'all' | 'serie' | 'film') => void;
  onHomeClick: () => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeFilter, onFilterChange, onHomeClick, onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav className="fixed top-[40px] left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button 
              onClick={onHomeClick}
              className="flex items-center space-x-2 text-red-600 hover:text-red-500 transition-colors duration-200"
            >
              <div className="bg-red-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg hover:bg-red-500 transition-colors duration-200">
                WM
              </div>
              <span className="text-2xl font-bold hidden sm:block">WeManga</span>
            </button>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => onFilterChange('all')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeFilter === 'all' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span>Accueil</span>
              </button>

              <button
                onClick={() => onFilterChange('serie')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeFilter === 'serie' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Tv size={18} />
                <span>Séries</span>
              </button>

              <button
                onClick={() => onFilterChange('film')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeFilter === 'film' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Film size={18} />
                <span>Films</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Rechercher..."
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-64 transition-all duration-200"
              />
            </form>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-gray-300 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-t border-gray-800 px-4 py-4 space-y-2">
          <button
            onClick={() => {
              onFilterChange('all');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
              activeFilter === 'all' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            Accueil
          </button>

          <button
            onClick={() => {
              onFilterChange('serie');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeFilter === 'serie' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Tv size={18} />
            <span>Séries</span>
          </button>

          <button
            onClick={() => {
              onFilterChange('film');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeFilter === 'film' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Film size={18} />
            <span>Films</span>
          </button>

          <form onSubmit={handleSearchSubmit} className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Rechercher..."
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
