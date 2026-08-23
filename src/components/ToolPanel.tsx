import { useMemo, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Markdown } from "@/components/Markdown";
import { FlashcardsView, QuizView } from "@/components/ToolViews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getToolDef, type ToolId } from "@/lib/tools";
import { getIcon } from "@/components/tool-icons";
import type { StreamId } from "@/lib/curriculum";
import {
  CheckCircle2,
  Loader2,
  Wand2,
  X,
} from "lucide-react";
import { toast } from "sonner";

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
  const Icon = getIcon(def.icon);
  const generateTool = useAction(api.chat.generateTool);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [instruction, setInstruction] = useState("");

  const isFlashcards = useMemo(
    () => tool === "flashcards" && !!result,
    [tool, result],
  );
  const isQuiz = useMemo(() => tool === "quiz" && !!result, [tool, result]);

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
        tool: tool as "flashcards" | "quiz" | "notes" | "essay" | "summarizer",
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
          <Icon className="size-4" />
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
              <span className="ring-spin absolute size-20 rounded-full border-2 border-dashed border-violet-300/60" />
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-xl text-white shadow-md",
                  def.iconBg,
                )}
              >
                <Icon className="size-5" />
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              Generating your {def.label.toLowerCase()}…
            </p>
            <p className="max-w-sm text-xs text-muted-foreground">
              One AI is building this from the NCERT chapter context and PYQ
              patterns for {topicName}.
            </p>
          </div>
        ) : result ? (
          <div>
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Saved to your notebook
            </div>
            {isFlashcards ? (
              <FlashcardsView content={result} />
            ) : isQuiz ? (
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
              <Icon className="size-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">
              {def.label} for {topicName}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {def.description}. Hit{" "}
              <span className="font-semibold text-foreground">Generate</span>{" "}
              and One AI will create it from the NCERT chapter + PYQ context
              — it's saved to your notebook automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
