"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github, Play, Radio } from "lucide-react";
import Link from "next/link";
import { VisualPanel } from "@/components/visual-panel";
import type { Project } from "@/data/projects";
import { MagneticLink } from "@/components/magnetic-link";
import { useTelemetry } from "@/lib/telemetry";

const styles = {
  chat: { surface: "bg-cyan-100", accent: "bg-cyan-400", text: "text-cyan-700", button: "bg-cyan-500 hover:bg-cyan-600", tagColor: "#0891b2", number: "01", stage: "bg-cyan-50" },
  api: { surface: "bg-lime-100", accent: "bg-lime-400", text: "text-lime-700", button: "bg-lime-500 hover:bg-lime-600", tagColor: "#4d7c0f", number: "02", stage: "bg-lime-50" },
  crawler: { surface: "bg-violet-100", accent: "bg-violet-400", text: "text-violet-700", button: "bg-violet-500 hover:bg-violet-600", tagColor: "#7c3aed", number: "03", stage: "bg-violet-50" }
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const style = styles[project.slug];
  const reversed = index % 2 === 1;
  const { telemetry, latency } = useTelemetry();
  const metric = project.slug === "chat"
    ? [telemetry ? String(telemetry.activeWebSockets) : "--", "Live sockets"]
    : project.slug === "api"
      ? [telemetry ? String(telemetry.requests) : "--", "Requests"]
      : [telemetry ? String(telemetry.crawlerMaxWorkers) : "--", "Max workers"];

  return (
    <motion.article
      className="group mb-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.09)] last:mb-0"
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, boxShadow: "0 38px 110px rgba(15,23,42,0.14)" }}
    >
      <div className={`h-1 ${style.accent}`} />
      <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
        <div className={`flex min-w-0 flex-col justify-between p-7 sm:p-10 lg:p-12 ${reversed ? "lg:order-2" : ""}`}>
          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3"><motion.span className={`grid h-12 w-12 place-items-center rounded-md ${style.surface} ${style.text}`} whileHover={{ rotate: 12, scale: 1.1 }}><Icon className="h-5 w-5" /></motion.span><div><p className={`text-[10px] font-black uppercase tracking-[0.15em] ${style.text}`}>{project.eyebrow}</p><p className="mt-1 flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600"><Radio className="h-3 w-3 animate-pulse" /> Railway live</p></div></div>
              <span className="font-mono text-6xl font-black leading-none text-slate-100 transition group-hover:text-slate-200">{style.number}</span>
            </div>

            <h3 className="mt-10 max-w-xl text-4xl font-black leading-[0.98] text-slate-950 sm:text-5xl">{project.title}</h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">{project.description}</p>

            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {project.features.slice(0, 4).map((feature, featureIndex) => <motion.div key={feature} className="flex items-start gap-2.5 rounded-md border border-slate-100 bg-slate-50 p-3 text-xs font-bold leading-5 text-slate-600" initial={{ opacity: 0, x: reversed ? 14 : -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: featureIndex * 0.07 }} whileHover={{ x: reversed ? -4 : 4, backgroundColor: "#f1f5f9" }}><Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${style.text}`} />{feature}</motion.div>)}
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

        <div className={`relative min-w-0 overflow-hidden border-slate-200 ${style.stage} p-5 sm:p-8 lg:p-10 ${reversed ? "lg:order-1 lg:border-r" : "lg:border-l"}`}>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.65)_1px,transparent_1px)] bg-[size:38px_38px]" />
          <div className="relative flex h-full min-h-[500px] flex-col justify-center">
            <div className="mb-4 flex items-end justify-between gap-4"><div><p className={`text-[10px] font-black uppercase tracking-[0.15em] ${style.text}`}>System preview</p><p className="mt-1 text-xs font-bold text-slate-500">Interface concept + live runtime</p></div><div className="text-right"><motion.p key={metric[0]} className="text-2xl font-black text-slate-950" initial={{ opacity: 0.4, y: 3 }} animate={{ opacity: 1, y: 0 }}>{metric[0]}</motion.p><p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500">{metric[1]}</p></div></div>
            <motion.div whileHover={{ scale: 1.012, rotate: reversed ? -0.5 : 0.5 }}><VisualPanel kind={project.slug} title={project.eyebrow} /></motion.div>
            <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-slate-200 bg-slate-200">{[[project.languages[0], "Core"], [latency === null ? "--" : `${latency}ms`, "Latency"], [telemetry?.goVersion?.replace("go", "Go ") ?? "--", "Runtime"]].map(([value, label]) => <div key={label} className="bg-white/90 p-3"><p className="text-xs font-black text-slate-950">{value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">{label}</p></div>)}</div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
