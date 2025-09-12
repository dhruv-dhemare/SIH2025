import React, { useState } from "react";
import { login } from "../services/api";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      alert("Login successful!");
      console.log(res);
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="log-container">
      <div className="log-box">
        <h2 className="log-title">Login</h2>
        <form onSubmit={handleSubmit} className="log-form">
          <input
            type="username"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="log-btn">Login</button>
        </form>
        <p className="log-footer">
          Don’t have an account?{" "}
          <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
