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
    <div className="border border-black/20 bg-[#07120f] text-white dark:border-white/20">
      <div className="grid grid-cols-[1fr_auto] border-b border-white/15">
        <div className="p-4"><p className="dossier-label text-cyan-300">Railway backend</p><p className="mt-2 text-xl font-black">{status === "online" ? "Operational" : status === "checking" ? "Checking" : "Unavailable"}</p></div>
        <button type="button" onClick={() => void check()} className="grid w-16 place-items-center border-l border-white/15 transition hover:bg-white/10" aria-label="Refresh backend status"><RefreshCw className={`h-4 w-4 ${status === "checking" ? "animate-spin" : ""}`} /></button>
      </div>
      <div className="grid grid-cols-3">
        {["Gin API", "JWT Auth", "WebSockets"].map((service, index) => <div key={service} className="border-r border-white/15 p-4 last:border-0"><Activity className={`h-4 w-4 ${status === "online" ? "text-emerald-300" : "text-slate-600"}`} /><p className="mt-4 text-[10px] font-black uppercase">{service}</p><p className="mt-1 font-mono text-[9px] text-slate-500">{index === 0 && latency ? `${latency}ms` : status.toUpperCase()}</p></div>)}
      </div>
    </div>
  );
}
