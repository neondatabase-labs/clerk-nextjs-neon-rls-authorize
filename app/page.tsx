import { AddTodoForm } from '@/app/add-todo';
import { Header } from '@/app/header';
import { TodoList } from '@/app/todo-list';

import styles from '../styles/Home.module.css';

export default async function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <AddTodoForm />
          <TodoList />
        </div>
      </main>
    </>
  );
}
