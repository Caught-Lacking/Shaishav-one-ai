import { motion } from "framer-motion";
import shaishavLogo from "@/assets/shaishav-logo.svg";

/**
 * Full-screen brand splash shown for ~3 seconds on app load.
 * Uses the uploaded logo image exactly as it is — the gold peacock emblem
 * with the SHAISHAV wordmark — centered on the deep royal-blue background,
 * with rotating rings around it.
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
            "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(110,125,255,0.22), transparent 70%)",
        }}
      />

      {/* rotating rings around the logo */}
      <div className="relative flex items-center justify-center">
        <span className="ring-spin absolute size-56 rounded-full border-2 border-dashed border-amber-300/50 sm:size-64" />
        <span className="ring-spin-reverse absolute size-64 rounded-full border border-amber-200/30 sm:size-72" />
        <span
          className="ring-spin absolute size-64 rounded-full sm:size-72"
          style={{
            border: "2px dotted rgba(255,210,92,0.35)",
            animationDuration: "9s",
          }}
        />
        <motion.img
          src={shaishavLogo}
          alt="SHAISHAV ONE AI"
          initial={{ scale: 0.88, opacity: 0.35 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 block w-64 object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.45)] sm:w-80"
          draggable={false}
        />
      </div>

      {/* tagline below the logo */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="relative z-10 mt-8 text-[11px] font-semibold uppercase tracking-[0.34em] text-indigo-200/80 sm:text-xs"
      >
        NEET · JEE · NCERT study notebook
      </motion.p>
    </motion.div>
  );
}
