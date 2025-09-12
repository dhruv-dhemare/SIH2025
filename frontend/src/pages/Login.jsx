import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for redirection
import { login } from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Pass username and password separately
      const res = await login(form.username, form.password);

      alert("Login successful!");
      console.log(res);

      // ✅ Save token if needed
      localStorage.setItem("token", res.token);

      // ✅ Redirect to homepage
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="log-container">
      <div className="log-box">
        <h2 className="log-title">Login</h2>
        <form onSubmit={handleSubmit} className="log-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="log-btn">Login</button>
        </form>
        <p className="log-footer">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
