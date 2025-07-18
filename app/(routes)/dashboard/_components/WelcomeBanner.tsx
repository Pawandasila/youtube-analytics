"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Crown, Zap, Star } from 'lucide-react';
import { useUser, useAuth } from '@clerk/nextjs';

const WelcomeBanner = () => {
    const {user} = useUser();
    const { has } = useAuth();

    // Check user's plan using the correct plan names
    const hasFreePlan = !has || (!has({ plan: 'pro_plan' }) && !has({ plan: 'business_plan' }));
    const hasProPlan = has && has({ plan: 'pro_plan' });
    const hasBusinessPlan = has && has({ plan: 'business_plan' });

    // Determine user's current plan
    const getCurrentPlan = () => {
        if (hasBusinessPlan) return { name: 'Business', icon: Crown, color: 'yellow' };
        if (hasProPlan) return { name: 'Pro', icon: Zap, color: 'blue' };
        return { name: 'Free', icon: Star, color: 'gray' };
    };

    const currentPlan = getCurrentPlan();
    const PlanIcon = currentPlan.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='relative overflow-hidden p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-800/30 backdrop-blur-sm'
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
      
      <div className="absolute top-3 right-3 opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="p-1.5 rounded-lg bg-blue-500/20 dark:bg-blue-400/20">
                <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Welcome back, <span className='font-extrabold capitalize text-rose-500'>{user?.firstName ? ` ${user.firstName}!` : ''}</span>
                </h1>
                <div className={`flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
                  currentPlan.color === 'yellow' 
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' 
                    : currentPlan.color === 'blue'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300'
                }`}>
                  <PlanIcon className="w-3 h-3" />
                  {currentPlan.name}
                </div>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed'
            >
              Ready to optimize your YouTube channel? Let's dive into your analytics and boost your growth.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="hidden sm:flex items-center gap-4 ml-6"
          >
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">+248%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Growth</div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">15K+</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Creators</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
    </motion.div>
  )
}

export default WelcomeBanner