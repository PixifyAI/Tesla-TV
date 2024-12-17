import React, { useState } from 'react';
import { X, Tv, Clapperboard } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (file: File, category: 'tv' | 'movie') => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<'tv' | 'movie'>('tv');
  const { isDarkMode } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile, category);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg p-6 w-full max-w-md`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Upload GIF
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block mb-2 font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Category
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setCategory('tv')}
                className={`flex-1 py-3 rounded-lg flex items-center justify-center ${
                  category === 'tv'
                    ? 'bg-indigo-600 text-white'
                    : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                }`}
              >
                <Tv className="w-5 h-5 mr-2" />
                TV
              </button>
              <button
                type="button"
                onClick={() => setCategory('movie')}
                className={`flex-1 py-3 rounded-lg flex items-center justify-center ${
                  category === 'movie'
                    ? 'bg-indigo-600 text-white'
                    : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                }`}
              >
                <Clapperboard className="w-5 h-5 mr-2" />
                Movie
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className={`block mb-2 font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Select GIF
            </label>
            <input
              type="file"
              accept=".gif"
              onChange={handleFileChange}
              className={`w-full px-3 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={!selectedFile}
            className={`w-full py-2 px-4 rounded-lg font-medium ${
              selectedFile
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : `${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`
            }`}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};