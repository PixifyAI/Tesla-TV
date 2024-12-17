import { useState, useEffect } from 'react';
import { GifItem } from '../types/gif';
import { fetchGifs, uploadGif } from '../utils/api';

export const useGifs = () => {
  const [gifs, setGifs] = useState<GifItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGifs = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGifs(activeCategory);
        setGifs(data);
      } catch (error) {
        console.error('Error loading GIFs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGifs();
  }, [activeCategory]);

  const addGif = async (file: File, category: 'tv' | 'movie') => {
    try {
      const newGif = await uploadGif(file, category);
      setGifs(prev => [newGif, ...prev]);
    } catch (error) {
      console.error('Error uploading GIF:', error);
      throw error;
    }
  };

  return {
    gifs,
    isLoading,
    activeCategory,
    setActiveCategory,
    addGif,
  };
};