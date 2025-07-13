"use client";

import { Eye, Users, Clock, Activity } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";
import { StatCard } from "./StatCard";

export const AnalyticsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Real-Time Performance{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Insights
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Track your channel's performance with live analytics and AI-powered recommendations.
            </p>
          </div>
        </ParallaxSection>

        <ParallaxSection offset={40}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Eye}
              value="1.2M"
              label="Monthly Views"
              description="Track your video performance in real-time"
            />
            <StatCard
              icon={Users}
              value="45.2K"
              label="New Subscribers"
              description="Monitor subscriber growth and engagement"
            />
            <StatCard
              icon={Clock}
              value="12.5min"
              label="Avg. Watch Time"
              description="Optimize content for better retention"
            />
            <StatCard
              icon={Activity}
              value="8.7%"
              label="CTR Improvement"
              description="AI-optimized thumbnails performance"
            />
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};
