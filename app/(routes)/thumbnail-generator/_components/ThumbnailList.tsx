import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Thumbnail {
  id: number;
  userInput: string;
  thumbnailUrl: string;
  referenceImageUrl?: string;
  faceImageUrl?: string;
  createdAt: number;
  updatedAt: number;
}

const ThumbnailList = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState<
    Record<number, boolean>
  >({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/generate-thumbnail");
        // Sort thumbnails by creation date (newest first)
        const sortedThumbnails = response.data.sort(
          (a: Thumbnail, b: Thumbnail) => b.createdAt - a.createdAt
        );
        setThumbnails(sortedThumbnails);

        // Don't initialize loading states - let images load naturally
        setImageLoadingStates({});
        setImageErrors({});
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchThumbnails();
  }, []);

  const handleImageLoad = (id: number) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [id]: false,
    }));
    setImageErrors((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleImageError = (id: number) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [id]: false,
    }));
    setImageErrors((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const refreshThumbnails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/generate-thumbnail");
      
      setThumbnails(response.data);

      setImageLoadingStates({});
      setImageErrors({});
    } catch (error) {
      console.error("Error fetching thumbnails:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = async (url: string, id: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); 
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="relative aspect-[3/2] bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-3 space-y-2">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-2.5 w-12" />
                  <Skeleton className="h-2.5 w-16" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-7 flex-1" />
                  <Skeleton className="h-7 w-9" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Generated Thumbnails
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your AI-generated YouTube thumbnails ({thumbnails.length} total)
              {thumbnails.length > 0 && (
                <span className="ml-2 text-sm">
                  • Latest: {formatDate(thumbnails[0].createdAt)}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={refreshThumbnails}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors duration-200"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {thumbnails.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-500 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            No thumbnails yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Generate your first thumbnail to see it here. Click "Start Creating
            Now" to begin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {thumbnails.map((thumbnail, index) => (
            <div
              key={thumbnail.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 animate-fade-in-up flex flex-col"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <div className="relative aspect-[3/2] bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {imageErrors[thumbnail.id] ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                    <div className="text-center">
                      <svg
                        className="w-8 h-8 text-gray-400 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs text-gray-500">Failed to load</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {imageLoadingStates[thumbnail.id] && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100 dark:bg-gray-700">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={thumbnail.thumbnailUrl}
                      alt={thumbnail.userInput}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      onLoadStart={() =>
                        setImageLoadingStates((prev) => ({
                          ...prev,
                          [thumbnail.id]: true,
                        }))
                      }
                      onLoad={() => handleImageLoad(thumbnail.id)}
                      onError={() => handleImageError(thumbnail.id)}
                    />
                  </>
                )}
              </div>

              <div className="p-3 flex flex-col">
                <div>
                  <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight">
                    {thumbnail.userInput}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>ID: {thumbnail.id}</span>
                    <span>{formatDate(thumbnail.createdAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      downloadImage(
                        thumbnail.thumbnailUrl,
                        `thumbnail-${thumbnail.id}.jpg`
                      )
                    }
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5 font-medium"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(thumbnail.thumbnailUrl, thumbnail.id)
                    }
                    className="bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium"
                    title="Copy URL to clipboard"
                  >
                    {copiedId === thumbnail.id ? (
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThumbnailList;
