import { AnimatedSection } from "@/components/animated-section";
import { BackendStatus } from "@/components/backend-status";
import { Hero } from "@/components/hero";
import { ProfileCard } from "@/components/profile-card";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";
import { StatsGrid } from "@/components/stats-grid";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <AnimatedSection className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <ProfileCard />
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/70 p-6 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
              Portfolio Mission
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
              A focused hub for Go systems that feel fast, secure, and engineered.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
              This showcase presents backend-heavy Golang work through a polished dashboard experience.
              It highlights real-time communication, JWT-secured REST architecture, and practical
              concurrency patterns with clear project pages and deployment-ready frontend code.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <StatsGrid />
        </AnimatedSection>

        <AnimatedSection className="mt-6">
          <BackendStatus />
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <SectionHeading
            eyebrow="Project Dashboard"
            title="Three production-minded Golang builds"
            description="Each project card opens into a detailed page with architecture, features, technologies, links, and a visual screenshot gallery."
          />
          <div className="mt-8">
            <ProjectGrid />
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
