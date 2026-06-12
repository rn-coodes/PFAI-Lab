import type { Metadata } from "next";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact Rehan", description: "Contact Rehan about Go backend systems." };
const channels = [{ label: "Email me", value: "rehanmalik42011@gmail.com", href: "mailto:rehanmalik42011@gmail.com", icon: Mail, color: "bg-lime-200" }, { label: "Explore GitHub", value: "github.com/rn-coodes", href: "https://github.com/rn-coodes", icon: Github, color: "bg-violet-200" }];

export default function ContactPage() {
  return (
    <main className="px-3 pb-20 pt-12 sm:px-6 sm:pt-20">
      <section className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-7 shadow-xl sm:p-12 lg:p-16">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Get in touch</p><h1 className="mt-5 max-w-4xl text-[clamp(4rem,9vw,8rem)] font-black leading-[0.9] text-slate-950">Let&apos;s build something useful.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">For Go systems, backend collaboration, project reviews, or technical conversations, reach me through one of these direct channels.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">{channels.map((channel) => { const Icon = channel.icon; return <Link key={channel.label} href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} className={`group rounded-lg p-7 transition hover:-translate-y-1 hover:shadow-xl ${channel.color}`}><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-md bg-white/70"><Icon className="h-5 w-5" /></span><ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div><p className="mt-12 text-xs font-black uppercase tracking-[0.16em] text-slate-500">{channel.label}</p><p className="mt-2 break-all text-xl font-black text-slate-950 sm:text-2xl">{channel.value}</p></Link>; })}</div>
      </section>
    </main>
  );
}
