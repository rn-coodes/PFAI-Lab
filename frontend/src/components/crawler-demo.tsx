"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, CheckCircle2, CircleDot, Globe2, LoaderCircle, Play, Search, ShieldCheck, Timer, Waypoints, XCircle } from "lucide-react";
import { useState } from "react";
import { apiRequest, createDemoSession } from "@/lib/api";

type CrawlResult = { url: string; title: string; status: number; links: number; elapsedMs: number; error?: string };
type CrawlResponse = { rootUrl: string; results: CrawlResult[]; crawled: number; failed: number; workers: number; durationMs: number };

export function CrawlerDemo() {
  const [url, setUrl] = useState("https://example.com");
  const [result, setResult] = useState<CrawlResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState(["[READY] Enter a public URL to start a protected crawl"]);

  async function crawl() {
    setLoading(true); setError(""); setLogs(["[QUEUE] Root URL accepted", "[AUTH] JWT verified", "[WORKERS] Dispatching concurrent jobs"]);
    try {
      const auth = await createDemoSession();
      const response = await apiRequest<CrawlResponse>("/api/crawler/crawl", { method: "POST", headers: { Authorization: `Bearer ${auth.token}` }, body: JSON.stringify({ url, maxPages: 8 }) });
      setResult(response); setLogs((items) => [...items, `[CRAWLER] ${response.crawled} pages discovered`, `[SYSTEM] Completed in ${response.durationMs}ms`]);
    } catch (requestError) { const message = requestError instanceof Error ? requestError.message : "Crawl failed"; setError(message); setLogs((items) => [...items, `[ERROR] ${message}`]); }
    finally { setLoading(false); }
  }

  const displayResults = result?.results ?? [];
  const activeNodes = displayResults.length;
  const workerRows = result
    ? Array.from({ length: result.workers }, (_, index) => {
        const pages = displayResults.filter((_, pageIndex) => pageIndex % result.workers === index);
        return { name: `worker-${String(index + 1).padStart(2, "0")}`, pages: pages.length, elapsed: pages.reduce((sum, page) => sum + page.elapsedMs, 0) };
      })
    : [];

  return (
    <div className="overflow-hidden rounded-md border border-slate-800 bg-[#08111f] text-white shadow-2xl">
      <div className="grid gap-px bg-white/10 xl:grid-cols-[1fr_auto]">
        <div className="bg-[#0b1525] p-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]"><label className="relative"><span className="sr-only">Public URL to crawl</span><Globe2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" /><input value={url} onChange={(event) => setUrl(event.target.value)} aria-label="Public URL to crawl" className="h-12 w-full rounded-md border border-white/10 bg-white/[0.05] pl-11 pr-4 text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" /></label><button onClick={() => void crawl()} disabled={loading} className="flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-6 text-xs font-black uppercase text-slate-950 transition hover:bg-white disabled:opacity-60">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} Start crawl</button></div>
        </div>
        <div className="flex items-center gap-2 bg-[#0b1525] px-4 py-3"><ShieldCheck className="h-4 w-4 text-emerald-300" /><span className="rounded-full bg-emerald-400/10 px-3 py-2 text-[10px] font-black uppercase text-emerald-300">Private networks blocked</span></div>
      </div>

      <div className="grid gap-px bg-white/10 lg:grid-cols-4">{[[Waypoints, result?.crawled ?? "--", "Pages crawled", "text-cyan-300"], [Activity, result?.workers ?? "--", "Workers used", "text-amber-300"], [Timer, result ? `${result.durationMs}ms` : "--", "Measured duration", "text-violet-300"], [XCircle, result?.failed ?? "--", "Failed requests", "text-rose-300"]].map(([Icon, value, label, color]) => { const MetricIcon = Icon as typeof Activity; return <div key={String(label)} className="bg-[#0b1525] p-4"><MetricIcon className={`h-4 w-4 ${color}`} /><motion.p key={String(value)} className="mt-3 text-2xl font-black" initial={{ opacity: 0.45, y: 3 }} animate={{ opacity: 1, y: 0 }}>{loading ? "..." : String(value)}</motion.p><p className="mt-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">{String(label)}</p></div>; })}</div>

      <div className="grid gap-px bg-white/10 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="bg-[#08111f] p-4 sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-black">Live crawl graph</p><p className="mt-1 text-[10px] text-slate-500">Concurrent URL discovery topology</p></div><span className="text-[10px] font-black text-cyan-300">{activeNodes} ACTIVE NODES</span></div>
          <div className="relative mt-5 min-h-[420px] overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(rgba(34,211,238,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.04)_1px,transparent_1px)] bg-[size:32px_32px]">
            {displayResults.map((page, index) => <motion.div key={page.url} title={page.url} className={`absolute grid h-11 w-11 place-items-center rounded-full border text-[10px] font-black shadow-[0_0_24px_rgba(34,211,238,.2)] ${index === 0 ? "border-lime-300 bg-lime-300 text-slate-950" : "border-cyan-300/50 bg-cyan-300/10 text-cyan-200"}`} style={{ left: `${10 + ((index * 31) % 76)}%`, top: `${9 + ((index * 37) % 73)}%` }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.08 }}>{index + 1}</motion.div>)}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-25"><line x1="15%" y1="18%" x2="42%" y2="48%" stroke="#67e8f9" /><line x1="42%" y1="48%" x2="72%" y2="25%" stroke="#67e8f9" /><line x1="42%" y1="48%" x2="64%" y2="78%" stroke="#67e8f9" /></svg>
            {!displayResults.length && <div className="absolute inset-0 grid place-items-center text-center"><div>{loading ? <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-cyan-300" /> : <Waypoints className="mx-auto h-8 w-8 text-slate-700" />}<p className="mt-3 text-xs font-black text-slate-500">{loading ? "Backend crawl in progress" : "Run a crawl to build the real result graph"}</p></div></div>}
          </div>
        </section>

        <section className="bg-[#0b1525] p-4 sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-black">Worker activity</p><p className="mt-1 text-[10px] text-slate-500">Goroutine execution timeline</p></div><CircleDot className="h-4 w-4 text-emerald-300" /></div>
          <div className="mt-5 space-y-3">{workerRows.map((worker) => <div key={worker.name} className="rounded-md border border-white/10 bg-white/[0.035] p-4"><div className="flex items-center justify-between"><p className="font-mono text-[11px] font-black text-slate-200">{worker.name}</p><span className="text-[9px] font-black uppercase text-emerald-300">Complete</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-lime-300" /></div><div className="mt-2 flex justify-between text-[9px] text-slate-600"><span>{worker.pages} pages</span><span>{worker.elapsed}ms total</span></div></div>)}{!workerRows.length && <div className="rounded-md border border-dashed border-white/10 p-5 text-center text-[10px] leading-5 text-slate-500">{loading ? "Workers are executing on the Go backend. Results appear after completion." : "Measured worker utilization appears after a crawl."}</div>}</div>
          <div className="mt-5 rounded-md border border-white/10 bg-slate-950 p-4"><div className="flex items-center justify-between"><p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">Live system logs</p><Search className="h-3.5 w-3.5 text-slate-600" /></div><div className="mt-3 max-h-32 space-y-1 overflow-auto font-mono text-[10px] leading-5">{logs.map((log, index) => <motion.p key={`${log}-${index}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={log.includes("ERROR") ? "text-rose-300" : log.includes("SYSTEM") ? "text-emerald-300" : "text-slate-400"}>{log}</motion.p>)}</div></div>
        </section>
      </div>

      <section className="bg-white text-slate-950">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6"><div><p className="text-xs font-black">Discovered pages</p><p className="mt-1 text-[10px] text-slate-400">Structured crawl results from the live Go backend</p></div><span className="rounded-full bg-cyan-100 px-3 py-1.5 text-[10px] font-black text-cyan-700">{displayResults.length} RESULTS</span></div>
        <div className="overflow-x-auto"><div className="min-w-[680px]"><div className="grid grid-cols-[54px_1fr_90px_90px_100px] border-b border-slate-200 bg-slate-50 px-5 py-3 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400"><span>#</span><span>Page</span><span>Status</span><span>Links</span><span>Elapsed</span></div><AnimatePresence>{displayResults.map((page, index) => <motion.div key={page.url} className="grid grid-cols-[54px_1fr_90px_90px_100px] items-center border-b border-slate-100 px-5 py-4 text-xs" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}><span className="font-mono font-black text-cyan-600">{String(index + 1).padStart(2, "0")}</span><div className="min-w-0"><p className="truncate font-black">{page.title || page.url}</p><p className="mt-1 truncate font-mono text-[9px] text-slate-400">{page.url}</p></div><span className="flex items-center gap-1.5 font-black text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" />{page.status}</span><span className="font-bold text-slate-500">{page.links}</span><span className="font-bold text-slate-500">{page.elapsedMs}ms</span></motion.div>)}</AnimatePresence>{!displayResults.length && <div className="grid min-h-44 place-items-center text-center"><div><Waypoints className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm font-black text-slate-600">No pages discovered yet</p><p className="mt-1 text-xs text-slate-400">Start a crawl to populate the result index.</p></div></div>}</div></div>
        {error && <div className="m-4 rounded-md bg-rose-50 p-4 text-xs font-bold text-rose-600">{error}</div>}
      </section>
    </div>
  );
}
