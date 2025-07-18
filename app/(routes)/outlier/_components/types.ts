export interface VideoThumbnail {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount?: string | number;
  duration?: string;
  likeCount?: string | number;
  commentCount?: string | number;
  statistics?: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
  // Outlier-specific fields
  outlierScore?: number;
  expectedViews?: number;
  engagementRate?: number;
  underperformanceRatio?: number;
  isOutlier?: boolean;
  daysSincePublished?: number;
  durationInSeconds?: number;
}

export type SearchStep = 'search' | 'results';
