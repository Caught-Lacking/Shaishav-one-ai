// ============================================================================
// Shaishav One AI — fully local study engine.
// No external API: everything is generated from the curated knowledge base
// (src/lib/knowledge) + NCERT curriculum. Runs in the browser AND inside the
// Convex action (pure TS, no platform APIs).
// ============================================================================

import {
  getChapter,
  getSubject,
  getStream,
  getTopic,
  getStreamSubjects,
  subjectChaptersByClass,
  type StreamId,
} from "./curriculum";
import {
  getKnowledge,
  streamTip,
  type ChapterKnowledge,
  type PyqQuestion,
} from "./knowledge";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface EngineContext {
  stream: StreamId;
  subjectId: string;
  chapterId: string;
  topicId: string;
}

export interface ResolvedContext {
  stream: StreamId;
  streamName: string;
  examName: string;
  subject: { id: string; name: string } | undefined;
  chapter: { id: string; name: string; class: number } | undefined;
  topic: { id: string; name: string; pyq: number } | undefined;
  knowledge: ChapterKnowledge;
}

export function resolveContext(ctx: EngineContext): ResolvedContext {
  const stream = getStream(ctx.stream);
  const subject = getSubject(ctx.subjectId);
  const chapter = getChapter(ctx.subjectId, ctx.chapterId);
  const topic = getTopic(ctx.subjectId, ctx.chapterId, ctx.topicId);
  const knowledge = getKnowledge(ctx.subjectId, ctx.chapterId);
  return {
    stream: ctx.stream,
    streamName: stream.name,
    examName: stream.exam,
    subject: subject ? { id: subject.id, name: subject.name } : undefined,
    chapter: chapter
      ? { id: chapter.id, name: chapter.name, class: chapter.class }
      : undefined,
    topic: topic ? { id: topic.id, name: topic.name, pyq: topic.pyq } : undefined,
    knowledge,
  };
}

export function contextLine(ctx: ResolvedContext): string {
  return [
    ctx.streamName,
    ctx.subject?.name,
    ctx.chapter ? `Class ${ctx.chapter.class}` : undefined,
  ]
    .filter(Boolean)
    .join(" · ");
}

// ---------------------------------------------------------------------------
// Seeded randomness so "Regenerate" produces fresh-but-deterministic variety
// ---------------------------------------------------------------------------

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length) % arr.length];
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const LETTERS = ["A", "B", "C", "D"];

function fmtOptions(pyq: PyqQuestion): string[] {
  return pyq.options.map((o, i) => `${LETTERS[i]}. ${o}`);
}

function pyqToLines(pyq: PyqQuestion): string[] {
  return [
    `Q. ${pyq.q}`,
    ...fmtOptions(pyq),
    `Answer: ${LETTERS[pyq.answer]}`,
  ];
}

// ---------------------------------------------------------------------------
// Intent detection for free chat
// ---------------------------------------------------------------------------

type Intent =
  | "flashcards"
  | "quiz"
  | "notes"
  | "essay"
  | "summarizer"
  | "formula"
  | "mistakes"
  | "pyq"
  | "example"
  | "simple"
  | "deep"
  | "explain";

