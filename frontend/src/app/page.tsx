"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Cpu, GraduationCap, RadioTower } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { BackendStatus } from "@/components/backend-status";
import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { RevealHeading } from "@/components/reveal-heading";
import { owner } from "@/data/projects";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="border-y border-slate-200/80 bg-white/55 px-3 py-20 backdrop-blur-sm sm:px-6">
        <AnimatedSection className="mx-auto max-w-7xl">
          <motion.div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Capabilities</p><RevealHeading className="mt-3 max-w-2xl text-4xl font-black leading-tight text-slate-950 sm:text-6xl">Backend engineering with visible results.</RevealHeading></div>
            <p className="max-w-md text-sm leading-7 text-slate-600">Each project focuses on a practical backend challenge and ships with a working interface, source code, and deployed service.</p>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[[RadioTower, "Realtime products", "Live WebSocket communication with resilient connection handling.", "bg-cyan-200"], [CheckCircle2, "Secure systems", "JWT authentication and predictable protected API boundaries.", "bg-lime-200"], [Cpu, "Concurrent software", "Worker pools, channels, and controlled parallel execution.", "bg-violet-200"]].map(([Icon, title, copy, color], index) => {
              const ItemIcon = Icon as typeof Cpu;
              return <motion.div key={String(title)} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.12 }} whileHover={{ y: -8, rotate: index === 1 ? 0.6 : -0.6, boxShadow: "0 24px 60px rgba(15,23,42,0.12)" }}><motion.span className={`grid h-12 w-12 place-items-center rounded-md ${color}`} whileHover={{ rotate: 12, scale: 1.08 }}><ItemIcon className="h-5 w-5" /></motion.span><motion.span className={`absolute -right-12 -top-12 h-32 w-32 rounded-full ${color} opacity-0 blur-2xl transition group-hover:opacity-70`} /><h3 className="relative mt-8 text-xl font-black text-slate-950">{String(title)}</h3><p className="relative mt-3 text-sm leading-7 text-slate-600">{String(copy)}</p></motion.div>;
            })}
          </div>
        </AnimatedSection>
      </section>

      <section className="px-3 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end" initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}><div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Selected projects</p><RevealHeading className="mt-3 text-4xl font-black text-slate-950 sm:text-6xl">Built in Go. Ready to run.</RevealHeading></div><Link href="/work" className="group flex items-center gap-2 text-sm font-black text-blue-600">View all work <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link></motion.div>
          <ProjectGrid />
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white/45 px-3 py-20 backdrop-blur-sm sm:px-6">
        <AnimatedSection className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-blue-600 p-8 text-white sm:p-12"><motion.div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/20" animate={{ rotate: 360, scale: [1, 1.08, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} /><motion.div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-dashed border-white/30" animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} /><div className="relative"><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">About the engineer</p><motion.h2 className="mt-5 text-5xl font-black" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>{owner.name}</motion.h2><p className="mt-3 text-blue-100">{owner.role}</p><div className="mt-10 flex items-start gap-3 border-t border-white/20 pt-6"><GraduationCap className="h-5 w-5 shrink-0" /><p className="text-sm leading-6">{owner.university}<br />Student ID: {owner.studentId}</p></div><Link href="/profile" className="group mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-xs font-black uppercase text-blue-700 transition hover:bg-lime-300">Meet Rehan <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link></div></div>
          <motion.div className="p-8 sm:p-12" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}><div className="flex items-center gap-3"><motion.span animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}><Code2 className="h-5 w-5 text-blue-600" /></motion.span><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Live infrastructure</p></div><div className="mt-6"><BackendStatus /></div></motion.div>
        </AnimatedSection>
      </section>
    </main>
  );
}
