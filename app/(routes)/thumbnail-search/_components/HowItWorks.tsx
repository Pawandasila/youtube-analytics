'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200/50 dark:border-purple-800/50"
    >
      <div className="relative p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            How It Works
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover trending thumbnails and let our AI create personalized variations for your content
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Search & Discover
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Search for thumbnails by topic, style, keyword, or phrase
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Choose Your Favorite
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Browse results and click on thumbnails that match your style preferences
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              AI Creates Similar
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Our AI generates multiple variations based on your selection
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
