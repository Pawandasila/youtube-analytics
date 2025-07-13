"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { FloatingElement } from "./AnimationElements";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export const TestimonialCard = ({ 
  name, 
  role, 
  content, 
  avatar 
}: TestimonialCardProps) => (
  <motion.div 
    className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-neutral-700"
    whileHover={{ 
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
    }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center mb-4">
      <FloatingElement delay={Math.random() * 1} duration={3 + Math.random()}>
        <Image src={avatar} alt={name} width={48} height={48} className="rounded-full mr-4" />
      </FloatingElement>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
      <div className="ml-auto flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Star className="w-4 h-4 fill-current" />
          </motion.div>
        ))}
      </div>
    </div>
    <motion.p 
      className="text-gray-600 dark:text-gray-400 italic"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      "{content}"
    </motion.p>
  </motion.div>
);
