"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Github, Play, Radio, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import { BackendStatus } from "@/components/backend-status";
import { MagneticLink } from "@/components/magnetic-link";
import { VisualPanel } from "@/components/visual-panel";
import { getProject, type ProjectSlug } from "@/data/projects";
import { useTelemetry } from "@/lib/telemetry";

const styles = {
  chat: { surface: "bg-cyan-100", accent: "bg-cyan-400", text: "text-cyan-700", button: "bg-cyan-500 hover:bg-cyan-600" },
  api: { surface: "bg-lime-100", accent: "bg-lime-400", text: "text-lime-700", button: "bg-lime-500 hover:bg-lime-600" },
  crawler: { surface: "bg-violet-100", accent: "bg-violet-400", text: "text-violet-700", button: "bg-violet-500 hover:bg-violet-600" }
};

const architectureSteps: Record<ProjectSlug, [string, string][]> = {
  chat: [["JWT upgrade", "Validates the socket session."], ["Client pumps", "Reads and writes framed messages."], ["Go hub", "Coordinates clients through channels."], ["Broadcast", "Delivers events to connected sockets."]],
  api: [["Gin route", "Binds and validates JSON input."], ["bcrypt", "Hashes and verifies passwords."], ["JWT middleware", "Validates signed bearer claims."], ["SQLite", "Returns the persisted user profile."]],
  crawler: [["Target guard", "Rejects private-network destinations."], ["Job queue", "Schedules bounded crawl work."], ["Go workers", "Fetch and parse pages concurrently."], ["Result index", "Returns measured crawl outcomes."]]
};

