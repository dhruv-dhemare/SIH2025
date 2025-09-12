// import React, { useState } from "react";
// import { signup } from "../services/api";
// import "./Auth.css";

// function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await signup(form);
//       alert("Signup successful!");
//       console.log(res);
//     } catch (err) {
//       alert("Signup failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2 className="auth-title">Create an Account</h2>
//         <form onSubmit={handleSubmit} className="auth-form">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />
//           <select name="role" onChange={handleChange}>
//             <option value="student">Student</option>
//             <option value="alumni">Alumni</option>
//             <option value="recruitor">Recruitor</option>
//             <option value="college-admin">College Administrator</option>
           
            
//           </select>
//           <button type="submit" className="auth-btn">Sign Up</button>
//         </form>
//         <p className="auth-footer">
//           Already have an account?{" "}
//           <a href="/login">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import React, { useState } from "react";
import { signup } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Validate form fields
  const validateForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!form.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!emailRegex.test(form.email)) {
      setError("Invalid email address");
      return false;
    }
    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signup(form); // Mock backend API
      navigate("/"); // Redirect to Home after signup
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box animate__animated animate__fadeInDown">
        <h2 className="auth-title">Create Your AlmaMatter Account</h2>
        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
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

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
            <option value="recruitor">Recruitor</option>
            <option value="college-admin">College Administrator</option>
          </select>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
