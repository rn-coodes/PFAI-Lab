import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-xl rounded-[2rem] border border-slate-200/80 bg-white/75 p-8 text-center shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07]">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-cyanGo/15 text-cyan-700 dark:text-cyan-200">
          <SearchX className="h-8 w-8" />
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200">404</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">Page not found</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          That route is not part of the Go project showcase dashboard.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-cyanGo hover:text-slate-950 dark:bg-white dark:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </Link>
      </div>
    </main>
  );
}
