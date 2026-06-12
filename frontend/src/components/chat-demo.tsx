"use client";

import { LoaderCircle, MessageSquareText, Send, Wifi, WifiOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { API_URL, apiRequest, createDemoCredentials } from "@/lib/api";

type Message = { type: string; user?: string; content?: string; timestamp: string; online?: string[] };

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [online, setOnline] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [connecting, setConnecting] = useState(true);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let active = true;
    async function connect() {
      try {
        const credentials = createDemoCredentials("chat");
        const auth = await apiRequest<{ token: string }>("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(credentials)
        });
        if (!active) return;
        const socket = new WebSocket(`${API_URL.replace(/^http/, "ws")}/ws?token=${auth.token}`);
        socketRef.current = socket;
        socket.onopen = () => { setConnected(true); setConnecting(false); };
        socket.onclose = () => setConnected(false);
        socket.onmessage = (event) => {
          const message = JSON.parse(event.data) as Message;
          if (message.type === "presence") setOnline(message.online ?? []);
          else setMessages((current) => [...current, message]);
        };
      } catch {
        setConnecting(false);
      }
    }
    void connect();
    return () => {
      active = false;
      socketRef.current?.close();
    };
  }, []);

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const value = content.trim();
    if (!value || socketRef.current?.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify({ content: value }));
    setContent("");
  }

  return (
    <div className="grid min-h-[620px] overflow-hidden border border-white/10 bg-slate-950 text-white shadow-panel lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-white/10 bg-white/[0.04] p-5 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Presence</p>
          {connecting ? <LoaderCircle className="h-4 w-4 animate-spin text-cyan-200" /> : connected ? <Wifi className="h-4 w-4 text-emerald-300" /> : <WifiOff className="h-4 w-4 text-rose-300" />}
        </div>
        <p className="mt-2 text-xs text-slate-500">{connected ? "WebSocket connected" : "Connecting to Railway..."}</p>
        <div className="mt-6 space-y-2">
          {online.map((name) => <div key={name} className="flex items-center gap-3 border border-white/10 bg-white/[0.05] p-3 text-sm font-bold"><span className="h-2 w-2 rounded-full bg-emerald-300" />{name}</div>)}
        </div>
        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-xs leading-6 text-slate-500">Open this demo in another tab to see live presence and message broadcasting through Go channels.</p>
        </div>
      </aside>

      <section className="flex min-h-[620px] flex-col">
        <header className="flex items-center gap-3 border-b border-white/10 p-5">
          <MessageSquareText className="h-5 w-5 text-cyan-200" />
          <div><p className="text-sm font-black">General Go Room</p><p className="text-[11px] text-slate-500">Live broadcast hub</p></div>
        </header>
        <div className="flex-1 space-y-3 overflow-auto p-5">
          {messages.map((message, index) => (
            <div key={`${message.timestamp}-${index}`} className={message.type === "system" ? "text-center text-xs font-bold text-cyan-200/70" : "max-w-xl border-l-2 border-cyanGo bg-white/[0.05] p-4"}>
              {message.type === "system" ? message.content : <><p className="text-xs font-black text-cyan-200">{message.user}</p><p className="mt-2 text-sm text-slate-200">{message.content}</p></>}
            </div>
          ))}
          {!messages.length && <div className="grid h-full place-items-center text-center text-sm text-slate-500">Connected messages will appear here.</div>}
        </div>
        <form onSubmit={sendMessage} className="grid grid-cols-[1fr_auto] gap-3 border-t border-white/10 p-4">
          <input value={content} onChange={(event) => setContent(event.target.value)} placeholder="Broadcast a message..." className="h-12 border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none focus:border-cyanGo" />
          <button type="submit" disabled={!connected} className="grid h-12 w-12 place-items-center bg-cyanGo text-slate-950 transition hover:bg-cyan-300 disabled:opacity-40" aria-label="Send message"><Send className="h-4 w-4" /></button>
        </form>
      </section>
    </div>
  );
}
