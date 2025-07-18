'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { VideoThumbnail } from './types';
import { ThumbnailCard } from './ThumbnailCard';

interface AISuggestionsProps {
  selectedThumbnail: VideoThumbnail | null;
  aiSuggestions: VideoThumbnail[];
  onGenerateMore: () => void;
  onBackToResults: () => void;
  isGenerating?: boolean;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({
  selectedThumbnail,
  aiSuggestions,
  onGenerateMore,
  onBackToResults,
  isGenerating = false
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
            AI Generated Similar Thumbnails
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your selection: "{selectedThumbnail?.title}"
          </p>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            onClick={onGenerateMore}
            disabled={isGenerating}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isGenerating
                ? 'bg-purple-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
            } text-white`}
            whileHover={!isGenerating ? { scale: 1.02 } : {}}
            whileTap={!isGenerating ? { scale: 0.98 } : {}}
          >
            {isGenerating ? (
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </motion.div>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate More
              </>
            )}
          </motion.button>
          
          <button
            onClick={onBackToResults}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {aiSuggestions.map((suggestion, index) => (
          <ThumbnailCard
            key={suggestion.id}
            thumbnail={suggestion}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};
