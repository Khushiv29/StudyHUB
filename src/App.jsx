import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { auth, provider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import Home from "./pages/Home.jsx";
import TaskManager from "./pages/TaskManager.jsx";
import Calendar from "./pages/Calendar.jsx";
import Notes from "./pages/Notes.jsx";
import Footer from "./components/Footer.jsx";

import "animate.css";
import "./AuthPopup.css";

export default function App() {
  const [user, loading] = useAuthState(auth);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // Wait for Firebase to finish checking user status before showing popup
  useEffect(() => {
    if (!loading && !user) {
      setShowPopup(true);
    }
  }, [loading, user]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setShowPopup(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setShowPopup(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setShowPopup(true);
  };

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">StudyHub</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
      
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/tasks">Tasks</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/calendar">Calendar</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/notes">Notes</Link></li>

              {user ? (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ cursor: "pointer" }}
                  >
                    {/* Bootstrap person icon */}
                    <i className="bi bi-person-circle fs-4"></i>
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <span className="dropdown-item-text text-muted" style={{ fontSize: "0.95rem" }}>
                        {user.email}
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-light" onClick={() => setShowPopup(true)}>Login</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>


      <main className="min-vh-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </main>

      <Footer />

      {showPopup && !loading && !user && (
        <div className="auth-popup">
          <div className="auth-content animate__animated animate__fadeInDown">
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <h2>{isRegister ? "Register" : "Login"}</h2>
            <form onSubmit={handleAuth}>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-100 mt-2">
                {isRegister ? "Register" : "Login"}
              </button>
            </form>
            <button className="btn btn-outline-dark w-100 mt-2" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
            <p className="mt-3 text-center" onClick={() => setIsRegister(!isRegister)} style={{ cursor: "pointer" }}>
              {isRegister ? "Already have an account? Login" : "New user? Register"}
            </p>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}
