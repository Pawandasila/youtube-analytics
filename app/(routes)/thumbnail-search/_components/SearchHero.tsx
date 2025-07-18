'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2 as Loader2Icon } from 'lucide-react';

interface SearchHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-8 max-w-4xl mx-auto"
    >
      {/* Typography Section */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
          Discover & Generate
          <br />
          <span className="text-4xl md:text-5xl">Amazing Thumbnails</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Search YouTube thumbnails, find inspiration, and let our AI create similar designs tailored to your content
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for thumbnails (e.g., 'tutorial', 'gaming', 'tech review')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 shadow-sm focus:shadow-md transition-all duration-200"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={loading || !searchQuery.trim()}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
          >
            {loading ? (
              <Loader2Icon className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Search
          </motion.button>
        </div>

        {searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 px-4 rounded-lg"
          >
            Press Enter to search or click the Search button
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
