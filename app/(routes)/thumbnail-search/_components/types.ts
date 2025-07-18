export interface VideoThumbnail {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount?: string;
  duration?: string;
  likeCount?: string;
  commentCount?: string;
  statistics?: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export type SearchStep = 'search' | 'results' | 'ai-suggestions';
