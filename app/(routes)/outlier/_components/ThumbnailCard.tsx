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
}

export const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  thumbnail,
  index
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
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group relative max-w-sm flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

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

        {/* Outlier Score Badge */}
        {thumbnail.outlierScore && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
            <span>Outlier: {Math.round(thumbnail.outlierScore)}%</span>
          </div>
        )}

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-2 left-2 p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
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

          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-red-400 rounded-full animate-bounce" />
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-orange-400 rounded-full animate-ping" />
        </motion.div>
      </div>

      <div className="p-3 relative z-10 flex flex-col flex-grow">
        <div className="flex-grow mb-3">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 line-clamp-2 mb-2">
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

          {/* Outlier-specific metrics */}
          {thumbnail.outlierScore && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-orange-600 dark:text-orange-400 font-medium">
                  Expected: {formatViewCount(thumbnail.expectedViews || 0)}
                </span>
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Ratio: {thumbnail.underperformanceRatio || 0}x
                </span>
              </div>
              {thumbnail.engagementRate && (
                <div className="text-[10px] text-gray-600 dark:text-gray-400">
                  Engagement: {thumbnail.engagementRate}%
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
