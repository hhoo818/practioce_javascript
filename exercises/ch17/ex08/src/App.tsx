import React, { useRef, useState } from "react";
import "./App.css";
import { Todo, TodoType } from "./Todo";
import { v4 } from "uuid";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const newTodo = useRef<HTMLInputElement | null>(null);

  const onSubmitClick = (event: React.FormEvent) => {
    event.preventDefault();
    const taskText = newTodo.current?.value;
    if (taskText) {
      setTodos((pretodos) => {
        return [
          ...(pretodos || []),
          { id: v4(), task: taskText, completed: false },
        ];
      });
      if (newTodo.current) {
        newTodo.current.value = "";
      }
    }
  };

  const onCompletedClick = (id: string) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo?.completed;
    }
    setTodos(newTodos);
  };

  const onDeleteClick = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  return (
    <>
      <form id="new-todo-form">
        <input
          type="text"
          ref={newTodo}
          id="new-todo"
          placeholder="What needs to be done?"
        />
        <button onClick={onSubmitClick} type="submit">
          Add
        </button>
      </form>
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo.id}
          onCompletedClick={() => onCompletedClick(todo.id)}
          onDeleteClick={() => onDeleteClick(todo.id)}
        ></Todo>
      ))}
    </>
  );
}

export default App;
