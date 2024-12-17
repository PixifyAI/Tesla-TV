import React from 'react';
import { Tv, Clapperboard, Layout } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const { isDarkMode } = useTheme();

  const categories = [
    { id: 'all', label: 'ALL', icon: Layout },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'movie', label: 'MOVIES', icon: Clapperboard },
  ];

  return (
    <div className="flex justify-center space-x-4 mb-8">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onCategoryChange(id)}
          className={`
            flex items-center px-6 py-2 rounded-lg font-medium transition-all
            ${activeCategory === id
              ? `${isDarkMode 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-indigo-600 text-white'
                }`
              : `${isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
                }`
            }
          `}
        >
          <Icon className="w-5 h-5 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
};