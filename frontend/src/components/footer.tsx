import { ArrowUpRight, Github, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-3 pb-4 pt-16 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-slate-950 text-white">
        <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-lime-300">Available for collaboration</p><h2 className="mt-4 max-w-3xl text-3xl font-black sm:text-5xl">Have a backend problem worth solving?</h2></div>
          <div className="flex gap-3">
            <Link href="https://github.com/rn-coodes" target="_blank" className="grid h-12 w-12 place-items-center rounded-md border border-white/20 transition hover:bg-white hover:text-slate-950" aria-label="GitHub"><Github className="h-5 w-5" /></Link>
            <Link href="mailto:rehanmalik42011@gmail.com" className="flex h-12 items-center gap-3 rounded-md bg-lime-300 px-5 text-xs font-black uppercase text-slate-950 transition hover:bg-white"><Mail className="h-4 w-4" /> Let&apos;s talk <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400"><span>Rehan · F24607089 · National University of Technology</span><span>Built with Go + Next.js</span></div>
      </div>
    </footer>
  );
}
