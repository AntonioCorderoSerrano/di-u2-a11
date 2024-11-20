import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Comprar leche', done: true },
  { id: 1, title: 'Comer tacos', done: false },
  { id: 2, title: 'Preparar té', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useImmer(initialTodos);

  function handleAddTodo(title) {
    setTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    setTodos(draft => {
      const todo = draft.find(t => t.id === nextTodo.id);
      if (todo) {
        todo.title = nextTodo.title;
        todo.done = nextTodo.done;
      }
    });
  }

  function handleDeleteTodo(todoId) {
    setTodos(draft => {
      const index = draft.findIndex(t => t.id === todoId);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}