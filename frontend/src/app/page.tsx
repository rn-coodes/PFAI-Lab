import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { DashboardPanels } from "@/components/dashboard-panels";
import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { TechMarquee } from "@/components/tech-marquee";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050b18] text-white">
      <Hero />
      <TechMarquee />
      <div className="mx-auto max-w-[1500px] px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-cyan-200/10 pb-4">
            <h2 className="flex items-center gap-3 text-xl font-black"><Sparkles className="h-5 w-5 text-cyan-300" />Featured Projects</h2>
            <Link href="/projects" className="flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-cyan-200">View all projects <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8">
            <ProjectGrid />
          </div>
        </AnimatedSection>

        <AnimatedSection id="timeline" className="mt-5">
          <DashboardPanels />
        </AnimatedSection>
      </div>
    </main>
  );
}
