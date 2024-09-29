import { InferSelectModel, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  pgPolicy,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const todos = pgTable(
  "todos",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedByDefaultAsIdentity(),
    userId: text("user_id")
      .notNull()
      .default(sql`(auth.user_id())`),
    task: text("task").notNull(),
    isComplete: boolean("is_complete").notNull().default(false),
    insertedAt: timestamp("inserted_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    p1: pgPolicy("create todos", {
      for: "insert",
      to: "authenticated",
      withCheck: sql`(select auth.user_id() = user_id)`,
    }),

    p2: pgPolicy("view todos", {
      for: "select",
      to: "authenticated",
      using: sql`(select auth.user_id() = user_id)`,
    }),

    p3: pgPolicy("update todos", {
      for: "update",
      to: "authenticated",
      using: sql`(select auth.user_id() = user_id)`,
    }),

    p4: pgPolicy("delete todos", {
      for: "delete",
      to: "authenticated",
      using: sql`(select auth.user_id() = user_id)`,
    }),
  }),
);

export type Todo = InferSelectModel<typeof todos>;
