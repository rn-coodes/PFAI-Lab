"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github, Play, Radio } from "lucide-react";
import Link from "next/link";
import { VisualPanel } from "@/components/visual-panel";
import type { Project } from "@/data/projects";

const projectMeta = {
  chat: {
    code: "RT-01",
    metric: "18ms",
    metricLabel: "Message delivery",
    glow: "bg-cyan-400",
    text: "text-cyan-300",
    wash: "from-cyan-400/20 via-cyan-400/5 to-transparent"
  },
  api: {
    code: "SEC-02",
    metric: "256-bit",
    metricLabel: "Signed identity",
    glow: "bg-emerald-400",
    text: "text-emerald-300",
    wash: "from-emerald-400/20 via-emerald-400/5 to-transparent"
  },
  crawler: {
    code: "CON-03",
    metric: "50+",
    metricLabel: "Concurrent workers",
    glow: "bg-amber-300",
    text: "text-amber-300",
    wash: "from-amber-300/20 via-amber-300/5 to-transparent"
  }
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const meta = projectMeta[project.slug];

  return (
    <motion.article
      className="group/project relative overflow-hidden border-b border-black/15 bg-[#07120f] text-white last:border-b-0 dark:border-white/15"
      initial={{ opacity: 0, y: -42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.wash}`}
        animate={{ opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.55)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative">
        <div className="border-b border-white/15 p-6 sm:p-10 lg:p-14">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 ${meta.glow} shadow-[0_0_22px_currentColor]`} />
                <span className={`dossier-label ${meta.text}`}>{meta.code} / Deployed system</span>
              </div>
              <span className="flex items-center gap-2 font-mono text-[10px] font-bold text-emerald-300">
                <Radio className="h-3.5 w-3.5 animate-pulse" /> LIVE ON RAILWAY
              </span>
            </div>

            <div className="mt-14 flex items-start gap-5">
              <motion.span
                className={`grid h-14 w-14 shrink-0 place-items-center ${meta.glow} text-[#07120f]`}
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <Icon className="h-7 w-7" />
              </motion.span>
              <div>
                <p className="dossier-label text-slate-500">{project.eyebrow}</p>
                <h3 className="mt-3 max-w-xl text-4xl font-black leading-[0.98] sm:text-5xl">{project.title}</h3>
              </div>
            </div>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{project.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {project.features.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-start gap-3 border-t border-white/15 pt-3 text-xs leading-5 text-slate-300">
                  <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${meta.text}`} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map((tech) => (
                <span key={tech} className="border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] font-bold text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href={project.path} className={`flex min-h-12 items-center justify-between gap-5 px-5 text-xs font-black uppercase text-[#07120f] transition hover:bg-white ${meta.glow}`}>
                Explore case study <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href={project.demo} className="flex min-h-12 items-center justify-between gap-5 border border-white/20 px-5 text-xs font-black uppercase transition hover:bg-white hover:text-[#07120f]">
                Launch live demo <Play className="h-4 w-4" />
              </Link>
              <Link href={project.github} target="_blank" className="grid h-12 w-12 shrink-0 place-items-center border border-white/20 transition hover:bg-white hover:text-[#07120f]" aria-label={`${project.title} source`}>
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[520px] flex-col justify-center overflow-hidden p-6 sm:p-10 lg:p-14">
          <motion.div
            className={`absolute -right-20 top-10 h-52 w-52 rounded-full ${meta.glow} opacity-10 blur-3xl`}
            animate={{ x: [0, -45, 0], y: [0, 35, 0], scale: [1, 1.18, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative mx-auto w-full max-w-6xl">
            <div className="mb-5 flex items-end justify-between gap-6">
              <div>
                <p className="dossier-label text-slate-500">Interactive system preview</p>
                <p className="mt-2 font-mono text-xs text-slate-300">runtime://{project.slug}/production</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-black ${meta.text}`}>{meta.metric}</p>
                <p className="dossier-label mt-1 text-slate-500">{meta.metricLabel}</p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <VisualPanel kind={project.slug} title={project.eyebrow} />
            </motion.div>
            <div className="mt-5 grid grid-cols-3 gap-px bg-white/15">
              {[
                [String(index + 1).padStart(2, "0"), "Build index"],
                [project.languages[0], "Core language"],
                ["Online", "System state"]
              ].map(([value, label]) => (
                <div key={label} className="bg-[#07120f] p-4">
                  <p className="text-sm font-black">{value}</p>
                  <p className="dossier-label mt-1 text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
