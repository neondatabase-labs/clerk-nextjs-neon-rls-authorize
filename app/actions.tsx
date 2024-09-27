"use server";

import { getDb } from "@/app/db";
import * as schema from "@/app/schema";
import { Todo } from "@/app/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export async function insertTodo({ newTodo }: { newTodo: string }) {
  const { getToken } = auth();
  const authToken = await getToken();

  if (!authToken) {
    throw new Error("No auth token");
  }

  const todo = await getDb(authToken)
    .insert(schema.todos)
    .values({
      task: newTodo,
      userId: parseJwt(authToken)["sub"],
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
