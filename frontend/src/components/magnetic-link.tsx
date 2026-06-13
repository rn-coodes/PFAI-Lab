"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export function MagneticLink({ href, className, children, target }: { href: string; className?: string; children: ReactNode; target?: string }) {
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  function move(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.16);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x, y }} onMouseMove={move} onMouseLeave={reset} whileHover={{ scale: 1.035 }} whileTap={{ scale: 0.97 }}>
      <Link href={href} target={target} className={className}>{children}</Link>
    </motion.div>
  );
}
