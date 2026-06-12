import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = { title: "Go Projects", description: "Three deployed Go systems by Rehan." };

export default function ProjectsPage() {
  return (
    <main className="px-3 pb-20 pt-12 sm:px-6 sm:pt-20">
      <header className="mx-auto mb-12 max-w-7xl rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-end">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Project collection · 03 live systems</p><h1 className="mt-5 max-w-4xl text-[clamp(4rem,9vw,8rem)] font-black leading-[0.88] text-slate-950">Go projects that actually run.</h1></div>
          <div><p className="text-base leading-8 text-slate-600">Explore three production-minded backend builds. Every project includes a live interface, architecture notes, and public source code.</p><div className="mt-6 flex items-center gap-2 text-xs font-black uppercase text-blue-600">Scroll through projects <ArrowDown className="h-4 w-4 animate-bounce" /></div></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl"><ProjectGrid /></div>
    </main>
  );
}
