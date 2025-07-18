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
import { containerVariants, itemVariants } from "./types";
import { toast } from "sonner";
import ThumbnailList from "./_components/ThumbnailList";

export default function ThumbnailGeneratorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);


  const downloadThumbnail = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const now = new Date();
      const timestamp = now.toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `ai-thumbnail-${timestamp}.jpg`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      alert('Failed to download image. Please try again.');
    }
  };

  const handleThumbnailGeneration = async (formData: FormData) => {
    try {
      return await generateThumbnail(formData);
    } catch (error) {
      console.error("Error in handleThumbnailGeneration:", error);
      setLoading(false);
      return { success: false, data: null };
    }
  };

  const generateThumbnail = async (formData: FormData) => {
    try {
      setLoading(true);

      const result = await axios.post("/api/generate-thumbnail", formData);
      const eventId = result.data.data.runId;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      let attempts = 0;
      const maxAttempts = 30;
      let isCompleted = false;

      while (!isCompleted && attempts < maxAttempts) {
        try {

          const runStatus = await RunStatus(eventId);

          if (runStatus) {

            if (runStatus.status === 'Completed') {

              const thumbnailUrl = runStatus.output?.data?.result?.[0]?.thumbnailUrl;

              if (thumbnailUrl) {
                setGeneratedThumbnail(thumbnailUrl);
              }

              isCompleted = true;
              toast.success("Thumbnail generated successfully!");

              break;
            } else if (runStatus.status === 'Failed') {
              throw new Error("Thumbnail generation failed");
            } else {
              console.log("⏳ Still processing...");
            }
          } else {
            console.log("⏳ Run not found yet, waiting...");
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          attempts++;

        } catch (statusError) {
          console.error("❌ Error checking status:", statusError);
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      if (!isCompleted) {

        alert("⏰ Generation is taking longer than expected, but it's still processing in the background! Check back in a few minutes.");
      }

      setLoading(false);
      setIsModalOpen(false);

      return { success: true, data: result.data };

    } catch (error) {
      console.error("❌ Error generating thumbnail:", error);
      setLoading(false);
      setIsModalOpen(false);

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



  return (
    <div className="flex h-full flex-col">

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
              <div className="flex items-center gap-3">
                <Loader2Icon className="animate-spin w-6 h-6" />
                <h2 className="text-lg font-medium">Please wait, thumbnail is generating...</h2>
              </div>
            </div>
          ) : generatedThumbnail ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-secondary rounded-2xl overflow-hidden border border-gray-400 shadow-md"
              style={{ aspectRatio: '16/9' }}
            >
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent animate-[shimmer_2s_infinite]"
                      style={{
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s infinite linear',
                      }}
                    />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="space-y-4 w-2/3">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse" />
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3 bg-white/90 dark:bg-gray-800/90 p-4 rounded-xl shadow-lg">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Loading Preview...</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <img
                src={generatedThumbnail}
                alt="Generated thumbnail"
                className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoadStart={() => setIsImageLoading(true)}
                onLoad={() => setIsImageLoading(false)}
              />
              <div className="absolute bottom-4 right-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => downloadThumbnail(generatedThumbnail)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          ) : null}
        </div>

        <ThumbnailList />

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
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >

                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div
                    className={`relative h-32 bg-gradient-to-br ${feature.color} p-4`}
                  >
                    <div className="absolute top-4 left-4">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>

            );
          })}
        </motion.div>



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
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animationFillMode: 'forwards'
                    }}
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


      <ThumbnailGeneratorModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleThumbnailGeneration}
      />
    </div>
  );
}
