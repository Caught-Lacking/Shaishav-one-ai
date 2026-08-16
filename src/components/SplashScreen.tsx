import { motion } from "framer-motion";
import shaishavLogo from "@/assets/shaishav-logo.svg";

/**
 * Full-screen brand splash shown for ~3 seconds on app load.
 * Deep royal-blue background with the gold Shaishav emblem, rotating
 * dashed rings around it, and the "SHAISHAV ONE AI" wordmark below.
 */
export function SplashScreen() {
  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#251c6c" }}
      aria-hidden
    >
      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(90,110,255,0.28), transparent 70%)",
        }}
      />

      {/* rotating rings around the emblem */}
      <div className="relative flex items-center justify-center">
        <span className="ring-spin absolute size-44 rounded-full border-2 border-dashed border-amber-300/50" />
        <span className="ring-spin-reverse absolute size-56 rounded-full border border-amber-200/30" />
        <span
          className="ring-spin absolute size-56 rounded-full"
          style={{
            border: "2px dotted rgba(255,210,92,0.35)",
            animationDuration: "9s",
          }}
        />
        <motion.img
          src={shaishavLogo}
          alt="Shaishav One AI"
          width={230}
          height={167}
          initial={{ scale: 0.86, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
        />
      </div>

      {/* wordmark below the emblem */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="relative z-10 mt-7 font-display text-lg font-bold tracking-[0.42em] text-amber-200/90"
      >
        SHAISHAV ONE AI
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative z-10 mt-2 text-[11px] font-medium uppercase tracking-[0.3em] text-indigo-200/70"
      >
        NEET · JEE · NCERT study notebook
      </motion.p>
    </motion.div>
  );
}
