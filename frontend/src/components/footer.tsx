"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import Link from "next/link";
import { MagneticLink } from "@/components/magnetic-link";

export function Footer() {
  return (
    <footer className="px-3 pb-4 pt-16 sm:px-6">
      <motion.div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg bg-slate-950 text-white" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <div className="pointer-events-none absolute right-8 top-1/2 hidden h-72 w-72 -translate-y-1/2 place-items-center md:grid">
          <motion.div className="absolute h-64 w-64 rounded-full border border-cyan-300/20" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}><span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300" /></motion.div>
          <motion.div className="absolute h-44 w-44 rounded-full border border-dashed border-white/20" animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} />
          <motion.span className="text-7xl font-black text-cyan-300" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity }}>Go</motion.span>
        </div>
        <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:pr-80">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-lime-300">Available for collaboration</p><h2 className="mt-4 max-w-3xl text-3xl font-black sm:text-5xl">Have a backend problem worth solving?</h2></div>
          <div className="flex gap-3">
            <motion.div whileHover={{ y: -5, rotate: -4 }}><Link href="https://github.com/rn-coodes" target="_blank" className="grid h-12 w-12 place-items-center rounded-md border border-white/20 transition hover:bg-white hover:text-slate-950" aria-label="GitHub"><Github className="h-5 w-5" /></Link></motion.div>
            <MagneticLink href="mailto:rehanmalik42011@gmail.com" className="premium-button flex h-12 items-center gap-3 rounded-md bg-lime-300 px-5 text-xs font-black uppercase text-slate-950 transition hover:bg-white"><Mail className="h-4 w-4" /> Let&apos;s talk <ArrowUpRight className="h-4 w-4" /></MagneticLink>
          </div>
        </div>
        <div className="relative flex flex-wrap justify-between gap-3 border-t border-white/10 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400"><span>Rehan · F24607089 · National University of Technology</span><span>Built with Go + Next.js</span></div>
      </motion.div>
    </footer>
  );
}
