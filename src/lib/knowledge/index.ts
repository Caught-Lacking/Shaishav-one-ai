// ============================================================================
// Shaishav local knowledge base — the "brain" behind the offline AI.
// Every NCERT chapter (NEET + JEE, Class 11 & 12) maps to compact, exam-tuned
// study content: summaries, key points, formulas, glossary (with Hindi), common
// mistakes and PYQ-style questions with explanations.
// ============================================================================

import { getChapter, getSubject, type StreamId } from "../curriculum";
import { PHYSICS_KNOWLEDGE } from "./physics";
import { CHEMISTRY_KNOWLEDGE } from "./chemistry";
import { BIOLOGY_KNOWLEDGE } from "./biology";
import { MATHS_KNOWLEDGE } from "./maths";

export interface PyqQuestion {
  q: string;
  options: string[];
  /** index into options (0-3) */
  answer: number;
  explanation: string;
}

export interface Formula {
  name: string;
  formula: string;
}

export interface GlossaryItem {
  term: string;
  def: string;
  hindi?: string;
}

export interface ChapterKnowledge {
  /** 1-2 sentence overview of the chapter */
  summary: string;
  /** high-yield NCERT points */
  keyPoints: string[];
  /** formulas / ratios / key equations */
  formulas?: Formula[];
  /** key terms with Hindi where useful */
  glossary: GlossaryItem[];
  /** classic exam traps */
  mistakes: string[];
  /** PYQ-style MCQs with explanations */
  pyqs: PyqQuestion[];
  /** one-line exam tip */
  tip?: string;
  /** optional per-topic one-liners (topic name -> note) */
  topicNotes?: Record<string, string>;
}

const ALL: Record<string, ChapterKnowledge> = {
  ...PHYSICS_KNOWLEDGE,
  ...CHEMISTRY_KNOWLEDGE,
  ...BIOLOGY_KNOWLEDGE,
  ...MATHS_KNOWLEDGE,
};

export function getKnowledge(
  subjectId: string,
  chapterId: string,
): ChapterKnowledge {
  const entry = ALL[`${subjectId}:${chapterId}`];
  if (entry) return entry;
  return buildFallback(subjectId, chapterId);
}

/** Generic fallback so no chapter is ever empty, even if uncurated. */
function buildFallback(subjectId: string, chapterId: string): ChapterKnowledge {
  const subject = getSubject(subjectId);
  const chapter = getChapter(subjectId, chapterId);
  const name = chapter?.name ?? "this chapter";
  const topics = chapter?.topics ?? [];
  return {
    summary: `${name} is a core ${subject?.name ?? "subject"} chapter in the Class ${chapter?.class ?? 11} NCERT syllabus. This notebook breaks it into the exact topics ${subjectId === "biology" ? "NEET" : "your exam"} keeps asking about.`,
    keyPoints: [
      `Read the full NCERT text of “${name}” once — every line can seed a question.`,
      ...topics.slice(0, 4).map((t) => `Master “${t.name}” — it is a repeatedly asked area.`),
      "Write the definitions in your own words; direct NCERT lines are favoured in exams.",
    ],
    formulas:
      subjectId === "maths"
        ? [{ name: "Practice formula", formula: "Repetition is the master formula — solve 10 problems daily." }]
        : [{ name: "Key relation", formula: "Check the NCERT text for the exact statement and units." }],
    glossary: [
      { term: name, def: `The chapter “${name}” covers ${topics.map((t) => t.name).join(", ") || "its core ideas"}.` },
    ],
    mistakes: [
      "Skipping the NCERT definitions and jumping straight to question banks.",
      "Ignoring units / notation specific to this chapter.",
    ],
    pyqs: [],
    tip: `Revise ${name} in short 20-minute sessions; its topics carry steady weightage.`,
  };
}

export function streamTip(stream: StreamId): string {
  const tips: Record<StreamId, string[]> = {
    neet: [
      "Use spaced repetition for biology diagrams — 10 mins daily beats 2 hours on weekends.",
      "NEET favours NCERT lines: read the exact statement twice before attempting PYQs.",
      "For numericals, write the formula first, then substitute units — half your errors vanish.",
      "Revise Chemistry in the morning when organic reaction mechanisms feel easier to recall.",
      "Do one 45-minute mixed-topic PYQ drill every third day to train exam stamina.",
    ],
    jee: [
      "JEE rewarders are the ones who practise — aim for 10 mixed numericals a day, timed.",
      "Master the standard integrals and differentiation rules cold; they save minutes per question.",
      "For Maths, write the approach before calculating — partial marks love clean method lines.",
      "Physics theory in NCERT, practice from problems: concepts first, speed later.",
      "Revise formula sheets every Sunday; spaced revision beats last-month cramming.",
    ],
  };
  const list = tips[stream];
  const day = Math.floor(Date.now() / 86_400_000);
  return list[day % list.length];
}

export function streamTitle(stream: StreamId): string {
  return stream === "neet" ? "Medical" : "Engineering";
}
