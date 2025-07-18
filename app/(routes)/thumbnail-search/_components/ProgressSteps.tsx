'use client';

import React from 'react';
import { Search, Eye, Sparkles } from 'lucide-react';
import { SearchStep } from './types';

interface ProgressStepsProps {
  searchStep: SearchStep;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ searchStep }) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${searchStep === 'search' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
          <Search className="w-4 h-4" />
          <span className="text-sm font-medium">Search</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600" />
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${searchStep === 'results' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">Browse Results</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600" />
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${searchStep === 'ai-suggestions' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI Suggestions</span>
        </div>
      </div>
    </div>
  );
};
