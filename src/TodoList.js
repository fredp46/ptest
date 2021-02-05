import React, { useState } from "react";

const TodoListItem = ({ id, title, complete, toggleComplete }) => {
  const className = complete ? "is-done" : "";
  return <li className={className} onClick={() => toggleComplete({ id })}>{title}</li>;
};

const NewTodoForm = ({ addTodo }) => {
  const [newTodoTitle, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      title: newTodoTitle,
    });

    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button disabled={!newTodoTitle.length} type="submit">
        Add
      </button>
    </form>
  );
};

export const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    todo.id = todos.length;
    setTodos([...todos, todo]);
  };

  const toggleComplete = ({ id }) => {
    const newTodos = todos.map((todo) => {
      return {
        ...todo,
        complete: todo.id === id ? !todo.complete : todo.complete,
      };
    });
    setTodos(newTodos)
  };

  const remainingCount = todos.reduce((prev, next) => {
    return next.complete ? prev : prev += 1
  }, 0)

  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo, i) => (
          <TodoListItem key={i} toggleComplete={toggleComplete} {...todo} />
        ))}
      </ul>
      <p>{`${remainingCount} remaining out of ${todos.length}`}</p>
    </div>
  );
};
