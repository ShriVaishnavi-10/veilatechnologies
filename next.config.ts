import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Bypass build-time type checking to prevent spawning the SWC WASM worker
    // which fails on this Windows platform's execution policy.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
