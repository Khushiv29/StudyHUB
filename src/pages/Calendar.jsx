import React, { useState } from "react";

export default function Calendar() {
  const today = new Date();
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const [tickedDays, setTickedDays] = useState([]);

  const toggleTick = (day) => {
    setTickedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="container py-5 text-center">
      <h2>{monthName} {year} Calendar</h2>
      <p>Click on a day to mark it as done ✔️</p>

      <div
        className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, auto)",
          gap: "10px",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isTicked = tickedDays.includes(day);
          return (
            <div
              key={day}
              className={`border rounded d-flex align-items-center justify-content-center ${isTicked ? 'bg-success text-white' : 'bg-light'}`}
              style={{
                width: "60px",
                height: "60px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px"
              }}
              onClick={() => toggleTick(day)}
            >
              {day} {isTicked && "✔️"}
            </div>
          );
        })}
      </div>

      {/* Image at the bottom */}
      <div className="mt-5">
        <img
          src="https://www.shutterstock.com/image-photo/businessman-manages-time-effective-work-600nw-2245082975.jpg"
          alt="Time Management"
          className="img-fluid rounded shadow"
          style={{ maxWidth: "100%", height: "auto " }}
        />
      </div>
    </div>
  );
}
