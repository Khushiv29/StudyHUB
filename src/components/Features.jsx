import React from "react";

export default function Features() {
  return (
    <section id="features" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Features</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <i className="bi bi-calendar2-check display-1 text-primary"></i>
            <h3 className="my-3">Task Management</h3>
            <p>Organize and prioritize your study tasks efficiently.</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="bi bi-journal-text display-1 text-primary"></i>
            <h3 className="my-3">Notes</h3>
            <p>Keep all your study notes in one place.</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="bi bi-bar-chart-line display-1 text-primary"></i>
            <h3 className="my-3">Progress Tracking</h3>
            <p>Track your learning progress with visual charts.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
