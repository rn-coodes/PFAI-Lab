"use client";

import { motion } from "framer-motion";
import { Activity, Cloud, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://advanced-go-projects-backend-f24607089.onrender.com";

type Status = "checking" | "online" | "offline";

export function BackendStatus() {
  const [status, setStatus] = useState<Status>("checking");
  const [latency, setLatency] = useState<number | null>(null);

  const check = useCallback(async () => {
    setStatus("checking");
    const started = performance.now();
    try {
      const response = await fetch(`${apiUrl}/health`, { cache: "no-store" });
      if (!response.ok) throw new Error("health check failed");
      setLatency(Math.round(performance.now() - started));
      setStatus("online");
    } catch {
      setLatency(null);
      setStatus("offline");
    }
  }, []);

  useEffect(() => {
    void check();
    const timer = window.setInterval(check, 60_000);
    return () => window.clearInterval(timer);
  }, [check]);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-5 text-white shadow-panel dark:border-white/10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-cyan-200">
            {status === "online" && (
              <motion.span
                className="absolute inset-0 rounded-2xl border border-emerald-300/60"
                animate={{ scale: [1, 1.18], opacity: [0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            )}
            <Cloud className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Render Backend</p>
            <p className="mt-1 text-sm font-bold text-slate-300">
              {status === "online" ? `Online${latency ? ` · ${latency}ms` : ""}` : status === "checking" ? "Checking service..." : "Awaiting deployment"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void check()}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-200 transition hover:border-cyanGo hover:text-cyan-200"
          aria-label="Refresh backend status"
        >
          <RefreshCw className={`h-4 w-4 ${status === "checking" ? "animate-spin" : ""}`} />
        </button>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {["Gin API", "JWT Auth", "WebSockets"].map((service, index) => (
          <div key={service} className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <Activity className={`h-4 w-4 ${status === "online" ? "text-emerald-300" : "text-slate-500"}`} />
            <p className="mt-2 text-[11px] font-black text-slate-300">{service}</p>
            <motion.div
              className="mt-2 h-1 rounded-full bg-gradient-to-r from-cyanGo to-emerald-300"
              animate={{ scaleX: status === "checking" ? [0.2, 1, 0.2] : status === "online" ? 1 : 0.15 }}
              transition={{ duration: 1.4, delay: index * 0.12, repeat: status === "checking" ? Infinity : 0 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
