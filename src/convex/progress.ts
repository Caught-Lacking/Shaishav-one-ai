import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";

/**
 * All progress entries for the signed-in user.
 * Used by the dashboard to compute per-subject chapter coverage.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("progress")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

/** Mark a topic as done / not done (upsert). */
export const setDone = mutation({
  args: {
    subjectId: v.string(),
    chapterId: v.string(),
    topicId: v.string(),
    done: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not signed in");

    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) =>
        q.and(
          q.eq(q.field("subjectId"), args.subjectId),
          q.eq(q.field("chapterId"), args.chapterId),
          q.eq(q.field("topicId"), args.topicId),
        ),
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        done: args.done,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("progress", {
        userId,
        subjectId: args.subjectId,
        chapterId: args.chapterId,
        topicId: args.topicId,
        done: args.done,
        updatedAt: Date.now(),
      });
    }
  },
});
