'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2 as Loader2Icon } from 'lucide-react';

interface OutlierHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
}

export const OutlierHero: React.FC<OutlierHeroProps> = ({
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
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
          Find Hidden Gems
          <br />
          <span className="text-4xl md:text-5xl">Outlier Videos</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover underperforming videos with high potential. Find content that deserves more views and optimize your strategy
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for outlier videos (e.g., 'tutorial', 'gaming', 'tech review')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 shadow-sm focus:shadow-md transition-all duration-200"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2Icon className="w-5 h-5 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Find Outliers</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
