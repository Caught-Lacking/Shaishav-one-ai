// ============================================================================
// Shaishav study tools — definitions (sidebar sections) + tolerant parsers
// ============================================================================

export type ToolId =
  | "flashcards"
  | "quiz"
  | "notes"
  | "pomodoro"
  | "math"
  | "essay"
  | "summarizer"
  | "translator"
  | "vocabulary"
  | "doubt"
  | "explainer"
  | "paper"
  | "formula"
  | "habit"
  | "planner";

export type ToolSection = "study-tools" | "ai-tools" | "productivity";

export interface ToolDef {
  id: ToolId;
  label: string;
  description: string;
  icon: string; // lucide icon name
  section: ToolSection;
  /** needs a topic context (subject + chapter + topic) */
  needsTopic: boolean;
  color: string; // chip classes
  iconBg: string;
}

export const TOOL_DEFS: ToolDef[] = [
  // ------------------------- STUDY TOOLS -------------------------
  {
    id: "flashcards",
    label: "Flashcards",
    description: "Flip-ready Q/A cards for rapid recall",
    icon: "Layers",
    section: "study-tools",
    needsTopic: true,
    color: "text-amber-700 bg-amber-100",
    iconBg: "bg-amber-400",
  },
  {
    id: "quiz",
    label: "Quiz",
    description: "5 exam-style MCQs with instant check",
    icon: "ListChecks",
    section: "study-tools",
    needsTopic: true,
    color: "text-rose-700 bg-rose-100",
    iconBg: "bg-rose-400",
  },
  {
    id: "notes",
    label: "Notes",
    description: "Structured revision notes",
    icon: "NotebookPen",
    section: "study-tools",
    needsTopic: true,
    color: "text-teal-700 bg-teal-100",
    iconBg: "bg-teal-500",
  },
  {
    id: "pomodoro",
    label: "Pomodoro",
    description: "25-min focus timer with breaks",
    icon: "Timer",
    section: "study-tools",
    needsTopic: false,
    color: "text-orange-700 bg-orange-100",
    iconBg: "bg-orange-500",
  },

  // --------------------------- AI TOOLS ---------------------------
  {
    id: "math",
    label: "Math Solver",
    description: "Solve equations step by step",
    icon: "Calculator",
    section: "ai-tools",
    needsTopic: false,
    color: "text-indigo-700 bg-indigo-100",
    iconBg: "bg-indigo-500",
  },
  {
    id: "essay",
    label: "Essay Writer",
    description: "A full explanatory essay on the topic",
    icon: "PenLine",
    section: "ai-tools",
    needsTopic: true,
    color: "text-violet-700 bg-violet-100",
    iconBg: "bg-violet-500",
  },
  {
    id: "summarizer",
    label: "Summarizer",
    description: "Rapid 1-minute revision summary",
    icon: "Sparkles",
    section: "ai-tools",
    needsTopic: true,
    color: "text-fuchsia-700 bg-fuchsia-100",
    iconBg: "bg-fuchsia-500",
  },
  {
    id: "translator",
    label: "Translator",
    description: "English ⇄ Hindi study terms",
    icon: "Languages",
    section: "ai-tools",
    needsTopic: false,
    color: "text-cyan-700 bg-cyan-100",
    iconBg: "bg-cyan-500",
  },
  {
    id: "vocabulary",
    label: "Vocabulary",
    description: "Key terms with Hindi meanings",
    icon: "BookMarked",
    section: "ai-tools",
    needsTopic: false,
    color: "text-emerald-700 bg-emerald-100",
    iconBg: "bg-emerald-500",
  },
  {
    id: "doubt",
    label: "Doubt Solver",
    description: "Ask any doubt about the topic",
    icon: "CircleHelp",
    section: "ai-tools",
    needsTopic: true,
    color: "text-sky-700 bg-sky-100",
    iconBg: "bg-sky-500",
  },
  {
    id: "explainer",
    label: "Concept Explainer",
    description: "Step-by-step concept breakdown",
    icon: "Lightbulb",
    section: "ai-tools",
    needsTopic: true,
    color: "text-yellow-700 bg-yellow-100",
    iconBg: "bg-yellow-500",
  },
  {
    id: "paper",
    label: "Paper Analyzer",
    description: "PYQ pattern & weightage analysis",
    icon: "FileSearch",
    section: "ai-tools",
    needsTopic: true,
    color: "text-blue-700 bg-blue-100",
    iconBg: "bg-blue-500",
  },

  // ------------------------- PRODUCTIVITY -------------------------
  {
    id: "formula",
    label: "Formula Sheet",
    description: "All formulas of a subject, one page",
    icon: "Sigma",
    section: "productivity",
    needsTopic: false,
    color: "text-lime-700 bg-lime-100",
    iconBg: "bg-lime-500",
  },
  {
    id: "habit",
    label: "Habit Tracker",
    description: "Daily streaks for study habits",
    icon: "Flame",
    section: "productivity",
    needsTopic: false,
    color: "text-red-700 bg-red-100",
    iconBg: "bg-red-500",
  },
  {
    id: "planner",
    label: "Study Planner",
    description: "Weekly plan from your syllabus",
    icon: "CalendarCheck",
    section: "productivity",
    needsTopic: false,
    color: "text-purple-700 bg-purple-100",
    iconBg: "bg-purple-500",
  },
];

export function getToolDef(id: ToolId): ToolDef {
  return TOOL_DEFS.find((t) => t.id === id) ?? TOOL_DEFS[0];
}

export function toolsBySection(section: ToolSection): ToolDef[] {
  return TOOL_DEFS.filter((t) => t.section === section);
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
      currentQ = qMatch[1];
    } else if (aMatch && currentQ !== null) {
      cards.push({ q: currentQ, a: aMatch[1] });
      currentQ = null;
    } else if (currentQ !== null) {
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
      const ansMatch = line.match(/^answer\s*[: \-–]\s*([A-D])/i);

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
