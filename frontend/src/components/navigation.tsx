"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
      <motion.nav className="mx-auto flex h-16 min-w-0 max-w-7xl items-center justify-between rounded-lg border border-slate-200/90 bg-white/90 px-3 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-5" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <Link href="/" className="group flex items-center gap-3">
          <motion.span className="grid h-10 w-10 place-items-center rounded-md bg-blue-600 text-sm font-black text-white" whileHover={{ rotate: 10, scale: 1.08 }} whileTap={{ scale: 0.94 }}>Go</motion.span>
          <span><span className="block text-sm font-black text-slate-950">Rehan</span><span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Backend engineer</span></span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || (link.href === "/work" && pathname.startsWith("/work"));
            return <Link key={link.href} href={link.href} className="relative rounded-md px-4 py-2 text-sm font-bold text-slate-600 transition hover:text-slate-950">{active && <motion.span layoutId="active-nav" className="absolute inset-0 rounded-md bg-blue-50" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}<span className={`relative ${active ? "text-blue-700" : ""}`}>{link.label}</span></Link>;
          })}
        </div>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}><Link href="https://github.com/rn-coodes" target="_blank" className="premium-button hidden items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition hover:bg-blue-600 sm:flex"><Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5" /></Link></motion.div>
          <button type="button" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white md:hidden" aria-label="Toggle navigation">{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && <motion.div className="mx-auto mt-2 max-w-7xl rounded-lg border border-slate-200 bg-white p-2 shadow-xl md:hidden" initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}>{links.map((link, index) => <motion.div key={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}><Link href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">{link.label}<ArrowUpRight className="h-4 w-4" /></Link></motion.div>)}</motion.div>}
      </AnimatePresence>
    </header>
  );
}
