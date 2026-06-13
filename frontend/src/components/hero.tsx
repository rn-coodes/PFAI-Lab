"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cable, CheckCircle2, Github, Network, Radio, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { links } from "@/data/projects";
import { MagneticLink } from "@/components/magnetic-link";
import { formatUptime, useTelemetry } from "@/lib/telemetry";

const systems = [
  { label: "WebSockets", icon: Cable, color: "bg-cyan-200 text-cyan-800", position: "left-0 top-[20%]" },
  { label: "JWT Security", icon: ShieldCheck, color: "bg-lime-200 text-lime-800", position: "right-0 top-[30%]" },
  { label: "Concurrency", icon: Network, color: "bg-violet-200 text-violet-800", position: "bottom-[8%] left-[10%]" }
];

export function Hero() {
  const { telemetry, latency } = useTelemetry();

  return (
    <section className="overflow-hidden px-3 pb-16 pt-6 sm:px-6 sm:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-w-0 items-center gap-12 py-8 lg:min-h-[700px] lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
          <div className="min-w-0">
            <motion.div className="flex flex-wrap items-center gap-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700"><Radio className="h-3.5 w-3.5 animate-pulse" /> Backend online</span>
              <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">Rehan · Go Backend Engineer</span>
            </motion.div>

            <motion.h1 className="mt-8 max-w-3xl text-[3.8rem] font-black leading-[0.93] tracking-[-0.04em] text-slate-950 sm:text-[5.2rem] lg:text-[6.4rem]" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
              Advanced Go<br /><span className="text-blue-600">Projects.</span>
            </motion.h1>
            <motion.p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>Three working backend systems built around realtime communication, secure identity, and controlled concurrency.</motion.p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticLink href="/work" className="premium-button flex h-14 items-center justify-center gap-3 rounded-md bg-blue-600 px-7 text-sm font-black text-white transition hover:bg-slate-950">Explore projects <ArrowRight className="h-4 w-4" /></MagneticLink>
              <Link href={links.mainRepository} target="_blank" className="flex h-14 items-center justify-center gap-3 rounded-md border border-slate-200 bg-white px-7 text-sm font-black text-slate-700 shadow-sm transition hover:border-slate-950"><Github className="h-4 w-4" /> View source</Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 shadow-sm">
              {[["03", "Live projects"], [latency === null ? "--" : `${latency}ms`, "Latency"], [formatUptime(telemetry?.uptimeSeconds), "Uptime"]].map(([value, label], index) => <motion.div key={label} className="min-w-0 bg-white p-4 sm:p-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.1 }}><p className="truncate text-xl font-black text-slate-950 sm:text-2xl">{value}</p><p className="mt-1 truncate text-[8px] font-black uppercase tracking-[0.08em] text-slate-400 sm:text-[9px]">{label}</p></motion.div>)}
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="relative mx-auto aspect-square max-w-[620px]">
              <div className="absolute inset-[4%] rounded-full border border-slate-200 bg-white shadow-[0_35px_100px_rgba(15,23,42,.12)]" />
              <motion.div className="absolute inset-[11%] rounded-full border border-dashed border-blue-300" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,.65)]" />
              </motion.div>
              <motion.div className="absolute inset-[20%] rounded-full border border-cyan-300/70" animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
                <span className="absolute bottom-[12%] right-[4%] h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </motion.div>
              <div className="absolute inset-0 grid place-items-center">
                <motion.div className="relative grid h-[48%] w-[48%] place-items-center rounded-full bg-slate-950 text-center shadow-[0_35px_80px_rgba(37,99,235,.25)]" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <motion.span className="absolute inset-0 rounded-full border border-blue-400/30" animate={{ scale: [1, 1.35], opacity: [0.7, 0] }} transition={{ duration: 2.8, repeat: Infinity }} />
                  <div><p className="text-[5rem] font-black leading-none text-cyan-300 sm:text-[7rem]">Go</p><p className="mt-2 text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">Systems online</p></div>
                </motion.div>
              </div>

              {systems.map((system, index) => { const Icon = system.icon; return <motion.div key={system.label} className={`absolute ${system.position} z-10 flex items-center gap-3 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-[0_16px_45px_rgba(15,23,42,.12)] backdrop-blur`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, index % 2 ? -7 : 7, 0] }} transition={{ opacity: { delay: 0.45 + index * 0.12 }, scale: { delay: 0.45 + index * 0.12 }, y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" } }} whileHover={{ scale: 1.06 }}><span className={`grid h-10 w-10 place-items-center rounded-md ${system.color}`}><Icon className="h-4 w-4" /></span><span className="hidden text-xs font-black text-slate-800 sm:block">{system.label}</span></motion.div>; })}

              <motion.div className="absolute bottom-[3%] right-[4%] z-10 w-48 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.12)]" animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity }}><div className="flex items-center justify-between"><p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">Live runtime</p><CheckCircle2 className="h-4 w-4 text-emerald-500" /></div><p className="mt-3 text-xl font-black text-slate-950">{telemetry?.goVersion?.replace("go", "Go ") ?? "Checking"}</p><p className="mt-1 text-[10px] font-bold text-slate-500">{telemetry ? `${telemetry.goroutines} goroutines active` : "Connecting to Railway"}</p></motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
