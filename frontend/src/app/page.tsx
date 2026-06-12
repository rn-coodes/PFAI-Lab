import { ArrowUpRight, Check, CircleDot, Terminal } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { BackendStatus } from "@/components/backend-status";
import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { owner } from "@/data/projects";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-[1480px] border-x border-black/15 px-4 py-20 dark:border-white/15 sm:px-8 lg:px-14">
        <AnimatedSection className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="dossier-label text-cyan-700 dark:text-cyan-300">Operating principles / 001</p>
            <h2 className="mt-5 max-w-md text-4xl font-black leading-tight sm:text-6xl">Backend work should be inspectable.</h2>
          </div>
          <div className="grid gap-px bg-black/15 dark:bg-white/15 sm:grid-cols-3">
            {[
              ["Concurrency", "Worker pools, channels, and controlled parallelism."],
              ["Security", "Signed identity, protected routes, predictable boundaries."],
              ["Realtime", "Persistent connections and observable system state."]
            ].map(([title, copy], index) => (
              <div key={title} className="bg-[#f1f4ef] p-6 dark:bg-[#07100e]">
                <span className="font-mono text-xs text-cyan-700 dark:text-cyan-300">0{index + 1}</span>
                <h3 className="mt-8 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-[1480px] border-x border-black/15 dark:border-white/15">
        <div className="flex flex-col justify-between gap-5 border-y border-black/20 p-6 dark:border-white/20 sm:flex-row sm:items-end sm:p-10">
          <div><p className="dossier-label text-cyan-700 dark:text-cyan-300">Selected case studies / 003</p><h2 className="mt-3 text-4xl font-black sm:text-6xl">Deployed systems</h2></div>
          <Link href="/work" className="flex items-center gap-2 text-xs font-black uppercase">Full work index <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <ProjectGrid />
      </section>

      <section className="mx-auto grid max-w-[1480px] border-x border-b border-black/15 dark:border-white/15 lg:grid-cols-[1fr_1fr]">
        <AnimatedSection className="border-b border-black/15 p-6 dark:border-white/15 sm:p-10 lg:border-b-0 lg:border-r">
          <p className="dossier-label text-cyan-700 dark:text-cyan-300">Identity record</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-[140px_1fr]">
            <div className="grid h-36 w-36 place-items-center bg-[#07120f] text-7xl font-black text-cyan-300 dark:bg-cyan-300 dark:text-[#07120f]">R</div>
            <div><h2 className="text-4xl font-black">{owner.name}</h2><p className="mt-2 font-mono text-xs text-slate-500">{owner.studentId} / NUTECH</p><p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">Go-focused backend engineer building secure APIs, realtime infrastructure, and concurrent services.</p><Link href="/profile" className="mt-6 inline-flex items-center gap-2 border-b-2 border-cyan-500 pb-1 text-xs font-black uppercase">Open profile <ArrowUpRight className="h-4 w-4" /></Link></div>
          </div>
        </AnimatedSection>
        <AnimatedSection className="p-6 sm:p-10">
          <p className="dossier-label text-cyan-700 dark:text-cyan-300">Deployment telemetry</p>
          <div className="mt-8"><BackendStatus /></div>
          <div className="mt-5 grid grid-cols-2 gap-px bg-black/15 dark:bg-white/15">
            {[[Terminal, "Railway", "Backend"], [CircleDot, "Vercel", "Frontend"], [Check, "GitHub", "Source"], [Check, "0", "Vulnerabilities"]].map(([Icon, value, label]) => {
              const ItemIcon = Icon as typeof Terminal;
              return <div key={String(label)} className="bg-[#f1f4ef] p-4 dark:bg-[#07100e]"><ItemIcon className="h-4 w-4 text-cyan-600 dark:text-cyan-300" /><p className="mt-4 text-xl font-black">{String(value)}</p><p className="dossier-label mt-1 text-slate-500">{String(label)}</p></div>;
            })}
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
