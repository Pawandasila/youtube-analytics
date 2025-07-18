import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Helper function to parse YouTube duration to seconds
function parseYouTubeDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  return hours * 3600 + minutes * 60 + seconds;
}

// Helper function to calculate days since publication
function getDaysSincePublished(publishedAt: string): number {
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper function to calculate expected views based on various factors
function calculateExpectedViews(video: any, channelAvgViews: number): number {
  const daysSincePublished = getDaysSincePublished(video.publishedAt);
  const duration = parseYouTubeDuration(video.duration);
  
  // Base expectation on channel average
  let expectedViews = channelAvgViews;
  
  // Adjust for video age (newer videos might have lower views naturally)
  if (daysSincePublished < 7) {
    expectedViews *= 0.3; // New videos get 30% of expected views
  } else if (daysSincePublished < 30) {
    expectedViews *= 0.6; // Month-old videos get 60% of expected views
  } else if (daysSincePublished < 90) {
    expectedViews *= 0.8; // 3-month-old videos get 80% of expected views
  }
  
  // Adjust for video duration (shorter videos often get more views)
  if (duration < 300) { // Less than 5 minutes
    expectedViews *= 1.2;
  } else if (duration > 1200) { // More than 20 minutes
    expectedViews *= 0.8;
  }
  
  return Math.max(expectedViews, 100); // Minimum expectation of 100 views
}

// Helper function to calculate outlier score
function calculateOutlierScore(actualViews: number, expectedViews: number): number {
  if (expectedViews === 0) return 0;
  
  const ratio = actualViews / expectedViews;
  
  // Score from 0-100, where lower actual views = higher outlier score
  if (ratio >= 1) return 0; // Not an outlier
  if (ratio >= 0.5) return 25; // Slightly underperforming
  if (ratio >= 0.3) return 50; // Moderately underperforming
  if (ratio >= 0.1) return 75; // Significantly underperforming
  return 100; // Severely underperforming
}

// Type definition for processed video
interface ProcessedVideo {
  id: string;
  title: string;
  statistics: any;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  duration: string;
  commentCount: number;
  daysSincePublished: number;
  durationInSeconds: number;
  expectedViews?: number;
  outlierScore?: number;
  engagementRate?: number;
  underperformanceRatio?: number;
  isOutlier?: boolean;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  let searchQuery = searchParams.get("query") || "";

  try {
    // Get youtube video list api
    const youtubeSearchResult = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`
    );

    const searchData = youtubeSearchResult.data;

    const videoIds = searchData.items
      .map((item: any) => item.id.videoId)
      .join(",");

    // get Youtube detail by id api
    const videoResult = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${videoIds}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const videoResultData = videoResult.data;

    // Process videos and calculate outlier metrics
    const processedVideos: ProcessedVideo[] = videoResultData.items.map((item: any) => {
      const viewCount = parseInt(item.statistics.viewCount || '0', 10);
      const likeCount = parseInt(item.statistics.likeCount || '0', 10);
      const commentCount = parseInt(item.statistics.commentCount || '0', 10);
      
      return {
        id: item.id,
        title: item.snippet.title,
        statistics: item.statistics,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        viewCount: viewCount,
        likeCount: likeCount,
        duration: item.contentDetails?.duration || "N/A",
        commentCount: commentCount,
        daysSincePublished: getDaysSincePublished(item.snippet.publishedAt),
        durationInSeconds: parseYouTubeDuration(item.contentDetails?.duration || "PT0S")
      };
    });

    // Calculate channel averages for outlier detection
    const channelGroups = processedVideos.reduce((acc: Record<string, ProcessedVideo[]>, video: ProcessedVideo) => {
      if (!acc[video.channelTitle]) {
        acc[video.channelTitle] = [];
      }
      acc[video.channelTitle].push(video);
      return acc;
    }, {});

    // Calculate outlier scores for each video
    const outlierVideos = processedVideos.map((video: ProcessedVideo) => {
      const channelVideos = channelGroups[video.channelTitle] || [video];
      const channelAvgViews = channelVideos.reduce((sum: number, v: ProcessedVideo) => sum + v.viewCount, 0) / channelVideos.length;
      
      const expectedViews = calculateExpectedViews(video, channelAvgViews);
      const outlierScore = calculateOutlierScore(video.viewCount, expectedViews);
      
      // Calculate engagement rate
      const engagementRate = video.viewCount > 0 ? 
        ((video.likeCount + video.commentCount) / video.viewCount) * 100 : 0;
      
      return {
        ...video,
        expectedViews: Math.round(expectedViews),
        outlierScore,
        engagementRate: parseFloat(engagementRate.toFixed(2)),
        underperformanceRatio: expectedViews > 0 ? parseFloat((video.viewCount / expectedViews).toFixed(2)) : 0,
        isOutlier: outlierScore >= 50 // Consider scores >= 50 as outliers
      };
    });

    // Sort by outlier score (highest first) and filter for actual outliers
    const sortedOutliers = outlierVideos
      .filter((video: ProcessedVideo) => video.isOutlier)
      .sort((a: ProcessedVideo, b: ProcessedVideo) => (b.outlierScore || 0) - (a.outlierScore || 0));

    // If no outliers found, return videos with lowest performance ratios
    const finalResults = sortedOutliers.length > 0 ? sortedOutliers : 
      outlierVideos.sort((a: ProcessedVideo, b: ProcessedVideo) => (a.underperformanceRatio || 0) - (b.underperformanceRatio || 0)).slice(0, 20);

    return NextResponse.json(finalResults);
  } catch (error) {
    console.error('Error fetching outlier videos:', error);
    return NextResponse.json({ error: 'Failed to fetch outlier videos' }, { status: 500 });
  }
}
