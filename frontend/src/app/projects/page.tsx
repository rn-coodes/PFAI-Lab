import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = { title: "Selected Work", description: "Three deployed Go systems by Rehan." };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-[1480px] border-x border-black/15 dark:border-white/15">
      <header className="grid border-b border-black/20 dark:border-white/20 lg:grid-cols-[1fr_0.55fr]">
        <div className="border-b border-black/15 p-6 dark:border-white/15 sm:p-12 lg:border-b-0 lg:border-r">
          <p className="dossier-label text-cyan-700 dark:text-cyan-300">Work index / 003 systems</p>
          <h1 className="mt-7 text-[clamp(4rem,10vw,9rem)] font-black leading-[0.84] tracking-tight">SELECTED<br />WORK</h1>
        </div>
        <div className="flex items-end p-6 sm:p-12"><p className="max-w-md text-base leading-8 text-slate-600 dark:text-slate-300">Production-minded Go builds presented as inspectable system records. Open a case study, run the live interface, or review the source.</p></div>
      </header>
      <ProjectGrid />
    </main>
  );
}
