'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VideoThumbnail } from './types';
import { ThumbnailCard } from './ThumbnailCard';

interface SearchResultsProps {
  searchQuery: string;
  searchResults: VideoThumbnail[];
  onThumbnailSelect: (thumbnail: VideoThumbnail) => void;
  onNewSearch: () => void;
  generatingThumbnailId?: string | null;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  searchResults,
  onThumbnailSelect,
  onNewSearch,
  generatingThumbnailId = null
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Search Results for "{searchQuery}"
        </h3>
        <button
          onClick={onNewSearch}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          New Search
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {searchResults.map((thumbnail, index) => (
          <ThumbnailCard
            key={thumbnail.id}
            thumbnail={thumbnail}
            index={index}
            onClick={() => onThumbnailSelect(thumbnail)}
            isGenerating={generatingThumbnailId === thumbnail.id}
          />
        ))}
      </div>
    </motion.div>
  );
};
