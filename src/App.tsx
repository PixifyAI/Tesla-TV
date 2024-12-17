import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { GifGallery } from './components/GifGallery';
import { GifModal } from './components/GifModal';
import { ThemeToggle } from './components/ThemeToggle';
import { CategoryFilter } from './components/CategoryFilter';
import { UploadModal } from './components/UploadModal';
import { ThemeProvider } from './context/ThemeContext';
import { useGifs } from './hooks/useGifs';
import { GifItem } from './types/gif';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const [selectedGif, setSelectedGif] = useState<GifItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const { gifs, activeCategory, setActiveCategory, addGif } = useGifs();

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'
    }`}>
      <header className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      } shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-1" />
            <h1 className={`text-3xl font-bold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            } text-center flex-1`}>Tesla TV</h1>
            <div className="flex items-center gap-4 flex-1 justify-end">
              <ThemeToggle />
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <ImagePlus className="w-5 h-5 mr-2" />
                Upload GIF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <GifGallery 
          gifs={gifs} 
          onGifClick={setSelectedGif} 
        />
      </main>

      <GifModal 
        gif={selectedGif} 
        onClose={() => setSelectedGif(null)} 
      />

      {isUploadModalOpen && (
        <UploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={addGif}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;