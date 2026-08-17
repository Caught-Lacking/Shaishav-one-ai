import { useMemo, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  parseFlashcards,
  parseQuiz,
  type Flashcard,
  type QuizQuestion,
} from "@/lib/tools";
import {
  CheckCircle2,
  RefreshCw,
  XCircle,
} from "lucide-react";

export function FlashcardsView({ content }: { content: string }) {
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

export function QuizView({ content }: { content: string }) {
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
              <span className="mr-1.5 text-violet-600">Q{qi + 1}.</span>
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
                          ? "border-violet-400 bg-violet-50"
                          : "border-border hover:border-violet-300 hover:bg-violet-50/40",
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

export function isFlashcardFormat(content: string): boolean {
  return parseFlashcards(content).length > 0;
}

export type { Flashcard, QuizQuestion };
