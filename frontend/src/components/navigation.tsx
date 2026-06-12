"use client";

import {
  Braces,
  BriefcaseBusiness,
  Clock3,
  Code2,
  Github,
  GraduationCap,
  Home,
  Mail,
  UserRound
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { owner } from "@/data/projects";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/about", label: "About", icon: UserRound },
  { href: "/#skills", label: "Skills", icon: Code2 },
  { href: "/#timeline", label: "Timeline", icon: Clock3 },
  { href: "/contact", label: "Contact", icon: Mail }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-cyan-300/10 bg-[#050b18]/95 p-4 text-white backdrop-blur-2xl lg:flex lg:flex-col">
        <Link href="/" className="flex items-center gap-3 border-b border-white/10 px-2 pb-5 pt-1">
          <span className="grid h-11 w-11 place-items-center border border-cyanGo/40 bg-cyanGo/10 text-cyan-200 shadow-glow">
            <Braces className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.12em]">Go Showcase</span>
            <span className="mt-1 block text-[10px] text-slate-500">Advanced Go Projects</span>
          </span>
        </Link>

        <nav className="mt-7 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || (link.href === "/projects" && pathname.startsWith("/projects"));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "group relative flex items-center gap-4 px-4 py-3 text-sm font-bold transition",
                  active ? "bg-cyanGo/15 text-white" : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                )}
              >
                {active && <span className="absolute inset-y-0 right-0 w-0.5 bg-cyanGo shadow-[0_0_12px_#00ADD8]" />}
                <Icon className={cn("h-4 w-4", active ? "text-cyan-200" : "text-slate-500 group-hover:text-cyan-200")} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 flex gap-2 border-y border-white/10 py-4">
          <Link href="https://github.com/rn-coodes" target="_blank" className="grid h-9 w-9 place-items-center border border-white/10 bg-white/[0.05] text-slate-400 transition hover:border-cyanGo hover:text-cyan-200" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </Link>
          <Link href="mailto:rehanmalik42011@gmail.com" className="grid h-9 w-9 place-items-center border border-white/10 bg-white/[0.05] text-slate-400 transition hover:border-cyanGo hover:text-cyan-200" aria-label="Email">
            <Mail className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </div>

        <div className="mt-auto border border-white/10 bg-white/[0.035] p-4">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-cyanGo/70 bg-gradient-to-br from-cyanGo/30 to-violet-500/30 text-3xl font-black text-white shadow-glow">
            R
          </div>
          <p className="mt-4 text-center text-xl font-black">{owner.name}</p>
          <p className="mt-1 text-center text-xs font-bold text-cyan-300">Go Software Engineer</p>
          <div className="mt-4 flex items-center justify-center gap-2 border border-emerald-300/10 bg-emerald-300/[0.05] px-2 py-2 text-[10px] font-bold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
            Systems online
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="flex items-center gap-2 text-[10px] leading-5 text-slate-500">
              <GraduationCap className="h-4 w-4 shrink-0 text-cyan-200" />
              National University of Technology
            </p>
            <p className="mt-3 inline-flex border border-violet-400/20 bg-violet-400/10 px-2 py-1 font-mono text-xs font-black text-violet-300">
              {owner.studentId}
            </p>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-50 border-b border-slate-900/5 bg-vapor/85 backdrop-blur-2xl dark:border-white/10 dark:bg-ink/85 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-ink text-cyanGo dark:bg-white dark:text-ink"><Braces className="h-5 w-5" /></span>
            <span className="text-sm font-black uppercase tracking-[0.14em]">Go Showcase</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-4 border-t border-slate-900/5 dark:border-white/10">
          {links.slice(0, 3).concat(links.slice(-1)).map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || (link.href === "/projects" && pathname.startsWith("/projects"));
            return <Link key={link.label} href={link.href} className={cn("flex flex-col items-center gap-1 py-2 text-[10px] font-bold", active ? "text-cyan-600 dark:text-cyan-200" : "text-slate-500")}><Icon className="h-4 w-4" />{link.label}</Link>;
          })}
        </div>
      </header>
    </>
  );
}
