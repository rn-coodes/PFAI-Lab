"use client";

import { Activity, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://advanced-go-backend-f24607089-production.up.railway.app";
type Status = "checking" | "online" | "offline";

export function BackendStatus() {
  const [status, setStatus] = useState<Status>("checking");
  const [latency, setLatency] = useState<number | null>(null);
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

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 p-5"><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Railway backend</p><p className="mt-2 text-2xl font-black text-slate-950">{status === "online" ? "Everything is operational" : status === "checking" ? "Checking systems" : "Service unavailable"}</p></div><button type="button" onClick={() => void check()} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:text-blue-600" aria-label="Refresh backend status"><RefreshCw className={`h-4 w-4 ${status === "checking" ? "animate-spin" : ""}`} /></button></div>
      <div className="grid grid-cols-3 gap-px bg-slate-200">{["Gin API", "JWT Auth", "WebSockets"].map((service, index) => <div key={service} className="bg-white p-4"><Activity className={`h-4 w-4 ${status === "online" ? "text-emerald-500" : "text-slate-300"}`} /><p className="mt-4 text-xs font-black text-slate-800">{service}</p><p className="mt-1 text-[10px] font-bold uppercase text-slate-400">{index === 0 && latency ? `${latency}ms` : status}</p></div>)}</div>
    </div>
  );
}
