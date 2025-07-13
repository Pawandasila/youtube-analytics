"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface FloatingHamburgerMenuProps {
  items: MenuItem[];
  className?: string;
}

export const FloatingHamburgerMenu: React.FC<FloatingHamburgerMenuProps> = ({
  items,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
    setIsOpen(false);
  };

  // Theme-aware gradient backgrounds
  const getBackgroundGradient = () => {
    if (!mounted) return "bg-gradient-to-br from-blue-600/95 to-violet-600/95";
    if (theme === 'dark') {
      return "bg-gradient-to-br from-gray-900/95 to-neutral-900/95";
    }
    return "bg-gradient-to-br from-blue-600/95 to-violet-600/95";
  };

  const getCardBackground = () => {
    if (!mounted) return "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40";
    if (theme === 'dark') {
      return "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40";
    }
    return "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40";
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-lg sm:rounded-xl flex items-center justify-center">
        <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </div>
    );
  }

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        onClick={toggleMenu}
        className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-gray-200/50 dark:border-neutral-700/50 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg sm:rounded-xl flex items-center justify-center ${className} ${isOpen ? 'bg-blue-600/90 border-blue-500/50' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          backgroundColor: isOpen ? "rgba(59, 130, 246, 0.9)" : undefined,
          borderColor: isOpen ? "rgba(59, 130, 246, 0.5)" : undefined
        }}
        aria-label="Toggle navigation menu"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className={`fixed inset-0 z-[9999] ${getBackgroundGradient()} backdrop-blur-lg flex items-center justify-center p-4`}
              initial={{ 
                clipPath: "circle(0% at top right)",
                opacity: 0 
              }}
              animate={{ 
                clipPath: "circle(150% at top right)",
                opacity: 1 
              }}
              exit={{ 
                clipPath: "circle(0% at top right)",
                opacity: 0 
              }}
              transition={{ 
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[10000] w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 shadow-lg rounded-xl flex items-center justify-center transition-all duration-200"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.button>

              <div className="max-w-sm sm:max-w-md w-full px-4 sm:px-8">
                {/* Menu Title */}
                <motion.div
                  className="text-center mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Navigation</h2>
                  <div className="w-12 sm:w-16 h-1 bg-white/60 mx-auto rounded-full"></div>
                </motion.div>

                <motion.ul
                  className="space-y-3 sm:space-y-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.3 + (index * 0.1) 
                      }}
                    >
                      <button
                        onClick={() => handleItemClick(item)}
                        className={`group w-full text-left p-4 sm:p-6 rounded-xl sm:rounded-2xl ${getCardBackground()} transition-all duration-300 border backdrop-blur-md hover:shadow-xl hover:scale-105`}
                      >
                        <div className="flex items-center space-x-4 sm:space-x-6">
                          {item.icon && (
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center text-white/80 group-hover:text-white transition-colors group-hover:bg-white/30">
                              {item.icon}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="text-lg sm:text-2xl font-semibold text-white block group-hover:translate-x-2 transition-transform duration-300 truncate">
                              {item.label}
                            </span>
                            <div className="w-0 group-hover:w-8 sm:group-hover:w-12 h-0.5 bg-white/60 transition-all duration-300 mt-1 sm:mt-2"></div>
                          </div>
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                              <div className="w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-white transform rotate-45"></div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingHamburgerMenu;
