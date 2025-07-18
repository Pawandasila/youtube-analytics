'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PopularSearchesProps {
  onTagClick: (tag: string) => void;
}

const popularTags = [
  { name: 'Tutorial', icon: '📚', gradient: 'from-blue-500 to-purple-600' },
  { name: 'Gaming', icon: '🎮', gradient: 'from-green-500 to-blue-600' },
  { name: 'Tech Review', icon: '💻', gradient: 'from-gray-500 to-blue-600' },
  { name: 'Cooking', icon: '👨‍🍳', gradient: 'from-orange-500 to-red-600' },
  { name: 'Travel', icon: '✈️', gradient: 'from-cyan-500 to-blue-600' },
  { name: 'Music', icon: '🎵', gradient: 'from-pink-500 to-purple-600' },
  { name: 'Fitness', icon: '💪', gradient: 'from-emerald-500 to-green-600' },
  { name: 'DIY', icon: '🔨', gradient: 'from-yellow-500 to-orange-600' }
];

export const PopularSearches: React.FC<PopularSearchesProps> = ({ onTagClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Popular Categories
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Quick start with trending thumbnail categories
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {popularTags.map((tag, index) => (
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
            <div className="relative text-center space-y-2">
              <div className="text-2xl">{tag.icon}</div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {tag.name}
              </div>
            </div>
            
            {/* Hover border effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${tag.gradient} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300 -z-10`} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
