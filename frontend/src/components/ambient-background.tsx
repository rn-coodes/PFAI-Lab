"use client";

import { motion } from "framer-motion";

const nodes = [
  { left: "8%", top: "18%", delay: 0, duration: 8 },
  { left: "22%", top: "72%", delay: 1.4, duration: 10 },
  { left: "48%", top: "26%", delay: 0.6, duration: 9 },
  { left: "70%", top: "78%", delay: 2.1, duration: 11 },
  { left: "88%", top: "20%", delay: 1, duration: 8.5 }
];

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,173,216,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,173,216,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      {nodes.map((node, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyanGo shadow-[0_0_20px_rgba(0,173,216,0.9)]"
          style={{ left: node.left, top: node.top }}
          animate={{ y: [0, -28, 0], x: [0, 14, 0], opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: node.duration, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="absolute left-[12%] top-[22%] h-px w-[34%] origin-left rotate-[14deg] bg-gradient-to-r from-transparent via-cyanGo/25 to-transparent"
        animate={{ opacity: [0.1, 0.5, 0.1], scaleX: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] top-[58%] h-px w-[42%] origin-right -rotate-[18deg] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"
        animate={{ opacity: [0.12, 0.45, 0.12], scaleX: [1, 0.65, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
