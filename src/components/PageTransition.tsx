import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps page content with a subtle fade-slide entrance animation.
 * Use inside each route component or around <Outlet>.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
