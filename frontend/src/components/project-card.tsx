"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github, Play, Radio } from "lucide-react";
import Link from "next/link";
import { VisualPanel } from "@/components/visual-panel";
import type { Project } from "@/data/projects";
import { MagneticLink } from "@/components/magnetic-link";
import { useEffect, useState } from "react";

const styles = {
  chat: { surface: "bg-cyan-100", accent: "bg-cyan-400", text: "text-cyan-700", button: "bg-cyan-500 hover:bg-cyan-600", tagColor: "#0891b2", number: "01", metric: "18ms", metricLabel: "Delivery" },
  api: { surface: "bg-lime-100", accent: "bg-lime-400", text: "text-lime-700", button: "bg-lime-400 hover:bg-lime-500", tagColor: "#4d7c0f", number: "02", metric: "JWT", metricLabel: "Protected" },
  crawler: { surface: "bg-violet-100", accent: "bg-violet-400", text: "text-violet-700", button: "bg-violet-500 hover:bg-violet-600", tagColor: "#7c3aed", number: "03", metric: "50+", metricLabel: "Workers" }
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const style = styles[project.slug];
  const reversed = index % 2 === 1;
  const [latency, setLatency] = useState(18);
  useEffect(() => {
    const timer = window.setInterval(() => setLatency(Math.floor(Math.random() * 11) + 14), 2500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.article
      className="group mb-8 overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] ring-1 ring-white/80 last:mb-0"
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 30px 90px rgba(15,23,42,0.13)" }}
    >
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className={`flex min-w-0 flex-col justify-between p-7 sm:p-10 lg:p-12 ${reversed ? "lg:order-2" : ""}`}>
          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3"><motion.span className={`grid h-12 w-12 place-items-center rounded-md ${style.surface} ${style.text}`} whileHover={{ rotate: 12, scale: 1.1 }}><Icon className="h-5 w-5" /></motion.span><div><p className={`text-[10px] font-black uppercase tracking-[0.15em] ${style.text}`}>{project.eyebrow}</p><p className="mt-1 flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600"><Radio className="h-3 w-3 animate-pulse" /> Live deployment</p></div></div>
              <span className="text-6xl font-black leading-none text-slate-100 transition group-hover:text-slate-200">{style.number}</span>
            </div>

            <h3 className="mt-10 max-w-xl text-4xl font-black leading-[1.02] text-slate-950 sm:text-5xl">{project.title}</h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">{project.description}</p>

            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {project.features.slice(0, 4).map((feature, featureIndex) => <motion.div key={feature} className="flex items-start gap-2.5 rounded-md bg-slate-50 p-3 text-xs font-bold leading-5 text-slate-600" initial={{ opacity: 0, x: reversed ? 14 : -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: featureIndex * 0.07 }} whileHover={{ x: reversed ? -4 : 4, backgroundColor: "#f1f5f9" }}><Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${style.text}`} />{feature}</motion.div>)}
            </div>
          </div>

          <div className="mt-9">
            <div className="flex flex-wrap gap-2">{project.technologies.slice(0, 6).map((tech) => <motion.span key={tech} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black text-slate-500" whileHover={{ y: -3, borderColor: style.tagColor, color: style.tagColor }}>{tech}</motion.span>)}</div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={project.path} className={`premium-button group flex h-12 items-center gap-3 rounded-md px-5 text-xs font-black uppercase text-white transition ${style.button}`}>Explore case study <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
              <MagneticLink href={project.demo} className="group flex h-12 items-center gap-2 rounded-md border border-slate-200 px-4 text-xs font-black uppercase text-slate-700 transition hover:border-slate-950"><Play className="h-4 w-4 transition group-hover:scale-110" /> Live demo</MagneticLink>
              <Link href={project.github} target="_blank" className="grid h-12 w-12 place-items-center rounded-md border border-slate-200 text-slate-700 transition hover:border-slate-950" aria-label={`${project.title} source`}><Github className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>

        <div className={`relative min-w-0 overflow-hidden p-5 sm:p-8 lg:p-10 ${style.surface} ${reversed ? "lg:order-1" : ""}`}>
          <motion.div className={`absolute -right-12 -top-12 h-56 w-56 rounded-full ${style.accent} opacity-30 blur-3xl`} animate={{ x: [0, -45, 0], y: [0, 35, 0], scale: [1, 1.12, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          <div className="relative flex h-full min-h-[500px] flex-col justify-center">
            <div className="mb-4 flex items-end justify-between gap-4"><div><p className={`text-[10px] font-black uppercase tracking-[0.15em] ${style.text}`}>Interactive preview</p><p className="mt-1 text-xs font-bold text-slate-500">Live system interface</p></div><div className="text-right"><motion.p key={project.slug === "chat" ? latency : style.metric} className="text-2xl font-black text-slate-950" initial={{ opacity: 0.4, y: 3 }} animate={{ opacity: 1, y: 0 }}>{project.slug === "chat" ? `${latency}ms` : style.metric}</motion.p><p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500">{style.metricLabel}</p></div></div>
            <motion.div whileHover={{ scale: 1.012, rotate: reversed ? -0.5 : 0.5 }}><VisualPanel kind={project.slug} title={project.eyebrow} /></motion.div>
            <div className="mt-4 grid grid-cols-3 gap-2">{[[project.languages[0], "Core"], ["Railway", "Backend"], ["Online", "Status"]].map(([value, label], metricIndex) => <motion.div key={label} className="rounded-md bg-white/70 p-3 backdrop-blur" animate={{ y: [0, metricIndex % 2 ? -3 : 3, 0] }} transition={{ duration: 3.5 + metricIndex, repeat: Infinity, ease: "easeInOut" }}><p className="text-xs font-black text-slate-950">{value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">{label}</p></motion.div>)}</div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
