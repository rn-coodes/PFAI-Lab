"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cable, Github, Network, Radio, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { links } from "@/data/projects";

const services = [
  { label: "WebSockets", detail: "Realtime hub", icon: Cable, position: "left-0 top-[18%]", color: "bg-cyan-300 text-cyan-950" },
  { label: "JWT Auth", detail: "Secure access", icon: ShieldCheck, position: "right-0 top-[28%]", color: "bg-lime-300 text-lime-950" },
  { label: "Concurrency", detail: "Worker pools", icon: Network, position: "bottom-[4%] left-[16%]", color: "bg-violet-300 text-violet-950" }
];

export function Hero() {
  return (
    <section className="overflow-hidden px-3 pb-12 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto grid min-h-[720px] max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.10)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0 flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700"><Radio className="h-3.5 w-3.5 animate-pulse" /> Go backend systems online</span>
            <h1 className="mt-8 max-w-3xl text-balance text-[clamp(3.8rem,7vw,7.6rem)] font-black leading-[0.9] text-slate-950">
              Building fast,<br /><motion.span className="inline-block text-blue-600" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>reliable</motion.span> systems.
            </h1>
            <p className="mt-7 max-w-xl break-words text-base leading-8 text-slate-600 sm:text-lg">I&apos;m Rehan, a Go-focused backend engineer creating realtime products, secure APIs, and concurrent services that are built to perform.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/work" className="flex h-13 items-center justify-center gap-3 rounded-md bg-blue-600 px-6 py-4 text-sm font-black text-white transition hover:bg-slate-950">Explore projects <ArrowRight className="h-4 w-4" /></Link>
              <Link href={links.mainRepository} target="_blank" className="flex h-13 items-center justify-center gap-3 rounded-md border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-700 transition hover:border-slate-950 hover:text-slate-950"><Github className="h-4 w-4" /> View source</Link>
            </div>
          </motion.div>
          <div className="mt-14 grid min-w-0 grid-cols-3 gap-3 border-t border-slate-200 pt-6 sm:gap-4">
            {[["03", "Live products"], ["Go", "Core language"], ["24/7", "Backend online"]].map(([value, label], index) => <motion.div key={label} className="min-w-0" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + index * 0.12 }} whileHover={{ y: -4 }}><p className="text-2xl font-black text-slate-950 sm:text-3xl">{value}</p><p className="mt-1 break-words text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-[10px] sm:tracking-[0.12em]">{label}</p></motion.div>)}
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden bg-[#eef5ff] p-4 sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <motion.div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-cyan-300/50 blur-3xl" animate={{ x: [0, -45, 0], y: [0, 35, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -bottom-16 left-10 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <div className="relative flex h-full min-h-[600px] items-center justify-center">
            <div className="relative h-[500px] w-full max-w-[520px]">
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <motion.div className="h-[340px] w-[340px] rounded-full border border-blue-300/70 sm:h-[430px] sm:w-[430px]" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 shadow-[0_0_22px_rgba(37,99,235,.9)]" />
                  <span className="absolute bottom-[12%] right-[8%] h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_18px_rgba(139,92,246,.8)]" />
                </motion.div>
              </div>
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <motion.div className="h-[270px] w-[270px] rounded-full border-2 border-dashed border-blue-300/60 sm:h-[330px] sm:w-[330px]" animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} />
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <motion.div className="relative h-[210px] w-[210px] rounded-full bg-slate-950 shadow-[0_35px_80px_rgba(37,99,235,.32)] sm:h-[260px] sm:w-[260px]" animate={{ y: [0, -10, 0], scale: [1, 1.035, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <motion.div className="absolute inset-3 rounded-full border border-white/15" animate={{ rotate: 360 }} transition={{ duration: 13, repeat: Infinity, ease: "linear" }}>
                    <span className="absolute right-[8%] top-[18%] h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(190,242,100,.9)]" />
                  </motion.div>
                  <div className="absolute inset-0 grid place-items-center text-center text-white">
                    <div><motion.p className="text-[5.5rem] font-black leading-none text-cyan-300 sm:text-[7.5rem]" animate={{ textShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 28px rgba(34,211,238,.45)", "0 0 0 rgba(34,211,238,0)"] }} transition={{ duration: 3, repeat: Infinity }}>Go</motion.p><p className="mt-2 text-[9px] font-black uppercase tracking-[0.22em] text-slate-400">Systems online</p></div>
                  </div>
                </motion.div>
              </div>

              {services.map((service, index) => {
                const Icon = service.icon;
                return <motion.div key={service.label} className={`absolute ${service.position} z-10 flex items-center gap-3 rounded-lg border border-white/80 bg-white/90 p-3 shadow-[0_16px_40px_rgba(15,23,42,.14)] backdrop-blur`} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1, y: [0, index % 2 ? -8 : 8, 0] }} transition={{ opacity: { delay: 0.55 + index * 0.15 }, scale: { delay: 0.55 + index * 0.15 }, y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" } }} whileHover={{ scale: 1.08, y: -5 }}><span className={`grid h-10 w-10 place-items-center rounded-md ${service.color}`}><Icon className="h-4 w-4" /></span><span className="hidden sm:block"><span className="block text-xs font-black text-slate-950">{service.label}</span><span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">{service.detail}</span></span></motion.div>;
              })}

              <motion.div className="absolute bottom-0 right-[7%] z-10 rounded-lg border border-white/80 bg-white/90 p-4 shadow-[0_16px_40px_rgba(15,23,42,.14)] backdrop-blur" animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}><div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-blue-600" /><p className="text-[9px] font-black uppercase tracking-[0.12em] text-blue-600">Live runtime</p></div><p className="mt-2 text-xl font-black text-slate-950">3 systems</p><p className="text-[10px] font-bold text-emerald-600">All operational</p></motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
