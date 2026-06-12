"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.3 });
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.09), transparent 72%)`;

  return (
    <div onPointerMove={(event) => { mouseX.set(event.clientX); mouseY.set(event.clientY); }}>
      <motion.div className="fixed inset-x-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-blue-600 via-cyan-400 to-lime-400" style={{ scaleX: progress }} />
      <motion.div className="pointer-events-none fixed inset-0 z-40 hidden lg:block" style={{ background: spotlight }} />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
