"use client";

import { ParallaxSection } from "./ParallaxSection";
import { PricingCard } from "./PricingCard";

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Simple,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Transparent
              </span>{" "}
              Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the perfect plan for your YouTube growth journey
            </p>
          </div>
        </ParallaxSection>

        <ParallaxSection offset={50}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              name="Starter"
              price="Free"
              features={[
                "5 AI thumbnails per month",
                "Basic analytics dashboard",
                "Keyword research tool",
                "Community support"
              ]}
              buttonText="Get Started"
            />
            <PricingCard
              name="Pro"
              price="$29"
              features={[
                "Unlimited AI thumbnails",
                "Advanced analytics & insights",
                "Content optimization AI",
                "Outlier detection",
                "Priority support",
                "Export capabilities"
              ]}
              popular={true}
              buttonText="Start Pro Trial"
            />
            <PricingCard
              name="Agency"
              price="$99"
              features={[
                "Everything in Pro",
                "Multi-channel management",
                "Team collaboration tools",
                "White-label reports",
                "Dedicated account manager",
                "Custom integrations"
              ]}
              buttonText="Contact Sales"
            />
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};
