'use server';

import { getTodos } from '@/app/actions';
import styles from '../styles/Home.module.css';

export async function TodoList() {
  const todos = await getTodos();

  // if loading, just show basic message
  if (todos === null) {
    return <div className={styles.label}>Loading...</div>;
  }

  // display all the todos
  return (
    <>
      {todos.length > 0 ? (
        <div className={styles.todoList}>
          <ol>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.task}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className={styles.label}>You don&apos;t have any todos!</div>
      )}
    </>
  );
}
