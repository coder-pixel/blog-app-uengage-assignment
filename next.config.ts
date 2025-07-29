import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ✅ Allow production builds to successfully complete even if there are type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
