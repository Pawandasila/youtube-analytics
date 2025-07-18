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
              AI-Powered Content{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Creation Hub
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Create, analyze, and optimize your YouTube content with our comprehensive AI-powered platform.
            </p>
          </div>
        </ParallaxSection>

        <ParallaxSection offset={40}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Eye}
              value="500K+"
              label="Thumbnails Created"
              description="AI-generated thumbnails for creators"
            />
            <StatCard
              icon={Users}
              value="15K+"
              label="Active Creators"
              description="Growing community of YouTube creators"
            />
            <StatCard
              icon={Clock}
              value="80%"
              label="Time Saved"
              description="Faster content creation with AI"
            />
            <StatCard
              icon={Activity}
              value="248%"
              label="Growth Increase"
              description="Average channel growth improvement"
            />
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};
