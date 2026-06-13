"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function VisualPanel({ kind, title }: { kind: "chat" | "api" | "crawler"; title: string }) {
  return (
    <motion.div
      className="relative overflow-hidden border border-white/20 bg-slate-950 p-4 shadow-panel"
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,173,216,0.28),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(16,185,129,0.22),transparent_30%)]"
        animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{title}</p>
            <p className="mt-1 text-[11px] text-slate-400">Animated interface concept</p>
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
  const phrase = "Ship the Go release";
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setStep((current) => (current + 1) % (phrase.length + 14)), 160);
    return () => window.clearInterval(timer);
  }, []);
  const typed = phrase.slice(0, Math.min(step, phrase.length));
  const sent = step >= phrase.length + 3;

  return (
    <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
        {["general-go", "socket-hub", "presence"].map((room, index) => (
          <div
            key={room}
            className={cn(
              "mb-2 flex items-center justify-between rounded-xl px-3 py-2 text-xs",
              index === 0 ? "bg-cyanGo/20 text-cyan-100" : "bg-white/[0.04] text-slate-300"
            )}
          >
            <span>{room}</span>
            <span className={index === 0 ? "text-emerald-300" : "text-slate-500"}>{index === 0 ? "live" : "channel"}</span>
          </div>
        ))}
      </div>
      <div className="flex min-h-64 flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-3">
        <div className="space-y-3">
          {[
          ["Rehan", "WebSocket hub online", "w-9/12"],
          ["Go", "Broadcast delivered to connected clients", "w-7/12"]
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
          <AnimatePresence>
            {sent && <motion.div className="rounded-xl border-l-2 border-cyan-300 bg-cyan-300/10 p-3" initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}><p className="text-[11px] font-bold text-cyan-200">Client</p><p className="mt-2 text-xs text-slate-200">{phrase}</p></motion.div>}
          </AnimatePresence>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2">
          <span className="min-h-4 flex-1 text-[11px] text-slate-300">{sent ? "" : typed}<motion.span className="ml-0.5 inline-block h-3 w-px bg-cyan-300" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} /></span>
          <motion.span className="h-2 w-2 rounded-full bg-cyan-300" animate={{ scale: sent ? [1, 1.8, 1] : 1, opacity: sent ? [1, 0.4, 1] : 0.55 }} />
        </div>
      </div>
    </div>
  );
}

function ApiMock() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % 3), 1400);
    return () => window.clearInterval(timer);
  }, []);
  const routes = [
    ["POST", "/auth/login", "200 OK", "bg-emerald-400"],
    ["GET", "/api/profile", "200 OK", "bg-cyan-400"],
    ["POST", "/auth/demo-session", "200 OK", "bg-amber-300"]
  ];

  return (
    <div className="space-y-3">
      {routes.map(([method, route, status, color], index) => (
        <motion.div
          key={route}
          className="grid grid-cols-[58px_1fr_76px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3"
          animate={{ borderColor: active === index ? "rgba(34,211,238,0.75)" : "rgba(255,255,255,0.1)", x: active === index ? [0, 3, 0] : 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="rounded-lg bg-white/10 px-2 py-1 text-center text-[11px] font-black text-white">{method}</span>
          <div>
            <p className="font-mono text-xs text-slate-200">{route}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className={cn("h-2 origin-left rounded-full", color)} animate={{ scaleX: active === index ? [0, 1, 0.82] : 0.18 }} transition={{ duration: 0.8, ease: "easeOut" }} />
            </div>
          </div>
          <motion.span className="text-right text-[9px] font-black text-cyan-200" animate={{ opacity: active === index ? 1 : 0.35 }}>{status}</motion.span>
        </motion.div>
      ))}
      <div className="rounded-2xl bg-emerald-400/10 p-3 font-mono text-[11px] text-emerald-100">
        {"{ token: \"signed.jwt\", middleware: \"verified\" }"}
      </div>
    </div>
  );
}

function CrawlerMock() {
  const [workers, setWorkers] = useState([
    { value: 14, phase: "fetch" },
    { value: 42, phase: "parse" },
    { value: 68, phase: "fetch" },
    { value: 26, phase: "parse" }
  ]);
  useEffect(() => {
    const timer = window.setInterval(() => setWorkers((current) => current.map((worker, index) => {
      const next = worker.value + 8 + index * 4;
      return next > 100 ? { value: 0, phase: worker.phase === "fetch" ? "parse" : "fetch" } : { ...worker, value: next };
    })), 700);
    return () => window.clearInterval(timer);
  }, []);
  const nodes: Array<[string, number[], number[]]> = [
    ["left-5 top-7 bg-cyan-400", [0, 34, -8, 0], [0, 18, 42, 0]],
    ["left-24 top-16 bg-emerald-400", [0, -22, 28, 0], [0, 38, -12, 0]],
    ["left-16 top-32 bg-amber-300", [0, 42, 16, 0], [0, -20, -38, 0]],
    ["right-8 top-10 bg-rose-400", [0, -36, -12, 0], [0, 26, 48, 0]],
    ["right-16 bottom-8 bg-cyan-300", [0, -24, 20, 0], [0, -38, -15, 0]]
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
      <div className="relative min-h-52 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
        {nodes.map(([point, x, y], index) => (
          <motion.span
            key={point}
            className={cn("absolute h-5 w-5 rounded-full shadow-glow", point)}
            animate={{ x, y, scale: [0.8, 1.16, 0.9, 0.8], opacity: [0.6, 1, 0.78, 0.6] }}
            transition={{ duration: 7 + index, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <span className="absolute left-8 top-11 h-px w-24 rotate-[21deg] bg-cyan-200/40" />
        <span className="absolute left-24 top-20 h-px w-28 rotate-[-14deg] bg-cyan-200/40" />
        <span className="absolute left-20 top-36 h-px w-28 rotate-[-28deg] bg-cyan-200/40" />
      </div>
      <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
        {workers.map((worker, index) => (
          <motion.div
            key={`worker-${index}`}
            className="rounded-xl bg-white/[0.06] p-3"
            animate={{ x: [0, index % 2 ? 2 : -2, 0] }}
            transition={{ duration: 2.8, delay: index * 0.2, repeat: Infinity }}
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span>{`worker-0${index + 1}`}</span>
              <motion.span key={worker.phase} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}>{worker.phase}</motion.span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-2 origin-left rounded-full bg-orange-300" animate={{ scaleX: worker.value / 100 }} transition={{ type: "spring", stiffness: 100, damping: 18 }} />
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
