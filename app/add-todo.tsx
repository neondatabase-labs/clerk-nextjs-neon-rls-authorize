"use server";

import { insertTodo } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function AddTodoForm() {
  const { getToken } = auth();

  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const authToken = await getToken();
        if (authToken) {
          insertTodo({ authToken, newTodo: formData.get("newTodo") as string });
          revalidatePath("/");
        }
      }}
    >
      <input name="newTodo"></input>
      {/* <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} /> */}
      &nbsp;<button type="submit">Add Todo</button>
    </form>
  );
}
