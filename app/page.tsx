"use client"
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Search, Target, BarChart3, Users, Settings } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Navigation,
  HeroSection,
  FloatingElements
} from "@/components/landing";

// Dynamically import components that might cause hydration issues
const FeaturesSection = dynamic(() => import("@/components/landing").then(mod => ({ default: mod.FeaturesSection })), {
  ssr: false
});

const FeatureShowcase = dynamic(() => import("@/components/landing").then(mod => ({ default: mod.FeatureShowcase })), {
  ssr: false
});

const AnalyticsSection = dynamic(() => import("@/components/landing").then(mod => ({ default: mod.AnalyticsSection })), {
  ssr: false
});

const PricingSection = dynamic(() => import("@/components/landing").then(mod => ({ default: mod.PricingSection })), {
  ssr: false
});

const TestimonialsSection = dynamic(() => import("@/components/landing").then(mod => ({ default: mod.TestimonialsSection })), {
  ssr: false
});

const Footer = dynamic(() => import("@/components/landing").then(mod => ({ default: mod.Footer })), {
  ssr: false
});

export default function Home() {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();

  const menuItems = [
    { label: "Home", icon: <Search size={20} />, href: "/" },
    { label: "Features", icon: <Target size={20} />, href: "#features" },
    { label: "Pricing", icon: <BarChart3 size={20} />, href: "#pricing" },
    { label: "Testimonials", icon: <Users size={20} />, href: "#testimonials" },
    { label: "Settings", icon: <Settings size={20} />, href: "/settings" }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track scroll position to show/hide floating menu
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const heroSection = document.querySelector('#hero-section') as HTMLElement;
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 100;
        setShowFloatingMenu(scrollPosition > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      
      {/* Original Navigation - visible initially, hidden after scroll */}
      <Navigation user={user} showFloatingMenu={showFloatingMenu} />
      
      {/* Floating Elements - hamburger menu, theme toggle, user button, scroll to top */}
      <FloatingElements 
        showFloatingMenu={showFloatingMenu} 
        user={user} 
        menuItems={menuItems} 
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Dynamically loaded sections to prevent hydration issues */}
      {isMounted && (
        <>
          {/* AI Features Section */}
          <FeaturesSection />

          {/* Feature Showcase */}
          <FeatureShowcase />

          {/* Live Analytics Section */}
          <AnalyticsSection />

          {/* Pricing Section */}
          <PricingSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
