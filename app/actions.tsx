"use server";

import * as schema from "@/app/schema";
import { getDb } from "@/app/db";
import { Todo } from "@/app/schema";

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export async function insertTodo({
  authToken,
  newTodo,
}: {
  authToken: string;
  newTodo: string;
}) {
  const todo = await getDb(authToken)
    .insert(schema.todos)
    .values({
      task: newTodo,
      userId: parseJwt(authToken)["sub"],
      isComplete: false,
    });

  console.log(todo);
}

export async function getTodos({
  authToken,
}: {
  authToken: string;
}): Promise<Array<Todo>> {
  return await getDb(authToken).select().from(schema.todos);
}
