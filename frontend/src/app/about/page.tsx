import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { owner } from "@/data/projects";

export const metadata: Metadata = { title: "Profile: Rehan", description: "Rehan's Go engineering profile." };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1480px] border-x border-black/15 dark:border-white/15">
      <section className="grid border-b border-black/20 dark:border-white/20 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="border-b border-black/15 bg-[#07120f] p-8 text-white dark:border-white/15 sm:p-12 lg:border-b-0 lg:border-r">
          <p className="dossier-label text-cyan-300">Identity / Engineer</p>
          <div className="mt-12 grid aspect-square max-w-md place-items-center border border-white/20 text-[14rem] font-black leading-none text-cyan-300">R</div>
          <div className="mt-8 grid grid-cols-2 gap-px bg-white/15">{[["ID", owner.studentId], ["Focus", "Backend"], ["Language", "Go"], ["Status", "Available"]].map(([label, value]) => <div key={label} className="bg-[#07120f] p-4"><p className="dossier-label text-slate-500">{label}</p><p className="mt-2 text-sm font-black">{value}</p></div>)}</div>
        </div>
        <div className="p-8 sm:p-12 lg:p-16">
          <p className="dossier-label text-cyan-700 dark:text-cyan-300">Profile record / Rehan</p>
          <h1 className="mt-7 text-6xl font-black leading-none sm:text-8xl">BACKEND<br />ENGINEER.</h1>
          <p className="mt-9 max-w-2xl border-l-4 border-cyan-500 pl-5 text-lg leading-8 text-slate-600 dark:text-slate-300">A Go-focused student engineer at the National University of Technology, building systems around realtime communication, secure identity, and concurrency.</p>
          <div className="mt-12 border-t border-black/20 dark:border-white/20">
            {owner.skills.map((skill, index) => <div key={skill} className="grid grid-cols-[50px_1fr_auto] items-center border-b border-black/15 py-4 dark:border-white/15"><span className="font-mono text-[10px] text-slate-500">{String(index + 1).padStart(2, "0")}</span><span className="font-black">{skill}</span><Check className="h-4 w-4 text-cyan-600 dark:text-cyan-300" /></div>)}
          </div>
          <Link href="/connect" className="mt-10 inline-flex items-center gap-3 bg-[#07120f] px-6 py-4 text-xs font-black uppercase text-white dark:bg-cyan-300 dark:text-[#07120f]">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
