"use client";

import { motion } from "framer-motion";

const items = ["GO 1.26", "GIN", "JWT", "WEBSOCKETS", "GOROUTINES", "CHANNELS", "SQLITE", "NEXT.JS 15", "RAILWAY"];

export function TechMarquee() {
  return (
    <div className="overflow-hidden border-y border-slate-200/80 bg-white/50 py-3 dark:border-white/10 dark:bg-white/[0.03]">
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center">
            <span className="px-7 font-mono text-xs font-black tracking-[0.16em] text-slate-500 dark:text-slate-400">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyanGo" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
