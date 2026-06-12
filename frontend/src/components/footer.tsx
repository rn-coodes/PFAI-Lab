import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { links } from "@/data/projects";

const socials = [
  { label: "GitHub", href: links.github, icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "Email", href: "mailto:rehanmalik42011@gmail.com", icon: Mail }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-900/5 bg-white/55 py-10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-950 dark:text-white">
            Advanced Go Projects Showcase
          </p>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Built for Rehan, F24607089, National University of Technology.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-1 hover:border-cyanGo hover:text-cyanGo dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                aria-label={social.label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
