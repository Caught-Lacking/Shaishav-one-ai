import { motion } from "framer-motion";
import { ArrowRight, Atom, Stethoscope, Wrench } from "lucide-react";
import { useNavigate } from "react-router";
import { Brand } from "@/components/Brand";
import { cn } from "@/lib/utils";
import { getStreamSubjects, streams, type StreamId } from "@/lib/curriculum";

function PickCard({
  streamId,
  onPick,
  delay,
}: {
  streamId: StreamId;
  onPick: (id: StreamId) => void;
  delay: number;
}) {
  const stream = streams[streamId];
  const isNeet = streamId === "neet";
  const subjectDefs = getStreamSubjects(streamId);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.012 }}
      onClick={() => onPick(streamId)}
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border/70 bg-white p-6 text-left shadow-[0_18px_45px_-18px_rgba(60,40,120,0.25)] transition-shadow hover:shadow-[0_24px_60px_-20px_rgba(60,40,120,0.35)]"
    >
      {/* soft circular accent top-right */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-14 -top-14 size-44 rounded-full blur-2xl",
          isNeet
            ? "bg-gradient-to-br from-emerald-200/70 to-teal-100/50"
            : "bg-gradient-to-br from-violet-200/70 to-indigo-100/50",
        )}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <div
            className={cn(
              "flex size-14 items-center justify-center rounded-2xl text-white shadow-md",
              isNeet ? "bg-emerald-500" : "bg-indigo-500",
            )}
          >
            {isNeet ? (
              <Stethoscope className="size-7" />
            ) : (
              <Atom className="size-7" />
            )}
          </div>
          <h3 className="mt-4 flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground">
            {stream.name}
            {isNeet ? (
              <Stethoscope className="size-4 text-muted-foreground/70" />
            ) : (
              <Wrench className="size-4 text-muted-foreground/70" />
            )}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-muted-foreground">
            {isNeet ? "Medical Entrance" : "Engineering Entrance"}
          </p>
        </div>
      </div>

      <p className="relative mt-4 text-[13px] font-semibold text-violet-700">
        {subjectDefs.map((s) => s.name).join(" · ")}
      </p>

      <p className="relative mt-2 text-[12.5px] leading-5 text-muted-foreground">
        {stream.description}
      </p>

      <div className="relative mt-auto flex items-center gap-1.5 pt-6 text-[13.5px] font-semibold text-foreground transition-colors group-hover:text-violet-700">
        {isNeet ? "For future doctors" : "For future engineers"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.button>
  );
}

export function StreamPicker({
  onPick,
}: {
  onPick?: (id: StreamId) => void;
}) {
  const navigate = useNavigate();

  const handlePick = (id: StreamId) => {
    if (onPick) {
      onPick(id);
    } else {
      navigate(`/dashboard?stream=${id}`);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="dotted-paper pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -right-28 top-16 size-80 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 bottom-10 size-80 rounded-full bg-emerald-200/40 blur-3xl" />

      <header className="relative z-10 flex justify-center pt-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Brand markSize="sm" />
        </motion.div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 pb-14 sm:px-6">
        <div className="mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Welcome to Shaishav One AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
            className="mt-2.5 text-[15px] text-muted-foreground"
          >
            Choose your path to get started
          </motion.p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <PickCard streamId="neet" onPick={handlePick} delay={0.22} />
          <PickCard streamId="jee" onPick={handlePick} delay={0.32} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-center text-xs text-muted-foreground"
        >
          You can switch tracks anytime from the sidebar.
        </motion.p>
      </main>
    </div>
  );
}
