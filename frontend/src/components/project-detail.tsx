import { ArrowLeft, ExternalLink, Github, Layers3, Rocket, ShieldCheck, Terminal } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { BackendStatus } from "@/components/backend-status";
import { LanguageBadges } from "@/components/language-badges";
import { VisualPanel } from "@/components/visual-panel";
import type { Project } from "@/data/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 py-2 text-sm font-black text-slate-700 transition hover:-translate-x-1 hover:border-cyanGo hover:text-cyanGo dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <AnimatedSection className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyanGo/30 bg-cyanGo/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-200">
              <Icon className="h-4 w-4" />
              {project.eyebrow}
            </div>
            <h1 className="text-balance text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-6xl">
              {project.title}
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">{project.longDescription}</p>
            <LanguageBadges languages={project.languages} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={project.github}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-1 hover:bg-cyanGo hover:text-slate-950 dark:bg-white dark:text-ink"
              >
                <Github className="h-4 w-4" />
                GitHub Repository
              </Link>
              <Link
                href={project.demo}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/75 px-6 py-3 text-sm font-black text-slate-800 transition hover:-translate-y-1 hover:border-cyanGo hover:text-cyanGo dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <VisualPanel kind={project.screenshots[0].kind} title={project.title} />
          </AnimatedSection>
        </section>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.82fr]">
          <AnimatedSection className="rounded-[1.75rem] border border-slate-200/80 bg-white/70 p-6 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07]">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyanGo/15 text-cyan-700 dark:text-cyan-200">
                <Layers3 className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Architecture</h2>
            </div>
            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{project.architecture}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="rounded-[1.75rem] border border-slate-200/80 bg-white/70 p-6 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07]">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-700 dark:text-emerald-200">
                <Terminal className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Technologies</h2>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-black text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-6">
          <BackendStatus />
        </AnimatedSection>

        <AnimatedSection className="mt-6 rounded-[1.75rem] border border-slate-200/80 bg-white/70 p-6 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07]">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-300/20 text-amber-700 dark:text-amber-200">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Features</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                <Rocket className="h-5 w-5 shrink-0 text-cyanGo" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-6">
          <h2 className="mb-5 text-2xl font-black text-slate-950 dark:text-white">Screenshots Gallery</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {project.screenshots.map((screenshot) => (
              <div key={screenshot.title}>
                <VisualPanel kind={screenshot.kind} title={screenshot.title} />
                <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-400">{screenshot.caption}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
