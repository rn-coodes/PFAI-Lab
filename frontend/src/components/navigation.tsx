"use client";

import { ArrowUpRight, Braces, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/work", label: "Selected work" },
  { href: "/profile", label: "Profile" },
  { href: "/connect", label: "Connect" }
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/15 bg-[#f1f4ef]/90 backdrop-blur-xl dark:border-white/15 dark:bg-[#07100e]/90">
      <nav className="mx-auto grid max-w-[1480px] grid-cols-[1fr_auto] items-center px-4 sm:px-6 lg:grid-cols-[280px_1fr_auto] lg:px-8">
        <Link href="/" className="flex h-16 items-center gap-3 border-r border-black/15 pr-6 dark:border-white/15">
          <span className="grid h-9 w-9 place-items-center bg-[#07120f] text-cyan-300 dark:bg-cyan-300 dark:text-[#07120f]"><Braces className="h-5 w-5" /></span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.12em]">Rehan / Go</span>
            <span className="dossier-label block text-[9px] text-slate-500">Systems portfolio</span>
          </span>
        </Link>

        <div className="hidden h-16 items-center justify-end lg:flex">
          {links.map((link, index) => {
            const active = pathname === link.href || (link.href === "/work" && pathname.startsWith("/work"));
            return (
              <Link key={link.href} href={link.href} className={cn("flex h-full items-center border-l border-black/15 px-7 text-xs font-black uppercase transition dark:border-white/15", active ? "bg-[#07120f] text-white dark:bg-cyan-300 dark:text-[#07120f]" : "hover:bg-cyan-300/25")}>
                <span className="mr-3 font-mono text-[9px] text-cyan-600 dark:text-cyan-300">{String(index + 1).padStart(2, "0")}</span>{link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 border-l border-black/15 pl-4 dark:border-white/15">
          <Link href="https://github.com/rn-coodes" target="_blank" className="hidden h-10 items-center gap-2 border border-black/15 px-3 text-xs font-black uppercase transition hover:bg-[#07120f] hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-black sm:flex"><Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3 w-3" /></Link>
          <ThemeToggle />
          <button type="button" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center border border-black/15 dark:border-white/15 lg:hidden" aria-label="Toggle navigation">{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
        </div>
      </nav>
      {open && <div className="border-t border-black/15 bg-[#f1f4ef] p-3 dark:border-white/15 dark:bg-[#07100e] lg:hidden">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-black/15 px-3 py-4 text-sm font-black uppercase last:border-0 dark:border-white/15">{link.label}<ArrowUpRight className="h-4 w-4" /></Link>)}</div>}
    </header>
  );
}