function detectIntent(q: string): Intent {
  const t = q.toLowerCase();
  if (/(flashcard|flash card|cards|revision card)/.test(t)) return "flashcards";
  if (/(quiz|mcq|test me|multiple choice|question paper drill)/.test(t))
    return "quiz";
  if (/(revision note|write notes|make notes|short note|notes for)/.test(t))
    return "notes";
  if (/(essay|write a full|explain in paragraphs)/.test(t)) return "essay";
  if (/(summari[sz]e|summar[y]|short summary|tl;dr|in 5 points|quick recap)/.test(t))
    return "summarizer";
  if (/(formula|equation|all the formulas|derivations list)/.test(t))
    return "formula";
  if (/(mistake|trap|error|wrong|common blunder|confus)/.test(t))
    return "mistakes";
  if (/(pyq|previous year|weightage|exam pattern|how (is|are) .* asked|marks)/.test(t))
    return "pyq";
  if (/(example|numerical|solve|worked out|sample problem)/.test(t))
    return "example";
  if (/(simple|simplest|analogy|like i'?m (5|ten)|first time|beginner|easy way|intuiti)/.test(t))
    return "simple";
  if (/(deep|derivation|advanced|proof|why is|mathematical)/.test(t))
    return "deep";
  return "explain";
}

// ---------------------------------------------------------------------------
// Chat reply
// ---------------------------------------------------------------------------

export function generateChatReply(
  ctx: EngineContext,
  question: string,
  history?: { role: "user" | "assistant"; content: string }[],
): string {
  const r = resolveContext(ctx);
  const intent = detectIntent(question);
  const topicName = r.topic?.name ?? r.chapter?.name ?? "this topic";
  const k = r.knowledge;

  const header = `**${topicName}** · ${contextLine(r)} — ${r.chapter?.name ?? ""} (${r.topic?.pyq ?? 0} PYQs mapped)`;

  let body = "";
  switch (intent) {
    case "flashcards":
      body = generateToolContent("flashcards", ctx);
      return `### 🃏 Flashcards — ${topicName}\n\n${body}`;
    case "quiz":
      body = generateToolContent("quiz", ctx);
      return `### 📝 Quiz drill — ${topicName}\n\n${body}`;
    case "notes":
      return `### 📒 Revision notes — ${topicName}\n\n${header}\n\n${generateToolContent("notes", ctx)}`;
    case "essay":
      return `### ✍️ Essay — ${topicName}\n\n${generateToolContent("essay", ctx)}`;
    case "summarizer":
      return `### ⚡ Quick summary — ${topicName}\n\n${generateToolContent("summarizer", ctx)}`;
    case "formula":
      body = buildFormulasSection(k);
      return `${header}\n\n${body}\n\nWant me to build flashcards or a quiz drill around these? Just say the word.`;
    case "mistakes":
      body = k.mistakes
        .map((m, i) => `${i + 1}. ${m}`)
        .join("\n");
      return `${header}\n\n## ⚠️ Where students usually go wrong on ${topicName}\n\n${body}\n\n${k.tip ? `\n**Shaishav tip:** ${k.tip}` : ""}\n\nWant a PYQ drill to check yourself? Type “quiz”.`;
    case "pyq":
      return buildPyqDrill(r, k, topicName);
    case "example":
      return buildWorkedExample(r, k, topicName);
    case "simple":
      return buildSimpleExplanation(r, k, topicName);
    case "deep":
      return buildDeepExplanation(r, k, topicName);
    default:
      return buildFullExplanation(r, k, topicName);
  }
}

function buildFormulasSection(k: ChapterKnowledge): string {
  const formulas = k.formulas?.length ? k.formulas : [];
  if (!formulas.length) {
    return "This chapter is concept-heavy — the key points below are what examiners test:\n\n" + k.keyPoints.map((p) => `- ${p}`).join("\n");
  }
  return (
    "## 📐 Key formulas & relations\n\n" +
    formulas.map((f) => `- **${f.name}:** \`${f.formula}\``).join("\n")
  );
}

function buildFullExplanation(r: ResolvedContext, k: ChapterKnowledge, topicName: string): string {
  const lines: string[] = [];
  lines.push(`## ${topicName}`);
  lines.push("");
  lines.push(k.summary);
  lines.push("");
  lines.push("### 🔑 Core points (NCERT-tuned)");
  lines.push("");
  lines.push(k.keyPoints.map((p) => `- ${p}`).join("\n"));
  if (k.formulas?.length) {
    lines.push("");
    lines.push("### 📐 Formulas to memorise");
    lines.push("");
    lines.push(k.formulas.map((f) => `- **${f.name}:** \`${f.formula}\``).join("\n"));
  }
  lines.push("");
  lines.push("### ⚠️ Common traps");
  lines.push("");
  lines.push(k.mistakes.map((m) => `- ${m}`).join("\n"));
  if (k.pyqs.length) {
    lines.push("");
    lines.push("### 🎯 PYQ angle");
    lines.push("");
    const p = k.pyqs[0];
    lines.push(`A question like this has appeared: **${p.q}**`);
    lines.push(`Answer: **${LETTERS[p.answer]}. ${p.options[p.answer]}** — ${p.explanation}`);
  }
  lines.push("");
  lines.push(k.tip ? `> 💡 **Exam tip:** ${k.tip}` : "");
  lines.push("");
  lines.push("---");
  lines.push("Want me to go deeper (derivation), simplify with an analogy, or run a PYQ quiz on this? Just ask!");
  return lines.join("\n");
}

function buildSimpleExplanation(r: ResolvedContext, k: ChapterKnowledge, topicName: string): string {
  const kp = k.keyPoints[0] ?? "";
  const lines: string[] = [];
  lines.push(`## ${topicName}, explained simply 🧠`);
  lines.push("");
  lines.push(`Think of it like this: ${k.summary}`);
  lines.push("");
  lines.push("### The one-liner");
  lines.push("");
  lines.push(`> ${kp}`);
  lines.push("");
  lines.push("### A way to remember it");
  lines.push("");
  lines.push(
    k.mistakes[0]
      ? `Most students trip on: ${k.mistakes[0]} — so keep the key idea above front of mind.`
      : "Read the key points above once slowly, then try to say them aloud without looking.",
  );
  if (k.formulas?.length) {
    lines.push("");
    lines.push("### The formula to trust");
    lines.push("");
    lines.push(`- **${k.formulas[0].name}:** \`${k.formulas[0].formula}\``);
  }
  lines.push("");
  lines.push("Want the full NCERT-level explanation next, or a 5-question drill to lock this in?");
  return lines.join("\n");
}

function buildDeepExplanation(r: ResolvedContext, k: ChapterKnowledge, topicName: string): string {
  const lines: string[] = [];
  lines.push(`## ${topicName} — deeper dive 🔬`);
  lines.push("");
  lines.push(k.summary);
  lines.push("");
  lines.push("### How it fits together");
  lines.push("");
  lines.push(k.keyPoints.map((p) => `- ${p}`).join("\n"));
  if (k.formulas?.length) {
    lines.push("");
    lines.push("### The relations that matter");
    lines.push("");
    lines.push(
      k.formulas
        .map((f) => `- **${f.name}:** \`${f.formula}\``)
        .join("\n"),
    );
  }
  lines.push("");
  lines.push("### Precision points (what toppers notice)");
  lines.push("");
  lines.push(k.mistakes.map((m) => `- ${m}`).join("\n"));
  lines.push("");
  lines.push("> 💡 " + (k.tip ?? "Revise this chapter in two short sessions with a PYQ drill in between."));
  lines.push("");
  lines.push("Want me to generate flashcards to test the details, or an essay connecting this to real life?");
  return lines.join("\n");
}

function buildPyqDrill(r: ResolvedContext, k: ChapterKnowledge, topicName: string): string {
  const lines: string[] = [];
  lines.push(`## 🎯 PYQ drill — ${topicName}`);
  lines.push("");
  lines.push(
    `This topic maps to **${r.topic?.pyq ?? 0} PYQs** in your ${r.streamName} bank. ${k.pyqs.length ? "Here are curated questions in the exact style of recent papers:" : "The chapter's hot spots are:"}`,
  );
  lines.push("");
  if (k.pyqs.length) {
    k.pyqs.forEach((p, i) => {
      lines.push(`**Q${i + 1}. ${p.q}**`);
      lines.push("");
      lines.push(fmtOptions(p).join("\n"));
      lines.push("");
      lines.push(`> **Answer: ${LETTERS[p.answer]}. ${p.options[p.answer]}**`);
      lines.push(`> ${p.explanation}`);
      lines.push("");
    });
  }
  lines.push("### 📌 How to approach this topic in the exam");
  lines.push("");
  lines.push(k.mistakes.map((m, i) => `${i + 1}. Avoid: ${m}`).join("\n"));
  lines.push("");
  lines.push("Want this as an interactive quiz (select options + check score)? Type “quiz”.");
  return lines.join("\n");
}

function buildWorkedExample(r: ResolvedContext, k: ChapterKnowledge, topicName: string): string {
  const lines: string[] = [];
  lines.push(`## 🔢 Worked example — ${topicName}`);
  lines.push("");
  const p = k.pyqs[0];
  if (p) {
    lines.push(`**Problem:** ${p.q}`);
    lines.push("");
    lines.push(fmtOptions(p).join("\n"));
    lines.push("");
    lines.push("**Step-by-step:**");
    lines.push("");
    lines.push(`1. Read what's given and what's asked. ${p.explanation.split(".")[0]}.`);
    lines.push(`2. Apply the relevant relation.`);
    lines.push(`3. Check units and sanity — the consistent answer is ${LETTERS[p.answer]}. ${p.options[p.answer]}.`);
    lines.push("");
    lines.push(`> **Answer: ${LETTERS[p.answer]}. ${p.options[p.answer]}** — ${p.explanation}`);
  } else {
    lines.push("This chapter is concept-based; here's the revision frame to use:");
    lines.push("");
    lines.push(k.keyPoints.map((pt) => `- ${pt}`).join("\n"));
  }
  lines.push("");
  lines.push("Want 5 fresh MCQs to practise with instant checking? Type “quiz”.");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Tool generators (formats match src/lib/tools.ts parsers)
// ---------------------------------------------------------------------------

export function generateToolContent(
  tool: "flashcards" | "quiz" | "notes" | "essay" | "summarizer",
  ctx: EngineContext,
  instruction?: string,
): string {
  const r = resolveContext(ctx);
  const k = r.knowledge;
  const topicName = r.topic?.name ?? r.chapter?.name ?? "this topic";
  const rand = mulberry32(hashString(`${ctx.subjectId}:${ctx.chapterId}:${ctx.topicId}:${tool}:${instruction ?? "plain"}`));

  switch (tool) {
    case "flashcards":
      return buildFlashcards(r, k, topicName, rand);
    case "quiz":
      return buildQuiz(r, k, topicName, rand);
    case "notes":
      return buildNotes(r, k, topicName);
    case "essay":
      return buildEssay(r, k, topicName);
    case "summarizer":
      return buildSummarizer(r, k, topicName);
  }
}

function buildFlashcards(
  r: ResolvedContext,
  k: ChapterKnowledge,
  topicName: string,
  rand: () => number,
): string {
  const cards: { q: string; a: string }[] = [];

  for (const g of k.glossary) {
    cards.push({
      q: `What is ${g.term}?`,
      a: `${g.def}${g.hindi ? ` (${g.hindi})` : ""}`,
    });
  }
  for (const f of k.formulas ?? []) {
    cards.push({ q: `Give the formula/relation for ${f.name}.`, a: f.formula });
  }
  for (const m of k.mistakes) {
    cards.push({
      q: `Name one common exam trap for ${topicName}.`,
      a: m,
    });
  }
  for (const p of k.pyqs) {
    cards.push({
      q: `PYQ-style: ${p.q}`,
      a: `${LETTERS[p.answer]}. ${p.options[p.answer]} — ${p.explanation}`,
    });
  }
  for (const kp of k.keyPoints.slice(0, 2)) {
    cards.push({
      q: `Quick recall: one high-yield point about ${topicName}.`,
      a: kp,
    });
  }

  // keep 8-10 cards
  const chosen = shuffle(cards, rand).slice(0, Math.min(10, cards.length));
  return chosen
    .map((c, i) => `Q${i + 1}. ${c.q}\nA${i + 1}. ${c.a}`)
    .join("\n\n");
}

function buildQuiz(
  r: ResolvedContext,
  k: ChapterKnowledge,
  topicName: string,
  rand: () => number,
): string {
  const questions: { q: string; options: string[]; answer: number; explanation?: string }[] = [];

  // 1-2 curated PYQs
  for (const p of k.pyqs.slice(0, 2)) {
    questions.push({ q: p.q, options: p.options, answer: p.answer, explanation: p.explanation });
  }

  // formula MCQ
  const formulas = k.formulas ?? [];
  if (formulas.length >= 2) {
    const correct = pick(formulas, rand);
    const distractors = shuffle(
      formulas.filter((f) => f !== correct).map((f) => f.formula),
      rand,
    );
    const wrong = new Set<string>();
    for (const d of distractors) if (wrong.size < 3) wrong.add(d);
    const pool = shuffle(
      [...wrong, "None of these relations apply here", "A constant, independent of the situation", "The inverse relation (flipped units)"].slice(0, 6),
      rand,
    );
    const options = shuffle([correct.formula, ...pool].slice(0, 4), rand);
    questions.push({
      q: `Which is the correct ${correct.name}?`,
      options,
      answer: options.indexOf(correct.formula),
    });
  }

  // glossary MCQ
  if (k.glossary.length >= 2) {
    const correct = pick(k.glossary, rand);
    const options = shuffle(
      [correct.def, ...k.glossary.filter((g) => g !== correct).map((g) => g.def)].slice(0, 4),
      rand,
    );
    questions.push({
      q: `What does “${correct.term}” mean?`,
      options,
      answer: options.indexOf(correct.def),
    });
  }

  // key point MCQ
  if (k.keyPoints.length >= 3) {
    const correct = pick(k.keyPoints, rand);
    const options = shuffle([correct, ...k.keyPoints.filter((p) => p !== correct).slice(0, 3)], rand);
    questions.push({
      q: `According to NCERT, which statement about ${topicName} is correct?`,
      options,
      answer: options.indexOf(correct),
    });
  }

  const blocks = questions.slice(0, 5).map((q, i) => {
    const lines = [
      `Q${i + 1}. ${q.q}`,
      ...q.options.map((o, oi) => `${LETTERS[oi]}. ${o}`),
      `Answer: ${LETTERS[q.answer]}`,
    ];
    if (q.explanation) lines.push(`Explanation: ${q.explanation}`);
    return lines.join("\n");
  });

  return blocks.join("\n\n");
}

function buildNotes(r: ResolvedContext, k: ChapterKnowledge, topicName: string): string {
  const lines: string[] = [];
  lines.push(`# Revision notes — ${topicName}`);
  lines.push("");
  lines.push(`**${r.subject?.name} · Class ${r.chapter?.class} · ${r.chapter?.name}** — ${r.streamName} | ${r.examName}`);
  lines.push("");
  lines.push(`> ${k.summary}`);
  lines.push("");
  lines.push("## Key points");
  lines.push("");
  lines.push(k.keyPoints.map((p) => `- ${p}`).join("\n"));
  if (k.formulas?.length) {
    lines.push("");
    lines.push("## Formulas");
    lines.push("");
    lines.push(k.formulas.map((f) => `- **${f.name}:** \`${f.formula}\``).join("\n"));
  }
  lines.push("");
  lines.push("## Glossary (quick recall)");
  lines.push("");
  lines.push(k.glossary.map((g) => `- **${g.term}** — ${g.def}`).join("\n"));
  lines.push("");
  lines.push("## Exam traps");
  lines.push("");
  lines.push(k.mistakes.map((m) => `- ${m}`).join("\n"));
  lines.push("");
  lines.push(k.tip ? `## One-liner\n\n${k.tip}` : "");
  return lines.join("\n");
}

function buildEssay(r: ResolvedContext, k: ChapterKnowledge, topicName: string): string {
  const lines: string[] = [];
  lines.push(`# ${topicName} — a complete explainer`);
  lines.push("");
  lines.push(`*${r.subject?.name} · Class ${r.chapter?.class} · ${r.chapter?.name} · ${r.streamName}*`);
  lines.push("");
  lines.push("## Introduction");
  lines.push("");
  lines.push(k.summary);
  lines.push("");
  lines.push("## The core concept, step by step");
  lines.push("");
  lines.push(k.keyPoints.map((p, i) => `**${i + 1}.** ${p}`).join("\n"));
  lines.push("");
  if (k.formulas?.length) {
    lines.push("## The relations that power it");
    lines.push("");
    lines.push(k.formulas.map((f) => `- **${f.name}:** \`${f.formula}\``).join("\n"));
    lines.push("");
  }
  lines.push("## Where students slip");
  lines.push("");
  lines.push(k.mistakes.map((m) => `- ${m}`).join("\n"));
  lines.push("");
  lines.push("## Why it matters in the exam");
  lines.push("");
  lines.push(
    `This topic carries ${r.topic?.pyq ?? 0} mapped PYQs. Examiners reward the student who knows ${k.keyPoints[0] ?? "the core idea"} — and punishes the ones who fall for the traps above.`,
  );
  lines.push("");
  lines.push("## Conclusion");
  lines.push("");
  lines.push(
    k.tip ??
      "Revise this topic twice — once for understanding, once through questions — and it becomes a reliable source of marks.",
  );
  return lines.join("\n");
}

function buildSummarizer(r: ResolvedContext, k: ChapterKnowledge, topicName: string): string {
  const lines: string[] = [];
  lines.push(`# ⚡ ${topicName} in 60 seconds`);
  lines.push("");
  lines.push("**Key ideas**");
  lines.push("");
  lines.push(k.keyPoints.slice(0, 5).map((p) => `- ${p}`).join("\n"));
  if (k.formulas?.length) {
    lines.push("");
    lines.push("**The 2 formulas that matter**");
    lines.push("");
    lines.push(
      k.formulas
        .slice(0, 2)
        .map((f) => `- **${f.name}:** \`${f.formula}\``)
        .join("\n"),
    );
  }
  lines.push("");
  lines.push("**Last-minute takeaway**");
  lines.push("");
  lines.push(`> ${k.tip ?? "Revise the key points above — they are what the exam keeps asking."}`);
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Specialised AI tools (sidebar tools)
// ---------------------------------------------------------------------------

/** Concept Explainer — structured, exam-tuned explanation. */
export function generateConceptExplanation(ctx: EngineContext): string {
  return generateChatReply(ctx, "explain this topic in depth");
}

/** Doubt Solver — keyword match against the chapter knowledge. */
export function resolveDoubt(ctx: EngineContext, doubt: string): string {
  const r = resolveContext(ctx);
  const k = r.knowledge;
  const t = doubt.toLowerCase();
  const topicName = r.topic?.name ?? r.chapter?.name ?? "this topic";

  const matches: string[] = [];
  const push = (label: string, value: string) => {
    if (value && t.length > 2) matches.push(`- **${label}:** ${value}`);
  };

  const kw = t.replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 3);
  for (const g of k.glossary) {
    if (kw.some((w) => g.term.toLowerCase().includes(w) || w.includes(g.term.toLowerCase().slice(0, 4)))) {
      push(g.term, `${g.def}${g.hindi ? ` (${g.hindi})` : ""}`);
    }
  }
  for (const f of k.formulas ?? []) {
    if (kw.some((w) => f.name.toLowerCase().includes(w))) {
      push(f.name, `\`${f.formula}\``);
    }
  }
  for (const kp of k.keyPoints) {
    const words = kp.toLowerCase().split(/\s+/).slice(0, 8);
    if (words.some((w) => kw.includes(w) && w.length > 4)) {
      push("Relevant point", kp);
      break;
    }
  }

  const lines: string[] = [];
  lines.push(`## 🤔 Doubt: ${doubt.trim()}`);
  lines.push("");
  lines.push(`Here's how it connects to **${topicName}**:`);
  lines.push("");
  if (matches.length) {
    lines.push(...matches);
  } else {
    lines.push(`- **Big picture:** ${k.summary}`);
    lines.push("");
    lines.push("I couldn't find a direct keyword hit, so here's the safest frame:");
    lines.push("");
    lines.push(k.keyPoints.slice(0, 3).map((p) => `- ${p}`).join("\n"));
  }
  lines.push("");
  lines.push("If this still feels unclear, ask me to 'explain simply' or 'show an example' — or open the Concept Explainer for a full walkthrough.");
  return lines.join("\n");
}

/** Paper Analyzer — PYQ pattern for the topic/chapter. */
export function generatePaperAnalysis(ctx: EngineContext): string {
  const r = resolveContext(ctx);
  const k = r.knowledge;
  const topicName = r.topic?.name ?? r.chapter?.name ?? "this topic";
  const chapterPyqs = r.topic?.pyq ?? 0;
  const totalInChapter = k.pyqs.length;

  const lines: string[] = [];
  lines.push(`# 📄 Paper analysis — ${topicName}`);
  lines.push("");
  lines.push(`**${r.streamName} · ${r.subject?.name} · Class ${r.chapter?.class} · ${r.chapter?.name}**`);
  lines.push("");
  lines.push("## Pattern at a glance");
  lines.push("");
  lines.push(`- Mapped PYQs for this topic: **${chapterPyqs}**`);
  lines.push(`- Curated questions in the bank: **${totalInChapter}**`);
  lines.push(`- Typical style: ${k.pyqs.length ? "single-correct MCQs mixing concepts and application" : "conceptual questions"}`);
  lines.push(`- Weight: ${k.mistakes.length > 0 ? "steady, appears every few papers" : "rotating — appears when the board wants this concept tested"}`);
  lines.push("");
  lines.push("## Frequently tested areas");
  lines.push("");
  lines.push(k.keyPoints.slice(0, 4).map((p) => `- ${p}`).join("\n"));
  lines.push("");
  lines.push("## Sample questions");
  lines.push("");
  if (k.pyqs.length) {
    lines.push(k.pyqs.map((p, i) => `**Q${i + 1}. ${p.q}**\n\n> Answer: ${LETTERS[p.answer]}. ${p.options[p.answer]}\n> ${p.explanation}`).join("\n\n"));
  } else {
    lines.push("- Practise the key points above as one-line answers — that is the chapter's pattern.");
  }
  lines.push("");
  lines.push("## Strategy");
  lines.push("");
  lines.push(`> ${k.tip ?? "Revise this topic twice, then drill the PYQs above."}`);
  return lines.join("\n");
}

/** Formula Sheet — all formulas of a subject (or one chapter). */
export function generateFormulaSheet(
  stream: StreamId,
  subjectId: string,
  chapterId?: string,
): string {
  const subject = getSubject(subjectId);
  if (!subject) return "Subject not found.";
  const chapters = chapterId
    ? subject.chapters.filter((c) => c.id === chapterId)
    : subject.chapters;

  const lines: string[] = [];
  lines.push(`# 📐 Formula sheet — ${subject.name} (${getStream(stream).name})`);
  lines.push("");
  for (const ch of chapters) {
    const k = getKnowledge(subjectId, ch.id);
    if (!k.formulas?.length) continue;
    lines.push(`## ${ch.name} (Class ${ch.class})`);
    lines.push("");
    lines.push(k.formulas.map((f) => `- **${f.name}:** \`${f.formula}\``).join("\n"));
    lines.push("");
  }
  if (lines.length <= 2) {
    lines.push("No formulas mapped yet for this subject — try the Concept Explainer for narrative notes instead.");
  }
  return lines.join("\n");
}

/** Vocabulary — glossary cards for a subject/chapter. */
export function buildVocabulary(
  subjectId: string,
  chapterId?: string,
): { term: string; def: string; hindi?: string }[] {
  const subject = getSubject(subjectId);
  if (!subject) return [];
  const chapters = chapterId
    ? subject.chapters.filter((c) => c.id === chapterId)
    : subject.chapters;
  const items: { term: string; def: string; hindi?: string }[] = [];
  for (const ch of chapters) {
    const k = getKnowledge(subjectId, ch.id);
    for (const g of k.glossary) items.push({ term: g.term, def: g.def, hindi: g.hindi });
  }
  return items;
}

/** Translator — term-level English ⇄ Hindi translation for study vocabulary. */
export function translateStudyText(
  subjectId: string,
  text: string,
): { original: string; translated: string; matched: { term: string; hindi?: string }[] } {
  const vocab = buildVocabulary(subjectId);
  const matched: { term: string; hindi?: string }[] = [];
  let out = text;
  for (const item of vocab) {
    const re = new RegExp(`\\b${item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    if (re.test(out)) {
      matched.push({ term: item.term, hindi: item.hindi });
      out = out.replace(re, `**${item.term}**${item.hindi ? ` (${item.hindi})` : ""}`);
    }
  }
  return { original: text, translated: out, matched };
}

// ---------------------------------------------------------------------------
// Math Solver — offline: arithmetic evaluation, linear & quadratic equations
// ---------------------------------------------------------------------------

export interface MathResult {
  ok: boolean;
  steps: string[];
  answer: string;
  error?: string;
}

function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  const s = expr.replace(/\s+/g, "");
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      tokens.push(s.slice(i, j));
      i = j;
    } else if (/[+\-*/^()x]/.test(c)) {
      if (c === "-" && (tokens.length === 0 || ["+", "-", "*", "/", "^", "("].includes(tokens[tokens.length - 1]))) {
        tokens.push("u-");
      } else {
        tokens.push(c);
      }
      i++;
    } else {
      throw new Error(`Unexpected character: ${c}`);
    }
  }
  return tokens;
}

function evaluateTokens(tokens: string[]): number {
  // shunting-yard
  const prec: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3, "u-": 4 };
  const ops: string[] = [];
  const vals: number[] = [];
  for (const tok of tokens) {
    if (/^[0-9.]+$/.test(tok)) {
      vals.push(parseFloat(tok));
    } else if (tok === "(") {
      ops.push(tok);
    } else if (tok === ")") {
      while (ops.length && ops[ops.length - 1] !== "(") applyOp(ops.pop()!, vals);
      ops.pop();
    } else if (tok in prec) {
      while (
        ops.length &&
        ops[ops.length - 1] !== "(" &&
        prec[ops[ops.length - 1]] >= prec[tok]
      ) {
        applyOp(ops.pop()!, vals);
      }
      ops.push(tok);
    }
  }
  while (ops.length) applyOp(ops.pop()!, vals);
  if (vals.length !== 1) throw new Error("Could not parse expression");
  return vals[0];
}

function applyOp(op: string, vals: number[]): void {
  if (op === "u-") {
    vals.push(-(vals.pop() ?? 0));
    return;
  }
  const b = vals.pop() ?? 0;
  const a = vals.pop() ?? 0;
  switch (op) {
    case "+": vals.push(a + b); break;
    case "-": vals.push(a - b); break;
    case "*": vals.push(a * b); break;
    case "/": vals.push(a / b); break;
    case "^": vals.push(Math.pow(a, b)); break;
  }
}

function parseEquation(side: string): { a: number; b: number; c: number } {
  // Collects coefficients of x^2, x and the constant from a side like "2x^2 - 3x + 5"
  let a = 0, b = 0, c = 0;
  const tokens = side.replace(/\s+/g, "").match(/[+-]?[^+-]+/g) ?? [];
  for (const raw of tokens) {
    const term = raw === "+" ? "" : raw;
    const t = term.replace(/^\+/, "");
    const m2 = t.match(/^([+-]?\d*\.?\d*)?x\^2$/);
    const m1 = t.match(/^([+-]?\d*\.?\d*)?x$/);
    if (m2) {
      const coef = m2[1] === undefined || m2[1] === "" || m2[1] === "+" ? 1 : m2[1] === "-" ? -1 : parseFloat(m2[1]);
      a += coef;
    } else if (m1) {
      const coef = m1[1] === undefined || m1[1] === "" || m1[1] === "+" ? 1 : m1[1] === "-" ? -1 : parseFloat(m1[1]);
      b += coef;
    } else if (t !== "") {
      c += parseFloat(t);
    }
  }
  return { a, b, c };
}

export function solveMath(input: string): MathResult {
  const expr = input.trim();
  try {
    // Quadratic: contains x^2 (and a '=')
    if (/x\^2/.test(expr) && expr.includes("=")) {
      const [lhs, rhs] = expr.split("=");
      const L = parseEquation(lhs);
      const R = parseEquation(rhs);
      const a = L.a - R.a;
      const b = L.b - R.b;
      const c = L.c - R.c;
      if (a === 0) {
        // falls back to linear
        return solveLinear(b, c);
      }
      const D = b * b - 4 * a * c;
      const steps = [
        `Standard form: ${fmtNum(a)}x² ${signed(b)}x ${signed(c)} = 0`,
        `Discriminant D = b² − 4ac = (${fmtNum(b)})² − 4(${fmtNum(a)})(${fmtNum(c)}) = ${fmtNum(D)}`,
      ];
      if (D > 0) {
        const x1 = (-b + Math.sqrt(D)) / (2 * a);
        const x2 = (-b - Math.sqrt(D)) / (2 * a);
        steps.push(`Since D > 0, two real roots:`);
        steps.push(`x = (−b ± √D)/(2a) = (${fmtNum(-b)} ± ${fmtNum(Math.sqrt(D))})/(${fmtNum(2 * a)})`);
        return { ok: true, steps, answer: `x = ${fmtNum(x1)} or x = ${fmtNum(x2)}` };
      } else if (D === 0) {
        const x = -b / (2 * a);
        steps.push(`D = 0 ⇒ one repeated root: x = −b/(2a) = ${fmtNum(x)}`);
        return { ok: true, steps, answer: `x = ${fmtNum(x)} (repeated root)` };
      } else {
        const real = -b / (2 * a);
        const imag = Math.sqrt(-D) / (2 * a);
        steps.push(`D < 0 ⇒ complex conjugate roots: x = ${fmtNum(real)} ± ${fmtNum(imag)}i`);
        return { ok: true, steps, answer: `x = ${fmtNum(real)} ± ${fmtNum(imag)}i` };
      }
    }

    // Linear equation: contains '=' and an x
    if (expr.includes("=") && /x/.test(expr)) {
      const [lhs, rhs] = expr.split("=");
      const L = parseEquation(lhs);
      const R = parseEquation(rhs);
      return solveLinear(L.b - R.b, L.c - R.c);
    }

    // Pure arithmetic evaluation
    const tokens = tokenize(expr);
    const value = evaluateTokens(tokens);
    return {
      ok: true,
      steps: [`Evaluated: ${expr}`],
      answer: `= ${fmtNum(value)}`,
    };
  } catch (e) {
    return {
      ok: false,
      steps: [],
      answer: "",
      error: e instanceof Error ? e.message : "Could not parse that expression.",
    };
  }
}

function signed(n: number): string {
  const v = fmtNum(Math.abs(n));
  return n < 0 ? `- ${v}` : `+ ${v}`;
}

function solveLinear(b: number, c: number): MathResult {
  const steps = [`Bring terms together: ${fmtNum(b)}x ${signed(c)} = 0`];
  if (b === 0) {
    return { ok: true, steps, answer: c === 0 ? "Infinite solutions (identity)" : "No solution (contradiction)" };
  }
  const x = -c / b;
  steps.push(`x = −c/b = ${fmtNum(-c)}/${fmtNum(b)}`);
  steps.push(`x = ${fmtNum(x)}`);
  return { ok: true, steps, answer: `x = ${fmtNum(x)}` };
}

function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "undefined";
  if (Number.isInteger(n)) return String(n);
  const s = n.toFixed(4);
  return s.replace(/\.?0+$/, "");
}

// ---------------------------------------------------------------------------
// Study Planner — weekly plan generated from the stream's syllabus
// ---------------------------------------------------------------------------

export interface PlanDay {
  day: string;
  focus: string;
  sessions: { time: string; task: string }[];
}

export function generateStudyPlan(
  stream: StreamId,
  classLevel: 11 | 12,
  salt = 0,
): PlanDay[] {
  const subjectDefs = getStreamSubjects(stream);
  const chapters = subjectDefs.flatMap((s) =>
    subjectChaptersByClass(s)
      .filter((g) => g.cls === classLevel)
      .flatMap((g) => g.chapters.map((c) => ({ subject: s.name, chapter: c.name, topics: c.topics.length }))),
  );
  const rand = mulberry32(hashString(`${stream}:${classLevel}:${new Date().getDate()}:${salt}`));
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const focusNotes = [
    "Concept reading + highlight NCERT lines",
    "Numerical/problem practice",
    "PYQ drill on the chapter",
    "Flashcards + quick revision",
    "Mistake-list review",
  ];

  return days.map((day, i) => {
    const pool = shuffle(chapters, rand);
    const morning = pool[i % pool.length];
    const evening = pool[(i + 3) % pool.length];
    return {
      day,
      focus: `${morning.subject} — ${morning.chapter}`,
      sessions: [
        { time: "Morning (45 min)", task: `${focusNotes[0]} — ${morning.subject}: ${morning.chapter} (${morning.topics} topics).` },
        { time: "Noon (30 min)", task: `${focusNotes[2]} — 10 PYQs from ${morning.chapter}.` },
        { time: "Evening (45 min)", task: `${focusNotes[1]} — ${evening.subject}: ${evening.chapter} problems.` },
        { time: "Night (20 min)", task: `${focusNotes[3]} — flashcards + review the mistakes list of today's chapters.` },
      ],
    };
  });
}

export function dailyTip(stream: StreamId): string {
  return streamTip(stream);
}
