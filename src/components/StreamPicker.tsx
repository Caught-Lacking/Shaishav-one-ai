import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Wrench } from "lucide-react";
import { useNavigate } from "react-router";
import { Brand } from "@/components/Brand";
import { cn } from "@/lib/utils";
import {
  countStreamChapters,
  countStreamPyqs,
  countStreamTopics,
  getStreamSubjects,
  streams,
  type StreamId,
} from "@/lib/curriculum";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -5 }}
      onClick={() => onPick(streamId)}
      className={cn(
        "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-card text-left shadow-sm transition-colors",
        isNeet
          ? "border-teal-200 hover:border-teal-400"
          : "border-indigo-200 hover:border-indigo-400",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between bg-gradient-to-r px-6 py-5 text-white",
          stream.palette.gradient,
        )}
      >
        <div>
          <p className="font-display text-2xl font-bold">{stream.name}</p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/85">
            {stream.tagline} · Class 11 & 12
          </p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-xl bg-white/20">
          {isNeet ? (
            <Stethoscope className="size-6" />
          ) : (
            <Wrench className="size-6" />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="text-[13px] leading-5 text-muted-foreground">
          {stream.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {subjectDefs.map((s) => (
            <span
              key={s.id}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold",
                s.palette.chip,
              )}
            >
              {s.name}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4 text-xs font-medium text-muted-foreground">
          <span>
            <span className="font-bold text-foreground">
              {countStreamChapters(streamId)}
            </span>{" "}
            chapters
          </span>
          <span>
            <span className="font-bold text-foreground">
              {countStreamTopics(streamId)}
            </span>{" "}
            topics
          </span>
          <span>
            <span className="font-bold text-foreground">
              {countStreamPyqs(streamId)}+
            </span>{" "}
            PYQs
          </span>
        </div>
      </div>
      <div
        className={cn(
          "flex items-center justify-between border-t px-6 py-3.5",
          isNeet ? "border-teal-100 bg-teal-50/70" : "border-indigo-100 bg-indigo-50/70",
        )}
      >
        <span className="text-sm font-semibold">Choose {stream.name}</span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
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
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 size-72 rounded-full bg-rose-200/40 blur-3xl" />

      <header className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-5 sm:px-6">
        <Brand markSize="sm" />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            <ArrowRight className="size-3.5" />
            One small choice · everything personalises after this
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Which exam are you preparing for?
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Your subjects, chapters, PYQs and AI tutor will all adapt to your
            stream. You can switch anytime.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <PickCard streamId="neet" onPick={handlePick} delay={0.1} />
          <PickCard streamId="jee" onPick={handlePick} delay={0.2} />
        </div>
      </main>
    </div>
  );
}
