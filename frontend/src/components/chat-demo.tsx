"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, CheckCheck, ChevronDown, Hash, LoaderCircle, MessageSquareText, Plus, Search, Send, Smile, Users, Wifi, WifiOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { API_URL, apiRequest, createDemoCredentials } from "@/lib/api";

type Message = { type: string; user?: string; content?: string; timestamp: string; online?: string[] };
const starter = [
  { user: "Maya Chen", content: "The WebSocket hub is handling the new presence events perfectly.", timestamp: "10:24" },
  { user: "Omar Ali", content: "Nice. I just tested message fan-out across three browser tabs.", timestamp: "10:26" },
  { user: "Rehan", content: "Great. Railway latency is holding below 25ms.", timestamp: "10:28" }
];
const rooms = [["general-go", 4], ["backend-lab", 2], ["releases", 0], ["random", 0]];

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>(starter.map((item) => ({ ...item, type: "message" })));
  const [online, setOnline] = useState<string[]>(["Rehan Demo", "Maya Chen", "Omar Ali", "Go Worker"]);
  const [content, setContent] = useState("");
  const [connecting, setConnecting] = useState(true);
  const [connected, setConnected] = useState(false);
  const [toast, setToast] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let active = true;
    async function connect() {
      try {
        const credentials = createDemoCredentials("chat");
        const auth = await apiRequest<{ token: string }>("/api/auth/register", { method: "POST", body: JSON.stringify(credentials) });
        if (!active) return;
        const socket = new WebSocket(`${API_URL.replace(/^http/, "ws")}/ws?token=${auth.token}`);
        socketRef.current = socket;
        socket.onopen = () => { setConnected(true); setConnecting(false); };
        socket.onclose = () => setConnected(false);
        socket.onmessage = (event) => {
          const message = JSON.parse(event.data) as Message;
          if (message.type === "presence") setOnline((current) => message.online?.length ? message.online : current);
          else setMessages((current) => [...current, message]);
        };
      } catch { setConnecting(false); }
    }
    void connect();
    return () => { active = false; socketRef.current?.close(); };
  }, []);

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const value = content.trim();
    if (!value) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) socketRef.current.send(JSON.stringify({ content: value }));
    else setMessages((current) => [...current, { type: "message", user: "Rehan Demo", content: value, timestamp: new Date().toISOString() }]);
    setContent("");
    setToast(true);
    window.setTimeout(() => setToast(false), 2200);
  }

  return (
    <div className="relative grid min-h-[720px] min-w-0 max-w-full overflow-hidden rounded-md border border-slate-800 bg-[#101827] text-white shadow-2xl lg:grid-cols-[230px_1fr_230px]">
      <AnimatePresence>{toast && <motion.div className="absolute right-5 top-5 z-30 flex items-center gap-2 rounded-md bg-emerald-400 px-4 py-3 text-xs font-black text-emerald-950 shadow-xl" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><CheckCheck className="h-4 w-4" /> Message delivered</motion.div>}</AnimatePresence>

      <aside className="hidden border-r border-white/10 bg-[#111b2e] p-4 lg:block">
        <div className="flex items-center justify-between"><div><p className="font-black">Go Systems</p><p className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Live workspace</p></div><ChevronDown className="h-4 w-4 text-slate-400" /></div>
        <button className="mt-5 flex h-10 w-full items-center gap-2 rounded-md bg-white/[0.06] px-3 text-xs font-bold text-slate-400"><Search className="h-4 w-4" /> Search messages</button>
        <div className="mt-7 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em] text-slate-500"><span>Channels</span><Plus className="h-3.5 w-3.5" /></div>
        <div className="mt-3 space-y-1">{rooms.map(([room, count], index) => <button key={room} className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-xs font-bold ${index === 0 ? "bg-cyan-400/15 text-cyan-200" : "text-slate-400 hover:bg-white/[0.04]"}`}><span className="flex items-center gap-2"><Hash className="h-3.5 w-3.5" />{room}</span>{Number(count) > 0 && <span className="rounded-full bg-cyan-300 px-1.5 py-0.5 text-[9px] text-slate-950">{count}</span>}</button>)}</div>
        <div className="mt-8 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Direct messages</div>
        <div className="mt-3 space-y-3">{online.slice(0, 3).map((name, index) => <div key={name} className="flex items-center gap-3 text-xs font-bold text-slate-300"><span className={`grid h-7 w-7 place-items-center rounded-md ${["bg-violet-400", "bg-amber-300", "bg-cyan-300"][index]} text-[10px] font-black text-slate-950`}>{name.slice(0, 1)}</span><span className="relative">{name}<span className="absolute -bottom-0.5 -right-3 h-2 w-2 rounded-full border border-[#111b2e] bg-emerald-300" /></span></div>)}</div>
      </aside>

      <section className="flex min-w-0 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
          <div><p className="flex items-center gap-2 text-sm font-black"><Hash className="h-4 w-4 text-cyan-300" /> general-go</p><p className="mt-1 text-[10px] text-slate-500">Go backend engineering and live system updates</p></div>
          <div className="flex items-center gap-3">{connecting ? <LoaderCircle className="h-4 w-4 animate-spin text-cyan-200" /> : connected ? <Wifi className="h-4 w-4 text-emerald-300" /> : <WifiOff className="h-4 w-4 text-amber-300" />}<Users className="h-4 w-4 text-slate-400" /><Bell className="h-4 w-4 text-slate-400" /></div>
        </header>
        <div className="min-w-0 flex-1 space-y-1 overflow-auto p-4 sm:p-6">
          <div className="mb-7"><span className="grid h-14 w-14 place-items-center rounded-lg bg-cyan-300 text-xl font-black text-slate-950">#</span><h2 className="mt-4 text-2xl font-black">Welcome to #general-go</h2><p className="mt-2 text-sm text-slate-400">This is the start of the live Go systems channel.</p></div>
          <AnimatePresence initial={false}>{messages.map((message, index) => message.type === "system" ? <motion.div key={`${message.timestamp}-${index}`} className="py-3 text-center text-[11px] font-bold text-cyan-200/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{message.content}</motion.div> : <motion.div key={`${message.timestamp}-${index}`} className="group flex min-w-0 max-w-full gap-3 rounded-md px-2 py-3 hover:bg-white/[0.035]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${index % 3 === 0 ? "bg-cyan-300" : index % 3 === 1 ? "bg-violet-400" : "bg-amber-300"} text-xs font-black text-slate-950`}>{message.user?.slice(0, 1)}</span><div className="min-w-0 max-w-full"><div className="flex min-w-0 items-center gap-2"><p className="truncate text-xs font-black">{message.user}</p><span className="shrink-0 text-[9px] text-slate-600">{formatTime(message.timestamp)}</span></div><p className="mt-1 max-w-full break-words text-sm leading-6 text-slate-300 [overflow-wrap:anywhere]">{message.content}</p><div className="mt-2 flex gap-2 opacity-0 transition group-hover:opacity-100"><span className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px]">+1</span><span className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px]">Go</span></div></div></motion.div>)}</AnimatePresence>
          <motion.div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }}><span className="flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-cyan-300" /><i className="h-1.5 w-1.5 rounded-full bg-cyan-300" /><i className="h-1.5 w-1.5 rounded-full bg-cyan-300" /></span> Go Worker is processing events</motion.div>
        </div>
        <form onSubmit={sendMessage} className="p-4 sm:p-6">
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.045] p-2 focus-within:border-cyan-400/60"><input value={content} onChange={(event) => setContent(event.target.value)} placeholder="Message #general-go" className="h-10 min-w-0 w-full bg-transparent px-2 text-sm text-white outline-none" /><div className="flex items-center justify-between border-t border-white/10 px-2 pt-2"><div className="flex items-center gap-3 text-slate-500"><Plus className="h-4 w-4" /><Smile className="h-4 w-4" /><MessageSquareText className="h-4 w-4" /></div><button type="submit" className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-cyan-300 text-slate-950 transition hover:scale-105" aria-label="Send message"><Send className="h-3.5 w-3.5" /></button></div></div>
        </form>
      </section>

      <aside className="hidden border-l border-white/10 bg-[#111b2e] p-4 xl:block">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Channel details</p><div className="mt-5 rounded-md bg-white/[0.04] p-4"><p className="text-xs font-black">General Go Room</p><p className="mt-2 text-[11px] leading-5 text-slate-500">Authenticated WebSocket broadcast hub powered by Go channels.</p></div>
        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{online.length} members online</p><div className="mt-4 space-y-4">{online.map((name, index) => <div key={name} className="flex items-center gap-3"><span className={`grid h-8 w-8 place-items-center rounded-md ${index % 2 ? "bg-violet-400" : "bg-cyan-300"} text-xs font-black text-slate-950`}>{name.slice(0, 1)}</span><div><p className="text-xs font-bold">{name}</p><p className="mt-0.5 text-[9px] text-emerald-300">Online</p></div></div>)}</div>
      </aside>
    </div>
  );
}

function formatTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
