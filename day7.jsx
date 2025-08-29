import React, { useState } from "react";

function StateManagementDemo() {
  // Counter state
  const [count, setCount] = useState(0);


  const [text, setText] = useState("");

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>🔹 Day 7 Demo</h2>


      <div style={{ marginBottom: "20px" }}>
        <h3>Counter</h3>
        <p>Current Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>
          Decrement
        </button>
        <button onClick={() => setCount(0)} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>

//input

      <div>
        <h3>Live Text Preview</h3>
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: "5px", width: "250px" }}
        />
        <p>Preview: <b>{text}</b></p>
      </div>
    </div>
  );
}

export default StateManagementDemo;



//App.jsx
import React from "react"
import StateManagementDemo from "./StateManagementDemo"

function App(){
  return(
    <div>
      <StateManagementDemo/>
    </div>
  )
}

export default App

