import { ArrowLeft, ArrowRight, Check, Github, Play, Terminal } from "lucide-react";
import Link from "next/link";
import { BackendStatus } from "@/components/backend-status";
import { VisualPanel } from "@/components/visual-panel";
import type { Project } from "@/data/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <main className="px-3 pb-20 pt-10 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <Link href="/work" className="inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-blue-600"><ArrowLeft className="h-4 w-4" /> All projects</Link>
        <section className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-7 sm:p-12">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-blue-100 text-blue-700"><Icon className="h-5 w-5" /></span>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-blue-600">{project.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.9] text-slate-950">{project.title}</h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600">{project.longDescription}</p>
              <div className="mt-9 flex flex-wrap gap-3"><Link href={project.demo} className="inline-flex items-center gap-3 rounded-md bg-blue-600 px-5 py-4 text-xs font-black uppercase text-white transition hover:bg-slate-950">Launch demo <Play className="h-4 w-4" /></Link><Link href={project.github} target="_blank" className="inline-flex items-center gap-3 rounded-md border border-slate-200 px-5 py-4 text-xs font-black uppercase text-slate-700 transition hover:border-slate-950"><Github className="h-4 w-4" /> Source code</Link></div>
            </div>
            <div className="bg-blue-50 p-5 sm:p-8"><div className="flex h-full min-h-[520px] items-center"><VisualPanel kind={project.screenshots[0].kind} title={project.title} /></div></div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Architecture</p><h2 className="mt-4 text-3xl font-black text-slate-950">How the system works</h2><p className="mt-5 text-sm leading-8 text-slate-600">{project.architecture}</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{project.features.map((feature) => <div key={feature} className="flex items-start gap-3 rounded-md bg-slate-50 p-4 text-sm font-bold text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{feature}</div>)}</div></div>
          <div className="space-y-6"><div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm"><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Technology stack</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-600"><Terminal className="h-3.5 w-3.5 text-blue-600" />{tech}</span>)}</div></div><BackendStatus /></div>
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Interface gallery</p><h2 className="mt-3 text-3xl font-black text-slate-950">Explore the system</h2></div><Link href={project.demo} className="flex items-center gap-2 text-sm font-black text-blue-600">Open live interface <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-7 grid gap-5 lg:grid-cols-2">{project.screenshots.map((shot) => <div key={shot.title}><VisualPanel kind={shot.kind} title={shot.title} /><p className="mt-3 text-xs font-bold text-slate-500">{shot.caption}</p></div>)}</div></section>
      </div>
    </main>
  );
}
