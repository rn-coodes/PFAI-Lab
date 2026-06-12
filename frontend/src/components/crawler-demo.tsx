"use client";

import { Globe2, LoaderCircle, Play, Timer, Waypoints } from "lucide-react";
import { useState } from "react";
import { apiRequest, createDemoCredentials } from "@/lib/api";

type CrawlResult = { url: string; title: string; status: number; links: number; elapsedMs: number; error?: string };
type CrawlResponse = { rootUrl: string; results: CrawlResult[]; crawled: number; failed: number; durationMs: number };

export function CrawlerDemo() {
  const [url, setUrl] = useState("https://example.com");
  const [result, setResult] = useState<CrawlResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function crawl() {
    setLoading(true);
    setError("");
    try {
      const credentials = createDemoCredentials("crawler");
      const auth = await apiRequest<{ token: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(credentials)
      });
      const response = await apiRequest<CrawlResponse>("/api/crawler/crawl", {
        method: "POST",
        headers: { Authorization: `Bearer ${auth.token}` },
        body: JSON.stringify({ url, maxPages: 8 })
      });
      setResult(response);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Crawl failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section className="border border-slate-200/80 bg-white/70 p-4 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="relative">
            <Globe2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-600" />
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="h-14 w-full border border-slate-200 bg-white pl-12 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-cyanGo dark:border-white/10 dark:bg-slate-950 dark:text-white"
              placeholder="https://example.com"
            />
          </label>
          <button
            type="button"
            onClick={() => void crawl()}
            disabled={loading}
            className="inline-flex h-14 items-center justify-center gap-2 bg-cyanGo px-7 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Crawl URL
          </button>
        </div>
        {error && <p className="mt-4 border border-rose-300/30 bg-rose-500/10 p-3 text-sm font-bold text-rose-600 dark:text-rose-200">{error}</p>}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <section className="min-h-96 border border-white/10 bg-slate-950 p-6 text-white shadow-panel">
          <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Concurrent worker map</p>
          <div className="relative mt-8 min-h-72">
            {(result?.results ?? Array.from({ length: loading ? 6 : 0 })).map((item, index) => (
              <div
                key={"url" in Object(item) ? (item as CrawlResult).url : index}
                className="absolute grid h-12 w-12 place-items-center rounded-full border border-cyanGo/50 bg-cyanGo/15 text-xs font-black text-cyan-100 shadow-glow"
                style={{
                  left: `${12 + ((index * 31) % 72)}%`,
                  top: `${8 + ((index * 37) % 68)}%`,
                  animation: loading ? `pulse ${1.2 + index * 0.1}s infinite` : undefined
                }}
              >
                {index + 1}
              </div>
            ))}
            {!result && !loading && <div className="grid min-h-72 place-items-center text-center text-sm text-slate-500">Enter a URL to activate the Go worker pool.</div>}
          </div>
        </section>

        <section className="border border-slate-200/80 bg-white/70 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
          <div className="grid grid-cols-3 border-b border-slate-200/80 dark:border-white/10">
            <Metric icon={<Waypoints className="h-4 w-4" />} label="Crawled" value={String(result?.crawled ?? 0)} />
            <Metric icon={<Timer className="h-4 w-4" />} label="Duration" value={`${result?.durationMs ?? 0}ms`} />
            <Metric icon={<Globe2 className="h-4 w-4" />} label="Failed" value={String(result?.failed ?? 0)} />
          </div>
          <div className="max-h-[420px] overflow-auto">
            {result?.results.map((page, index) => (
              <div key={page.url} className="grid grid-cols-[42px_1fr_auto] gap-3 border-b border-slate-200/70 p-4 last:border-0 dark:border-white/10">
                <span className="font-mono text-xs font-black text-cyan-700 dark:text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-900 dark:text-white">{page.title || page.url}</p>
                  <p className="mt-1 truncate font-mono text-[11px] text-slate-500">{page.url}</p>
                </div>
                <span className="text-right text-xs font-black text-emerald-600 dark:text-emerald-300">{page.status || "ERR"}<br />{page.links} links</span>
              </div>
            ))}
            {!result && <div className="grid min-h-72 place-items-center text-sm text-slate-500">Crawl results will stream into this panel.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="p-4"><p className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-400">{icon}{label}</p><p className="mt-2 text-xl font-black text-slate-950 dark:text-white">{value}</p></div>;
}
