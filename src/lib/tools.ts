// ============================================================================
// Study tool generators — definitions + tolerant parsers for AI output
// ============================================================================

export type ToolId =
  | "flashcards"
  | "quiz"
  | "notes"
  | "essay"
  | "summarizer";

export interface ToolDef {
  id: ToolId;
  label: string;
  description: string;
  color: string; // chip classes
  iconBg: string;
}

export const TOOL_DEFS: ToolDef[] = [
  {
    id: "flashcards",
    label: "Flashcards",
    description: "Flip-ready Q/A cards for rapid recall",
    color: "text-amber-700 bg-amber-100",
    iconBg: "bg-amber-400",
  },
  {
    id: "quiz",
    label: "Quiz",
    description: "5 exam-style MCQs with instant check",
    color: "text-rose-700 bg-rose-100",
    iconBg: "bg-rose-400",
  },
  {
    id: "notes",
    label: "Notes",
    description: "Structured revision notes",
    color: "text-teal-700 bg-teal-100",
    iconBg: "bg-teal-500",
  },
  {
    id: "essay",
    label: "Essay",
    description: "A full explanatory essay on the topic",
    color: "text-indigo-700 bg-indigo-100",
    iconBg: "bg-indigo-500",
  },
  {
    id: "summarizer",
    label: "Summarizer",
    description: "Rapid 1-minute revision summary",
    color: "text-violet-700 bg-violet-100",
    iconBg: "bg-violet-500",
  },
];

export function getToolDef(id: ToolId): ToolDef {
  return TOOL_DEFS.find((t) => t.id === id) ?? TOOL_DEFS[0];
}

// ---------------------------------------------------------------------------
// Flashcards: Q1./A1. line-pair format
// ---------------------------------------------------------------------------

export interface Flashcard {
  q: string;
  a: string;
}

export function parseFlashcards(content: string): Flashcard[] {
  const cards: Flashcard[] = [];
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let currentQ: string | null = null;
  for (const line of lines) {
    const qMatch = line.match(/^Q\d*[.:)\-–\s]+(.+)$/i);
    const aMatch = line.match(/^A\d*[.:)\-–\s]+(.+)$/i);
    if (qMatch) {
      if (currentQ !== null && cards.length === 0) {
        // orphan question without answer — skip silently
      }
      currentQ = qMatch[1];
    } else if (aMatch && currentQ !== null) {
      cards.push({ q: currentQ, a: aMatch[1] });
      currentQ = null;
    } else if (currentQ !== null) {
      // multi-line question — append
      currentQ = `${currentQ} ${line}`;
    }
  }
  return cards;
}

// ---------------------------------------------------------------------------
// Quiz: Q1. / A.-D. options / Answer: X blocks
// ---------------------------------------------------------------------------

export interface QuizQuestion {
  q: string;
  options: string[];
  answerIndex: number | null;
}

export function parseQuiz(content: string): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const blocks = content.split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.split("\n");
    let q: string | null = null;
    const options: string[] = [];
    let answerLetter: string | null = null;

    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;
      const qMatch = line.match(/^Q\d*[.:)\-–\s]+(.+)$/i);
      const optMatch = line.match(/^([A-D])[.:)\-–\s]+(.+)$/i);
      const ansMatch = line.match(/^answer\s*[:\-–]\s*([A-D])/i);

      if (qMatch) {
        q = qMatch[1];
      } else if (optMatch) {
        options.push(optMatch[2]);
      } else if (ansMatch) {
        answerLetter = ansMatch[1].toUpperCase();
      }
    }

    if (q && options.length >= 2) {
      const answerIndex =
        answerLetter !== null
          ? Math.min(answerLetter.charCodeAt(0) - 65, options.length - 1)
          : null;
      questions.push({ q, options, answerIndex });
    }
  }
  return questions;
}
