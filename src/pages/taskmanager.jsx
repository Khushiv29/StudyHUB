 import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: taskInput, done: false }]);
    setTaskInput("");
  }

  function toggleDone(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function startEdit(task) {
    setEditTaskId(task.id);
    setEditInput(task.text);
  }

  function saveEdit(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: editInput } : t)));
    setEditTaskId(null);
    setEditInput("");
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="animate__animated animate__fadeInDown">📝 Task Manager</h2>
        <p className="text-muted">Keep track of your study tasks</p>
      </div>

      <div className="input-group mb-4 shadow-sm">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
        <button className="btn btn-primary btn-lg" onClick={addTask}>
          <i className="bi bi-plus-circle me-2"></i>Add
        </button>
      </div>

      <ul className="list-group animate__animated animate__fadeIn">
        {tasks.length === 0 ? (
          <li className="list-group-item text-center text-muted">
            No tasks yet. Start by adding one above!
          </li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded ${
                task.done ? "list-group-item-success" : ""
              }`}
            >
              <div className="flex-grow-1">
                {editTaskId === task.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(task.id);
                    }}
                  />
                ) : (
                  <span
                    onClick={() => toggleDone(task.id)}
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                    className="fs-5"
                  >
                    {task.text}
                  </span>
                )}
              </div>

              <div className="ms-3 d-flex align-items-center gap-2">
                <span
                  className={`badge rounded-pill ${
                    task.done ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {task.done ? "Done" : "Pending"}
                </span>

                {editTaskId === task.id ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => saveEdit(task.id)}
                    title="Save"
                  >
                    <i className="bi bi-check-lg"></i>
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => startEdit(task)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                )}

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteTask(task.id)}
                  title="Delete"
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
