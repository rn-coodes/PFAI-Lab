"use client";

import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#f7f9fc]" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.045)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <motion.div
        className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl"
        animate={{ x: [0, 70, 0], y: [0, 35, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-[35%] h-80 w-80 rounded-full bg-violet-200/30 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -45, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-[35%] h-64 w-64 rounded-full bg-lime-200/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
