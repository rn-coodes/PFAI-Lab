import { ArrowLeft, ArrowUpRight, Check, Github, Play, Terminal } from "lucide-react";
import Link from "next/link";
import { BackendStatus } from "@/components/backend-status";
import { VisualPanel } from "@/components/visual-panel";
import type { Project } from "@/data/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <main className="mx-auto max-w-[1480px] border-x border-black/15 dark:border-white/15">
      <div className="grid border-b border-black/20 dark:border-white/20 lg:grid-cols-[1fr_0.75fr]">
        <section className="border-b border-black/15 p-6 dark:border-white/15 sm:p-12 lg:border-b-0 lg:border-r">
          <Link href="/work" className="inline-flex items-center gap-2 text-xs font-black uppercase"><ArrowLeft className="h-4 w-4" /> Work index</Link>
          <div className="mt-12 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center bg-[#07120f] text-cyan-300 dark:bg-cyan-300 dark:text-[#07120f]"><Icon className="h-7 w-7" /></span><p className="dossier-label text-cyan-700 dark:text-cyan-300">{project.eyebrow}</p></div>
          <h1 className="mt-8 max-w-4xl text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.88] tracking-tight">{project.title}</h1>
          <p className="mt-8 max-w-2xl border-l-4 border-cyan-500 pl-5 text-base leading-8 text-slate-600 dark:text-slate-300">{project.longDescription}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={project.demo} className="inline-flex items-center gap-3 bg-cyan-300 px-5 py-4 text-xs font-black uppercase text-[#07120f]">Run live system <Play className="h-4 w-4" /></Link>
            <Link href={project.github} target="_blank" className="inline-flex items-center gap-3 border border-black/20 px-5 py-4 text-xs font-black uppercase dark:border-white/20">Review source <Github className="h-4 w-4" /></Link>
          </div>
        </section>
        <section className="flex flex-col bg-[#07120f] p-5 text-white sm:p-8">
          <p className="dossier-label text-cyan-300">System preview</p>
          <div className="mt-5 flex-1"><VisualPanel kind={project.screenshots[0].kind} title={project.title} /></div>
          <div className="mt-5"><BackendStatus /></div>
        </section>
      </div>

      <section className="grid border-b border-black/20 dark:border-white/20 lg:grid-cols-[1fr_1fr]">
        <div className="border-b border-black/15 p-6 dark:border-white/15 sm:p-10 lg:border-b-0 lg:border-r"><p className="dossier-label text-cyan-700 dark:text-cyan-300">Architecture record</p><h2 className="mt-5 text-3xl font-black">How it works</h2><p className="mt-5 text-sm leading-8 text-slate-600 dark:text-slate-300">{project.architecture}</p></div>
        <div className="p-6 sm:p-10"><p className="dossier-label text-cyan-700 dark:text-cyan-300">Technology manifest</p><div className="mt-6 border-t border-black/20 dark:border-white/20">{project.technologies.map((tech, index) => <div key={tech} className="grid grid-cols-[50px_1fr_auto] items-center border-b border-black/15 py-3 dark:border-white/15"><span className="font-mono text-[9px] text-slate-500">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-black">{tech}</span><Terminal className="h-4 w-4 text-cyan-600 dark:text-cyan-300" /></div>)}</div></div>
      </section>

      <section className="border-b border-black/20 p-6 dark:border-white/20 sm:p-10">
        <p className="dossier-label text-cyan-700 dark:text-cyan-300">Feature verification</p>
        <div className="mt-6 grid gap-px bg-black/15 dark:bg-white/15 sm:grid-cols-2">
          {project.features.map((feature, index) => <div key={feature} className="flex items-center gap-4 bg-[#f1f4ef] p-5 dark:bg-[#07100e]"><span className="font-mono text-[9px] text-slate-500">{String(index + 1).padStart(2, "0")}</span><Check className="h-4 w-4 text-emerald-700 dark:text-emerald-300" /><span className="text-sm font-bold">{feature}</span></div>)}
        </div>
      </section>

      <section className="p-6 sm:p-10"><div className="flex items-end justify-between"><div><p className="dossier-label text-cyan-700 dark:text-cyan-300">Visual records</p><h2 className="mt-3 text-3xl font-black">System states</h2></div><Link href={project.demo} className="hidden items-center gap-2 text-xs font-black uppercase sm:flex">Open live interface <ArrowUpRight className="h-4 w-4" /></Link></div><div className="mt-7 grid gap-5 lg:grid-cols-2">{project.screenshots.map((shot) => <div key={shot.title}><VisualPanel kind={shot.kind} title={shot.title} /><p className="mt-3 font-mono text-[10px] text-slate-500">{shot.caption}</p></div>)}</div></section>
    </main>
  );
}
