'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Eye, BarChart3, Target, Lightbulb, AlertTriangle } from 'lucide-react';

export const OutlierKnowledge: React.FC = () => {
  const knowledgeItems = [
    {
      icon: TrendingDown,
      title: "What are Outlier Videos?",
      description: "Videos that perform significantly below expectations based on channel average, topic relevance, or similar content performance.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Eye,
      title: "Low View Count Indicators",
      description: "Videos with unusually low views compared to channel's typical performance or industry benchmarks for similar content.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Performance Metrics",
      description: "Analyze views, likes, comments, and engagement rates to identify content that underperformed despite good quality.",
      color: "from-orange-600 to-yellow-500"
    },
    {
      icon: Target,
      title: "Optimization Opportunities",
      description: "Outliers often indicate content that needs better titles, thumbnails, timing, or promotion strategies.",
      color: "from-red-600 to-orange-500"
    },
    {
      icon: Lightbulb,
      title: "Hidden Potential",
      description: "Many outlier videos contain valuable content that just needs the right presentation or marketing approach.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: AlertTriangle,
      title: "Learning from Failures",
      description: "Outliers provide insights into what doesn't work, helping creators avoid similar mistakes in future content.",
      color: "from-red-500 to-orange-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Understanding Outlier Videos
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn what makes videos outliers and how to identify opportunities for improvement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {knowledgeItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white shadow-md`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-orange-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Pro Tip: Turn Outliers into Opportunities
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Don't just identify outliers - use them as learning opportunities. Analyze what went wrong, test new approaches, 
              and sometimes even recreate the content with better optimization. Many successful creators have turned their 
              worst-performing videos into their biggest hits with the right strategy.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
