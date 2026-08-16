"use node";

import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { action, type ActionCtx } from "./_generated/server";
import { api } from "./_generated/api";
import { streamValidator } from "./schema";
import type { Id } from "./_generated/dataModel";
import { vly } from "../lib/vly-integrations";
import {
  getChapter,
  getSubject,
  getTopic,
  getStream,
  type StreamId,
} from "../lib/curriculum";

const SYSTEM_TEMPLATE = `You are Shaishav One AI — a warm, precise and friendly study tutor for Indian Class 11 & 12 students preparing for {STREAM} ({EXAM}).

Current study context:
- Stream: {STREAM}
- Subject: {SUBJECT}
- NCERT Chapter (Class {CLASS}): {CHAPTER}
- Topic: {TOPIC}
- PYQs mapped to this topic: {PYQ}

Guidelines:
- Explain NCERT concepts in simple, exam-focused language suitable for a Class 11/12 student.
- Use short analogies, crisp definitions, and step-by-step reasoning.
- Format answers with markdown: headings (##), bullet lists, bold key terms, and code blocks only for equations/derivations.
- Where relevant, mention the pattern of PYQs asked on this topic in recent years and the expected question types.
- For numerical problems, show the formula, substitute values, and solve step by step with units.
- Keep responses focused: explain the asked concept well, then offer to go deeper (more examples, PYQ drill, or summary notes).
- Stay strictly within the standard NCERT + NEET/JEE syllabus. Never invent facts or formulas outside the syllabus.
- If the student asks something unrelated to their stream/subject, gently guide them back to the current topic.`;

export const TOOL_LABELS = {
  flashcards: "Flashcards",
  quiz: "Quiz",
  notes: "Notes",
  essay: "Essay",
  summarizer: "Summarizer",
} as const;

export type ToolId = keyof typeof TOOL_LABELS;

const TOOL_PROMPTS: Record<ToolId, string> = {
  flashcards: `Create 8-10 crisp, high-yield flashcards for the current topic (definitions, formulas, facts, common traps).

Format EXACTLY — one question/answer pair per two consecutive lines, with a blank line between pairs:

Q1. <question>
A1. <answer>

Q2. <question>
A2. <answer>

Keep questions short and answers to one sentence (max two). No extra text, no headings, no bullets outside this format.`,

  quiz: `Create 5 exam-style single-correct MCQs for the current topic in the style of recent {STREAM} papers (conceptual + numerical mix).

Format EXACTLY, separating questions with blank lines:

Q1. <question>
A. <option>
B. <option>
C. <option>
D. <option>
Answer: B

Use plausible distractors. The last line of each block must be "Answer: <letter>". No other text.`,

  notes: `Write clean, structured revision notes for the current topic. Use markdown:
- ## headings for sections
- Key definitions and formulas (show the equation clearly)
- Important NCERT points and common exam traps
- 3 quick PYQ-style pointers (what is usually asked and how)
Keep it tight and exam-focused.`,

  essay: `Write a well-structured explanatory essay (4-6 short paragraphs) on the current topic for a Class 11/12 student preparing for {STREAM}. Include: an introduction connecting the idea to everyday life, the core concept explained step by step, worked example(s) with reasoning, its importance in the exam, and a concise conclusion. Use ## headings and keep the tone warm and clear.`,

  summarizer: `Summarise the current topic into:
1. 3-5 crisp bullet-point key ideas
2. The 2 most important formulas/definitions (shown clearly)
3. One-line takeaway for last-minute revision
Use markdown bullets and keep it short enough for quick revision.`,
};

function fillTemplate(template: string, map: Record<string, string>): string {
  return Object.entries(map).reduce((acc, [key, value]) => {
    return acc.split(key).join(value);
  }, template);
}

interface ContextArgs {
  stream: StreamId;
  subjectId: string;
  chapterId: string;
  topicId: string;
}

