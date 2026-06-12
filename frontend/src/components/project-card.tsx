"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Play, Radio } from "lucide-react";
import Link from "next/link";
import { VisualPanel } from "@/components/visual-panel";
import type { Project } from "@/data/projects";

const styles = {
  chat: { surface: "bg-cyan-100", accent: "bg-cyan-400", text: "text-cyan-700", number: "01" },
  api: { surface: "bg-lime-100", accent: "bg-lime-400", text: "text-lime-700", number: "02" },
  crawler: { surface: "bg-violet-100", accent: "bg-violet-400", text: "text-violet-700", number: "03" }
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const style = styles[project.slug];

  return (
    <motion.article
      className="mb-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] last:mb-0"
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-between p-7 sm:p-10">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className={`grid h-12 w-12 place-items-center rounded-md ${style.surface} ${style.text}`}><Icon className="h-5 w-5" /></span>
              <span className="text-5xl font-black text-slate-100">{style.number}</span>
            </div>
            <div className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-600"><Radio className="h-3.5 w-3.5 animate-pulse" /> Live project</div>
            <h3 className="mt-4 max-w-xl text-3xl font-black leading-tight text-slate-950 sm:text-5xl">{project.title}</h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">{project.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">{project.technologies.slice(0, 5).map((tech) => <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-600">{tech}</span>)}</div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={project.path} className="flex items-center gap-3 rounded-md bg-slate-950 px-5 py-3.5 text-xs font-black uppercase text-white transition hover:bg-blue-600">Case study <ArrowRight className="h-4 w-4" /></Link>
            <Link href={project.demo} className="grid h-12 w-12 place-items-center rounded-md border border-slate-200 text-slate-700 transition hover:border-blue-600 hover:text-blue-600" aria-label={`Launch ${project.title}`}><Play className="h-4 w-4" /></Link>
            <Link href={project.github} target="_blank" className="grid h-12 w-12 place-items-center rounded-md border border-slate-200 text-slate-700 transition hover:border-blue-600 hover:text-blue-600" aria-label={`${project.title} source`}><Github className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className={`relative overflow-hidden p-5 sm:p-8 ${style.surface}`}>
          <motion.div className={`absolute -right-14 -top-14 h-44 w-44 rounded-full ${style.accent} opacity-30 blur-3xl`} animate={{ x: [0, -35, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <div className="relative flex h-full min-h-[430px] items-center"><VisualPanel kind={project.slug} title={project.eyebrow} /></div>
        </div>
      </div>
    </motion.article>
  );
}
