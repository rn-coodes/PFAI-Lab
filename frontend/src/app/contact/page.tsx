import type { Metadata } from "next";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Connect with Rehan", description: "Contact Rehan about Go backend systems." };

const channels = [
  { number: "01", label: "Email", value: "rehanmalik42011@gmail.com", href: "mailto:rehanmalik42011@gmail.com", icon: Mail },
  { number: "02", label: "GitHub", value: "github.com/rn-coodes", href: "https://github.com/rn-coodes", icon: Github }
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1480px] border-x border-black/15 dark:border-white/15">
      <section className="grid min-h-[calc(100vh-65px)] lg:grid-cols-[1fr_0.8fr]">
        <div className="flex flex-col justify-between border-b border-black/15 p-8 dark:border-white/15 sm:p-12 lg:border-b-0 lg:border-r lg:p-16">
          <div><p className="dossier-label text-cyan-700 dark:text-cyan-300">Connection request / Open channel</p><h1 className="mt-8 text-[clamp(4rem,9vw,9rem)] font-black leading-[0.84] tracking-tight">LET&apos;S<br />BUILD.</h1><p className="mt-8 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">For Go systems, backend collaboration, project review, or technical conversation, use one of the direct channels.</p></div>
          <p className="dossier-label mt-12 text-slate-500">Response target / Within 24 hours</p>
        </div>
        <div className="flex flex-col">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return <Link key={channel.label} href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} className="group flex flex-1 flex-col justify-between border-b border-black/15 p-8 transition hover:bg-cyan-300 dark:border-white/15 dark:hover:text-[#07120f] sm:p-12"><div className="flex items-center justify-between"><span className="font-mono text-xs text-slate-500">{channel.number}</span><ArrowUpRight className="h-6 w-6 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div><div className="mt-16"><Icon className="h-8 w-8" /><p className="dossier-label mt-6 text-slate-500 group-hover:text-[#07120f]/60">{channel.label}</p><p className="mt-2 break-all text-xl font-black sm:text-2xl">{channel.value}</p></div></Link>;
          })}
        </div>
      </section>
    </main>
  );
}
