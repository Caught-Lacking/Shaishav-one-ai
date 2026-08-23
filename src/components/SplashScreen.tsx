import { motion } from "framer-motion";

/**
 * Full-screen brand splash shown for ~3 seconds on app load.
 * No logo — just the "One AI" wordmark with rotating rings
 * and a progress bar, then it fades into the stream picker / app.
 */
export function SplashScreen() {
  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#070b1d" }}
      aria-hidden
    >
      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(80,105,220,0.28), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* small tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center text-[11px] font-semibold uppercase tracking-[0.5em] text-indigo-200/70"
        >
          NEET · JEE · NCERT study notebook
        </motion.p>

        {/* wordmark with rotating rings */}
        <div className="relative mt-6 flex items-center justify-center">
          {/* outer ring */}
          <span className="ring-spin absolute size-28 rounded-full border border-dashed border-amber-400/25 sm:size-32" />
          {/* middle ring */}
          <span className="ring-spin-reverse absolute size-20 rounded-full border border-violet-400/20 sm:size-24" />
          {/* inner glow dot */}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute size-2 rounded-full bg-amber-400/60"
          />
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl"
          >            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
            One AI
          </span>
          </motion.h1>
        </div>

        {/* progress bar */}
        <div className="mt-10 h-1 w-56 overflow-hidden rounded-full bg-white/10 sm:w-64">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.6, ease: "easeInOut", delay: 0.2 }}
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-violet-400"
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-200/50"
        >
          Loading your study notebook…
        </motion.p>
      </div>
    </motion.div>
  );
}
