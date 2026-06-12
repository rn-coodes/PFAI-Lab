"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Github, Radio, Sparkles } from "lucide-react";
import Link from "next/link";
import { links } from "@/data/projects";

const services = [
  { label: "WebSocket hub", value: "Live", color: "bg-cyan-400" },
  { label: "JWT security", value: "Verified", color: "bg-violet-400" },
  { label: "Crawler workers", value: "Ready", color: "bg-lime-400" }
];

export function Hero() {
  return (
    <section className="overflow-hidden px-3 pb-12 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto grid min-h-[720px] max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.10)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0 flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700"><Radio className="h-3.5 w-3.5 animate-pulse" /> Go backend systems online</span>
            <h1 className="mt-8 max-w-3xl text-balance text-[clamp(3.8rem,7vw,7.6rem)] font-black leading-[0.9] text-slate-950">
              Building fast,<br /><span className="text-blue-600">reliable</span> systems.
            </h1>
            <p className="mt-7 max-w-xl break-words text-base leading-8 text-slate-600 sm:text-lg">I&apos;m Rehan, a Go-focused backend engineer creating realtime products, secure APIs, and concurrent services that are built to perform.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/work" className="flex h-13 items-center justify-center gap-3 rounded-md bg-blue-600 px-6 py-4 text-sm font-black text-white transition hover:bg-slate-950">Explore projects <ArrowRight className="h-4 w-4" /></Link>
              <Link href={links.mainRepository} target="_blank" className="flex h-13 items-center justify-center gap-3 rounded-md border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-700 transition hover:border-slate-950 hover:text-slate-950"><Github className="h-4 w-4" /> View source</Link>
            </div>
          </motion.div>
          <div className="mt-14 grid min-w-0 grid-cols-3 gap-3 border-t border-slate-200 pt-6 sm:gap-4">
            {[["03", "Live products"], ["Go", "Core language"], ["24/7", "Backend online"]].map(([value, label]) => <div key={label} className="min-w-0"><p className="text-2xl font-black text-slate-950 sm:text-3xl">{value}</p><p className="mt-1 break-words text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-[10px] sm:tracking-[0.12em]">{label}</p></div>)}
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden bg-[#eef5ff] p-5 sm:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <motion.div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-cyan-300/50 blur-3xl" animate={{ x: [0, -45, 0], y: [0, 35, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -bottom-16 left-10 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <div className="relative flex h-full min-h-[540px] items-center justify-center">
            <motion.div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(37,99,235,0.16)]" initial={{ opacity: 0, rotate: 2, y: 30 }} animate={{ opacity: 1, rotate: -2, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4"><div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div><span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">System overview</span></div>
              <div className="mt-5 rounded-md bg-slate-950 p-5 text-white">
                <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-md bg-blue-500 text-lg font-black">Go</span><div><p className="font-black">Advanced Go Projects</p><p className="text-xs text-slate-400">Production environment</p></div></div>
                <div className="mt-6 space-y-3">
                  {services.map((service, index) => <motion.div key={service.label} className="flex items-center justify-between rounded-md bg-white/[0.07] p-4" animate={{ x: [0, index % 2 ? 4 : -4, 0] }} transition={{ duration: 3 + index, repeat: Infinity }}><span className="flex items-center gap-3 text-sm font-bold"><span className={`h-2.5 w-2.5 rounded-full ${service.color}`} />{service.label}</span><span className="flex items-center gap-1.5 text-xs font-bold text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" />{service.value}</span></motion.div>)}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-md bg-lime-200 p-4"><Sparkles className="h-5 w-5" /><p className="mt-4 text-2xl font-black">10+</p><p className="text-xs font-bold text-slate-600">Backend patterns</p></div><div className="rounded-md bg-violet-200 p-4"><p className="text-xs font-black uppercase tracking-[0.14em] text-violet-700">Response</p><p className="mt-4 text-2xl font-black">Fast</p><p className="text-xs font-bold text-slate-600">Designed for scale</p></div></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
