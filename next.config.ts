import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["10.81.174.120", "10.198.167.17", "localhost:3000"],
  experimental: {
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: path.resolve(__dirname, ".."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
