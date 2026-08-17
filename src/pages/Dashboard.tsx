import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AppShell } from "@/components/AppShell";
import { StreamPicker } from "@/components/StreamPicker";
import { useAuth } from "@/hooks/use-auth";
import { useStream } from "@/hooks/use-stream";
import { useClassLevel } from "@/hooks/use-class-level";
import { cn } from "@/lib/utils";
import {
  countStreamPyqs,
  getChapter,
  getStream,
  getStreamSubjects,
  getTopic,
} from "@/lib/curriculum";
import { streamTip, streamTitle } from "@/lib/knowledge";
import { TOOL_DEFS } from "@/lib/tools";
import { getIcon } from "@/components/tool-icons";
import { ArrowRight, BookOpen, FileQuestion, Sparkles, Target } from "lucide-react";

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
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {/* greeting */}
        <div className="flex items-center gap-2 text-[13px] font-semibold text-violet-600">
          <Sparkles className="size-4" />
          Welcome back{name !== "Student" ? `, ${name.split(" ")[0]}` : ""}!
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Your CBSE Class {classLevel}{" "}
          <span className="text-violet-600">{streamTitle(stream)} Dashboard</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-[15px]">
          Master {subjectNames.join(", ")} for {stats?.streamDef.name}{" "}
          {examYear}
        </p>

        {/* tip of the day */}
        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-violet-200/80 bg-violet-50/70 px-5 py-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white shadow-sm">
            <Target className="size-5" />
          </span>
          <div>              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-violet-700">
                {stats!.streamDef.name} Tip of the Day
              </p>
            <p className="mt-1 text-[13.5px] leading-6 text-violet-950/80">
              {tip}
            </p>
          </div>
        </div>

        {/* progress strip */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold">
            <BookOpen className="size-3.5 text-violet-600" />
            {stats?.topicsDone ?? 0}/{stats?.totalTopics ?? 0} topics mastered
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold">
            <FileQuestion className="size-3.5 text-amber-600" />
            {stats?.pyqBank ?? 0}+ PYQs mapped
          </span>
          <button
            type="button"
            onClick={() => navigate("/study")}
            className="ml-auto inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-600/20 transition-transform hover:scale-[1.02]"
          >
            Open AI Tutor
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* subjects */}
        <div className="mt-9">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-violet-600" />
            <h2 className="font-display text-xl font-bold">Subjects</h2>
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats?.subjectDefs.map((s) => {
              const Icon = getIcon(s.id);
              const total = s.chapters.reduce((a, c) => a + c.topics.length, 0);
              return (
                <div
                  key={s.id}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_10px_30px_-18px_rgba(60,40,120,0.25)] transition-shadow hover:shadow-[0_18px_40px_-20px_rgba(60,40,120,0.35)]"
                >
                  <div
                    className={cn(
                      "flex h-24 items-center justify-center text-white",
                      s.palette.solid,
                    )}
                  >
                    <Icon className="size-10 drop-shadow-sm" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[16px] font-bold">{s.name}</p>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {s.chapters.length} ch
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-5 text-muted-foreground">
                      {SUBJECT_BLURBS[s.id] ?? `${total} topics across the NCERT syllabus`}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/study?subject=${s.id}`)}
                      className="mt-4 inline-flex cursor-pointer items-center gap-1 text-[13px] font-semibold text-violet-600 transition-colors hover:text-violet-800"
                    >
                      Study Now
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI study tools */}
        <div className="mt-9 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-violet-600" />
            <h2 className="font-display text-xl font-bold">AI Study Tools</h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TOOL_DEFS.filter((t) => t.section !== "productivity").map((t) => {
              const Icon = getIcon(t.icon);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => navigate(`/tool/${t.id}`)}
                  className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-border/70 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
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
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
