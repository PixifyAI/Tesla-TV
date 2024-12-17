import React from 'react';
import { Play } from 'lucide-react';
import { GifItem } from '../types/gif';
import { useTheme } from '../context/ThemeContext';

interface GifCardProps {
  gif: GifItem;
  onClick: (gif: GifItem) => void;
}

export const GifCard: React.FC<GifCardProps> = ({ gif, onClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <div 
      className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 group`}
      onClick={() => onClick(gif)}
    >
      <div className="aspect-square relative">
        <img 
          src={gif.previewUrl} 
          alt={gif.filename}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12" />
        </div>
      </div>
      <div className="p-4">
        <p className={`${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        } text-center font-medium truncate`}>
          {gif.filename}
        </p>
      </div>
    </div>
  );
};