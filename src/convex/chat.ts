"use node";

import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { action, type ActionCtx } from "./_generated/server";
import { api } from "./_generated/api";
import { streamValidator } from "./schema";
import type { Id } from "./_generated/dataModel";
import { getTopic } from "../lib/curriculum";
import {
  generateChatReply,
  generateToolContent,
  type EngineContext,
} from "../lib/engine";

export const TOOL_LABELS = {
  flashcards: "Flashcards",
  quiz: "Quiz",
  notes: "Notes",
  essay: "Essay",
  summarizer: "Summarizer",
} as const;

export type ToolId = keyof typeof TOOL_LABELS;

interface ContextArgs {
  stream: "neet" | "jee";
  subjectId: string;
  chapterId: string;
  topicId: string;
}

/** Shared pipeline: create chat if needed, append messages, run the LOCAL
 *  Shaishav engine (no external API), persist the reply. */
async function runLocalExchange(
  ctx: ActionCtx,
  args: ContextArgs & {
    chatId?: Id<"chats">;
    userContent: string;
    title?: string;
    tool?: ToolId;
    instruction?: string;
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

  // 3. Gather history and run the local engine.
  const chat = await ctx.runQuery(api.chats.get, { id: chatId });
  const history: { role: "user" | "assistant"; content: string }[] =
    chat?.messages ?? [];

  const engineCtx: EngineContext = {
    stream: args.stream,
    subjectId: args.subjectId,
    chapterId: args.chapterId,
    topicId: args.topicId,
  };

  const reply = args.tool
    ? generateToolContent(args.tool, engineCtx, args.instruction)
    : generateChatReply(engineCtx, args.userContent, history);

  // 4. Persist the assistant reply.
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
    const result = await runLocalExchange(ctx, {
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
    const result = await runLocalExchange(ctx, {
      chatId: args.chatId,
      stream: args.stream,
      subjectId: args.subjectId,
      chapterId: args.chapterId,
      topicId: args.topicId,
      userContent: `Generate ${label} for ${topicName}${
        args.instruction ? `\n\nExtra instructions: ${args.instruction}` : ""
      }`,
      title: `${label} · ${topicName}`,
      tool: args.tool,
      instruction: args.instruction,
    });
    return { chatId: result.chatId, content: result.content };
  },
});
