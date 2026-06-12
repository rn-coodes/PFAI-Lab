import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

type DemoShellProps = PropsWithChildren<{ eyebrow: string; title: string; description: string; repository: string; status?: ReactNode }>;

export function DemoShell({ eyebrow, title, description, repository, status, children }: DemoShellProps) {
  return (
    <main className="px-3 pb-20 pt-10 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><Link href="/work" className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-blue-600"><ArrowLeft className="h-4 w-4" /> All projects</Link><p className="mt-10 text-xs font-black uppercase tracking-[0.18em] text-blue-600">{eyebrow}</p><h1 className="mt-4 text-4xl font-black text-slate-950 sm:text-7xl">{title}</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{description}</p></div><div className="flex flex-wrap items-center gap-3">{status ?? <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-700">Live system</span>}<Link href={repository} target="_blank" className="flex h-12 items-center gap-3 rounded-md bg-slate-950 px-5 text-xs font-black uppercase text-white hover:bg-blue-600"><Github className="h-4 w-4" /> Source <ArrowUpRight className="h-4 w-4" /></Link></div></div></header>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
