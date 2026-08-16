import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { streamValidator } from "./schema";

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("chats")
      .withIndex("by_user_updated", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("chats") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const chat = await ctx.db.get(id);
    if (!chat || chat.userId !== userId) return null;
    return chat;
  },
});

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export const createChat = mutation({
  args: {
    stream: streamValidator,
    subjectId: v.string(),
    chapterId: v.string(),
    topicId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not signed in");
    const now = Date.now();
    return await ctx.db.insert("chats", {
      userId,
      stream: args.stream,
      subjectId: args.subjectId,
      chapterId: args.chapterId,
      topicId: args.topicId,
      title: args.title,
      messages: [],
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const appendMessage = mutation({
  args: {
    chatId: v.id("chats"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
  },
  handler: async (ctx, { chatId, role, content }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not signed in");
    const chat = await ctx.db.get(chatId);
    if (!chat || chat.userId !== userId) throw new Error("Chat not found");
    await ctx.db.patch(chatId, {
      messages: [...chat.messages, { role, content }],
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("chats") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not signed in");
    const chat = await ctx.db.get(id);
    if (!chat || chat.userId !== userId) throw new Error("Chat not found");
    await ctx.db.delete(id);
  },
});
