'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VideoThumbnail } from './types';
import { ThumbnailCard } from './ThumbnailCard';

interface SearchResultsProps {
  searchQuery: string;
  searchResults: VideoThumbnail[];
  onNewSearch: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  searchResults,
  onNewSearch
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Outlier Results for "{searchQuery}"
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Found {searchResults.length} underperforming videos with potential for improvement
          </p>
        </div>
        <button
          onClick={onNewSearch}
          className="text-orange-600 hover:text-orange-700 font-medium"
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
          />
        ))}
      </div>
    </motion.div>
  );
};
