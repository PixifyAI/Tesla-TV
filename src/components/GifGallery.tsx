import React from 'react';
import { GifItem } from '../types/gif';
import { GifCard } from './GifCard';

interface GifGalleryProps {
  gifs: GifItem[];
  onGifClick: (gif: GifItem) => void;
}

export const GifGallery: React.FC<GifGalleryProps> = ({ gifs, onGifClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} onClick={onGifClick} />
      ))}
    </div>
  );
};