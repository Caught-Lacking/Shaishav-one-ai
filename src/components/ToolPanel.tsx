import { useMemo, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  parseFlashcards,
  parseQuiz,
  getToolDef,
  type ToolId,
} from "@/lib/tools";
import type { StreamId } from "@/lib/curriculum";
import {
  CheckCircle2,
  Layers,
  ListChecks,
  Loader2,
  NotebookPen,
  PenLine,
  RefreshCw,
  Sparkles,
  Wand2,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

const TOOL_ICONS: Record<ToolId, React.ReactNode> = {
  flashcards: <Layers className="size-5" />,
  quiz: <ListChecks className="size-5" />,
  notes: <NotebookPen className="size-5" />,
  essay: <PenLine className="size-5" />,
  summarizer: <Sparkles className="size-5" />,
};

interface ToolPanelProps {
  tool: ToolId;
  stream: StreamId;
  subjectId: string;
  chapterId: string;
  topicId: string;
  topicName: string;
  contextLine: string;
  existingChatId: Id<"chats"> | null;
  onChatIdChange: (id: Id<"chats">) => void;
  onClose: () => void;
}

function FlashcardsView({ content }: { content: string }) {
  const cards = useMemo(() => parseFlashcards(content), [content]);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  if (cards.length === 0) {
    return <Markdown content={content} />;
  }

  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <p className="mb-3 text-xs text-muted-foreground">
        {cards.length} cards — tap a card to flip it.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card, i) => {
          const isFlipped = flipped.has(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={cn(
                "flex min-h-28 cursor-pointer flex-col justify-between rounded-xl border-2 p-4 text-left transition-all",
                isFlipped
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-amber-200 bg-amber-50 hover:border-amber-300",
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {isFlipped ? "Answer" : `Card ${i + 1}`}
              </span>
              <span className="mt-2 text-[13.5px] font-medium leading-6">
                {isFlipped ? card.a : card.q}
              </span>
              <span className="mt-2 text-[10px] text-muted-foreground">
                {isFlipped ? "tap to flip back" : "tap to reveal"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuizView({ content }: { content: string }) {
  const questions = useMemo(() => parseQuiz(content), [content]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);

  if (questions.length === 0) {
    return <Markdown content={content} />;
  }

  const score = questions.reduce(
    (acc, q, i) =>
      acc + (q.answerIndex !== null && answers[i] === q.answerIndex ? 1 : 0),
    0,
  );

  const reset = () => {
    setAnswers({});
    setChecked(false);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {questions.length} questions · select an option, then check.
        </p>
        {checked && (
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold",
              score === questions.length
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700",
            )}
          >
            Score: {score}/{questions.length}
          </span>
        )}
      </div>

      <div className="space-y-5">
        {questions.map((q, qi) => (
          <div key={qi} className="rounded-xl border border-border bg-card p-4">
            <p className="text-[14px] font-semibold leading-6">
              <span className="mr-1.5 text-teal-600">Q{qi + 1}.</span>
              {q.q}
            </p>
            <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isCorrect = checked && q.answerIndex === oi;
                const isWrongPick =
                  checked && selected && q.answerIndex !== oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={checked}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [qi]: oi }))
                    }
                    className={cn(
                      "flex cursor-pointer items-start gap-2 rounded-lg border-2 px-3 py-2 text-left text-[13px] leading-5 transition-colors",
                      checked
                        ? isCorrect
                          ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                          : isWrongPick
                            ? "border-rose-300 bg-rose-50 text-rose-700"
                            : "border-border text-muted-foreground"
                        : selected
                          ? "border-teal-400 bg-teal-50"
                          : "border-border hover:border-teal-300 hover:bg-teal-50/40",
                    )}
                  >
                    <span className="mt-0.5 font-bold">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    <span>{opt}</span>
                    {checked && isCorrect && (
                      <CheckCircle2 className="ml-auto size-4 shrink-0 text-emerald-500" />
                    )}
                    {checked && isWrongPick && (
                      <XCircle className="ml-auto size-4 shrink-0 text-rose-500" />
                    )}
                  </button>
                );
              })}
            </div>
            {checked && q.answerIndex !== null && (
              <p className="mt-2 text-[11px] text-muted-foreground">
                Correct answer:{" "}
                <span className="font-bold text-emerald-600">
                  {String.fromCharCode(65 + q.answerIndex)}.{" "}
                  {q.options[q.answerIndex]}
                </span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2">
        <Button
          size="sm"
          className="rounded-full"
          disabled={checked}
          onClick={() => setChecked(true)}
        >
          <CheckCircle2 className="size-4" />
          Check answers
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={reset}
        >
          <RefreshCw className="size-4" />
          Retry
        </Button>
      </div>
    </div>
  );
}

export function ToolPanel({
  tool,
  stream,
  subjectId,
  chapterId,
  topicId,
  topicName,
  contextLine,
  existingChatId,
  onChatIdChange,
  onClose,
}: ToolPanelProps) {
  const def = getToolDef(tool);
  const generateTool = useAction(api.chat.generateTool);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [instruction, setInstruction] = useState("");

  const run = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await generateTool({
        chatId: existingChatId ?? undefined,
        stream,
        subjectId,
        chapterId,
        topicId,
        tool,
        instruction: instruction.trim() || undefined,
      });
      setResult(res.content);
      onChatIdChange(res.chatId);
    } catch (error) {
      console.error("Tool generation error:", error);
      toast.error(
        "Something went wrong while generating. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sheet flex min-h-[70vh] flex-1 flex-col overflow-hidden lg:min-h-0">
      {/* header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/70 px-4 py-3">
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-lg text-white shadow-sm",
            def.iconBg,
          )}
        >
          {TOOL_ICONS[tool]}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold leading-tight">{def.label}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {topicName} · {contextLine}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            size="sm"
            className="gap-1.5 rounded-full text-xs"
            onClick={run}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Wand2 className="size-3.5" />
            )}
            {result ? "Regenerate" : "Generate"}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close tool"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* custom instruction */}
      <div className="flex gap-2 border-b border-dashed border-border/70 px-4 py-2.5">
        <Input
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) run();
          }}
          placeholder={`Extra instructions (optional) — e.g. "focus on numericals"`}
          className="h-9 rounded-lg bg-background text-[13px]"
          disabled={loading}
        />
      </div>

      {/* body */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="relative flex items-center justify-center">
              <span className="ring-spin absolute size-20 rounded-full border-2 border-dashed border-teal-300/60" />
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-indigo-500 text-white shadow-md">
                {TOOL_ICONS[tool]}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              Generating your {def.label.toLowerCase()}…
            </p>
            <p className="max-w-sm text-xs text-muted-foreground">
              Shaishav is building this from the NCERT chapter context and PYQ
              patterns for {topicName}.
            </p>
          </div>
        ) : result ? (
          <div>
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Saved to your notebook
            </div>
            {tool === "flashcards" ? (
              <FlashcardsView content={result} />
            ) : tool === "quiz" ? (
              <QuizView content={result} />
            ) : (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                <Markdown content={result} />
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center py-14 text-center">
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-2xl text-white shadow-md",
                def.iconBg,
              )}
            >
              {TOOL_ICONS[tool]}
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">
              {def.label} for {topicName}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {def.description}. Hit{" "}
              <span className="font-semibold text-foreground">Generate</span>{" "}
              and Shaishav will create it from the NCERT chapter + PYQ context
              — it's saved to your notebook automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
