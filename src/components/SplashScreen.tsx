import { motion } from "framer-motion";
import shaishavLogo from "@/assets/shaishav-logo.svg";

/**
 * Full-screen brand splash shown for ~3 seconds on app load.
 * Uses the uploaded logo image exactly as it is — the gold "1" emblem inside
 * the gold/blue ring on the dark navy background — with rotating rings around
 * it, then fades into the stream picker / app.
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

      {/* rotating rings around the logo */}
      <div className="relative flex items-center justify-center">
        <span className="ring-spin absolute size-60 rounded-full border-2 border-dashed border-amber-300/40 sm:size-72" />
        <span className="ring-spin-reverse absolute size-68 rounded-full border border-indigo-300/25 sm:size-80" />
        <span
          className="ring-spin absolute size-68 rounded-full sm:size-80"
          style={{
            border: "2px dotted rgba(246,196,69,0.3)",
            animationDuration: "9s",
          }}
        />
        <motion.img
          src={shaishavLogo}
          alt="SHAISHAV ONE AI"
          initial={{ scale: 0.88, opacity: 0.35 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 block w-64 rounded-2xl object-cover shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] sm:w-80"
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
        SHAISHAV ONE AI · NEET · JEE
      </motion.p>
    </motion.div>
  );
}
