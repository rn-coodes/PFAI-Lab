"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Radio, Sparkles, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { links, owner } from "@/data/projects";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyanGo/80 to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyanGo/30 bg-cyanGo/10 px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm backdrop-blur dark:text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Go-first engineering portfolio
          </div>
          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-black leading-[0.94] text-slate-950 dark:text-white sm:text-7xl lg:text-[5.5rem]">
            Go systems,<br /><span className="text-cyan-600 dark:text-cyan-300">running live.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Rehan&apos;s production-minded Golang portfolio: real-time messaging, secure JWT APIs,
            and concurrent crawling, all backed by a live Railway service.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 bg-slate-950 px-6 py-3.5 text-sm font-black text-white shadow-glow transition hover:-translate-y-1 hover:bg-cyanGo hover:text-slate-950 dark:bg-white dark:text-ink"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={links.mainRepository}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-black text-slate-800 backdrop-blur transition hover:-translate-y-1 hover:border-cyanGo hover:text-cyanGo dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub Profile
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-8 bg-cyanGo/20 blur-3xl" />
          <div className="relative overflow-hidden border border-white/10 bg-slate-950 p-6 text-white shadow-panel">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.18em] text-cyan-200"><TerminalSquare className="h-4 w-4" /> go-runtime.prod</span>
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-300"><Radio className="h-4 w-4 animate-pulse" /> LIVE</span>
            </div>
            <motion.div className="relative py-8" animate={{ y: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity }}>
              <p className="select-none text-[9rem] font-black leading-none text-cyanGo sm:text-[12rem]">Go</p>
              <div className="absolute bottom-8 right-0 border-l-2 border-emerald-300 bg-slate-900/90 px-4 py-3 text-right backdrop-blur">
                <p className="font-mono text-[11px] text-slate-500">owner</p>
                <p className="text-sm font-black">{owner.name} / {owner.studentId}</p>
              </div>
            </motion.div>
            <div className="space-y-3 border-t border-white/10 pt-5 font-mono text-xs">
              {[
                ["GET", "/health", "200 OK"],
                ["WS", "/ws?token=jwt", "CONNECTED"],
                ["POST", "/api/crawler/crawl", "READY"]
              ].map(([method, route, state], index) => (
                <motion.div key={route} className="grid grid-cols-[42px_1fr_auto] gap-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + index * 0.15 }}>
                  <span className="text-cyan-300">{method}</span><span className="text-slate-400">{route}</span><span className="text-emerald-300">{state}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
