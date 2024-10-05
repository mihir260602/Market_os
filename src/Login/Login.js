import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userService"; // Import the login function from authService.js

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    try {
      // Call the login function with the entered credentials
      const response = await login({ username, password });
      console.log("Login successful!", response);

      // On successful login, clear the form and navigate to the dashboard
      setErrorMessage("");
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h2>Sign In</h2>
          <p>Welcome back! Please login to your account.</p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="actions">
            <button type="submit" className="login-button">
              Login
            </button>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;