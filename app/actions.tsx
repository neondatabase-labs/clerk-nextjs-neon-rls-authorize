"use server";

import { getDb } from "@/app/db";
import * as schema from "@/app/schema";
import { Todo } from "@/app/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function insertTodo({ newTodo }: { newTodo: string }) {
  const { getToken, userId } = auth();
  const authToken = await getToken();

  if (!authToken) {
    throw new Error("No auth token");
  }

  if (!userId) {
    throw new Error("No user id");
  }

  await getDb(authToken).insert(schema.todos).values({
    task: newTodo,
    userId,
    isComplete: false,
  });

  revalidatePath("/");
}

export async function getTodos(): Promise<Array<Todo>> {
  const { getToken } = auth();
  const authToken = await getToken();

  if (!authToken) {
    throw new Error("No auth token");
  }

  return await getDb(authToken).select().from(schema.todos);
}
