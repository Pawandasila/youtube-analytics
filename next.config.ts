import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduce development noise
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Images configuration
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
