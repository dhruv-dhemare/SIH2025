import React, { useState } from "react";
import { login } from "../services/api";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

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
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="auth-footer">
          Don’t have an account?{" "}
          <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
