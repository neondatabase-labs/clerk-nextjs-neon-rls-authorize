'use server';

import { insertTodo } from '@/app/actions';

export async function insertTodoFormAction(formData: FormData) {
  const newTodo = formData.get('newTodo');

  if (!newTodo) {
    throw new Error('No newTodo');
  }

  return insertTodo({ newTodo: newTodo.toString() });
}

export async function AddTodoForm() {
  return (
    <form action={insertTodoFormAction}>
      <input name="newTodo"></input>
      {/* <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} /> */}
      &nbsp;<button type="submit">Add Todo</button>
    </form>
  );
}
