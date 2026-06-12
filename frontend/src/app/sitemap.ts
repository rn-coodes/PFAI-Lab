import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const baseUrl = "https://rehan-go-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/about", "/contact", "/demo/chat", "/demo/api", "/demo/crawler"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...projectRoutes];
}
