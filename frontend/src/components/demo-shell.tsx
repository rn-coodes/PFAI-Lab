import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

type DemoShellProps = PropsWithChildren<{ eyebrow: string; title: string; description: string; repository: string; status?: ReactNode }>;

export function DemoShell({ eyebrow, title, description, repository, status, children }: DemoShellProps) {
  return (
    <main className="mx-auto max-w-[1480px] border-x border-black/15 dark:border-white/15">
      <div className="grid border-b border-black/20 dark:border-white/20 lg:grid-cols-[1fr_auto]">
        <header className="p-6 sm:p-10">
          <Link href="/work" className="inline-flex items-center gap-2 text-xs font-black uppercase"><ArrowLeft className="h-4 w-4" /> Work index</Link>
          <p className="dossier-label mt-10 text-cyan-700 dark:text-cyan-300">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-black sm:text-7xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        </header>
        <div className="grid grid-cols-2 border-t border-black/15 dark:border-white/15 lg:grid-cols-1 lg:border-l lg:border-t-0">
          <div className="grid min-h-20 place-items-center border-r border-black/15 dark:border-white/15 lg:border-b lg:border-r-0">{status ?? <span className="dossier-label text-emerald-700 dark:text-emerald-300">Live system</span>}</div>
          <Link href={repository} target="_blank" className="flex min-h-20 items-center justify-between gap-5 px-5 text-xs font-black uppercase transition hover:bg-[#07120f] hover:text-white dark:hover:bg-white dark:hover:text-black"><Github className="h-4 w-4" /> Source <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="p-4 sm:p-8">{children}</div>
    </main>
  );
}
