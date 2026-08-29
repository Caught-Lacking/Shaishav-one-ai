import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AppShell } from "@/components/AppShell";
import { StreamPicker } from "@/components/StreamPicker";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/hooks/use-auth";
import { useStream } from "@/hooks/use-stream";
import { useClassLevel } from "@/hooks/use-class-level";
import { cn } from "@/lib/utils";
import {
  countStreamPyqs,
  getStream,
  getStreamSubjects,
} from "@/lib/curriculum";
import { streamTip, streamTitle } from "@/lib/knowledge";
import { TOOL_DEFS } from "@/lib/tools";
import { getIcon } from "@/components/tool-icons";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileQuestion, Flame, Sparkles, Target, TrendingUp } from "lucide-react";

const SUBJECT_BLURBS: Record<string, string> = {
  physics: "Kinematics, Laws of Motion, Work & Energy, Thermodynamics",
  chemistry: "Atomic Structure, Chemical Bonding, Thermodynamics, Organic Chemistry",
  biology: "Cell Biology, Genetics, Plant & Animal Kingdom, Human Physiology",
  maths: "Algebra, Calculus, Trigonometry, Coordinate Geometry",
};

export default function Dashboard() {
  const { user } = useAuth();
  const { stream, setStream } = useStream();
  const { classLevel } = useClassLevel();
  const progress = useQuery(api.progress.list);
  const navigate = useNavigate();

  const name = user?.name ?? user?.email?.split("@")[0] ?? "Student";

  const stats = useMemo(() => {
    if (!stream) return null;
    const streamDef = getStream(stream);
    const subjectDefs = getStreamSubjects(stream);
    const progressList = progress ?? [];
    const topicsDone = progressList.filter((p) => p.done).length;
    const totalTopics = subjectDefs.reduce(
      (acc, s) => acc + s.chapters.reduce((a, c) => a + c.topics.length, 0),
      0,
    );
    return {
      streamDef,
      subjectDefs,
      topicsDone,
      totalTopics,
      pyqBank: countStreamPyqs(stream),
    };
  }, [stream, progress]);

  if (!stream) {
    return (
      <StreamPicker
        onPick={async (id) => {
          await setStream(id);
        }}
      />
    );
  }

  const tip = streamTip(stream);
  const subjectNames = stats?.subjectDefs.map((s) => s.name) ?? [];
  const examYear = new Date().getFullYear() + 1;

  return (
    <AppShell stream={stream}>
      <PageTransition>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {/* greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 text-[13px] font-semibold text-violet-600">
            <Sparkles className="size-4" />
            Welcome back{name !== "Student" ? `, ${name.split(" ")[0]}` : ""}!
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Your CBSE Class {classLevel}{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">{streamTitle(stream)}</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-[15px]">
            Master {subjectNames.join(", ")} for {stats?.streamDef.name}{" "}
            {examYear}
          </p>
        </motion.div>

        {/* stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50 to-violet-50/40 px-4 py-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white shadow-sm">
              <BookOpen className="size-5" />
            </span>
            <div>
              <p className="text-lg font-bold text-foreground">{stats?.topicsDone ?? 0}<span className="text-sm text-muted-foreground">/{stats?.totalTopics ?? 0}</span></p>
              <p className="text-[11px] font-medium text-muted-foreground">Topics mastered</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/40 px-4 py-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
              <FileQuestion className="size-5" />
            </span>
            <div>
              <p className="text-lg font-bold text-foreground">{stats?.pyqBank ?? 0}+</p>
              <p className="text-[11px] font-medium text-muted-foreground">PYQs mapped</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50 to-emerald-50/40 px-4 py-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white shadow-sm">
              <Flame className="size-5" />
            </span>
            <div>
              <p className="text-lg font-bold text-foreground">{stats?.subjectDefs.length ?? 0}</p>
              <p className="text-[11px] font-medium text-muted-foreground">Subjects to cover</p>
            </div>
          </div>
        </motion.div>

        {/* tip of the day */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mt-5 flex items-start gap-3 rounded-2xl border border-violet-200/80 bg-gradient-to-r from-violet-50/80 to-indigo-50/40 px-5 py-4"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white shadow-sm">
            <Target className="size-5" />
          </span>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-violet-700">
              {stats!.streamDef.name} Tip of the Day
            </p>
            <p className="mt-1 text-[13.5px] leading-6 text-violet-950/80">
              {tip}
            </p>
          </div>
        </motion.div>

        {/* CTA strip */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/study")}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-600/20 transition-all hover:shadow-lg hover:shadow-violet-600/30 hover:scale-[1.02]"
          >
            <TrendingUp className="size-3.5" />
            Start Studying
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* subjects */}
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-violet-600" />
            <h2 className="font-display text-xl font-bold">Subjects</h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats?.subjectDefs.map((s, idx) => {
              const Icon = getIcon(s.id);
              const total = s.chapters.reduce((a, c) => a + c.topics.length, 0);
              const subjectDone = (progress ?? []).filter((p) => p.subjectId === s.id && p.done).length;
              const pct = total > 0 ? Math.round((subjectDone / total) * 100) : 0;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 + idx * 0.08 }}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_10px_30px_-18px_rgba(60,40,120,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(60,40,120,0.35)]"
                >
                  <div
                    className={cn(
                      "relative flex h-24 items-center justify-center text-white",
                      s.palette.solid,
                    )}
                  >
                    <Icon className="size-10 drop-shadow-sm" />
                    <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm">
                      {s.chapters.length} chapters
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[16px] font-bold">{s.name}</p>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold",
                        pct >= 50 ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground",
                      )}>
                        {pct}% done
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-5 text-muted-foreground">
                      {SUBJECT_BLURBS[s.id] ?? `${total} topics across the NCERT syllabus`}
                    </p>
                    {/* progress bar */}
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", s.palette.solid)}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/study?subject=${s.id}`)}
                      className="mt-4 inline-flex cursor-pointer items-center gap-1 text-[13px] font-semibold text-violet-600 transition-colors hover:text-violet-800"
                    >
                      Study Now
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI study tools */}
        <div className="mt-8 pb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-violet-600" />
            <h2 className="font-display text-xl font-bold">AI Study Tools</h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TOOL_DEFS.filter((t) => t.section !== "productivity").map((t, idx) => {
              const Icon = getIcon(t.icon);
              return (
                <motion.button
                  key={t.id}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.06 }}
                  onClick={() => navigate(`/tool/${t.id}`)}
                  className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-border/70 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-110",
                      t.iconBg,
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-bold leading-tight">
                      {t.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                      {t.description}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
      </PageTransition>
    </AppShell>
  );
}
