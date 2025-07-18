"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Download,
  Sparkles,
  Eye,
  Clock,
  TrendingUp,
  Zap,
  Loader2,
} from "lucide-react";
import { VideoThumbnail } from "./types";
import {
  formatDuration,
  formatViewCount,
  formatDate,
  getViewCount,
  getLikeCount,
  getCommentCount,
  downloadThumbnail,
} from "./utils";
import { toast } from "sonner";
import Image from "next/image";

interface ThumbnailCardProps {
  thumbnail: VideoThumbnail;
  index: number;
  onClick: () => void;
  isGenerating?: boolean;
}

export const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  thumbnail,
  index,
  onClick,
  isGenerating = false
}) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadThumbnail(thumbnail.thumbnailUrl, thumbnail.title);
    toast.success("Thumbnail downloaded!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer relative max-w-sm flex flex-col h-full"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

      <div className="relative aspect-video overflow-hidden">
        <Image
          height={100}
          width={100}
          priority
          blurDataURL="blur"
          src={thumbnail.thumbnailUrl}
          alt={thumbnail.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium">
          {formatDuration(thumbnail.duration || "N/A")}
        </div>

        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
          <Eye className="w-2.5 h-2.5" />
          {formatViewCount(getViewCount(thumbnail))}
        </div>

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-2 right-2 p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={handleDownload}
        >
          <Download className="w-3 h-3 text-white" />
        </motion.button>

        <motion.div
          initial={{ x: -100, opacity: 0, rotate: -45 }}
          animate={{
            x: [-100, 50, 100],
            opacity: [0, 1, 0],
            rotate: [-45, 0, 45],
          }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Sparkles className="w-6 h-6 text-yellow-400 drop-shadow-glow" />
          </div>

          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-ping" />
        </motion.div>
      </div>

      <div className="p-3 relative z-10 flex flex-col flex-grow">
        <div className="flex-grow mb-3">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2 mb-2">
            {thumbnail.title}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 truncate">
            {thumbnail.channelTitle}
          </p>

          <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-500 mt-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5">
                <Heart className="w-2.5 h-2.5 text-red-500" />
                <span className="truncate max-w-[40px]">
                  {formatViewCount(getLikeCount(thumbnail))}
                </span>
              </span>
              <span className="flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                <span className="truncate max-w-[40px]">
                  {formatViewCount(getCommentCount(thumbnail))}
                </span>
              </span>
            </div>
            <span className="flex items-center gap-0.5 flex-shrink-0">
              <Clock className="w-2.5 h-2.5" />
              <span className="truncate max-w-[60px]">
                {formatDate(thumbnail.publishedAt)}
              </span>
            </span>
          </div>
        </div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: [1, 1.01, 1],
          }}
          transition={{
            delay: 0.1,
            scale: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          disabled={isGenerating}
          className={`w-full text-white py-1.5 px-3 rounded-md font-medium text-xs shadow-md hover:shadow-lg transform transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 flex items-center justify-center gap-1 mt-auto ${
            isGenerating 
              ? 'bg-purple-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600'
          }`}
        >
          <Sparkles className="w-3 h-3 animate-pulse" />
          {isGenerating ? (
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [-1, 1, -1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="flex items-center gap-1"
            >
              <span className="truncate">Generating...</span>
              <Loader2 className="w-3 h-3 animate-spin" />
            </motion.span>
          ) : (
            <span className="truncate">Generate Similar with AI</span>
          )}
          <Zap className="w-3 h-3 animate-bounce" />
        </motion.button>
      </div>
    </motion.div>
  );
};
