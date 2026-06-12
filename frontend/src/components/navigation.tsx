"use client";

import { Braces, BriefcaseBusiness, Home, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/work", label: "Projects", icon: BriefcaseBusiness },
  { href: "/profile", label: "About", icon: UserRound },
  { href: "/connect", label: "Contact", icon: Mail }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/5 bg-vapor/80 backdrop-blur-2xl dark:border-white/10 dark:bg-ink/75">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink text-cyanGo shadow-glow dark:bg-white dark:text-ink">
            <Braces className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">
              Go Showcase
            </span>
            <span className="block truncate text-xs font-medium text-slate-500 dark:text-slate-400">
              Advanced Go Projects
            </span>
          </span>
        </Link>

        <div className="hidden items-center rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 md:flex">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || (link.href === "/work" && pathname.startsWith("/work"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-ink text-white shadow-panel dark:bg-white dark:text-ink"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </nav>

      <div className="grid grid-cols-4 border-t border-slate-900/5 bg-white/75 dark:border-white/10 dark:bg-ink/80 md:hidden">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href || (link.href === "/work" && pathname.startsWith("/work"));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 text-[11px] font-semibold",
                active ? "text-cyanGo" : "text-slate-500 dark:text-slate-400"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
