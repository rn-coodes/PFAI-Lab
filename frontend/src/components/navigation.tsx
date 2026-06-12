"use client";

import { ArrowUpRight, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/work", label: "Projects" },
  { href: "/profile", label: "About" },
  { href: "/connect", label: "Contact" }
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav className="mx-auto flex h-16 min-w-0 max-w-7xl items-center justify-between rounded-lg border border-slate-200/90 bg-white/90 px-3 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-600 text-sm font-black text-white">Go</span>
          <span>
            <span className="block text-sm font-black text-slate-950">Rehan</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Backend engineer</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || (link.href === "/work" && pathname.startsWith("/work"));
            return <Link key={link.href} href={link.href} className={cn("rounded-md px-4 py-2 text-sm font-bold transition", active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950")}>{link.label}</Link>;
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link href="https://github.com/rn-coodes" target="_blank" className="hidden items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition hover:bg-blue-600 sm:flex"><Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          <button type="button" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white md:hidden" aria-label="Toggle navigation">{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
        </div>
      </nav>
      {open && <div className="mx-auto mt-2 max-w-7xl rounded-lg border border-slate-200 bg-white p-2 shadow-xl md:hidden">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">{link.label}<ArrowUpRight className="h-4 w-4" /></Link>)}</div>}
    </header>
  );
}
