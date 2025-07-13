"use client";

import { motion } from "framer-motion";
import { FloatingElement } from "./AnimationElements";

interface StatCardProps {
  icon: any;
  value: string;
  label: string;
  description: string;
}

export const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  description 
}: StatCardProps) => (
  <motion.div 
    className="bg-gradient-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-neutral-700"
    whileHover={{ 
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.6,
      type: "spring",
      stiffness: 100
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <FloatingElement delay={Math.random() * 1.5} duration={2.5 + Math.random()}>
        <div className="p-3 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </FloatingElement>
      <div className="text-right">
        <motion.div 
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {value}
        </motion.div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);
