"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Github } from "lucide-react";
import Link from "next/link";
import { LanguageBadges } from "@/components/language-badges";
import { VisualPanel } from "@/components/visual-panel";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;

  return (
    <motion.article
      className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/75 p-5 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.62, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <VisualPanel kind={project.screenshots[0].kind} title={project.eyebrow} />
      <div className="mt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
              {project.eyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{project.title}</h3>
          </div>
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${project.accent} text-slate-950 shadow-glow`}>
            <Icon className="h-6 w-6" />
          </span>
        </div>
        <p className="mt-4 min-h-24 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>

        <div className="mt-5">
          <LanguageBadges languages={project.languages} compact />
        </div>

        <div className="mt-5 grid gap-2">
          {project.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyanGo" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-cyanGo hover:text-slate-950 dark:bg-white dark:text-ink dark:hover:bg-cyanGo"
          >
            Open Project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={project.github}
            target="_blank"
            aria-label={`${project.title} GitHub repository`}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/80 text-slate-700 transition hover:-translate-y-1 hover:border-cyanGo hover:text-cyanGo dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <Github className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
