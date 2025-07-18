import { VideoThumbnail } from './types';

// Helper function to get stats from thumbnail object
export const getViewCount = (thumbnail: VideoThumbnail) => {
  return thumbnail.statistics?.viewCount || thumbnail.viewCount || '0';
};

export const getLikeCount = (thumbnail: VideoThumbnail) => {
  return thumbnail.statistics?.likeCount || thumbnail.likeCount || '0';
};

export const getCommentCount = (thumbnail: VideoThumbnail) => {
  return thumbnail.statistics?.commentCount || thumbnail.commentCount || '0';
};

export const formatViewCount = (count: string | number) => {
  if (!count || count === 'N/A') return '0';
  const num = typeof count === 'string' ? parseInt(count) : count;
  if (isNaN(num)) return '0';
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDuration = (duration: string) => {
  if (duration === 'N/A' || !duration) return 'Video';
  
  // Parse YouTube duration format (PT1M30S -> 1:30)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 'Video';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
};

export const downloadThumbnail = (thumbnailUrl: string, title: string) => {
  const link = document.createElement('a');
  link.href = thumbnailUrl;
  link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
