import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppShell } from "@/components/AppShell";
import { PageTransition } from "@/components/PageTransition";
import { StreamPicker } from "@/components/StreamPicker";
import { FlashcardsView, QuizView } from "@/components/ToolViews";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getIcon } from "@/components/tool-icons";
import { cn } from "@/lib/utils";
import { getToolDef, TOOL_DEFS, type ToolId } from "@/lib/tools";
import {
  getChapter,
  getStreamSubjects,
  getSubject,
  getTopic,
  type StreamId,
} from "@/lib/curriculum";
import {
  buildVocabulary,
  generateConceptExplanation,
  generateFormulaSheet,
  generatePaperAnalysis,
  generateStudyPlan,
  generateToolContent,
  resolveDoubt,
  solveMath,
  translateStudyText,
  type MathResult,
} from "@/lib/engine";
import { useStream } from "@/hooks/use-stream";
import { useClassLevel } from "@/hooks/use-class-level";
import {
  Check,
  Flame,
  Languages,
  Loader2,
  Pause,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Trash2,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";

const TOPIC_KEY = "shaishav.toolCtx";

interface Sel {
  s: string;
  c: string;
  t: string;
}

function readSaved(stream: StreamId): Sel | null {
  try {
    const raw = localStorage.getItem(`${TOPIC_KEY}.${stream}`);
    return raw ? (JSON.parse(raw) as Sel) : null;
  } catch {
    return null;
  }
}

function saveSel(stream: StreamId, sel: Sel) {
  try {
    localStorage.setItem(`${TOPIC_KEY}.${stream}`, JSON.stringify(sel));
  } catch {
    // ignore
  }
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const { stream } = useStream();
  const { classLevel } = useClassLevel();

  const def = useMemo(() => {
    if (!toolId || !TOOL_DEFS.some((t) => t.id === toolId)) return undefined;
    return getToolDef(toolId as ToolId);
  }, [toolId]);

  const [sel, setSel] = useState<Sel>(() => {
    const saved = stream ? readSaved(stream) : null;
    return saved ?? { s: "", c: "", t: "" };
  });

  // derive a valid selection for the current stream (auto-fixes after switching)
  const subjectDefs = stream ? getStreamSubjects(stream) : [];
  const subjectId =
    stream && subjectDefs.some((d) => d.id === sel.s) ? sel.s : subjectDefs[0]?.id ?? "";
  const subject = getSubject(subjectId);
  const chapterId =
    subject && subject.chapters.some((c) => c.id === sel.c)
      ? sel.c
      : subject?.chapters[0]?.id ?? "";
  const chapter = getChapter(subjectId, chapterId);
  const topicId =
    chapter && chapter.topics.some((t) => t.id === sel.t)
      ? sel.t
      : chapter?.topics[0]?.id ?? "";
  const topic = getTopic(subjectId, chapterId, topicId);

  const pickSubject = (id: string) => {
    const subj = getSubject(id);
    const next = {
      s: id,
      c: subj?.chapters[0]?.id ?? "",
      t: subj?.chapters[0]?.topics[0]?.id ?? "",
    };
    setSel(next);
    if (stream) saveSel(stream, next);
  };
  const pickChapter = (id: string) => {
    const ch = getChapter(subjectId, id);
    const next = { s: subjectId, c: id, t: ch?.topics[0]?.id ?? "" };
    setSel(next);
    if (stream) saveSel(stream, next);
  };
  const pickTopic = (id: string) => {
    const next = { s: subjectId, c: chapterId, t: id };
    setSel(next);
    if (stream) saveSel(stream, next);
  };

  // standalone subject selector (translator / vocabulary / formula)
  const [subjForStandalone, setSubjForStandalone] = useState<string>("");

  if (!def) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="font-display text-lg font-bold">Tool not found</p>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back to dashboard
        </Button>
      </div>
    );
  }

  if (!stream) {
    return <StreamPicker />;
  }

  const Icon = getIcon(def.icon);

  return (
    <AppShell stream={stream}>
      <PageTransition>
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        {/* header */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "flex size-12 items-center justify-center rounded-2xl text-white shadow-md",
              def.iconBg,
            )}
          >
            <Icon className="size-6" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold sm:text-2xl">
              {def.label}
            </h1>
            <p className="text-[13px] text-muted-foreground">{def.description}</p>
          </div>
        </div>

        <div className="mt-6">
          {def.needsTopic ? (
            <TopicTool
              stream={stream}
              subjectDefs={subjectDefs}
              subjectId={subjectId}
              chapterId={chapterId}
              topicId={topicId}
              tool={def.id}
              onPickSubject={pickSubject}
              onPickChapter={pickChapter}
              onPickTopic={pickTopic}
            />
          ) : (
            <StandaloneTool
              stream={stream}
              classLevel={classLevel}
              tool={def.id}
              subjectId={subjectDefs.some((d) => d.id === subjForStandalone)
                ? subjForStandalone
                : subjectDefs[0]?.id ?? ""}
              onSubjectChange={setSubjForStandalone}
            />
          )}
        </div>
      </div>
      </PageTransition>
    </AppShell>
  );
}

