"use client";

import { motion } from "framer-motion";
import { Activity, RefreshCw } from "lucide-react";
import { formatUptime, useTelemetry } from "@/lib/telemetry";

export function BackendStatus() {
  const { telemetry, latency, loading, refresh } = useTelemetry();
  const status = loading ? "checking" : telemetry ? "online" : "offline";
  const metrics = [
    [latency === null ? "--" : `${latency}ms`, "Measured latency"],
    [formatUptime(telemetry?.uptimeSeconds), "Current uptime"],
    [telemetry ? String(telemetry.requests) : "--", "Requests served"]
  ];

  return (
    <motion.div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50" whileHover={{ y: -3, boxShadow: "0 20px 50px rgba(15,23,42,.10)" }}>
      <div className="flex items-center justify-between border-b border-slate-200 p-5"><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Railway backend</p><p className="mt-2 text-2xl font-black text-slate-950">{status === "online" ? "Everything is operational" : status === "checking" ? "Checking systems" : "Service unavailable"}</p></div><button type="button" onClick={() => void refresh()} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:text-blue-600" aria-label="Refresh backend status"><RefreshCw className={`h-4 w-4 ${status === "checking" ? "animate-spin" : ""}`} /></button></div>
      <div className="grid grid-cols-3 gap-px bg-slate-200">{metrics.map(([value, label], index) => <motion.div key={label} className="relative overflow-hidden bg-white p-4" whileHover={{ backgroundColor: "#eff6ff" }}><motion.span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-emerald-400" animate={{ scaleX: status === "online" ? [0.25, 1, 0.25] : 0.1 }} transition={{ duration: 2.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }} /><Activity className={`h-4 w-4 ${status === "online" ? "text-emerald-500" : "text-slate-300"}`} /><motion.p key={value} className="mt-4 text-xs font-black text-slate-800" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>{value}</motion.p><p className="mt-1 text-[9px] font-bold uppercase text-slate-400">{label}</p></motion.div>)}</div>
    </motion.div>
  );
}
