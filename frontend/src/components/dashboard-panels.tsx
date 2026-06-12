"use client";

import { motion } from "framer-motion";
import { Braces, Code2, Cpu, Database, GitBranch, Radio, ServerCog, Terminal, Wifi } from "lucide-react";
import Link from "next/link";
import { owner } from "@/data/projects";

const terminalLines = [
  ["$ go run ./cmd/server", "text-cyan-300"],
  ["[GIN] listening on :8080", "text-emerald-300"],
  ["[WS] WebSocket hub started", "text-emerald-300"],
  ["[CRAWLER] worker pool ready", "text-amber-300"],
  ["[AUTH] JWT middleware initialized", "text-violet-300"],
  ["[SYSTEM] all systems operational", "text-emerald-300"]
];

const stack = [
  { label: "Go", icon: Braces, color: "text-cyan-300" },
  { label: "Gin", icon: ServerCog, color: "text-emerald-300" },
  { label: "WebSocket", icon: Wifi, color: "text-sky-300" },
  { label: "JWT", icon: Cpu, color: "text-violet-300" },
  { label: "SQLite", icon: Database, color: "text-blue-300" },
  { label: "Git", icon: GitBranch, color: "text-rose-300" }
];

export function DashboardPanels() {
  return (
    <section id="skills" className="grid gap-4 xl:grid-cols-[0.8fr_0.82fr_1fr_1.25fr]">
      <Panel title="About Me" icon={Code2}>
        <p className="text-xs leading-6 text-slate-400">
          I&apos;m {owner.name}, a backend developer building scalable, high-performance systems in Golang.
        </p>
        <Link href="/about" className="mt-5 inline-flex border border-violet-400/40 px-4 py-2 text-xs font-black text-violet-300 transition hover:bg-violet-400/10">
          View Full Profile
        </Link>
      </Panel>

      <Panel title="Project Stats" icon={Radio}>
        <div className="grid grid-cols-2 gap-2">
          {[["3", "Projects"], ["10+", "APIs Built"], ["5K+", "Lines of Code"], ["24/7", "Systems Online"]].map(([value, label], index) => (
            <motion.div key={label} className="border border-cyan-300/10 bg-cyan-300/[0.05] p-3 text-center" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }}>
              <p className="text-2xl font-black text-cyan-300">{value}</p>
              <p className="mt-1 text-[10px] text-slate-500">{label}</p>
            </motion.div>
          ))}
        </div>
      </Panel>

      <Panel title="Tech Stack" icon={Braces}>
        <div className="grid grid-cols-3 gap-y-5">
          {stack.map((item) => {
            const Icon = item.icon;
            return <div key={item.label} className="text-center"><Icon className={`mx-auto h-6 w-6 ${item.color}`} /><p className="mt-2 text-[10px] font-bold text-slate-400">{item.label}</p></div>;
          })}
        </div>
      </Panel>

      <Panel title="Live System Terminal" icon={Terminal} badge="Online">
        <div className="font-mono text-[10px] leading-5">
          {terminalLines.map(([line, color], index) => (
            <motion.p key={line} className={color} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.15 }} viewport={{ once: true }}>{line}</motion.p>
          ))}
          <motion.span className="mt-2 block h-1 w-8 bg-violet-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        </div>
      </Panel>
    </section>
  );
}

function Panel({ title, icon: Icon, badge, children }: { title: string; icon: typeof Code2; badge?: string; children: React.ReactNode }) {
  return (
    <div className="border border-cyan-200/10 bg-[#07101f]/90 p-4 text-white shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-black"><Icon className="h-4 w-4 text-cyan-300" />{title}</p>
        {badge && <span className="bg-emerald-300/10 px-2 py-1 text-[10px] font-black text-emerald-300">{badge}</span>}
      </div>
      {children}
    </div>
  );
}
