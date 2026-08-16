import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

export const streamValidator = v.union(v.literal("neet"), v.literal("jee"));

export const chatMessageValidator = v.object({
  role: v.union(v.literal("user"), v.literal("assistant")),
  content: v.string(),
});

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
      stream: v.optional(streamValidator), // chosen stream: "neet" | "jee"
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // AI study conversations (notebook LM style)
    chats: defineTable({
      userId: v.id("users"),
      stream: streamValidator,
      subjectId: v.string(),
      chapterId: v.string(),
      topicId: v.string(),
      title: v.string(),
      messages: v.array(chatMessageValidator),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_user_updated", ["userId", "updatedAt"]),

    // topic-level study progress ("done" / started)
    progress: defineTable({
      userId: v.id("users"),
      subjectId: v.string(),
      chapterId: v.string(),
      topicId: v.string(),
      done: v.boolean(),
      updatedAt: v.number(),
    }).index("by_user", ["userId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
