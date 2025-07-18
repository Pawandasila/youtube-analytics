"use client";

import { ParallaxSection } from "./ParallaxSection";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Loved by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                15,000+
              </span>{" "}
              Creators
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what YouTube creators are saying about our AI-powered platform
            </p>
          </div>
        </ParallaxSection>

        <ParallaxSection offset={60}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Alex Chen"
              role="Tech YouTuber • 500K subscribers"
              content="The AI thumbnail generator is incredible! My CTR increased by 285% and I save hours of design work every week."
              avatar="/logo.svg"
            />
            <TestimonialCard
              name="Sarah Martinez"
              role="Lifestyle Creator • 250K subscribers"
              content="The thumbnail search feature helped me understand what works in my niche. I found patterns I never noticed before!"
              avatar="/logo.svg"
            />
            <TestimonialCard
              name="Mike Johnson"
              role="Gaming Channel • 1M subscribers"
              content="The outlier analysis is a game-changer. I can now identify which videos will perform well before they even go viral."
              avatar="/logo.svg"
            />
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};
