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
              name="Free"
              price="Free"
              features={[
                "Outlier Analysis",
                "Basic Support",
                "Limited monthly usage",
                "Community access"
              ]}
              buttonText="Get Started"
            />
            <PricingCard
              name="Pro"
              price="$29"
              features={[
                "Everything in Free",
                "Thumbnail Search",
                "Advanced Analytics",
                "Priority Support",
                "Increased usage limits"
              ]}
              popular={true}
              buttonText="Start Pro Trial"
            />
            <PricingCard
              name="Business"
              price="$99"
              features={[
                "Everything in Pro",
                "AI Content Generator",
                "Keywords Research",
                "Unlimited Usage",
                "Premium Support",
                "Advanced features"
              ]}
              buttonText="Contact Sales"
            />
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};
