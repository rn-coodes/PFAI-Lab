"use client";

import { useCallback, useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

export type Telemetry = {
  status: string;
  startedAt: string;
  uptimeSeconds: number;
  requests: number;
  goroutines: number;
  memoryMB: number;
  activeWebSockets: number;
  deliveredMessages: number;
  crawlerMaxWorkers: number;
  goVersion: string;
};

export function useTelemetry(refreshMs = 15_000) {
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const started = performance.now();
    try {
      const response = await fetch(`${API_URL}/api/telemetry`, { cache: "no-store" });
      if (!response.ok) throw new Error("Telemetry unavailable");
      setTelemetry((await response.json()) as Telemetry);
      setLatency(Math.round(performance.now() - started));
    } catch {
      setTelemetry(null);
      setLatency(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(refresh, refreshMs);
    return () => window.clearInterval(timer);
  }, [refresh, refreshMs]);

  return { telemetry, latency, loading, refresh };
}

export function formatUptime(seconds?: number) {
  if (seconds === undefined) return "--";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}
