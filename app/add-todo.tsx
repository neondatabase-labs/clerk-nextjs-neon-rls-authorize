"use server";

import { insertTodo } from "@/app/actions";

export async function insertTodoFormAction(formData: FormData) {
  const newTodo = formData.get("newTodo");

  if (!newTodo) {
    throw new Error("No newTodo");
  }

  if (typeof newTodo !== "string") {
    throw new Error("The newTodo must be a string");
  }

  return insertTodo({ newTodo: newTodo.toString() });
}

export async function AddTodoForm() {
  return (
    <form action={insertTodoFormAction}>
      <input required name="newTodo"></input>
      &nbsp;<button type="submit">Add Todo</button>
    </form>
  );
}
