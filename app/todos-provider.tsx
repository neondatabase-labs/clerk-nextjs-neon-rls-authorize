"use client";

import { getTodos } from "@/app/actions";
import { AuthTokenContext } from "@/app/auth-token-provider";
import { Todo } from "@/app/page";
import { createContext, useContext, useEffect, useState } from "react";

export const TodosContext = createContext<null | Array<Todo>>(null);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  let [todos, setTodos] = useState<null | Array<Todo>>(null);
  const authToken = useContext(AuthTokenContext);

  useEffect(() => {
    async function loadTodos() {
      if (authToken) {
        setTodos(await getTodos({ authToken }));
      }
    }

    loadTodos();
  }, [authToken]);

  if (!authToken) return null;

  return <>{children}</>;
}
