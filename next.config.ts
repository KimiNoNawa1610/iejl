import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    staleTimes:{
      dynamic:30, // cache for 30 seconds
    }
  }
};

export default nextConfig;
