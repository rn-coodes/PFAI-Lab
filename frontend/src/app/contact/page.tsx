import type { Metadata } from "next";
import { Github, Mail, Send } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { links as portfolioLinks } from "@/data/projects";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact page for Rehan's Advanced Go Projects Showcase."
};

const links = [
  { label: "Email", value: "rehanmalik42011@gmail.com", href: "mailto:rehanmalik42011@gmail.com", icon: Mail },
  { label: "GitHub", value: "github.com/rn-coodes", href: portfolioLinks.github, icon: Github }
];

export default function ContactPage() {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Connect about Go projects, APIs, and backend systems"
          description="Use the profile links below as placeholders for production contact destinations."
        />

        <AnimatedSection className="mt-10 grid gap-5 md:grid-cols-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                className="group rounded-[1.75rem] border border-slate-200/80 bg-white/75 p-6 shadow-panel backdrop-blur-2xl transition hover:-translate-y-2 hover:border-cyanGo dark:border-white/10 dark:bg-white/[0.07]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyanGo/15 text-cyan-700 transition group-hover:bg-cyanGo group-hover:text-slate-950 dark:text-cyan-200">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                <p className="mt-2 break-words text-lg font-black text-slate-950 dark:text-white">{item.value}</p>
              </Link>
            );
          })}
        </AnimatedSection>

        <AnimatedSection className="mt-6 rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-panel dark:border-white/10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Ready for deployment</p>
              <h2 className="mt-2 text-2xl font-black">Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Vercel</h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyanGo px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-1 hover:bg-white"
            >
              View Projects
              <Send className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
