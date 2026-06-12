import type { Metadata } from "next";
import { ArrowDown, Braces, Radio, ShieldCheck, Workflow } from "lucide-react";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = { title: "Go Projects", description: "Three deployed Go systems by Rehan." };

const overview = [
  { icon: Radio, value: "Realtime", label: "WebSocket communication", color: "bg-cyan-200 text-cyan-800" },
  { icon: ShieldCheck, value: "Secure", label: "JWT protected APIs", color: "bg-lime-200 text-lime-800" },
  { icon: Workflow, value: "Concurrent", label: "Go worker systems", color: "bg-violet-200 text-violet-800" }
];

export default function ProjectsPage() {
  return (
    <main className="overflow-hidden px-3 pb-20 pt-8 sm:px-6 sm:pt-12">
      <header className="relative mx-auto max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.10)]">
        <div className="absolute inset-y-0 right-0 hidden w-[44%] bg-blue-600 lg:block" />
        <div className="absolute right-[8%] top-10 hidden h-72 w-72 rounded-full border border-white/20 lg:block" />
        <div className="absolute right-[13%] top-20 hidden h-52 w-52 rounded-full border border-dashed border-white/30 lg:block" />
        <div className="relative grid min-h-[620px] lg:grid-cols-[1.12fr_0.88fr]">
          <div className="flex min-w-0 flex-col justify-between p-7 sm:p-12 lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700"><Braces className="h-3.5 w-3.5" /> Advanced Go projects</span>
              <h1 className="mt-8 max-w-4xl text-[clamp(4rem,8vw,8rem)] font-black leading-[0.88] text-slate-950">Ideas turned into <span className="text-blue-600">working systems.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">Three backend projects designed around the things Go does best: realtime communication, secure services, and controlled concurrency.</p>
            </div>
            <div className="mt-12 flex items-center gap-3 text-xs font-black uppercase tracking-[0.12em] text-slate-500"><span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-white"><ArrowDown className="h-4 w-4 animate-bounce" /></span> Scroll to explore every build</div>
          </div>

          <div className="relative flex items-center bg-blue-600 p-7 text-white sm:p-12 lg:bg-transparent lg:p-14">
            <div className="w-full">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">Project collection · 2026</p>
              <div className="mt-7 space-y-3">
                {overview.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.value} className="flex items-center gap-4 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-md ${item.color}`}><Icon className="h-5 w-5" /></span>
                      <div className="min-w-0 flex-1"><p className="font-black">{item.value}</p><p className="mt-1 text-xs text-blue-100">{item.label}</p></div>
                      <span className="text-3xl font-black text-white/20">0{index + 1}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/20 pt-6">
                {[["03", "Projects"], ["100%", "Go powered"], ["Live", "Deployed"]].map(([value, label]) => <div key={label}><p className="text-2xl font-black">{value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-blue-100">{label}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl pb-4 pt-20">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Project stories</p><h2 className="mt-3 text-4xl font-black text-slate-950 sm:text-6xl">Explore every system.</h2></div>
          <p className="max-w-md text-sm leading-7 text-slate-600">Open a case study to understand the architecture, launch the working interface, or inspect the source on GitHub.</p>
        </div>
        <ProjectGrid />
      </section>
    </main>
  );
}
