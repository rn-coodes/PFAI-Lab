"use client";

import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export function ProjectGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
