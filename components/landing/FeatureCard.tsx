"use client";

import { motion } from "framer-motion";
import { FloatingElement } from "./AnimationElements";

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  gradient: string;
}

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient 
}: FeatureCardProps) => (
  <motion.div 
    className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800"
    whileHover={{ 
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
    <FloatingElement delay={Math.random() * 2} duration={3 + Math.random() * 2}>
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} mb-6 shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
    </FloatingElement>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);
