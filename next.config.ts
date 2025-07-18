import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Images configuration
  images: {
    domains: ['localhost', 'image.pollinations.ai', 'ik.imagekit.io' , 'i.ytimg.com', 'yt3.googleusercontent.com', 'www.youtube.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
