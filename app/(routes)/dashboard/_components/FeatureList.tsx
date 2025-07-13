"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ImageIcon, Search, PenTool, Target, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const FeatureList = () => {
    const features = [
        { 
            title: "AI Thumbnail Generator", 
            image: '/feature1.png',
            path: '/thumbnail-generator', 
            description: "Create stunning thumbnails with AI-powered design tools that boost your click-through rates.",
            icon: ImageIcon,
            color: "from-blue-500 to-blue-600"
        },
        { 
            title: "AI Thumbnail Search", 
            image: '/feature2.png',
            path: '/thumbnail-search', 
            description: "Discover trending thumbnails and analyze what makes them successful in your niche.",
            icon: Search,
            color: "from-purple-500 to-purple-600"
        },
        { 
            title: "AI Content Generator", 
            image: '/feature3.png',
            path: '/ai-content-generator', 
            description: "Generate engaging video scripts, titles, and descriptions with advanced AI technology.",
            icon: PenTool,
            color: "from-green-500 to-green-600"
        },
        { 
            title: "Outlier Analysis", 
            image: '/feature4.png',
            path: '/outlier', 
            description: "Identify breakthrough content opportunities by analyzing performance outliers.",
            icon: Target,
            color: "from-orange-500 to-orange-600"
        },
        { 
            title: "Keywords Research", 
            image: '/feature5.png',
            path: '/keywords', 
            description: "Find the best keywords to rank higher and reach your target audience effectively.",
            icon: Zap,
            color: "from-pink-500 to-pink-600"
        },
        { 
            title: "Video Optimization", 
            image: '/feature6.png',
            path: '/optimize', 
            description: "Optimize your videos for maximum engagement and algorithmic performance.",
            icon: TrendingUp,
            color: "from-indigo-500 to-indigo-600"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        AI-Powered Features
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Explore our comprehensive suite of YouTube optimization tools
                    </p>
                </div>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="group relative"
                        >
                            <Link href={feature.path}>
                                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-[#212122] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                                    {/* Header with full image background */}
                                    <div className="relative h-48 overflow-hidden">
                                        {/* Background Image */}
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            priority
                                            className="object-cover object-top aspect-video"
                                        />
                                        
                                        {/* Content overlay */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end">

                                            <div className="flex justify-end">
                                                <span className="px-3 py-1 bg-white/30 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                                    AI Powered
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                            {feature.description}
                                        </p>
                                        
                                        {/* CTA */}
                                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                            <span>Explore Feature</span>
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50"
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to boost your YouTube channel?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Get started with our AI-powered tools and see the difference in your analytics.
                </p>
                <Link 
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                    <TrendingUp className="w-4 h-4" />
                    Start Optimizing
                </Link>
            </motion.div>
        </div>
    );
}

export default FeatureList;