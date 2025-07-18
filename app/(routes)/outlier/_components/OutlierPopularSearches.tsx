'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface OutlierPopularSearchesProps {
  onTagClick: (tag: string) => void;
}

const outlierTags = [
  { name: 'Low Views Tutorial', icon: '📚', gradient: 'from-orange-500 to-red-600' },
  { name: 'Underrated Gaming', icon: '🎮', gradient: 'from-red-500 to-orange-600' },
  { name: 'Failed Tech Review', icon: '💻', gradient: 'from-orange-600 to-red-500' },
  { name: 'Ignored Cooking', icon: '👨‍🍳', gradient: 'from-red-500 to-pink-600' },
  { name: 'Hidden Travel', icon: '✈️', gradient: 'from-orange-500 to-red-500' },
  { name: 'Unheard Music', icon: '🎵', gradient: 'from-red-600 to-orange-500' },
  { name: 'Overlooked Fitness', icon: '💪', gradient: 'from-orange-600 to-red-600' },
  { name: 'Unseen DIY', icon: '🔨', gradient: 'from-red-500 to-orange-600' }
];

export const OutlierPopularSearches: React.FC<OutlierPopularSearchesProps> = ({ onTagClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Outlier Categories
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Discover underperforming videos in popular categories
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {outlierTags.map((tag, index) => (
          <motion.button
            key={tag.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagClick(tag.name)}
            className="group relative p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-transparent transition-all duration-300 hover:shadow-lg"
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${tag.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="text-2xl mb-2">{tag.icon}</div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {tag.name}
              </div>
            </div>
            
            {/* Hover ring */}
            <div className={`absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-opacity-50 transition-all duration-300 group-hover:ring-gradient-to-r ${tag.gradient}`} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
