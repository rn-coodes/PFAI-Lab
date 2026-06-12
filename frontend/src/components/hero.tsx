"use client";

import { motion } from "framer-motion";
import { ArrowRight, Braces, Github, Sparkles } from "lucide-react";
import Link from "next/link";
import { architectureHighlights, links, owner } from "@/data/projects";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyanGo/80 to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyanGo/30 bg-cyanGo/10 px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm backdrop-blur dark:text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Go-first engineering portfolio
          </div>
          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-black leading-[0.96] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            Advanced Go Projects Showcase
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A premium SaaS-style command center for three Golang systems: real-time chat,
            secure JWT APIs, and a concurrent web crawler.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-1 hover:bg-cyanGo dark:bg-white dark:text-ink"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={links.mainRepository}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-black text-slate-800 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-cyanGo hover:text-cyanGo dark:border-white/10 dark:bg-white/10 dark:text-white"
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
          <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-br from-cyanGo/30 via-emerald-400/20 to-amber-300/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.08]">
            <div className="rounded-[1.45rem] border border-slate-200/70 bg-slate-950 p-5 text-white dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Go Ops Console</p>
                  <p className="mt-1 text-sm text-slate-400">{owner.name} | {owner.studentId}</p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyanGo text-slate-950">
                  <Braces className="h-6 w-6" />
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {architectureHighlights.slice(0, 6).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 + index * 0.05 }}
                    >
                      <Icon className="h-5 w-5 text-cyan-200" />
                      <p className="mt-3 text-sm font-bold">{item.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-cyanGo/20 bg-cyanGo/10 p-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
                  <span>Runtime</span>
                  <span>Healthy</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-cyanGo to-emerald-300"
                    initial={{ width: "12%" }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
