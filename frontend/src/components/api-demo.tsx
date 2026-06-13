"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Braces, CheckCircle2, ChevronRight, Clock3, Copy, KeyRound, LoaderCircle, LockKeyhole, Play, Plus, Search, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { apiRequest, createDemoCredentials } from "@/lib/api";

type AuthResponse = { token: string; user: { id: number; name: string; email: string; createdAt: string } };
const endpoints = [
  { method: "POST", route: "/api/auth/register", color: "text-amber-600 bg-amber-100" },
  { method: "POST", route: "/api/auth/login", color: "text-amber-600 bg-amber-100" },
  { method: "GET", route: "/api/profile", color: "text-emerald-700 bg-emerald-100" },
  { method: "GET", route: "/api/admin", color: "text-blue-700 bg-blue-100" }
];

export function ApiDemo() {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<AuthResponse["user"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Body");
  const [activeStep, setActiveStep] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const [duration, setDuration] = useState(0);

  async function runFlow() {
    setLoading(true); setError(""); setProfile(null); setActiveStep(0);
    const started = performance.now();
    const credentials = createDemoCredentials("jwt");
    try {
      const auth = await apiRequest<AuthResponse>("/api/auth/register", { method: "POST", body: JSON.stringify(credentials) });
      setToken(auth.token); setHistory((items) => [`POST /auth/register · 201`, ...items]); setActiveStep(1);
      await wait(450); setActiveStep(2);
      const result = await apiRequest<{ user: AuthResponse["user"] }>("/api/profile", { headers: { Authorization: `Bearer ${auth.token}` } });
      setProfile(result.user); setHistory((items) => [`GET /api/profile · 200`, ...items]); setActiveStep(3);
      setDuration(Math.round(performance.now() - started));
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Request failed"); setActiveStep(-1); }
    finally { setLoading(false); }
  }

  return (
    <div className="grid min-h-[760px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-xl lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-slate-200 bg-slate-50 p-4 lg:block">
        <div className="flex items-center justify-between"><p className="text-xs font-black text-slate-950">Go Auth API</p><Plus className="h-4 w-4 text-slate-400" /></div>
        <div className="mt-4 flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-400"><Search className="h-3.5 w-3.5" /> Search endpoints</div>
        <p className="mt-7 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">Authentication</p>
        <div className="mt-3 space-y-1">{endpoints.map((endpoint, index) => <button key={endpoint.route} className={`flex w-full items-center gap-2 rounded-md px-2 py-2.5 text-left ${index === 0 ? "bg-white shadow-sm" : "hover:bg-white"}`}><span className={`rounded px-1.5 py-1 text-[8px] font-black ${endpoint.color}`}>{endpoint.method}</span><span className="truncate font-mono text-[10px] text-slate-600">{endpoint.route}</span></button>)}</div>
        <p className="mt-7 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">Request history</p>
        <div className="mt-3 space-y-2">{history.length ? history.slice(0, 5).map((item) => <motion.div key={item} className="flex items-center gap-2 rounded-md bg-white p-2 text-[10px] font-bold text-slate-600 shadow-sm" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}><Clock3 className="h-3 w-3 text-emerald-500" />{item}</motion.div>) : <p className="text-[10px] leading-5 text-slate-400">Executed requests appear here.</p>}</div>
      </aside>

      <section className="min-w-0 bg-white">
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto]">
            <span className="flex h-11 items-center justify-center rounded-md bg-amber-100 px-4 text-xs font-black text-amber-700">POST</span>
            <div className="flex h-11 min-w-0 items-center rounded-md border border-slate-200 bg-slate-50 px-4 font-mono text-xs text-slate-600"><span className="truncate">railway.app/api/auth/register</span></div>
            <button onClick={() => void runFlow()} disabled={loading} className="flex h-11 items-center justify-center gap-2 rounded-md bg-blue-600 px-6 text-xs font-black text-white transition hover:bg-slate-950 disabled:opacity-60">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send</button>
          </div>
          <div className="mt-5 flex gap-6 overflow-auto border-b border-slate-200">{["Params", "Authorization", "Headers", "Body"].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`relative pb-3 text-xs font-bold ${activeTab === tab ? "text-blue-600" : "text-slate-400"}`}>{tab}{activeTab === tab && <motion.span layoutId="api-tab" className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />}</button>)}</div>
          <div className="mt-5 min-h-40 rounded-md border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-7 text-slate-300"><p><span className="text-violet-300">{"{"}</span></p><p className="pl-4"><span className="text-cyan-300">&quot;name&quot;</span>: <span className="text-lime-300">&quot;Rehan Demo&quot;</span>,</p><p className="pl-4"><span className="text-cyan-300">&quot;email&quot;</span>: <span className="text-lime-300">&quot;jwt-demo@example.com&quot;</span>,</p><p className="pl-4"><span className="text-cyan-300">&quot;password&quot;</span>: <span className="text-lime-300">&quot;••••••••••&quot;</span></p><p><span className="text-violet-300">{"}"}</span></p></div>
        </div>

        <div className="grid gap-px bg-slate-200 xl:grid-cols-[1fr_0.72fr]">
          <div className="bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between"><div className="flex items-center gap-3"><p className="text-xs font-black text-slate-950">Response</p>{profile && <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black text-emerald-700">200 OK</span>}</div><div className="flex items-center gap-3 text-[10px] font-bold text-slate-400"><span>{duration || 0}ms</span><Copy className="h-3.5 w-3.5" /></div></div>
            <AnimatePresence mode="wait">
              {error ? <motion.div className="mt-5 rounded-md bg-rose-50 p-5 text-sm font-bold text-rose-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div> : profile ? <motion.div key="response" className="mt-5 min-h-72 rounded-md bg-slate-950 p-5 font-mono text-xs leading-7 text-slate-300" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><p className="text-violet-300">{"{"}</p><p className="pl-4"><span className="text-cyan-300">&quot;authenticated&quot;</span>: <span className="text-emerald-300">true</span>,</p><p className="pl-4"><span className="text-cyan-300">&quot;user&quot;</span>: {"{"}</p><p className="pl-8"><span className="text-cyan-300">&quot;name&quot;</span>: <span className="text-lime-300">&quot;{profile.name}&quot;</span>,</p><p className="pl-8"><span className="text-cyan-300">&quot;email&quot;</span>: <span className="text-lime-300">&quot;{profile.email}&quot;</span></p><p className="pl-4">{"}"},</p><p className="pl-4"><span className="text-cyan-300">&quot;token&quot;</span>: <span className="break-all text-lime-300">&quot;{token.slice(0, 42)}...&quot;</span></p><p className="text-violet-300">{"}"}</p></motion.div> : <motion.div key="empty" className="mt-5 grid min-h-72 place-items-center rounded-md border border-dashed border-slate-200 bg-slate-50 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div><Braces className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm font-black text-slate-600">Ready to send</p><p className="mt-1 text-xs text-slate-400">Execute the authentication flow to inspect JSON.</p></div></motion.div>}
            </AnimatePresence>
          </div>

          <div className="bg-slate-50 p-4 sm:p-5">
            <p className="text-xs font-black text-slate-950">Authentication pipeline</p><p className="mt-1 text-[10px] text-slate-400">Live middleware trace</p>
            <div className="relative mt-7 space-y-3"><span className="absolute bottom-6 left-5 top-6 w-px bg-slate-200" />{[[Play, "Register account", "POST request accepted"], [KeyRound, "Issue JWT", "HS256 token generated"], [ShieldCheck, "Validate middleware", "Bearer token verified"], [CheckCircle2, "Protected response", "Profile returned"]].map(([Icon, title, copy], index) => { const StepIcon = Icon as typeof Play; const complete = activeStep >= index; return <motion.div key={String(title)} className={`relative flex gap-4 rounded-md border p-3 ${complete ? "border-emerald-200 bg-white" : "border-slate-200 bg-slate-100"}`} animate={{ x: activeStep === index ? [0, 4, 0] : 0 }}><motion.span className={`z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ${complete ? "bg-emerald-400 text-emerald-950" : "bg-white text-slate-400"}`} animate={{ scale: activeStep === index ? [1, 1.12, 1] : 1 }}><StepIcon className="h-4 w-4" /></motion.span><div><p className="text-xs font-black text-slate-800">{String(title)}</p><p className="mt-1 text-[10px] text-slate-400">{String(copy)}</p></div><ChevronRight className={`ml-auto h-4 w-4 ${complete ? "text-emerald-500" : "text-slate-300"}`} /></motion.div>; })}</div>
            <button onClick={() => void runFlow()} className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-600"><LockKeyhole className="h-4 w-4" /> Replay secure flow</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function wait(ms: number) { return new Promise((resolve) => window.setTimeout(resolve, ms)); }
