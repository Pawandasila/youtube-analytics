'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 as Loader2Icon } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
        <Loader2Icon className="w-6 h-6 animate-spin text-purple-600" />
        <span className="text-lg font-medium text-purple-600 dark:text-purple-400">
          AI is generating similar thumbnails...
        </span>
      </div>
    </motion.div>
  );
};
