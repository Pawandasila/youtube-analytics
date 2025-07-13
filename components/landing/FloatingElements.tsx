"use client";

import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import FloatingHamburgerMenu from "../FloatingHamburgerMenu";
import { ThemeToggle } from "./ThemeToggle";

interface FloatingElementsProps {
  showFloatingMenu: boolean;
  user: any;
  menuItems: any[];
}

export const FloatingElements = ({ showFloatingMenu, user, menuItems }: FloatingElementsProps) => {
  return (
    <>
      {/* Floating Hamburger Menu - appears after hero section */}
      <motion.div
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showFloatingMenu ? 1 : 0, 
          scale: showFloatingMenu ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showFloatingMenu ? 'auto' : 'none' }}
      >
        <FloatingHamburgerMenu 
          items={[
            ...menuItems,
            ...(user ? [{ label: "Profile", icon: <User size={20} />, onClick: () => console.log("Profile") }] : [])
          ]}
        />
      </motion.div>

      {/* Floating Theme Toggle - appears with hamburger */}
      <motion.div
        className="fixed top-4 right-16 sm:top-6 sm:right-20 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showFloatingMenu ? 1 : 0,
          scale: showFloatingMenu ? 1 : 0
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ pointerEvents: showFloatingMenu ? 'auto' : 'none' }}
      >
        <ThemeToggle />
      </motion.div>

      {/* Floating User Button - appears with hamburger if user is logged in */}
      {user && (
        <motion.div
          className="fixed top-6 right-36 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: showFloatingMenu ? 1 : 0,
            scale: showFloatingMenu ? 1 : 0
          }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{ pointerEvents: showFloatingMenu ? 'auto' : 'none' }}
        >
          <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-xl p-2 shadow-lg border border-gray-200/50 dark:border-neutral-700/50">
            <UserButton />
          </div>
        </motion.div>
      )}

      {/* Scroll to Top Button - appears with floating menu */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showFloatingMenu ? 1 : 0,
          scale: showFloatingMenu ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showFloatingMenu ? 'auto' : 'none' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight className="w-5 h-5 transform -rotate-90" />
      </motion.button>
    </>
  );
};
