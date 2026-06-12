import type { Metadata } from "next";
import { ArrowRight, Check, GraduationCap, IdCard } from "lucide-react";
import Link from "next/link";
import { owner } from "@/data/projects";

export const metadata: Metadata = { title: "About Rehan", description: "Rehan's Go engineering profile." };

export default function AboutPage() {
  return (
    <main className="px-3 pb-20 pt-12 sm:px-6 sm:pt-20">
      <section className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative overflow-hidden bg-blue-600 p-8 text-white sm:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
          <p className="relative text-xs font-black uppercase tracking-[0.18em] text-blue-100">About the engineer</p><div className="relative mt-12 grid aspect-square max-w-sm place-items-center rounded-lg bg-white/10 text-[12rem] font-black text-white backdrop-blur">R</div>
          <div className="relative mt-8 space-y-3"><div className="flex items-center gap-3 rounded-md bg-white/10 p-4"><IdCard className="h-5 w-5" /><span className="text-sm font-bold">{owner.studentId}</span></div><div className="flex items-start gap-3 rounded-md bg-white/10 p-4"><GraduationCap className="h-5 w-5 shrink-0" /><span className="text-sm font-bold">{owner.university}</span></div></div>
        </div>
        <div className="p-8 sm:p-12 lg:p-16"><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Hello, I&apos;m Rehan</p><h1 className="mt-5 text-5xl font-black leading-tight text-slate-950 sm:text-7xl">I build backend systems that feel effortless.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">A Go-focused student engineer building products around realtime communication, secure identity, and concurrency. I care about reliable systems, clean interfaces, and code that is easy to understand.</p><div className="mt-10 grid gap-3 sm:grid-cols-2">{owner.skills.map((skill) => <div key={skill} className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-700"><Check className="h-4 w-4 text-emerald-500" />{skill}</div>)}</div><Link href="/connect" className="mt-10 inline-flex items-center gap-3 rounded-md bg-slate-950 px-6 py-4 text-xs font-black uppercase text-white transition hover:bg-blue-600">Start a conversation <ArrowRight className="h-4 w-4" /></Link></div>
      </section>
    </main>
  );
}
