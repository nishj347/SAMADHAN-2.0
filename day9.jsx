(backend)
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Fake student data (in-memory)
let students = [
  { id: 1, name: "Dhara Jain", roll: "101", dept: "CSE" },
  { id: 2, name: "Rahul Verma", roll: "102", dept: "ECE" },
  { id: 3, name: "Sneha Patel", roll: "103", dept: "ME" },
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Add new student
app.post("/students", (req, res) => {
  const { name, roll, dept } = req.body;
  const newStudent = { id: students.length + 1, name, roll, dept };
  students.push(newStudent);
  res.json(newStudent);
});

// Server listen
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

(frontend)
import React, { useState, useEffect } from "react";

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", roll: "", dept: "" });

  // Fetch students when component mounts
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((newStudent) => {
        setStudents([...students, newStudent]); // update state
        setForm({ name: "", roll: "", dept: "" }); // reset form
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📘 Student Directory</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="roll"
          placeholder="Roll Number"
          value={form.roll}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dept"
          placeholder="Department"
          value={form.dept}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>

      <h3>Student List</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} ({student.roll}) - {student.dept}
          </li>
        ))}
      </ul>
    </div>
  );
}

(app.jsx)
import React from "react";
import StudentDirectory from "./StudentDirectory";

function App() {
  return (
    <div>
      <StudentDirectory />
    </div>
  );
}

export default App;
