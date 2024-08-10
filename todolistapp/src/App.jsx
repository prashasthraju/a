import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css"
function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [visibility, setVisibility] = useState("visible");
  const [isEditing, setIsEditing] = useState(null);
  const [editTask, setEditTask] = useState("");

  function handleinput(e) {
    setTodo(e.target.value);
  }

  function handleenter(e) {
    if (e.key === "Enter") {
      handleadding(todo);
    }
  }

  function handleadding(newTodo) {
    setTodos([...todos, newTodo]);
    setTodo("");
  }

  function handleDelete(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }

  function handleclick() {
    setVisibility(visibility === "visible" ? "hidden" : "visible");
  }

  function handleEditChange(e) {
    setEditTask(e.target.value);
  }

  function startEditing(index) {
    setIsEditing(index);
    setEditTask(todos[index]);
  }

  function saveEdit(index) {
    const newTodos = [...todos];
    newTodos[index] = editTask;
    setTodos(newTodos);
    setIsEditing(null);
  }

  return (
    <>
      <div className="maindiv">
        <Navbar />
        <div className="task-input-container flex-center">
          <div style={{ visibility: visibility }}>
            <input
              type="text"
              onChange={handleinput}
              onKeyDown={handleenter}
              value={todo}
              className="task-input"
              placeholder="Enter your task"
            />
            <button className="add-button" onClick={() => handleadding(todo)}>
              Add
            </button>
          </div>
          <button className="new-task-button" onClick={handleclick}>
            New Task
          </button>
        </div>
        <div className="heading font-bold text-3xl my-3">
          <h2>TODAY'S TASKS</h2>
        </div>
        <div className="task-list-container">
          <ul>
            {todos.map((task, index) => (
              <div key={index} className="task-item">
                {isEditing === index ? (
                  <>
                    <input
                      type="text"
                      value={editTask}
                      onChange={handleEditChange}
                      className="task-input"
                    />
                    <button
                      className="text-sky-600"
                      onClick={() => saveEdit(index)}
                    >
                      Save
                    </button>
                    <button
                      className="text-red-600 ml-2"
                      onClick={() => setIsEditing(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      className="mr-3"
                      onClick={() => handleDelete(index)}
                    />
                    <li className="flex-grow">{task}</li>
                    <div className="task-options">
                      <button
                        className="text-sky-600"
                        onClick={() => startEditing(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 ml-2"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
