import { ArrowUpRight, Github, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1480px] border-x border-b border-black/15 bg-[#07120f] text-white dark:border-white/15">
      <div className="grid lg:grid-cols-[1fr_auto]">
        <div className="p-8 sm:p-12"><p className="dossier-label text-cyan-300">End of dossier</p><h2 className="mt-4 max-w-3xl text-4xl font-black sm:text-6xl">Let&apos;s build something that holds up under load.</h2></div>
        <div className="grid grid-cols-2 border-t border-white/15 lg:grid-cols-1 lg:border-l lg:border-t-0">
          <Link href="https://github.com/rn-coodes" target="_blank" className="flex min-w-36 items-center justify-between gap-5 border-r border-white/15 px-6 py-5 text-xs font-black uppercase transition hover:bg-white hover:text-black lg:border-b lg:border-r-0"><Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-4 w-4" /></Link>
          <Link href="mailto:rehanmalik42011@gmail.com" className="flex min-w-36 items-center justify-between gap-5 px-6 py-5 text-xs font-black uppercase transition hover:bg-cyan-300 hover:text-black"><Mail className="h-4 w-4" /> Email <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-3 border-t border-white/15 px-6 py-4 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500"><span>Rehan / F24607089 / National University of Technology</span><span>Go systems portfolio / 2026</span></div>
    </footer>
  );
}
