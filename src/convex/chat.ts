"use node";

import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { action } from "./_generated/server";
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

function fillTemplate(template: string, map: Record<string, string>): string {
  return Object.entries(map).reduce((acc, [key, value]) => {
    return acc.split(key).join(value);
  }, template);
}

function buildSystemPrompt(args: {
  stream: StreamId;
  subjectId: string;
  chapterId: string;
  topicId: string;
}): string {
  const stream = getStream(args.stream);
  const subject = getSubject(args.subjectId);
  const chapter = getChapter(args.subjectId, args.chapterId);
  const topic = getTopic(args.subjectId, args.chapterId, args.topicId);
  return fillTemplate(SYSTEM_TEMPLATE, {
    "{STREAM}": stream.name,
    "{EXAM}": stream.exam,
    "{SUBJECT}": subject?.name ?? "Subject",
    "{CLASS}": String(chapter?.class ?? 12),
    "{CHAPTER}": chapter?.name ?? "Chapter",
    "{TOPIC}": topic?.name ?? "Topic",
    "{PYQ}": String(topic?.pyq ?? 0),
  });
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
  handler: async (ctx, args): Promise<{ chatId: Id<"chats">; reply: string }> => {
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
      content: args.content,
    });

    // 3. Gather history + build the system prompt.
    const chat = await ctx.runQuery(api.chats.get, { id: chatId });
    const history: { role: "user" | "assistant"; content: string }[] =
      chat?.messages ?? [];
    const messages = [
      { role: "system" as const, content: buildSystemPrompt(args) },
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
        maxTokens: 900,
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

    return { chatId, reply };
  },
});