export function ProjectDetail({ slug }: { slug: ProjectSlug }) {
  const { telemetry, latency } = useTelemetry();
  const project = getProject(slug);
  if (!project) return null;
  const Icon = project.icon;
  const style = styles[project.slug];
  const headlineMetric = project.slug === "chat"
    ? [telemetry ? String(telemetry.activeWebSockets) : "--", "Live sockets"]
    : project.slug === "api"
      ? [telemetry ? String(telemetry.requests) : "--", "Requests served"]
      : [telemetry ? String(telemetry.crawlerMaxWorkers) : "--", "Max workers"];

  return (
    <main className="overflow-hidden px-3 pb-20 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto max-w-[1440px]">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
          <Link href="/work" className="group inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-blue-600"><ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" /> All projects</Link>
        </motion.div>

        <motion.section className="relative mt-6 overflow-hidden rounded-lg border border-slate-800 bg-[#07111f] text-white shadow-[0_35px_110px_rgba(15,23,42,0.24)]" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <div className={`h-1.5 ${style.accent}`} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex min-w-0 flex-col justify-center border-b border-white/10 p-7 sm:p-12 lg:border-b-0 lg:border-r lg:p-14">
              <div className="flex items-center gap-3">
                <motion.span className={`grid h-12 w-12 place-items-center rounded-md ${style.accent} text-slate-950`} whileHover={{ rotate: 12, scale: 1.1 }}><Icon className="h-5 w-5" /></motion.span>
                <div><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{project.eyebrow}</p><p className="mt-1 flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-300"><Radio className="h-3 w-3 animate-pulse" /> Deployed on Railway</p></div>
              </div>
              <h1 className="mt-9 max-w-3xl text-[3.1rem] font-black leading-[0.86] tracking-[-0.03em] text-white sm:text-[clamp(3.5rem,7vw,7.4rem)]">{project.title}</h1>
              <p className="mt-7 max-w-2xl border-l-2 border-white/20 pl-5 text-base leading-8 text-slate-400">{project.longDescription}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <MagneticLink href={project.demo} className={`premium-button group inline-flex items-center gap-3 rounded-md px-5 py-4 text-xs font-black uppercase text-slate-950 transition ${style.button}`}>Launch live demo <Play className="h-4 w-4 transition group-hover:translate-x-1" /></MagneticLink>
                <Link href={project.github} target="_blank" className="group inline-flex items-center gap-3 rounded-md border border-white/15 px-5 py-4 text-xs font-black uppercase text-white transition hover:border-white hover:bg-white hover:text-slate-950"><Github className="h-4 w-4" /> Source code <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
              </div>
            </div>

            <div className="relative min-w-0 overflow-hidden bg-white/[0.025] p-5 sm:p-8 lg:p-10">
              <div className="relative flex h-full min-h-[560px] flex-col justify-center">
                <div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Product interface</p><p className="mt-1 text-xs font-bold text-slate-500">Concept preview with real runtime telemetry</p></div><div className="text-right"><p className="text-3xl font-black text-white">{headlineMetric[0]}</p><p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500">{headlineMetric[1]}</p></div></div>
                <motion.div initial={{ opacity: 0, rotate: 2, scale: 0.96 }} animate={{ opacity: 1, rotate: -1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8 }} whileHover={{ rotate: 0, scale: 1.015 }}><VisualPanel kind={project.screenshots[0].kind} title={project.title} /></motion.div>
                <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10">{[[project.languages[0], "Core"], [latency === null ? "--" : `${latency}ms`, "Latency"], [telemetry?.goVersion?.replace("go", "Go ") ?? "--", "Runtime"]].map(([value, label], index) => <motion.div key={label} className="bg-[#0b1727] p-3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + index * 0.1 }}><p className="text-sm font-black text-white">{value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">{label}</p></motion.div>)}</div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white p-7 shadow-[0_22px_70px_rgba(15,23,42,.08)] sm:p-10" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className={`text-xs font-black uppercase tracking-[0.18em] ${style.text}`}>Architecture flow</p><h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-5xl">From request to result.</h2></div><p className="max-w-md text-sm leading-7 text-slate-600">{project.architecture}</p></div>
          <div className="relative mt-10 grid gap-4 md:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-6 hidden h-px bg-slate-200 md:block" />
            {architectureSteps[project.slug].map(([title, copy], index) => <motion.div key={title} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-5" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} whileHover={{ y: -6, backgroundColor: "#07111f", color: "#ffffff" }}><span className="font-mono text-5xl font-black text-slate-200 transition group-hover:text-white/10">{String(index + 1).padStart(2, "0")}</span><span className={`absolute right-5 top-5 h-3 w-3 ${style.accent}`} /><p className="mt-8 text-sm font-black text-slate-950 transition group-hover:text-white">{title}</p><p className="mt-2 text-xs leading-5 text-slate-500 transition group-hover:text-slate-400">{copy}</p></motion.div>)}
          </div>
        </motion.section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-10" initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}><p className={`text-xs font-black uppercase tracking-[0.18em] ${style.text}`}>Feature set</p><h2 className="mt-4 text-3xl font-black text-slate-950">What this system delivers</h2><div className="mt-8 grid gap-3 sm:grid-cols-2">{project.features.map((feature, index) => <motion.div key={feature} className="flex items-start gap-3 rounded-md bg-slate-50 p-4 text-sm font-bold text-slate-700" initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ x: 5 }}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${style.surface}`}><Check className={`h-3.5 w-3.5 ${style.text}`} /></span>{feature}</motion.div>)}</div></motion.div>
          <motion.div className="space-y-6" initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}><div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm"><div className="flex items-center gap-3"><Zap className={`h-5 w-5 ${style.text}`} /><p className={`text-xs font-black uppercase tracking-[0.18em] ${style.text}`}>Technology stack</p></div><div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech, index) => <motion.span key={tech} className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-600" initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ scale: 1.05, borderColor: "#2563eb" }}><Terminal className="h-3.5 w-3.5 text-blue-600" />{tech}</motion.span>)}</div></div><BackendStatus /></motion.div>
        </section>

        <motion.section className="mt-6 rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-10" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.7 }}><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className={`text-xs font-black uppercase tracking-[0.18em] ${style.text}`}>Interface concepts</p><h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-5xl">Understand the system visually.</h2></div><Link href={project.demo} className="group flex items-center gap-2 text-sm font-black text-blue-600">Open the real live interface <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link></div><div className="mt-8 grid gap-5 lg:grid-cols-2">{project.screenshots.map((shot, index) => <motion.div key={shot.title} initial={{ opacity: 0, y: 30, rotate: index ? 1 : -1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.65 }} whileHover={{ y: -6 }}><VisualPanel kind={shot.kind} title={shot.title} /><p className="mt-3 text-xs font-bold text-slate-500">{shot.caption}</p></motion.div>)}</div></motion.section>
      </div>
    </main>
  );
}
