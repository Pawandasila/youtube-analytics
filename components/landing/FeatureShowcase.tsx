"use client";

import { motion } from "framer-motion";
import { ImageIcon, Search, PenTool, Target, ArrowRight, Sparkles, Zap } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";
import Link from "next/link";
import Image from "next/image";

export const FeatureShowcase = () => {
  const features = [
    {
      icon: ImageIcon,
      image: "/feature1.png",
      title: "AI Thumbnail Generator",
      description: "Create stunning, click-worthy thumbnails in seconds with our advanced AI technology. Choose from multiple styles, customize colors, and generate variations until you find the perfect design.",
      gradient: "from-blue-500 to-cyan-500",
      route: "/thumbnail-generator",
      plans: ["Business"],
      highlights: ["Professional designs", "Multiple variations", "High-CTR optimization"]
    },
    {
      icon: Search,
      image: "/feature2.png",
      title: "Thumbnail Search",
      description: "Analyze competitor thumbnails and discover what works in your niche. Search through millions of thumbnails and identify patterns that drive engagement.",
      gradient: "from-violet-500 to-purple-500",
      route: "/thumbnail-search",
      plans: ["Pro", "Business"],
      highlights: ["Competitor analysis", "Pattern recognition", "Niche insights"]
    },
    {
      icon: PenTool,
      image: "/feature3.png",
      title: "AI Content Generator",
      description: "Generate compelling titles, descriptions, and video scripts that are optimized for YouTube's algorithm. Never run out of content ideas again.",
      gradient: "from-green-500 to-emerald-500",
      route: "/ai-content-generator",
      plans: ["Business"],
      highlights: ["SEO-optimized content", "Multiple variations", "Algorithm-friendly"]
    },
    {
      icon: Target,
      image: "/feature4.png",
      title: "Outlier Analysis",
      description: "Identify breakthrough opportunities by analyzing your content performance. Discover what makes videos go viral and apply those insights to your strategy.",
      gradient: "from-orange-500 to-red-500",
      route: "/outlier",
      plans: ["Free", "Pro", "Business"],
      highlights: ["Performance insights", "Viral patterns", "Growth opportunities"]
    }
  ];

  const getPlanBadge = (plans: string[]) => {
    if (plans.includes("Free")) return { label: "Free", color: "bg-gray-100 text-gray-700" };
    if (plans.includes("Pro")) return { label: "Pro", color: "bg-blue-100 text-blue-700" };
    return { label: "Business", color: "bg-yellow-100 text-yellow-700" };
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Powerful Features for{" "}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Every Creator
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Explore our comprehensive suite of AI-powered tools designed to accelerate your YouTube growth
            </motion.p>
          </motion.div>
        </ParallaxSection>

        <ParallaxSection offset={60}>
          <div className="space-y-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const planBadge = getPlanBadge(feature.plans);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className={`flex flex-col lg:flex-row items-center gap-16 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Feature Image */}
                  <motion.div 
                    className="flex-1"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -15 : 15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.3 + 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <div className="relative group">
                      <motion.div 
                        className={`w-full h-80 bg-gradient-to-br ${feature.gradient} rounded-2xl overflow-hidden shadow-2xl relative`}
                        whileHover={{ 
                          scale: 1.05, 
                          rotateY: 5, 
                          rotateX: 5,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <motion.div
                          initial={{ scale: 1.2, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.3 + 0.4 }}
                        >
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover rounded-2xl"
                          />
                        </motion.div>
                        
                        <motion.div 
                          className="absolute inset-0 bg-black/10 rounded-2xl"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
                        />
                        
                        <motion.div 
                          className="absolute inset-4 border-2 border-white/20 rounded-xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.3 + 0.8 }}
                        />
                        
                        {/* Floating particles effect */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-white/30 rounded-full"
                              initial={{ 
                                opacity: 0,
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%"
                              }}
                              animate={{ 
                                opacity: [0, 1, 0],
                                y: [0, -20, 0],
                                x: [0, Math.random() * 20 - 10, 0]
                              }}
                              transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="absolute -top-4 -right-4 bg-white dark:bg-neutral-800 rounded-full p-4 shadow-xl"
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.3 + 1,
                          type: "spring",
                          bounce: 0.6
                        }}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 360,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <Icon className={`w-8 h-8 ${
                          feature.gradient.includes('blue') ? 'text-blue-500' :
                          feature.gradient.includes('violet') ? 'text-violet-500' :
                          feature.gradient.includes('green') ? 'text-green-500' :
                          'text-orange-500'
                        }`} />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Feature Content */}
                  <motion.div 
                    className="flex-1 space-y-6"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.3 + 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
                      >
                        <motion.span 
                          className={`px-3 py-1 rounded-full text-sm font-medium ${planBadge.color}`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {planBadge.label} Plan
                        </motion.span>
                        <motion.div 
                          className="flex items-center gap-1"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.3 + 0.8 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                          </motion.div>
                          <span className="text-sm text-gray-500">AI-Powered</span>
                        </motion.div>
                      </motion.div>
                      
                      <motion.h3 
                        className="text-3xl font-bold text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.3 + 0.7 }}
                      >
                        {feature.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.3 + 0.8 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>

                    {/* Highlights */}
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.9 }}
                    >
                      {feature.highlights.map((highlight, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.3 + 1 + idx * 0.1 
                          }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div 
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.3 + 1 + idx * 0.1,
                              type: "spring",
                              bounce: 0.6
                            }}
                            whileHover={{ scale: 1.5 }}
                          />
                          <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 1.2 }}
                    >
                      <Link href={feature.route}>
                        <motion.button
                          className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${feature.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden`}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="w-5 h-5 relative z-10" />
                          </motion.div>
                          <span className="relative z-10">Try {feature.title}</span>
                          <motion.div
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="w-5 h-5 relative z-10" />
                          </motion.div>
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};
