"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { FloatingElement } from "./AnimationElements";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  user: any;
  showFloatingMenu: boolean;
}

export const Navigation = ({ user, showFloatingMenu }: NavigationProps) => {
  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 dark:bg-neutral-900/80 dark:border-neutral-700/50"
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        opacity: showFloatingMenu ? 0 : 1,
        y: showFloatingMenu ? -100 : 0
      }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: showFloatingMenu ? 'none' : 'auto' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <FloatingElement delay={0} duration={4}>
              <div className="p-2 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </FloatingElement>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              TrendTide
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {!user ? (
              <SignInButton mode='modal' signUpForceRedirectUrl={'/dashboard'}>
                <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl hover:from-violet-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Users className="w-4 h-4 mr-2" />
                  Get Started
                </button>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
