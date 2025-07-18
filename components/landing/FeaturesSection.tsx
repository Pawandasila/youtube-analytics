"use client";

import { ImageIcon, Search, PenTool, Target, TrendingUp, BarChart3 } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";
import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              4 AI-Powered Tools to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Supercharge
              </span>{" "}
              Your Channel
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to create, optimize, and grow your YouTube presence - powered by cutting-edge AI technology.
            </p>
          </div>
        </ParallaxSection>

        <ParallaxSection offset={60}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={ImageIcon}
              title="AI Thumbnail Generator"
              description="Create high-conversion YouTube thumbnails in seconds using AI. Increase your click-through rates with professionally designed thumbnails that grab attention."
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={Search}
              title="Thumbnail Search"
              description="Discover viral thumbnails used by top creators in your niche. Analyze what works and apply proven strategies to your content for better performance."
              gradient="from-violet-500 to-purple-500"
            />
            <FeatureCard
              icon={PenTool}
              title="AI Content Generator"
              description="Generate YouTube titles, descriptions, and video scripts optimized for performance. Let AI handle the creative heavy lifting and boost your content quality."
              gradient="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={Target}
              title="Outlier Analysis"
              description="Identify videos that are underperforming or overperforming based on analytics. Understand what makes content successful and replicate winning strategies."
              gradient="from-orange-500 to-red-500"
            />
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};
