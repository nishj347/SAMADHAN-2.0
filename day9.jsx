import React, { useState } from "react";

export default function TodoList() {
  const [task, setTask] = useState(""); // current input value
  const [todos, setTodos] = useState([]); // list of tasks with status
  const [filter, setFilter] = useState("all"); // filter state

  // handle input change
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  // add new task
  const addTask = () => {
    if (task.trim() === "") return; // avoid empty input
    setTodos([...todos, { text: task, completed: false }]);
    setTask(""); // reset input after adding
  };

  // delete a task by index
  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // toggle completed status
  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // clear all completed tasks
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // filter tasks based on filter state
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>To-Do List</h2>

      {/* input field */}
      <input
        type="text"
        value={task}
        onChange={handleChange}
        placeholder="Enter a task"
        style={{ padding: "8px", marginRight: "10px" }}
      />

      {/* add button */}
      <button onClick={addTask} style={{ padding: "8px" }}>
        Add
      </button>

      {/* filter buttons */}
      <div style={{ marginTop: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")} style={{ marginLeft: "5px" }}>
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{ marginLeft: "5px" }}
        >
          Completed
        </button>
      </div>

      {/* clear completed button */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>

      {/* render list */}
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index} style={{ marginTop: "8px" }}>
            <span
              onClick={() => toggleComplete(index)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
