"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Github, Radio } from "lucide-react";
import Link from "next/link";
import { links, owner } from "@/data/projects";

const runtime = [
  ["01", "WebSocket hub", "CONNECTED"],
  ["02", "JWT middleware", "VERIFIED"],
  ["03", "Crawler workers", "READY"]
];

export function Hero() {
  return (
    <section className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
      <div className="grid min-h-[calc(100vh-65px)] border-x border-black/15 dark:border-white/15 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-between border-b border-black/15 p-6 dark:border-white/15 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex flex-wrap items-center gap-4">
              <span className="dossier-label border border-black/20 px-3 py-2 dark:border-white/20">Portfolio dossier / 2026</span>
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300"><Radio className="h-4 w-4 animate-pulse" /> Railway backend online</span>
            </div>
            <h1 className="mt-10 max-w-5xl text-balance text-[clamp(4rem,9vw,9.5rem)] font-black leading-[0.82] tracking-tight">
              GO<br /><span className="text-cyan-600 dark:text-cyan-300">SYSTEMS</span><br />BUILDER
            </h1>
            <p className="mt-9 max-w-xl border-l-4 border-[#07120f] pl-5 text-base font-medium leading-7 text-slate-600 dark:border-cyan-300 dark:text-slate-300">
              Rehan builds backend systems where concurrency, security, and realtime communication are visible, testable, and live.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-px bg-black/15 dark:bg-white/15 sm:grid-cols-3">
            {[["03", "Deployed projects"], ["10+", "Backend patterns"], ["Go", "Primary language"]].map(([value, label]) => (
              <div key={label} className="bg-[#f1f4ef] p-5 dark:bg-[#07100e]"><p className="text-3xl font-black">{value}</p><p className="dossier-label mt-2 text-slate-500">{label}</p></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-[#07120f] text-white">
          <div className="flex items-center justify-between border-b border-white/15 p-5">
            <p className="dossier-label text-cyan-300">Live runtime manifest</p>
            <span className="font-mono text-[10px] text-slate-500">F24607089</span>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-8">
            <motion.div className="absolute h-80 w-80 rounded-full border border-cyan-300/30" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-cyan-300" />
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 bg-emerald-300" />
            </motion.div>
            <motion.div className="absolute h-56 w-56 rounded-full border border-dashed border-white/20" animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
            <div className="relative text-center">
              <p className="text-[8rem] font-black leading-none text-cyan-300 sm:text-[11rem]">Go</p>
              <p className="dossier-label mt-3 text-slate-400">{owner.name} / {owner.university}</p>
            </div>
          </div>
          <div className="border-t border-white/15">
            {runtime.map(([number, name, state]) => <div key={name} className="grid grid-cols-[42px_1fr_auto] items-center border-b border-white/10 px-5 py-4 font-mono text-[11px] last:border-0"><span className="text-slate-600">{number}</span><span>{name}</span><span className="text-emerald-300">{state}</span></div>)}
          </div>
          <div className="grid grid-cols-2 border-t border-white/15">
            <Link href="/work" className="flex items-center justify-between bg-cyan-300 px-5 py-5 text-xs font-black uppercase text-[#07120f] transition hover:bg-white">Review work <ArrowDownRight className="h-4 w-4" /></Link>
            <Link href={links.mainRepository} target="_blank" className="flex items-center justify-between border-l border-white/15 px-5 py-5 text-xs font-black uppercase transition hover:bg-white/10">Source code <Github className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
