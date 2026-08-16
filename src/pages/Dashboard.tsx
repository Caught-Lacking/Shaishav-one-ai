import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AppShell } from "@/components/AppShell";
import { StreamPicker } from "@/components/StreamPicker";
import { useAuth } from "@/hooks/use-auth";
import { useStream } from "@/hooks/use-stream";
import { cn } from "@/lib/utils";
import {
  countStreamPyqs,
  getChapter,
  getStream,
  getStreamSubjects,
  getTopic,
} from "@/lib/curriculum";
import {
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  FileQuestion,
  Layers,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { user } = useAuth();
  const { stream, setStream } = useStream();
  const progress = useQuery(api.progress.list);
  const chats = useQuery(api.chats.list);
  const navigate = useNavigate();

  const name = user?.name ?? user?.email?.split("@")[0] ?? "Student";

  const stats = useMemo(() => {
    if (!stream) return null;
    const streamDef = getStream(stream);
    const subjectDefs = getStreamSubjects(stream);
    const progressList = progress ?? [];

    const topicsDone = progressList.filter((p) => p.done).length;
    const chaptersStarted = new Set(
      progressList.filter((p) => p.done).map((p) => p.chapterId),
    ).size;
    const totalTopics = subjectDefs.reduce(
      (acc, s) => acc + s.chapters.reduce((a, c) => a + c.topics.length, 0),
      0,
    );

    const subjectStats = subjectDefs.map((s) => {
      const done = progressList.filter(
        (p) => p.done && p.subjectId === s.id,
      ).length;
      const total = s.chapters.reduce(
        (a, c) => a + c.topics.length,
        0,
      );
      return {
        subject: s,
        done,
        total,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
      };
    });

    return {
      streamDef,
      topicsDone,
      totalTopics,
      chaptersStarted,
      subjectStats,
      pyqBank: countStreamPyqs(stream),
      notebooks: chats?.length ?? 0,
    };
  }, [stream, progress, chats]);

  if (!stream) {
    return (
      <StreamPicker
        onPick={async (id) => {
          await setStream(id);
        }}
      />
    );
  }

  const recentChats = chats?.slice(0, 4) ?? [];

  return (
    <AppShell stream={stream}>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* greeting */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {stats?.streamDef.exam}
            </p>
            <h1 className="mt-1.5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Hi {name}, let's <span className="marker">revise smarter</span> 👋
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Your {stats?.streamDef.name} notebook — {stats?.topicsDone} of{" "}
              {stats?.totalTopics} topics mastered so far.
            </p>
          </div>
          <Button
            size="lg"
            className="gap-2 rounded-full bg-gradient-to-r from-teal-600 to-indigo-600 shadow-md shadow-teal-600/20 hover:from-teal-600/90 hover:to-indigo-600/90"
            onClick={() => navigate("/study")}
          >
            <BookOpen className="size-4" />
            Open study notebook
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* stat cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              icon: BookOpenCheck,
              label: "Topics mastered",
              value: stats?.topicsDone ?? 0,
              color: "bg-teal-100 text-teal-700",
            },
            {
              icon: Layers,
              label: "Chapters started",
              value: stats?.chaptersStarted ?? 0,
              color: "bg-indigo-100 text-indigo-700",
            },
            {
              icon: MessageSquareText,
              label: "Notebooks / chats",
              value: stats?.notebooks ?? 0,
              color: "bg-rose-100 text-rose-600",
            },
            {
              icon: FileQuestion,
              label: "PYQs in your bank",
              value: `${stats?.pyqBank ?? 0}+`,
              color: "bg-amber-100 text-amber-700",
            },
          ].map((s) => (
            <div key={s.label} className="sheet relative overflow-hidden p-5">
              <div className={cn("flex size-10 items-center justify-center rounded-xl", s.color)}>
                <s.icon className="size-5" />
              </div>
              <p className="mt-3 font-display text-3xl font-bold">{s.value}</p>
              <p className="text-xs font-medium text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* subject progress */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">
                Subject coverage
              </h2>
              <span className="pencil-note text-xs">
                topics done / total in your stream
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {stats?.subjectStats.map(({ subject, done, total, percent }) => (
                <div
                  key={subject.id}
                  className="sheet ruled p-5"
                  style={{ backgroundPosition: "0 6px" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 items-center justify-center rounded-lg",
                          subject.palette.chip,
                        )}
                      >
                        <Sparkles className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold">{subject.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {subject.chapters.length} chapters · {total} topics
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        subject.palette.text,
                      )}
                    >
                      {done}/{total}
                    </span>
                  </div>
                  <Progress
                    value={percent}
                    className={cn("mt-3 h-2.5", "bg-black/5")}
                    // subject-tinted bar
                  />
                  <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                    <span>{percent}% covered</span>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/study?subject=${subject.id}`)
                      }
                      className="cursor-pointer font-semibold text-teal-600 hover:underline"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* recent chats + tip */}
          <section className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">Recent notebooks</h2>
                <button
                  type="button"
                  onClick={() => navigate("/study")}
                  className="cursor-pointer text-xs font-semibold text-teal-600 hover:underline"
                >
                  View all →
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {recentChats.length === 0 ? (
                  <div className="sheet p-6 text-center">
                    <p className="text-sm font-semibold">No chats yet</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Open your study notebook, pick a chapter & topic, and ask
                      the AI tutor anything.
                    </p>
                    <Button
                      size="sm"
                      className="mt-4 rounded-full"
                      onClick={() => navigate("/study")}
                    >
                      Start your first notebook
                    </Button>
                  </div>
                ) : (
                  recentChats.map((chat) => {
                    const chapter = getChapter(
                      chat.subjectId,
                      chat.chapterId,
                    );
                    const topic = getTopic(
                      chat.subjectId,
                      chat.chapterId,
                      chat.topicId,
                    );
                    return (
                      <button
                        key={chat._id}
                        type="button"
                        onClick={() => navigate(`/study?chat=${chat._id}`)}
                        className="sheet block w-full cursor-pointer p-4 text-left transition-shadow hover:shadow-md"
                      >
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                          <span className="rounded-full bg-muted px-2 py-0.5">
                            {chapter?.name ?? "Chapter"}
                          </span>
                          <span>·</span>
                          <span>{topic?.name ?? "Topic"}</span>
                        </div>
                        <p className="mt-1.5 truncate text-sm font-semibold">
                          {chat.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {chat.messages.length} messages ·{" "}
                          {new Date(chat.updatedAt).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short" },
                          )}
                        </p>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* tip sticky note */}
            <div className="sticky-note bg-amber-100 p-4 text-xs leading-5 text-amber-900">
              <span className="font-bold">Tip:</span> pick topics with high PYQ
              counts first — they carry the most marks in{" "}
              {stats?.streamDef.name}. Your AI tutor will flag the exact
              patterns.
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
