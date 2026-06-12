import { ArrowRight, CheckCircle2, Code2, Cpu, GraduationCap, RadioTower } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { BackendStatus } from "@/components/backend-status";
import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { TechMarquee } from "@/components/tech-marquee";
import { owner } from "@/data/projects";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TechMarquee />

      <section className="px-3 py-20 sm:px-6">
        <AnimatedSection className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Capabilities</p><h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight text-slate-950 sm:text-6xl">Backend engineering with visible results.</h2></div>
            <p className="max-w-md text-sm leading-7 text-slate-600">Each project focuses on a practical backend challenge and ships with a working interface, source code, and deployed service.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[[RadioTower, "Realtime products", "Live WebSocket communication with resilient connection handling.", "bg-cyan-200"], [CheckCircle2, "Secure systems", "JWT authentication and predictable protected API boundaries.", "bg-lime-200"], [Cpu, "Concurrent software", "Worker pools, channels, and controlled parallel execution.", "bg-violet-200"]].map(([Icon, title, copy, color]) => {
              const ItemIcon = Icon as typeof Cpu;
              return <div key={String(title)} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><span className={`grid h-12 w-12 place-items-center rounded-md ${color}`}><ItemIcon className="h-5 w-5" /></span><h3 className="mt-8 text-xl font-black text-slate-950">{String(title)}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{String(copy)}</p></div>;
            })}
          </div>
        </AnimatedSection>
      </section>

      <section className="px-3 pb-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Selected projects</p><h2 className="mt-3 text-4xl font-black text-slate-950 sm:text-6xl">Built in Go. Ready to run.</h2></div><Link href="/work" className="flex items-center gap-2 text-sm font-black text-blue-600">View all work <ArrowRight className="h-4 w-4" /></Link></div>
          <ProjectGrid />
        </div>
      </section>

      <section className="px-3 pb-20 sm:px-6">
        <AnimatedSection className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-blue-600 p-8 text-white sm:p-12"><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">About the engineer</p><h2 className="mt-5 text-5xl font-black">{owner.name}</h2><p className="mt-3 text-blue-100">{owner.role}</p><div className="mt-10 flex items-start gap-3 border-t border-white/20 pt-6"><GraduationCap className="h-5 w-5 shrink-0" /><p className="text-sm leading-6">{owner.university}<br />Student ID: {owner.studentId}</p></div><Link href="/profile" className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-xs font-black uppercase text-blue-700">Meet Rehan <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="p-8 sm:p-12"><div className="flex items-center gap-3"><Code2 className="h-5 w-5 text-blue-600" /><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Live infrastructure</p></div><div className="mt-6"><BackendStatus /></div></div>
        </AnimatedSection>
      </section>
    </main>
  );
}
