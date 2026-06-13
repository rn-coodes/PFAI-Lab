"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Maximize2, RotateCcw } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

type DemoShellProps = PropsWithChildren<{ eyebrow: string; title: string; description: string; repository: string }>;

export function DemoShell({ eyebrow, title, description, repository, children }: DemoShellProps) {
  const [latency, setLatency] = useState(18);
  const [runs, setRuns] = useState(128);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setLatency(Math.floor(Math.random() * 12) + 14);
      setRuns((value) => value + 1);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="overflow-x-hidden px-3 pb-12 pt-6 sm:px-6">
      <div className="mx-auto min-w-0 max-w-[1480px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_28px_90px_rgba(15,23,42,.12)]">
        <header className="border-b border-slate-200 bg-white">
          <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <Link href="/work" className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:border-blue-500 hover:text-blue-600" aria-label="Back to projects"><ArrowLeft className="h-4 w-4" /></Link>
              <div className="min-w-0"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">{eyebrow}</p><h1 className="truncate text-lg font-black text-slate-950 sm:text-xl">{title}</h1><p className="hidden truncate text-xs text-slate-500 sm:block">{description}</p></div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => window.location.reload()} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:text-blue-600" aria-label="Restart demo"><RotateCcw className="h-4 w-4" /></button>
              <button type="button" onClick={() => document.documentElement.requestFullscreen?.()} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:text-blue-600" aria-label="Fullscreen"><Maximize2 className="h-4 w-4" /></button>
              <Link href={repository} target="_blank" className="flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-xs font-black uppercase text-white transition hover:bg-blue-600"><Github className="h-4 w-4" /> Source <ExternalLink className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-px bg-slate-200">
            {[["Operational", "System status"], [`${latency}ms`, "Live latency"], [String(runs), "Demo sessions"]].map(([value, label], index) => <div key={label} className="relative min-w-0 overflow-hidden bg-slate-50 px-3 py-3 sm:px-4"><motion.span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-emerald-400" animate={{ scaleX: [0.2, 1, 0.2] }} transition={{ duration: 2.4 + index * 0.4, repeat: Infinity }} /><p className="truncate text-xs font-black text-slate-950">{value}</p><p className="mt-0.5 truncate text-[8px] font-bold uppercase tracking-[0.06em] text-slate-400 sm:text-[9px] sm:tracking-[0.1em]">{label}</p></div>)}
          </div>
        </header>
        <div className="bg-slate-100 p-2 sm:p-4">{children}</div>
      </div>
    </main>
  );
}
