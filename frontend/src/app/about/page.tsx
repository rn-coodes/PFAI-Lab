import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { LanguageBadges } from "@/components/language-badges";
import { SectionHeading } from "@/components/section-heading";
import { owner } from "@/data/projects";

export const metadata: Metadata = {
  title: "About Rehan",
  description: "About Rehan, F24607089, National University of Technology, and Go-focused technical skills."
};

export default function AboutPage() {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="About"
          title="Rehan"
          description="A Go-focused student portfolio built around backend engineering, secure APIs, realtime systems, and concurrent programming."
        />

        <AnimatedSection className="mt-10 rounded-[2rem] border border-slate-200/80 bg-white/75 p-6 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07] sm:p-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ["Name", owner.name],
              ["Student ID", owner.studentId],
              ["University", owner.university]
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-slate-200/70 bg-white/75 p-5 dark:border-white/10 dark:bg-white/[0.06]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <p className="mt-3 text-lg font-black text-slate-950 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-200">
              Skills
            </p>
            <LanguageBadges languages={owner.skills} />
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
