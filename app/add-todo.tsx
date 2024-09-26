"use client";

import { useState } from "react";
import { useContext } from "react";
import { AuthTokenContext } from "@/app/auth-token-provider";
import { insertTodo } from "@/app/actions";

export function AddTodoForm() {
  const [newTodo, setNewTodo] = useState("");

  const authToken = useContext(AuthTokenContext);
  if (!authToken) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo === "") {
      return;
    }

    insertTodo({ authToken, newTodo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
      &nbsp;<button>Add Todo</button>
    </form>
  );
}
