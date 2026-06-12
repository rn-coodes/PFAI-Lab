import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Project Dashboard",
  description: "Explore Rehan's Go projects: real-time chat, JWT REST API, and concurrent web crawler."
};

export default function ProjectsPage() {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Go Project Dashboard"
          title="Interactive project cards built for inspection"
          description="Open each system to review its overview, architecture, feature set, language stack, screenshots, repository placeholder, and live demo placeholder."
        />
        <div className="mt-10">
          <ProjectGrid />
        </div>
      </div>
    </main>
  );
}
