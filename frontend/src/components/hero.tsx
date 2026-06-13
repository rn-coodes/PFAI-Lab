"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cable, CheckCircle2, Github, Network, Radio, Server, ShieldCheck, Terminal } from "lucide-react";
import Link from "next/link";
import { links } from "@/data/projects";
import { MagneticLink } from "@/components/magnetic-link";
import { formatUptime, useTelemetry } from "@/lib/telemetry";

const systems = [
  { label: "WebSocket hub", icon: Cable, color: "bg-cyan-300", detail: "Authenticated realtime fan-out" },
  { label: "JWT gateway", icon: ShieldCheck, color: "bg-lime-300", detail: "Protected route middleware" },
  { label: "Crawler pool", icon: Network, color: "bg-violet-300", detail: "Bounded concurrent workers" }
];

export function Hero() {
  const { telemetry, latency } = useTelemetry();
  const runtime = telemetry?.goVersion?.replace("go", "Go ") ?? "Connecting";

  return (
    <section className="px-3 pb-16 pt-5 sm:px-6 sm:pt-8">
      <div className="relative mx-auto w-full min-w-0 max-w-[1440px] overflow-hidden rounded-lg border border-slate-800 bg-[#07111f] text-white shadow-[0_40px_120px_rgba(15,23,42,.26)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <motion.div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 3, repeat: Infinity }} />

        <div className="relative grid min-h-[760px] grid-cols-[minmax(0,1fr)] xl:grid-cols-[1.02fr_0.98fr]">
          <div className="flex min-w-0 flex-col justify-between border-b border-white/10 p-7 sm:p-12 lg:p-16 xl:border-b-0 xl:border-r">
            <div>
              <motion.div className="flex flex-wrap items-center gap-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-200"><Radio className="h-3.5 w-3.5 animate-pulse" /> Railway runtime online</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Rehan / F24607089</span>
              </motion.div>

              <motion.h1 className="mt-10 max-w-4xl text-[3.15rem] font-black leading-[0.82] tracking-[-0.04em] sm:text-[clamp(4rem,8vw,8.8rem)]" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                GO<br /><span className="text-cyan-300">SYSTEMS</span><br />ENGINEER.
              </motion.h1>
              <motion.p className="mt-8 max-w-xl break-words border-l-2 border-cyan-300 pl-5 text-base leading-8 text-slate-300 sm:text-lg" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>Realtime communication, secure identity, and controlled concurrency. Built in Go, proven through live deployed products.</motion.p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <MagneticLink href="/work" className="premium-button flex h-14 items-center justify-center gap-3 rounded-md bg-cyan-300 px-7 text-sm font-black text-slate-950 transition hover:bg-white">Explore live systems <ArrowRight className="h-4 w-4" /></MagneticLink>
                <Link href={links.mainRepository} target="_blank" className="flex h-14 items-center justify-center gap-3 rounded-md border border-white/15 px-7 text-sm font-black text-white transition hover:border-white hover:bg-white hover:text-slate-950"><Github className="h-4 w-4" /> Inspect source</Link>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10">
              {[["03", "Deployed products"], [latency === null ? "--" : `${latency}ms`, "Measured latency"], [formatUptime(telemetry?.uptimeSeconds), "Current uptime"]].map(([value, label], index) => <motion.div key={label} className="min-w-0 overflow-hidden bg-[#0b1727] p-4 sm:p-5" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + index * 0.12 }}><p className="truncate text-xl font-black text-white sm:text-3xl">{value}</p><p className="mt-2 truncate text-[8px] font-black uppercase tracking-[0.06em] text-slate-500 sm:text-[9px] sm:tracking-[0.1em]">{label}</p></motion.div>)}
            </div>
          </div>

          <div className="flex min-w-0 flex-col bg-white/[0.025] p-5 sm:p-8 lg:p-10">
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5"><div className="min-w-0"><p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">Live infrastructure console</p><p className="mt-2 text-sm font-bold text-slate-400">Production telemetry from Railway</p></div><div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-[9px] font-black uppercase text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Operational</div></div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[["Runtime", runtime, Server, "text-cyan-300"], ["Requests served", telemetry ? String(telemetry.requests) : "--", Terminal, "text-lime-300"], ["Active sockets", telemetry ? String(telemetry.activeWebSockets) : "--", Cable, "text-violet-300"], ["Goroutines", telemetry ? String(telemetry.goroutines) : "--", Network, "text-amber-300"]].map(([label, value, Icon, color], index) => { const MetricIcon = Icon as typeof Server; return <motion.div key={String(label)} className="relative min-w-0 overflow-hidden rounded-md border border-white/10 bg-white/[0.045] p-5" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + index * 0.08 }} whileHover={{ y: -4, borderColor: "rgba(103,232,249,.45)" }}><MetricIcon className={`h-4 w-4 ${color}`} /><p className="mt-7 truncate text-2xl font-black">{String(value)}</p><p className="mt-1 truncate text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">{String(label)}</p><motion.span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-cyan-300" animate={{ scaleX: [0.15, 1, 0.15] }} transition={{ duration: 3 + index * 0.35, repeat: Infinity }} /></motion.div>; })}
            </div>

            <div className="mt-5 flex-1 rounded-md border border-white/10 bg-[#050b14] p-4 sm:p-6">
              <div className="flex items-center justify-between"><p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Service topology</p><span className="font-mono text-[9px] text-emerald-300">ALL CHECKS PASSING</span></div>
              <div className="relative mt-8 space-y-4">
                <div className="absolute bottom-8 left-6 top-8 w-px bg-gradient-to-b from-cyan-300 via-lime-300 to-violet-300 opacity-40" />
                {systems.map((system, index) => { const Icon = system.icon; return <motion.div key={system.label} className="relative flex items-center gap-4 rounded-md border border-white/10 bg-white/[0.035] p-4" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 + index * 0.14 }} whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,.065)" }}><span className={`z-10 grid h-12 w-12 shrink-0 place-items-center rounded-md ${system.color} text-slate-950`}><Icon className="h-5 w-5" /></span><div className="min-w-0 flex-1"><p className="text-sm font-black">{system.label}</p><p className="mt-1 text-[10px] text-slate-500">{system.detail}</p></div><CheckCircle2 className="h-4 w-4 text-emerald-300" /></motion.div>; })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
