"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { FloatingElement } from "./AnimationElements";

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
}

export const PricingCard = ({ 
  name, 
  price, 
  features, 
  popular = false, 
  buttonText = "Get Started" 
}: PricingCardProps) => (
  <motion.div 
    className={`relative rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl ${
      popular 
        ? 'bg-gradient-to-br from-blue-600 to-violet-600 text-white transform scale-105' 
        : 'bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700'
    }`}
    whileHover={{ 
      scale: popular ? 1.08 : 1.03,
      rotateY: 2,
    }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.6,
      type: "spring",
      stiffness: 100
    }}
  >
    {popular && (
      <FloatingElement delay={0.5} duration={2}>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      </FloatingElement>
    )}
    <div className="text-center mb-8">
      <h3 className={`text-2xl font-bold mb-2 ${popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{name}</h3>
      <motion.div 
        className={`text-4xl font-bold mb-1 ${popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {price}
      </motion.div>
      <div className={`text-sm ${popular ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>per month</div>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <motion.li 
          key={index} 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * index }}
        >
          <CheckCircle className={`w-5 h-5 mr-3 ${popular ? 'text-white' : 'text-green-500'}`} />
          <span className={popular ? 'text-white' : 'text-gray-600 dark:text-gray-400'}>{feature}</span>
        </motion.li>
      ))}
    </ul>
    <motion.button 
      className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
        popular 
          ? 'bg-white text-blue-600 hover:bg-gray-100' 
          : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-violet-600 hover:to-blue-600'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {buttonText}
    </motion.button>
  </motion.div>
);
