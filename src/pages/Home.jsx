import React, { useEffect, useState } from "react";
import "animate.css";

function Hero() {
  return (
    <section
      className="text-white text-center"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/10/30/26/32/360_F_1030263210_3jIZCqH2CnXV4HM9wKlTpbTAgQoWwkX5.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2f65f8", // fallback background
      }}
    >
      <div className="container animate__animated animate__fadeInDown bg-dark bg-opacity-50 p-5 rounded">
        <h1 className="display-4">Welcome to StudyHub</h1>
        <p className="lead">Your all-in-one study planner and task manager.</p>
        <a href="#features" className="btn btn-light btn-lg mt-3">Get Started</a>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 animate__animated animate__fadeInUp">Features</h2>
        <div className="row">
          <div className="col-md-4 text-center animate__animated animate__fadeInLeft">
            <i className="bi bi-check2-square display-1 text-primary"></i>
            <h4 className="my-3">Task Management</h4>
            <p>Organize and prioritize your study tasks efficiently.</p>
          </div>
          <div className="col-md-4 text-center animate__animated animate__fadeInUp">
            <i className="bi bi-journal-text display-1 text-primary"></i>
            <h4 className="my-3">Notes</h4>
            <p>Keep all your study notes in one place.</p>
          </div>
          <div className="col-md-4 text-center animate__animated animate__fadeInRight">
            <i className="bi bi-calendar3 display-1 text-primary"></i>
            <h4 className="my-3">Calendar View</h4>
            <p>Plan your study schedule with the calendar.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-5">
      <div className="container text-center animate__animated animate__fadeIn">
        <h2>Why Choose StudyHub?</h2>
        <p className="lead">
          StudyHub helps students manage time, tasks, and productivity like never before.
        </p>
      </div>
    </section>
  );
}

function LatestTasksPreview() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks.slice(-3).reverse()); // Latest 3 tasks
  }, []);

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center mb-4 animate__animated animate__fadeInDown">Latest Tasks</h2>
        <div className="toast-container position-relative d-flex flex-column gap-3">
          {tasks.length === 0 ? (
            <div className="text-center text-muted">
              <p>No tasks added yet. Start by visiting the <a href="/tasks">Task Manager</a>.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="toast show align-items-center text-white bg-primary border-0 animate__animated animate__fadeInUp"
                role="alert"
              >
                <div className="d-flex">
                  <div className="toast-body">
                    <strong>{task.text}</strong><br />
                    <small>Status: {task.done ? "✅ Completed" : "⏳ Pending"}</small>
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function GetStarted() {
  return (
    <section className="bg-secondary text-white py-5 text-center">
      <div className="container animate__animated animate__zoomIn">
        <h2>Ready to Supercharge Your Study?</h2>
        <p className="lead">Start organizing your academic life with StudyHub now.</p>
        <a href="/tasks" className="btn btn-light btn-lg">Go to Task Manager</a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <LatestTasksPreview />
      <GetStarted />
    </>
  );
}
