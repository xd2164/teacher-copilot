import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // GitHub Pages serves from /teacher-copilot subpath in production
  basePath: process.env.NODE_ENV === "production" ? "/teacher-copilot" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
