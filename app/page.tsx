"use client";

import { TodoList } from "@/app/todo-list";
import { AddTodoForm } from "@/app/add-todo";
import { Header } from "@/app/header";
import { TodosProvider } from "@/app/todos-provider";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <TodosProvider>
            <AddTodoForm />
            <TodoList />
          </TodosProvider>
        </div>
      </main>
    </>
  );
}
