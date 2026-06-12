"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function VisualPanel({ kind, title }: { kind: "chat" | "api" | "crawler"; title: string }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-slate-950 p-4 shadow-panel dark:border-white/10"
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,173,216,0.28),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(16,185,129,0.22),transparent_30%)]"
        animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{title}</p>
            <p className="mt-1 text-[11px] text-slate-400">Go runtime telemetry</p>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
        </div>

        {kind === "chat" && <ChatMock />}
        {kind === "api" && <ApiMock />}
        {kind === "crawler" && <CrawlerMock />}
      </div>
    </motion.div>
  );
}

function ChatMock() {
  return (
    <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
        {["main-room", "go-workers", "release"].map((room, index) => (
          <div
            key={room}
            className={cn(
              "mb-2 flex items-center justify-between rounded-xl px-3 py-2 text-xs",
              index === 0 ? "bg-cyanGo/20 text-cyan-100" : "bg-white/[0.04] text-slate-300"
            )}
          >
            <span>{room}</span>
            <span>{index === 0 ? "24" : "8"}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
        {[
          ["Rehan", "WebSocket hub online", "w-9/12"],
          ["Go", "Broadcast delivered in 18ms", "w-7/12"],
          ["Client", "typing...", "w-5/12"]
        ].map(([name, text, width]) => (
          <motion.div
            key={text}
            className="rounded-xl bg-white/[0.07] p-3"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 3.2, delay: indexDelay(text), repeat: Infinity }}
          >
            <p className="text-[11px] font-bold text-cyan-200">{name}</p>
            <div className={cn("mt-2 h-2 rounded-full bg-slate-500/40", width)} />
            <p className="mt-2 text-xs text-slate-300">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ApiMock() {
  return (
    <div className="space-y-3">
      {[
        ["POST", "/auth/login", "200", "bg-emerald-400"],
        ["GET", "/api/profile", "JWT", "bg-cyan-400"],
        ["GET", "/api/admin", "401", "bg-amber-300"]
      ].map(([method, route, status, color]) => (
        <motion.div
          key={route}
          className="grid grid-cols-[58px_1fr_52px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3"
          animate={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(0,173,216,0.4)", "rgba(255,255,255,0.1)"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="rounded-lg bg-white/10 px-2 py-1 text-center text-[11px] font-black text-white">{method}</span>
          <div>
            <p className="font-mono text-xs text-slate-200">{route}</p>
            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div className={cn("h-2 rounded-full", color, route.includes("admin") ? "w-5/12" : "w-10/12")} />
            </div>
          </div>
          <span className="text-right text-xs font-black text-cyan-200">{status}</span>
        </motion.div>
      ))}
      <div className="rounded-2xl bg-emerald-400/10 p-3 font-mono text-[11px] text-emerald-100">
        {"{ token: \"signed.jwt\", middleware: \"verified\" }"}
      </div>
    </div>
  );
}

function CrawlerMock() {
  return (
    <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
      <div className="relative min-h-52 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
        {[
          "left-5 top-7 bg-cyan-400",
          "left-24 top-16 bg-emerald-400",
          "left-16 top-32 bg-amber-300",
          "right-8 top-10 bg-rose-400",
          "right-16 bottom-8 bg-cyan-300"
        ].map((point) => (
          <motion.span
            key={point}
            className={cn("absolute h-5 w-5 rounded-full shadow-glow", point)}
            animate={{ scale: [0.75, 1.2, 0.75], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.4, delay: indexDelay(point), repeat: Infinity }}
          />
        ))}
        <span className="absolute left-8 top-11 h-px w-24 rotate-[21deg] bg-cyan-200/40" />
        <span className="absolute left-24 top-20 h-px w-28 rotate-[-14deg] bg-cyan-200/40" />
        <span className="absolute left-20 top-36 h-px w-28 rotate-[-28deg] bg-cyan-200/40" />
      </div>
      <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
        {["worker-01", "worker-02", "worker-03", "worker-04"].map((worker, index) => (
          <motion.div
            key={worker}
            className="rounded-xl bg-white/[0.06] p-3"
            animate={{ x: [0, index % 2 ? 2 : -2, 0] }}
            transition={{ duration: 2.8, delay: index * 0.2, repeat: Infinity }}
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span>{worker}</span>
              <span>{index % 2 ? "parse" : "fetch"}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div className={cn("h-2 rounded-full bg-orange-300", index === 1 ? "w-6/12" : "w-10/12")} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function indexDelay(value: string) {
  return (value.length % 5) * 0.18;
}
