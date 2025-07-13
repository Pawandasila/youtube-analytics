"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles, Youtube } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";
import { FloatingElement, PulseElement } from "./AnimationElements";
import { AnimatedCounter } from "./AnimatedCounter";

export const HeroSection = () => {
  return (
    <section id="hero-section" className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-violet-50/50 dark:from-blue-950/20 dark:to-violet-950/20" />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ParallaxSection offset={30}>
            <FloatingElement delay={0.5}>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full mb-8 shadow-sm dark:bg-neutral-800/80 dark:border-neutral-700">
                <PulseElement>
                  <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
                </PulseElement>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Powered YouTube Analytics Platform</span>
              </div>
            </FloatingElement>
          </ParallaxSection>
          
          <ParallaxSection offset={50}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Track, Analyze & Grow Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                YouTube Channel
              </span>{" "}
              with AI
            </h1>
          </ParallaxSection>
          
          <ParallaxSection offset={70}>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionize your content creation with our AI-powered platform. Generate thumbnails, optimize titles, 
              discover trending keywords, and track performance - all in one intelligent dashboard.
            </p>
          </ParallaxSection>
          
          <ParallaxSection offset={90}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <FloatingElement delay={1} duration={4}>
                <motion.a 
                  href="/dashboard" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl hover:from-violet-600 hover:to-blue-600 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
              </FloatingElement>
              <FloatingElement delay={1.2} duration={4.5}>
                <motion.button 
                  className="inline-flex items-center px-8 py-4 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg dark:bg-neutral-800 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  Watch Demo
                </motion.button>
              </FloatingElement>
            </div>
          </ParallaxSection>

          {/* Animated Stats */}
          <ParallaxSection offset={110}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <AnimatedCounter end={50000} suffix="+" />
                <p className="text-gray-600 dark:text-gray-400 mt-2">Creators</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={2500000} suffix="+" />
                <p className="text-gray-600 dark:text-gray-400 mt-2">Videos Analyzed</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={342} suffix="%" />
                <p className="text-gray-600 dark:text-gray-400 mt-2">Avg. Growth</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={99} suffix="%" />
                <p className="text-gray-600 dark:text-gray-400 mt-2">Satisfaction</p>
              </div>
            </div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
};
