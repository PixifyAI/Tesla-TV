import React, { useState } from 'react';
import { X, Pause, Play, Maximize, Minimize } from 'lucide-react';
import { GifItem } from '../types/gif';
import { useTheme } from '../context/ThemeContext';

interface GifModalProps {
  gif: GifItem | null;
  onClose: () => void;
}

export const GifModal: React.FC<GifModalProps> = ({ gif, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isDarkMode } = useTheme();

  if (!gif) return null;

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 ${
        isDarkMode ? 'dark' : ''
      }`}
      onClick={onClose}
    >
      <div 
        className={`${
          isFullscreen ? 'fixed inset-0 m-0' : 'max-w-4xl w-full mx-4'
        } bg-white dark:bg-gray-800 rounded-lg p-4`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{gif.filename}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlayPause}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 dark:text-gray-100" />
              ) : (
                <Play className="w-6 h-6 dark:text-gray-100" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              {isFullscreen ? (
                <Minimize className="w-6 h-6 dark:text-gray-100" />
              ) : (
                <Maximize className="w-6 h-6 dark:text-gray-100" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-6 h-6 dark:text-gray-100" />
            </button>
          </div>
        </div>
        <div className={`relative ${isFullscreen ? 'h-[calc(100vh-8rem)]' : 'aspect-video'} bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden`}>
          <img
            src={isPlaying ? gif.url : gif.previewUrl}
            alt={gif.filename}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};