function buildSystemPrompt(args: ContextArgs, extra?: string): string {
  const stream = getStream(args.stream);
  const subject = getSubject(args.subjectId);
  const chapter = getChapter(args.subjectId, args.chapterId);
  const topic = getTopic(args.subjectId, args.chapterId, args.topicId);
  const base = fillTemplate(SYSTEM_TEMPLATE, {
    "{STREAM}": stream.name,
    "{EXAM}": stream.exam,
    "{SUBJECT}": subject?.name ?? "Subject",
    "{CLASS}": String(chapter?.class ?? 12),
    "{CHAPTER}": chapter?.name ?? "Chapter",
    "{TOPIC}": topic?.name ?? "Topic",
    "{PYQ}": String(topic?.pyq ?? 0),
  });
  if (!extra) return base;
  const extraFilled = fillTemplate(extra, {
    "{STREAM}": stream.name,
    "{EXAM}": stream.exam,
    "{SUBJECT}": subject?.name ?? "Subject",
    "{CHAPTER}": chapter?.name ?? "Chapter",
    "{TOPIC}": topic?.name ?? "Topic",
  });
  return `${base}\n\n---\n\nNow perform this specific task:\n${extraFilled}`;
}

/** Shared pipeline: create chat if needed, append messages, call AI, persist reply. */
async function runAiExchange(
  ctx: ActionCtx,
  args: ContextArgs & {
    chatId?: Id<"chats">;
    userContent: string;
    title?: string;
    systemExtra?: string;
  },
): Promise<{ chatId: Id<"chats">; content: string }> {
  const userId = await getAuthUserId(ctx);
  if (userId === null) throw new Error("Not signed in");

  // 1. Create the chat if this is the first message.
  let chatId = args.chatId;
  if (!chatId) {
    chatId = await ctx.runMutation(api.chats.createChat, {
      stream: args.stream,
      subjectId: args.subjectId,
      chapterId: args.chapterId,
      topicId: args.topicId,
      title:
        args.title ??
        getTopic(args.subjectId, args.chapterId, args.topicId)?.name ??
        "Study chat",
    });
  }

  // 2. Persist the user message.
  await ctx.runMutation(api.chats.appendMessage, {
    chatId,
    role: "user",
    content: args.userContent,
  });

  // 3. Gather history + build the system prompt.
  const chat = await ctx.runQuery(api.chats.get, { id: chatId });
  const history: { role: "user" | "assistant"; content: string }[] =
    chat?.messages ?? [];
  const messages = [
    { role: "system" as const, content: buildSystemPrompt(args, args.systemExtra) },
    ...history.slice(-12).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  // 4. Call the AI gateway.
  let reply =
    "Sorry — I couldn't reach my study engine just now. Please try again in a moment!";
  try {
    const completion = await vly.ai.completion({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    });
    if (completion.success && completion.data?.choices?.[0]?.message?.content) {
      reply = completion.data.choices[0].message.content;
    } else if (completion.error) {
      console.error("[shaishav] AI completion error:", completion.error);
    }
  } catch (error) {
    console.error("[shaishav] AI gateway exception:", error);
  }

  // 5. Persist the assistant reply.
  await ctx.runMutation(api.chats.appendMessage, {
    chatId,
    role: "assistant",
    content: reply,
  });

  return { chatId, content: reply };
}

export const generate = action({
  args: {
    chatId: v.optional(v.id("chats")),
    stream: streamValidator,
    subjectId: v.string(),
    chapterId: v.string(),
    topicId: v.string(),
    content: v.string(),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await runAiExchange(ctx, {
      chatId: args.chatId,
      stream: args.stream,
      subjectId: args.subjectId,
      chapterId: args.chapterId,
      topicId: args.topicId,
      userContent: args.content,
      title: args.title,
    });
    return { chatId: result.chatId, reply: result.content };
  },
});

export const generateTool = action({
  args: {
    chatId: v.optional(v.id("chats")),
    stream: streamValidator,
    subjectId: v.string(),
    chapterId: v.string(),
    topicId: v.string(),
    tool: v.union(
      v.literal("flashcards"),
      v.literal("quiz"),
      v.literal("notes"),
      v.literal("essay"),
      v.literal("summarizer"),
    ),
    instruction: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const topic = getTopic(args.subjectId, args.chapterId, args.topicId);
    const topicName = topic?.name ?? "this topic";
    const label = TOOL_LABELS[args.tool];
    const userContent = `Generate ${label} for ${topicName}${
      args.instruction ? `\n\nExtra instructions: ${args.instruction}` : ""
    }`;

    const result = await runAiExchange(ctx, {
      chatId: args.chatId,
      stream: args.stream,
      subjectId: args.subjectId,
      chapterId: args.chapterId,
      topicId: args.topicId,
      userContent,
      title: `${label} · ${topicName}`,
      systemExtra: TOOL_PROMPTS[args.tool],
    });
    return { chatId: result.chatId, content: result.content };
  },
});
