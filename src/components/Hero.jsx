import React from "react";

export default function Hero() {
  return (
    <section className="bg-primary text-white text-center py-5">
      <div className="container">
        <h1 className="display-1">Welcome to StudyHub</h1>
        <p className="lead">Your all-in-one study planner and task manager.</p>
        <a href="#features" className="btn btn-light btn-lg mt-3">
          Get Started
        </a>
      </div>
    </section>
  );
}