// ---------------------------------------------------------------------------
// Topic-based tools
// ---------------------------------------------------------------------------

function TopicTool({
  stream,
  subjectDefs,
  subjectId,
  chapterId,
  topicId,
  tool,
  onPickSubject,
  onPickChapter,
  onPickTopic,
}: {
  stream: StreamId;
  subjectDefs: ReturnType<typeof getStreamSubjects>;
  subjectId: string;
  chapterId: string;
  topicId: string;
  tool: ToolId;
  onPickSubject: (id: string) => void;
  onPickChapter: (id: string) => void;
  onPickTopic: (id: string) => void;
}) {
  const subject = getSubject(subjectId);
  const chapter = getChapter(subjectId, chapterId);
  const topic = getTopic(subjectId, chapterId, topicId);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [instruction, setInstruction] = useState("");
  const [doubtText, setDoubtText] = useState("");

  useEffect(() => {
    setResult(null);
    setDoubtText("");
  }, [tool, subjectId, chapterId, topicId]);

  const engineCtx = useMemo(
    () => ({ stream, subjectId, chapterId, topicId }),
    [stream, subjectId, chapterId, topicId],
  );

  const run = () => {
    if (!topic) return;
    setLoading(true);
    setResult(null);
    // tiny delay for the AI feel — the engine itself is instant & local
    setTimeout(() => {
      try {
        let content: string;
        switch (tool) {
          case "doubt":
            content = resolveDoubt(
              engineCtx,
              doubtText.trim() || `Explain ${topic.name}`,
            );
            break;
          case "explainer":
            content = generateConceptExplanation(engineCtx);
            break;
          case "paper":
            content = generatePaperAnalysis(engineCtx);
            break;
          default:
            content = generateToolContent(
              tool as "flashcards" | "quiz" | "notes" | "essay" | "summarizer",
              engineCtx,
              instruction || undefined,
            );
        }
        setResult(content);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while generating. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 620);
  };

  const selectCls =
    "h-10 w-full rounded-xl border border-border bg-card px-3 text-[13px] font-medium outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200";

  return (
    <div className="space-y-4">
      {/* topic picker */}
      <div className="sheet rounded-2xl p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Study context
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {subjectDefs.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onPickSubject(s.id)}
              className={cn(
                "cursor-pointer rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors",
                s.id === subjectId
                  ? cn("border-transparent", s.palette.chip)
                  : "border-border text-muted-foreground hover:bg-accent",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted-foreground">
              Chapter
            </span>
            <select
              value={chapterId}
              onChange={(e) => onPickChapter(e.target.value)}
              className={selectCls}
            >
              {subject?.chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  Class {c.class} · {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted-foreground">
              Topic
            </span>
            <select
              value={topicId}
              onChange={(e) => onPickTopic(e.target.value)}
              className={selectCls}
            >
              {chapter?.topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} · {t.pyq} PYQs
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* doubt input for doubt solver */}
      {tool === "doubt" && (
        <div className="flex gap-2">
          <Textarea
            value={doubtText}
            onChange={(e) => setDoubtText(e.target.value)}
            placeholder="Type your doubt about this topic — e.g. 'why does the sign flip here?'"
            rows={2}
            className="min-h-11 flex-1 rounded-xl bg-card text-[13.5px]"
          />
          <Button
            className="h-auto shrink-0 rounded-xl px-4"
            onClick={run}
            disabled={loading}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            Solve
          </Button>
        </div>
      )}

      {/* instruction + generate */}
      {tool !== "doubt" && (
        <div className="flex gap-2">
          <Input
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) run();
            }}
            placeholder={`Extra instructions (optional) — e.g. "focus on numericals"`}
            className="h-11 flex-1 rounded-xl bg-card text-[13.5px]"
            disabled={loading}
          />
          <Button
            className="h-11 shrink-0 gap-1.5 rounded-xl"
            onClick={run}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Wand2 className="size-4" />
            )}
            {result ? "Regenerate" : "Generate"}
          </Button>
        </div>
      )}

      {/* result */}
      {loading ? (
        <div className="sheet flex flex-col items-center gap-3 rounded-2xl py-20 text-center">
          <div className="relative flex items-center justify-center">
            <span className="ring-spin absolute size-20 rounded-full border-2 border-dashed border-violet-300/60" />
            <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-md">
              <Loader2 className="size-5 animate-spin" />
            </span>
          </div>
          <p className="text-sm font-semibold">Shaishav is working on it…</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Building this from the NCERT chapter context and PYQ patterns —
            fully offline, no API.
          </p>
        </div>
      ) : result ? (
        <div className="sheet rounded-2xl p-4 sm:p-6">
          {tool === "flashcards" ? (
            <FlashcardsView content={result} />
          ) : tool === "quiz" ? (
            <QuizView content={result} />
          ) : (
            <Markdown content={result} />
          )}
        </div>
      ) : (
        <div className="sheet flex flex-col items-center rounded-2xl py-16 text-center">
          <span
            className={cn(
              "flex size-14 items-center justify-center rounded-2xl text-white shadow-md",
              getToolDef(tool).iconBg,
            )}
          >
            {(() => {
              const I = getIcon(getToolDef(tool).icon);
              return <I className="size-6" />;
            })()}
          </span>
          <h3 className="mt-4 font-display text-lg font-bold">
            {getToolDef(tool).label} for {topic?.name}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {getToolDef(tool).description}. Hit{" "}
            <span className="font-semibold text-foreground">Generate</span> and
            Shaishav creates it instantly from the chapter knowledge + PYQ
            bank — no internet, no API key.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Standalone tools
// ---------------------------------------------------------------------------

function StandaloneTool({
  stream,
  classLevel,
  tool,
  subjectId,
  onSubjectChange,
}: {
  stream: StreamId;
  classLevel: 11 | 12;
  tool: ToolId;
  subjectId: string;
  onSubjectChange: (id: string) => void;
}) {
  const subjectDefs = getStreamSubjects(stream);
  const selectCls =
    "h-10 w-full rounded-xl border border-border bg-card px-3 text-[13px] font-medium outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200";

  if (tool === "pomodoro") return <PomodoroTimer />;
  if (tool === "habit") return <HabitTracker />;
  if (tool === "planner") return <Planner stream={stream} classLevel={classLevel} />;

  // subject-scoped tools
  const subjectPicker = (
    <label className="block max-w-xs">
      <span className="mb-1 block text-[11px] font-semibold text-muted-foreground">
        Subject
      </span>
      <select
        value={subjectId}
        onChange={(e) => onSubjectChange(e.target.value)}
        className={selectCls}
      >
        {subjectDefs.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </label>
  );

  switch (tool) {
    case "math":
      return <MathSolver />;
    case "translator":
      return <Translator subjectId={subjectId} subjectPicker={subjectPicker} />;
    case "vocabulary":
      return <Vocabulary subjectId={subjectId} subjectPicker={subjectPicker} />;
    case "formula":
      return <FormulaSheetTool stream={stream} subjectId={subjectId} subjectPicker={subjectPicker} />;
    default:
      return null;
  }
}

function MathSolver() {
  const [input, setInput] = useState("");
  const [res, setRes] = useState<MathResult | null>(null);
  const EXAMPLES = [
    "2x + 3 = 7",
    "x - 5 = 2x + 1",
    "x^2 - 5x + 6 = 0",
    "2x^2 + 3x + 5 = 0",
    "3 * (4 + 2) - 8 / 2",
  ];
  const solve = () => {
    if (!input.trim()) return;
    setRes(solveMath(input));
  };
  return (
    <div className="space-y-4">
      <div className="sheet rounded-2xl p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Enter an equation or expression
        </p>
        <div className="mt-2.5 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") solve();
            }}
            placeholder='e.g. "2x + 3 = 7" or "x^2 - 5x + 6 = 0"'
            className="h-11 flex-1 rounded-xl bg-card text-[14px] font-medium"
          />
          <Button className="h-11 shrink-0 rounded-xl" onClick={solve}>
            Solve
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setInput(ex);
                setRes(solveMath(ex));
              }}
              className="cursor-pointer rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-violet-300 hover:text-violet-700"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {res && (
        <div className="sheet rounded-2xl p-5">
          {res.ok ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Steps
              </p>
              <ol className="mt-2 space-y-1.5">
                {res.steps.map((s, i) => (
                  <li key={i} className="flex gap-2 text-[13.5px] leading-6">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
                      {i + 1}
                    </span>
                    <span className="font-mono text-[13px]">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-wide text-violet-500">
                  Answer
                </span>
                <p className="mt-0.5 font-mono text-lg font-bold text-violet-800">
                  {res.answer}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-rose-600">
              Couldn't parse that. Try formats like{" "}
              <span className="font-mono">2x + 3 = 7</span>,{" "}
              <span className="font-mono">x^2 - 5x + 6 = 0</span> or a plain
              arithmetic expression. {res.error ? `(${res.error})` : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Translator({
  subjectId,
  subjectPicker,
}: {
  subjectId: string;
  subjectPicker: React.ReactNode;
}) {
  const [text, setText] = useState("");
  const [out, setOut] = useState<ReturnType<typeof translateStudyText> | null>(null);
  const run = () => {
    if (!text.trim()) return;
    setOut(translateStudyText(subjectId, text));
  };
  return (
    <div className="space-y-4">
      <div className="sheet rounded-2xl p-4">
        {subjectPicker}
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste a sentence with study terms — e.g. 'The mitochondria is the powerhouse of the cell'"
          rows={3}
          className="mt-3 min-h-20 rounded-xl bg-card text-[13.5px]"
        />
        <Button className="mt-3 rounded-xl" onClick={run}>
          <Languages className="size-4" /> Translate study terms
        </Button>
      </div>
      {out && (
        <div className="space-y-4">
          <div className="sheet rounded-2xl p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Annotated text (English → Hindi)
            </p>
            <p className="mt-2 text-[14px] leading-7 text-foreground/90">
              {out.translated}
            </p>
          </div>
          {out.matched.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {out.matched.map((m) => (
                <div
                  key={m.term}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
                >
                  <span className="text-[13px] font-semibold">{m.term}</span>
                  <span className="text-[13px] font-medium text-violet-700">
                    {m.hindi ?? "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Vocabulary({
  subjectId,
  subjectPicker,
}: {
  subjectId: string;
  subjectPicker: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const items = useMemo(() => buildVocabulary(subjectId), [subjectId]);
  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          !query ||
          i.term.toLowerCase().includes(query.toLowerCase()) ||
          i.def.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );
  return (
    <div className="space-y-4">
      <div className="sheet rounded-2xl p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {subjectPicker}
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted-foreground">
              Search
            </span>
            <div className="relative">
              <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search terms…"
                className="h-10 rounded-xl bg-card pl-9 text-[13px]"
              />
            </div>
          </label>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {filtered.length} key terms with Hindi meanings
        </p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {filtered.map((item) => (
          <div key={item.term} className="sheet rounded-xl p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13.5px] font-bold">{item.term}</p>
              {item.hindi && (
                <span className="shrink-0 rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700">
                  {item.hindi}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-[12.5px] leading-5 text-muted-foreground">
              {item.def}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormulaSheetTool({
  stream,
  subjectId,
  subjectPicker,
}: {
  stream: StreamId;
  subjectId: string;
  subjectPicker: React.ReactNode;
}) {
  const content = useMemo(
    () => generateFormulaSheet(stream, subjectId),
    [stream, subjectId],
  );
  return (
    <div className="space-y-4">
      <div className="sheet rounded-2xl p-4">{subjectPicker}</div>
      <div className="sheet rounded-2xl p-4 sm:p-6">
        <Markdown content={content} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pomodoro
// ---------------------------------------------------------------------------

function PomodoroTimer() {
  const DURATIONS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
  const [mode, setMode] = useState<"focus" | "short" | "long">("focus");
  const [remaining, setRemaining] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (remaining === 0 && running) {
      setRunning(false);
      toast.success(
        mode === "focus"
          ? "Focus session complete — take a break! 🌟"
          : "Break over — back to studying!",
      );
    }
  }, [remaining, running, mode]);

  const switchMode = (m: "focus" | "short" | "long") => {
    setMode(m);
    setRemaining(DURATIONS[m]);
    setRunning(false);
  };

  const total = DURATIONS[mode];
  const pct = Math.round(((total - remaining) / total) * 100);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="sheet mx-auto max-w-md rounded-3xl p-8 text-center">
      <div className="flex justify-center gap-2">
        {(
          [
            ["focus", "Focus"],
            ["short", "Short break"],
            ["long", "Long break"],
          ] as const
        ).map(([m, label]) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={cn(
              "cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              mode === m
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                : "border border-border bg-card text-muted-foreground hover:bg-accent",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className="mx-auto mt-8 flex size-56 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(#7c3aed ${pct * 3.6}deg, #ede9fe 0deg)`,
        }}
      >
        <div className="flex size-48 flex-col items-center justify-center rounded-full bg-white shadow-inner">
          <span className="font-display text-5xl font-bold tabular-nums">
            {mm}:{ss}
          </span>
          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {mode === "focus" ? "Focus" : "Break"}
          </span>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2.5">
        <Button
          size="lg"
          className="w-32 rounded-full"
          onClick={() => setRunning((v) => !v)}
        >
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          {running ? "Pause" : "Start"}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-32 rounded-full"
          onClick={() => {
            setRemaining(DURATIONS[mode]);
            setRunning(false);
          }}
        >
          <RotateCcw className="size-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Habit tracker (localStorage)
// ---------------------------------------------------------------------------

interface Habit {
  id: string;
  name: string;
  done: Record<string, true>;
}

const HABIT_KEY = "shaishav.habits";
const PRESETS = [
  "Study 2 chapters",
  "PYQ drill (20 Q)",
  "10 flashcards",
  "No phone while studying",
];

function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(HABIT_KEY);
    if (raw) return JSON.parse(raw) as Habit[];
  } catch {
    // ignore
  }
  return PRESETS.map((name) => ({ id: name, name, done: {} }));
}

function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits);
  const [newName, setNewName] = useState("");

  const persist = (next: Habit[]) => {
    setHabits(next);
    try {
      localStorage.setItem(HABIT_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const today = dateKey(new Date());
  const days = useMemo(() => {
    const out: { key: string; label: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      out.push({
        key: dateKey(d),
        label: d.toLocaleDateString("en-IN", { weekday: "short" }),
      });
    }
    return out;
  }, []);

  const streak = (h: Habit): number => {
    let n = 0;
    const d = new Date();
    while (h.done[dateKey(d)]) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  };

  const addHabit = () => {
    const name = newName.trim();
    if (!name) return;
    if (habits.some((h) => h.name.toLowerCase() === name.toLowerCase())) {
      toast.error("That habit already exists");
      return;
    }
    persist([...habits, { id: `${Date.now()}`, name, done: {} }]);
    setNewName("");
    toast.success("Habit added 🔥");
  };

  const toggle = (id: string, key: string) => {
    persist(
      habits.map((h) => {
        if (h.id !== id) return h;
        const done = { ...h.done };
        if (done[key]) delete done[key];
        else done[key] = true;
        return { ...h, done };
      }),
    );
  };

  const remove = (id: string) => {
    persist(habits.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="sheet rounded-2xl p-4">
        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addHabit();
            }}
            placeholder="Add a habit — e.g. 'Revise formulas 20 min'"
            className="h-11 flex-1 rounded-xl bg-card text-[13.5px]"
          />
          <Button className="h-11 shrink-0 rounded-xl" onClick={addHabit}>
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">
          Tap a day to mark it done. Streaks are counted from today backwards.
        </p>
      </div>

      <div className="space-y-2.5">
        {habits.map((h) => {
          const st = streak(h);
          return (
            <div key={h.id} className="sheet rounded-xl p-4">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl",
                    st > 0 ? "bg-orange-100 text-orange-600" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Flame className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-bold">{h.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {st}-day streak {h.done[today] ? "· done today ✓" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(h.id)}
                  className="cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Remove habit"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1.5">
                {days.map((d) => {
                  const done = !!h.done[d.key];
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => toggle(h.id, d.key)}
                      className={cn(
                        "flex cursor-pointer flex-col items-center gap-1 rounded-lg border py-1.5 transition-colors",
                        done
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-border bg-card hover:border-emerald-300",
                      )}
                    >
                      <span className="text-[9.5px] font-semibold uppercase text-muted-foreground">
                        {d.label}
                      </span>
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-full",
                          done ? "bg-emerald-500 text-white" : "border border-border",
                        )}
                      >
                        {done && <Check className="size-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Study planner
// ---------------------------------------------------------------------------

function Planner({
  stream,
  classLevel,
}: {
  stream: StreamId;
  classLevel: 11 | 12;
}) {
  const [salt, setSalt] = useState(0);
  const plan = useMemo(
    () => generateStudyPlan(stream, classLevel, salt),
    [stream, classLevel, salt],
  );
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] text-muted-foreground">
          A week of focused sessions built from your Class {classLevel}{" "}
          {stream === "neet" ? "NEET" : "JEE"} syllabus — regenerate to shuffle.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => setSalt((s) => s + 1)}
        >
          <RefreshCw className="size-3.5" /> Regenerate
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {plan.map((day, di) => (
          <div key={day.day} className="sheet rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-bold">{day.day}</p>
              <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10.5px] font-bold text-violet-700">
                {di % 2 === 0 ? "Concept day" : "Practice day"}
              </span>
            </div>
            <p className="mt-1 text-[11.5px] font-semibold text-violet-600">
              Focus: {day.focus}
            </p>
            <div className="mt-3 space-y-2">
              {day.sessions.map((s) => (
                <div key={s.time} className="flex gap-2.5">
                  <span className="mt-0.5 shrink-0 rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {s.time.split(" ")[0]}
                  </span>
                  <p className="text-[12.5px] leading-5 text-foreground/85">
                    {s.task}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


