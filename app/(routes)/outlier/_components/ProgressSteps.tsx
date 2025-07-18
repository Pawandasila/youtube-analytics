'use client';

import React from 'react';
import { Search, Eye } from 'lucide-react';
import { SearchStep } from './types';

interface ProgressStepsProps {
  searchStep: SearchStep;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ searchStep }) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${searchStep === 'search' ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
          <Search className="w-4 h-4" />
          <span className="text-sm font-medium">Search</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600" />
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${searchStep === 'results' ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">View Outliers</span>
        </div>
      </div>
    </div>
  );
};
