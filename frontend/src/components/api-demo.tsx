"use client";

import { CheckCircle2, KeyRound, LoaderCircle, Play, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { apiRequest, createDemoCredentials } from "@/lib/api";

type AuthResponse = {
  token: string;
  user: { id: number; name: string; email: string; createdAt: string };
};

export function ApiDemo() {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<AuthResponse["user"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [log, setLog] = useState<string[]>(["Ready to execute secure authentication flow."]);

  async function runFlow() {
    setLoading(true);
    setError("");
    setProfile(null);
    const credentials = createDemoCredentials("jwt");
    try {
      setLog(["POST /api/auth/register", `Creating ${credentials.email}`]);
      const auth = await apiRequest<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(credentials)
      });
      setToken(auth.token);
      setLog((current) => [...current, "201 Created · JWT issued", "GET /api/profile · Bearer token attached"]);
      const result = await apiRequest<{ user: AuthResponse["user"] }>("/api/profile", {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setProfile(result.user);
      setLog((current) => [...current, "200 OK · Protected profile returned"]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="border border-slate-200/80 bg-white/70 p-6 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
        <KeyRound className="h-8 w-8 text-cyan-600 dark:text-cyan-200" />
        <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">JWT Flow Runner</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Creates a temporary account, receives a signed token, then uses it to access a protected Go endpoint.
        </p>
        <button
          type="button"
          onClick={() => void runFlow()}
          disabled={loading}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-cyanGo px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          Run Live Auth Flow
        </button>
        {error && <p className="mt-4 border border-rose-300/30 bg-rose-500/10 p-3 text-sm font-bold text-rose-600 dark:text-rose-200">{error}</p>}
      </section>

      <section className="overflow-hidden border border-white/10 bg-slate-950 text-white shadow-panel">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="font-mono text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Live Request Console</span>
          <span className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            Railway online
          </span>
        </div>
        <div className="grid min-h-96 gap-px bg-white/10 md:grid-cols-2">
          <div className="bg-slate-950 p-5 font-mono text-xs leading-7 text-slate-300">
            {log.map((entry, index) => (
              <p key={`${entry}-${index}`} className={entry.includes("200") || entry.includes("201") ? "text-emerald-300" : ""}>
                <span className="mr-3 text-slate-600">{String(index + 1).padStart(2, "0")}</span>
                {entry}
              </p>
            ))}
          </div>
          <div className="bg-slate-900 p-5">
            {profile ? (
              <div>
                <CheckCircle2 className="h-8 w-8 text-emerald-300" />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Authenticated profile</p>
                <div className="mt-5 space-y-4">
                  <DataLine icon={<UserRound className="h-4 w-4" />} label="Name" value={profile.name} />
                  <DataLine icon={<ShieldCheck className="h-4 w-4" />} label="Email" value={profile.email} />
                  <DataLine icon={<KeyRound className="h-4 w-4" />} label="JWT" value={`${token.slice(0, 28)}...`} />
                </div>
              </div>
            ) : (
              <div className="grid h-full place-items-center text-center text-sm text-slate-500">Run the flow to inspect the protected response.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function DataLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border-l-2 border-cyanGo/50 pl-3">
      <p className="flex items-center gap-2 text-xs font-bold text-slate-500">{icon}{label}</p>
      <p className="mt-1 break-all font-mono text-xs text-slate-200">{value}</p>
    </div>
  );
}
