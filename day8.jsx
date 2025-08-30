//App.jsx 
import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // State for task list
  const [newTask, setNewTask] = useState(""); // State for input box

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  // Add a new task
  const handleAdd = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask(""); // clear input
  };

  // Delete a task
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "400px" }}>
      <h2>To-Do List</h2>

      {/* Input + Button */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={newTask}
          onChange={handleChange}
          placeholder="Enter a task..."
          style={{ padding: "6px", width: "70%" }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "6px 10px",
            marginLeft: "5px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Render Tasks */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "6px 10px",
              borderRadius: "5px",
            }}
          >
            {task}
            <button
              onClick={() => handleDelete(index)}
              style={{ cursor: "pointer", color: "red", border: "none", background: "transparent" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


//Main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

