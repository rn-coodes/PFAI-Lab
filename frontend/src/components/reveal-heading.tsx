"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function RevealHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: "105%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
