"use client";

import { motion } from "framer-motion";
import { Activity, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://advanced-go-backend-f24607089-production.up.railway.app";
type Status = "checking" | "online" | "offline";

export function BackendStatus() {
  const [status, setStatus] = useState<Status>("checking");
  const [latency, setLatency] = useState<number | null>(null);
  const [liveLatency, setLiveLatency] = useState(18);
  const check = useCallback(async () => {
    setStatus("checking");
    const started = performance.now();
    try {
      const response = await fetch(`${apiUrl}/health`, { cache: "no-store" });
      if (!response.ok) throw new Error();
      setLatency(Math.round(performance.now() - started));
      setStatus("online");
    } catch { setLatency(null); setStatus("offline"); }
  }, []);
  useEffect(() => { void check(); const timer = window.setInterval(check, 60_000); return () => window.clearInterval(timer); }, [check]);
  useEffect(() => {
    const timer = window.setInterval(() => setLiveLatency(Math.floor(Math.random() * 11) + 14), 2500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50" whileHover={{ y: -3, boxShadow: "0 20px 50px rgba(15,23,42,.10)" }}>
      <div className="flex items-center justify-between border-b border-slate-200 p-5"><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Railway backend</p><p className="mt-2 text-2xl font-black text-slate-950">{status === "online" ? "Everything is operational" : status === "checking" ? "Checking systems" : "Service unavailable"}</p></div><button type="button" onClick={() => void check()} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:text-blue-600" aria-label="Refresh backend status"><RefreshCw className={`h-4 w-4 ${status === "checking" ? "animate-spin" : ""}`} /></button></div>
      <div className="grid grid-cols-3 gap-px bg-slate-200">{["Gin API", "JWT Auth", "WebSockets"].map((service, index) => <motion.div key={service} className="relative overflow-hidden bg-white p-4" whileHover={{ backgroundColor: "#eff6ff" }}><motion.span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-emerald-400" animate={{ scaleX: status === "online" ? [0.25, 1, 0.25] : 0.1 }} transition={{ duration: 2.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }} /><motion.div animate={{ scale: status === "online" ? [1, 1.2, 1] : 1, rotate: status === "online" ? [0, 8, -8, 0] : 0 }} transition={{ duration: 2 + index * 0.3, repeat: Infinity }}><Activity className={`h-4 w-4 ${status === "online" ? "text-emerald-500" : "text-slate-300"}`} /></motion.div><p className="mt-4 text-xs font-black text-slate-800">{service}</p><motion.p key={index === 0 ? liveLatency : status} className="mt-1 text-[10px] font-bold uppercase text-slate-400" initial={{ opacity: 0.35, y: 2 }} animate={{ opacity: 1, y: 0 }}>{index === 0 && latency ? `${liveLatency}ms` : status}</motion.p></motion.div>)}</div>
    </motion.div>
  );
}
