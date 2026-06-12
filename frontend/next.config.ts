import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/chat", destination: "/work/realtime-go-chat", permanent: true },
      { source: "/projects/api", destination: "/work/secure-jwt-api", permanent: true },
      { source: "/projects/crawler", destination: "/work/concurrent-web-crawler", permanent: true },
      { source: "/demo/chat", destination: "/live/realtime-go-chat", permanent: true },
      { source: "/demo/api", destination: "/live/jwt-auth-console", permanent: true },
      { source: "/demo/crawler", destination: "/live/concurrent-web-crawler", permanent: true },
      { source: "/about", destination: "/profile", permanent: true },
      { source: "/contact", destination: "/connect", permanent: true }
    ];
  },
  async rewrites() {
    return [
      { source: "/work", destination: "/projects" },
      { source: "/work/realtime-go-chat", destination: "/projects/chat" },
      { source: "/work/secure-jwt-api", destination: "/projects/api" },
      { source: "/work/concurrent-web-crawler", destination: "/projects/crawler" },
      { source: "/live/realtime-go-chat", destination: "/demo/chat" },
      { source: "/live/jwt-auth-console", destination: "/demo/api" },
      { source: "/live/concurrent-web-crawler", destination: "/demo/crawler" },
      { source: "/profile", destination: "/about" },
      { source: "/connect", destination: "/contact" }
    ];
  }
};

export default nextConfig;
