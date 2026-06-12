"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Radio, ShieldCheck, Users, Zap } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";

const metrics = {
  chat: [["124+", "Users", Users], ["98ms", "Latency", Zap], ["Live", "Socket", Radio]],
  api: [["10+", "Endpoints", Zap], ["256-bit", "Security", ShieldCheck], ["100%", "Protected", Radio]],
  crawler: [["1K+", "Pages/min", Zap], ["50+", "Workers", Users], ["99.5%", "Success", Radio]]
} as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  return (
    <motion.article
      className={`group relative overflow-hidden border bg-[#07101f]/90 p-5 text-white shadow-panel ${
        project.slug === "api" ? "border-violet-400/30" : project.slug === "crawler" ? "border-blue-400/30" : "border-cyan-400/30"
      }`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5 }}
    >
      <div className={`absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 ${
        project.slug === "api" ? "bg-violet-500/[0.06]" : project.slug === "crawler" ? "bg-blue-500/[0.06]" : "bg-cyan-500/[0.06]"
      }`} />
      <div className="relative">
        <div className="flex items-start gap-4">
          <span className={`grid h-16 w-16 shrink-0 place-items-center border bg-gradient-to-br ${project.accent} text-slate-950 shadow-glow`}><Icon className="h-8 w-8" /></span>
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <Link href={`/projects/${project.slug}`} className="text-lg font-black transition hover:text-cyan-200">{project.title}</Link>
              <span className="flex items-center gap-1 bg-emerald-300/10 px-2 py-1 text-[10px] font-black text-emerald-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />Live</span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{project.description}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => <span key={tech} className="border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold text-cyan-200">{tech}</span>)}
        </div>

        <div className="mt-5 grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2 border-t border-white/10 pt-4">
          {metrics[project.slug].map(([value, label, MetricIcon]) => (
            <div key={label}><p className="flex items-center gap-1 text-xs font-black"><MetricIcon className="h-3.5 w-3.5 text-cyan-300" />{value}</p><p className="mt-1 text-[9px] text-slate-500">{label}</p></div>
          ))}
          <div className="flex gap-2">
            <Link href={project.github} target="_blank" className="grid h-9 w-9 place-items-center border border-white/10 bg-white/[0.05] text-slate-400 transition hover:border-cyanGo hover:text-cyan-200" aria-label="GitHub repository"><Github className="h-4 w-4" /></Link>
            <Link href={project.demo} className="grid h-9 w-9 place-items-center rounded-full bg-cyanGo text-slate-950 transition hover:scale-110" aria-label={`Open live ${project.title} demo`}><ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
