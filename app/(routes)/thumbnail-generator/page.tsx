"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ImageIcon,
  Palette,
  Download,
  Sparkles,
  Upload,
  Settings,
  Zap,
  CheckCircle,
  Loader2Icon,
} from "lucide-react";
import ThumbnailGeneratorModal from "./_components/ThumbnailGeneratorModal";
import axios from "axios";
import { RunStatus } from "@/services/GlobalApi";

/**
 * Renders the main page for the AI-powered thumbnail generator, providing a UI for uploading content, generating thumbnails, and showcasing features and usage steps.
 *
 * Includes animated hero section, feature highlights, a step-by-step getting started guide, and a modal for thumbnail generation. Handles asynchronous thumbnail creation with status polling, error handling, and loading state feedback.
 *
 * @returns The complete thumbnail generator page component.
 */
export default function ThumbnailGeneratorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleThumbnailGeneration = async (formData: FormData) => {
    try {
      setLoading(true);

      console.log("🚀 Starting thumbnail generation...");

      const result = await axios.post("/api/generate-thumbnail", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if status is less than 500
        }
      });

      // Check if the response is an error
      if (result.status >= 400) {
        throw new Error(`API Error: ${result.data.error || result.data.details || 'Unknown error'}`);
      }

      console.log("✅ Thumbnail generation started:", result.data);

      if (!result.data.data?.runId) {
        throw new Error("No run ID received from server");
      }

      // inngest function running
      while (true) {
        const runStatus = await RunStatus(result.data.data.runId);
        console.log("Run Status:", runStatus?.data[0]?.status);
        if (runStatus?.data[0]?.status === "Completed") {
          setLoading(false);
          console.log("✅ Thumbnail generation completed!");
          break;
        } else if (
          runStatus?.data[0]?.status === "Failed" ||
          runStatus?.data[0]?.status === "Cancelled"
        ) {
          setLoading(false);
          console.error("❌ Thumbnail generation failed or cancelled");
          throw new Error("Thumbnail generation failed");
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setIsModalOpen(false);

      return { success: true, data: result.data };
    } catch (error) {
      console.error("❌ Error generating thumbnail:", error);
      setLoading(false);
      setIsModalOpen(false);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to generate thumbnail: ${errorMessage}`);
      
      throw error;
    }
  };
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Design",
      description:
        "Generate eye-catching thumbnails with advanced AI algorithms tailored for maximum engagement.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Palette,
      title: "Custom Templates",
      description:
        "Choose from hundreds of professionally designed templates optimized for different content types.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Settings,
      title: "Brand Consistency",
      description:
        "Maintain your brand identity with customizable color schemes, fonts, and logo placement.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Download,
      title: "Instant Export",
      description:
        "Download your thumbnails in multiple formats and resolutions for various platforms.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Upload Content",
      description: "Upload your content or describe your video",
      icon: Upload,
    },
    {
      number: 2,
      title: "Choose Template",
      description: "Choose a template or let AI create one for you",
      icon: ImageIcon,
    },
    {
      number: 3,
      title: "Customize Design",
      description: "Customize colors, text, and elements",
      icon: Palette,
    },
    {
      number: 4,
      title: "Download Thumbnail",
      description: "Download your professional thumbnail",
      icon: CheckCircle,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b ">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Thumbnail Generator</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-8 p-8 pt-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Stunning Thumbnails
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your YouTube content with AI-powered thumbnail generation
            that boosts click-through rates and engagement
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Zap className="w-5 h-5" />
            Start Creating Now
          </motion.button>
        </motion.div>

        <div>
          {loading ? (
            <div className="bg-secondary rounded-2xl h-[300px] w-full border border-gray-400 shadow-md flex items-center justify-center">
              <Loader2Icon className="animate-spin w-5 h-5 " />{" "}
              <h2>Please wait thumbnail is generating...</h2>
            </div>
          ) : (
            <div>displayImage</div>
          )}
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Header with gradient */}
                  <div
                    className={`relative h-32 bg-gradient-to-br ${feature.color} p-4`}
                  >
                    <div className="absolute top-4 left-4">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Getting Started Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Getting Started
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Ready to create your first thumbnail? Follow these simple steps
                to get started with our AI-powered thumbnail generator.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="relative group"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 group-hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm">
                          {step.number}
                        </div>
                        <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {step.description}
                      </p>
                    </div>

                    {/* Connection line (except for last item) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Thumbnail Generator Modal */}
      <ThumbnailGeneratorModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleThumbnailGeneration}
      />
    </div>
  );
}
