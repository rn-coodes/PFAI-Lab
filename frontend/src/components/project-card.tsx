"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Play } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";

const codes = { chat: "RT-01", api: "SEC-02", crawler: "CON-03" };

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  return (
    <motion.article
      className="group grid border-t border-black/20 dark:border-white/20 lg:grid-cols-[150px_1fr_0.8fr_auto]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
    >
      <div className="flex items-center justify-between border-b border-black/15 p-5 dark:border-white/15 lg:block lg:border-b-0 lg:border-r">
        <p className="font-mono text-xs font-black text-cyan-700 dark:text-cyan-300">{codes[project.slug]}</p>
        <p className="mt-0 text-5xl font-black text-black/10 dark:text-white/10 lg:mt-12">{String(index + 1).padStart(2, "0")}</p>
      </div>
      <div className="border-b border-black/15 p-6 transition group-hover:bg-cyan-300/10 dark:border-white/15 lg:border-b-0 lg:border-r lg:p-8">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center bg-[#07120f] text-cyan-300 dark:bg-cyan-300 dark:text-[#07120f]"><Icon className="h-6 w-6" /></span>
          <div>
            <p className="dossier-label text-slate-500">{project.eyebrow}</p>
            <Link href={project.path} className="mt-2 block text-2xl font-black leading-tight transition hover:text-cyan-700 dark:hover:text-cyan-300 sm:text-3xl">{project.title}</Link>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
      </div>
      <div className="border-b border-black/15 p-6 dark:border-white/15 lg:border-b-0 lg:border-r lg:p-8">
        <p className="dossier-label text-slate-500">System components</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => <span key={tech} className="border border-black/15 px-2.5 py-1 font-mono text-[10px] font-bold dark:border-white/15">{tech}</span>)}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-bold">
          <p><span className="block font-mono text-[9px] text-slate-500">STATUS</span><span className="text-emerald-700 dark:text-emerald-300">LIVE</span></p>
          <p><span className="block font-mono text-[9px] text-slate-500">LANGUAGE</span>GO</p>
        </div>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-1">
        <Link href={project.path} className="grid min-h-20 place-items-center border-r border-black/15 transition hover:bg-[#07120f] hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-black lg:border-b lg:border-r-0" aria-label={`Open ${project.title}`}><ArrowUpRight className="h-5 w-5" /></Link>
        <Link href={project.demo} className="grid min-h-20 place-items-center border-r border-black/15 transition hover:bg-cyan-300 hover:text-[#07120f] dark:border-white/15 lg:border-b lg:border-r-0" aria-label={`Run ${project.title}`}><Play className="h-5 w-5" /></Link>
        <Link href={project.github} target="_blank" className="grid min-h-20 place-items-center transition hover:bg-[#07120f] hover:text-white dark:hover:bg-white dark:hover:text-black" aria-label={`${project.title} source`}><Github className="h-5 w-5" /></Link>
      </div>
    </motion.article>
  );
}
