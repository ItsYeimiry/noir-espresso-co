import type { NextConfig } from "next";

// `npm run export` builds plain HTML/CSS/JS into out/ (no Node server needed).
// Static hosting cannot run the image optimiser, so images are served as-is in that mode.
const isExport = process.env.EXPORT === "1";

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  images: {
    unoptimized: isExport,
    qualities: [75, 80, 85, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
