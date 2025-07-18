"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@clerk/nextjs';
import { Crown, Zap, Star, Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CurrentPlan = () => {
    const { has } = useAuth();

    // Check user's plan using the correct plan names
    const hasFreePlan = !has || (!has({ plan: 'pro_plan' }) && !has({ plan: 'business_plan' }));
    const hasProPlan = has && has({ plan: 'pro_plan' });
    const hasBusinessPlan = has && has({ plan: 'business_plan' });

    // Determine user's current plan
    const getCurrentPlan = () => {
        if (hasBusinessPlan) return { name: 'Business', icon: Crown, color: 'yellow', gradient: 'from-yellow-500 to-yellow-600' };
        if (hasProPlan) return { name: 'Pro', icon: Zap, color: 'blue', gradient: 'from-blue-500 to-blue-600' };
        return { name: 'Free', icon: Star, color: 'gray', gradient: 'from-gray-500 to-gray-600' };
    };

    const currentPlan = getCurrentPlan();
    const PlanIcon = currentPlan.icon;

    // Plan features
    const planFeatures = {
        Free: {
            features: ['Outlier Analysis', 'Basic Support'],
            limits: ['Limited to 5 analyses per month', 'Basic templates only'],
            next: 'Pro'
        },
        Pro: {
            features: ['Everything in Free', 'Thumbnail Search', 'Advanced Analytics', 'Priority Support'],
            limits: ['Limited to 50 searches per month', 'Standard templates'],
            next: 'Business'
        },
        Business: {
            features: ['Everything in Pro', 'AI Content Generator', 'Keywords Research', 'Unlimited Usage', 'Premium Support'],
            limits: ['No limits', 'Access to all features'],
            next: null
        }
    };

    const currentFeatures = planFeatures[currentPlan.name as keyof typeof planFeatures];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${currentPlan.gradient}`}>
                        <PlanIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Your Current Plan
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            You're on the {currentPlan.name} plan
                        </p>
                    </div>
                </div>
                
                {currentFeatures.next && (
                    <Link href="/billing">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
                        >
                            Upgrade to {currentFeatures.next}
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Features */}
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        What's Included
                    </h3>
                    <div className="space-y-2">
                        {currentFeatures.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Usage Limits */}
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <X className="w-4 h-4 text-orange-500" />
                        Usage Limits
                    </h3>
                    <div className="space-y-2">
                        {currentFeatures.limits.map((limit, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                <span className="text-gray-600 dark:text-gray-300">{limit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Plan Comparison */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                        Want to unlock more features?
                    </div>
                    <Link href="/billing" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium">
                        View all plans →
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CurrentPlan;
