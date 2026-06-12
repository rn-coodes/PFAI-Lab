import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const baseUrl = "https://rehan-go-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/profile", "/connect", "/live/realtime-go-chat", "/live/jwt-auth-console", "/live/concurrent-web-crawler"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}${project.path}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...projectRoutes];
}
