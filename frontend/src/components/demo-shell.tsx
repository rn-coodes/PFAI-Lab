import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

type DemoShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
  repository: string;
  status?: ReactNode;
}>;

export function DemoShell({ eyebrow, title, description, repository, status, children }: DemoShellProps) {
  return (
    <main className="min-h-[calc(100vh-80px)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Project dashboard
          </Link>
          <div className="flex items-center gap-2">
            {status}
            <Link
              href={repository}
              target="_blank"
              className="grid h-10 w-10 place-items-center border border-slate-200 bg-white/80 text-slate-700 transition hover:border-cyanGo hover:text-cyan-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label="Open GitHub repository"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://advanced-go-backend-f24607089-production.up.railway.app/health"
              target="_blank"
              className="grid h-10 w-10 place-items-center border border-slate-200 bg-white/80 text-slate-700 transition hover:border-cyanGo hover:text-cyan-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label="Open backend health endpoint"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <header className="mt-8 border-y border-slate-200/80 py-8 dark:border-white/10">
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        </header>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
