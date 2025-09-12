import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phn: "",
    headline: "",
    about: "",
    experience: "",
    certification: "",
    skills: "",
    education: [""],
    urls: [""],
    resume: null,
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Education fields
  const handleEducationChange = (index, value) => {
    const updated = [...form.education];
    updated[index] = value;
    setForm({ ...form, education: updated });
  };
  const addEducationField = () => setForm({ ...form, education: [...form.education, ""] });
  const removeEducationField = (index) => {
    const updated = form.education.filter((_, i) => i !== index);
    setForm({ ...form, education: updated });
  };

  // URL fields
  const handleUrlChange = (index, value) => {
    const updated = [...form.urls];
    updated[index] = value;
    setForm({ ...form, urls: updated });
  };
  const addUrlField = () => setForm({ ...form, urls: [...form.urls, ""] });
  const removeUrlField = (index) => {
    const updated = form.urls.filter((_, i) => i !== index);
    setForm({ ...form, urls: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;

      if (form.role === "student" || form.role === "alumni" || form.role === "faculty") {
        // FormData for file upload
        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
          if (key === "education" || key === "urls") {
            val.forEach((v, i) => formData.append(`${key}[${i}]`, v));
          } else {
            formData.append(key, val);
          }
        });
        data = formData;
      } else if (form.role === "recruitor") {
        // JSON for recruiter
        data = {
          name: form.name,
          email: form.email,
          password: form.password,
          phn: form.phn,
          headline: form.headline,
          about: form.about,
          urls: form.urls.filter((u) => u !== ""),
          posts: [],
          locations: [],
        };
      } else {
        throw new Error("Role not selected");
      }

      const res = await signup(data, form.role);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-box">
        <h2 className="sign-title">Create an Account</h2>

        <form onSubmit={handleSubmit} className="sign-form">
          {/* Name & Email */}
          <div className="form-row">
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>

          {/* Password & Role */}
          <div className="form-row">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <select name="role" value={form.role} onChange={handleChange} required>
              <option value="" disabled>Select Role</option>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="faculty">Faculty</option>
              <option value="recruitor">Recruitor</option>
            </select>
          </div>

          {/* Student / Alumni / Faculty Fields */}
          {(form.role === "student" || form.role === "alumni" || form.role === "faculty") && (
            <>
              <div className="form-row">
                <input name="phn" placeholder="Phone" onChange={handleChange} />
                <input name="headline" placeholder="Headline" onChange={handleChange} />
              </div>
              <textarea name="about" placeholder="About" onChange={handleChange} />
              <input name="experience" placeholder="Experience" onChange={handleChange} />
              {form.education.map((edu, index) => (
                <div key={index} className="form-row">
                  <input
                    value={edu}
                    placeholder={`Education ${index + 1}`}
                    onChange={(e) => handleEducationChange(index, e.target.value)}
                  />
                  {form.education.length > 1 && (
                    <button type="button" onClick={() => removeEducationField(index)}>Remove</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addEducationField}>+ Add Education</button>
              <input name="certification" placeholder="Certification" onChange={handleChange} />
              <input name="skills" placeholder="Skills" onChange={handleChange} />
              {form.urls.map((url, index) => (
                <div key={index} className="form-row">
                  <input
                    value={url}
                    placeholder={`Portfolio / URL ${index + 1}`}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                  />
                  {form.urls.length > 1 && (
                    <button type="button" onClick={() => removeUrlField(index)}>Remove</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addUrlField}>+ Add URL</button>
              <input type="file" name="resume" accept="application/pdf" onChange={handleChange} />
            </>
          )}

          {/* Recruiter Fields */}
          {form.role === "recruitor" && (
            <>
              <div className="form-row">
                <input name="phn" placeholder="Phone" onChange={handleChange} />
                <input name="headline" placeholder="Headline" onChange={handleChange} />
              </div>
              <textarea name="about" placeholder="About" onChange={handleChange} />
              {form.urls.map((url, index) => (
                <input
                  key={index}
                  value={url}
                  placeholder={`Company / URL ${index + 1}`}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                />
              ))}
              <button type="button" onClick={addUrlField}>+ Add URL</button>
            </>
          )}

          <button type="submit" className="sign-btn">Sign Up</button>
        </form>

        <p className="sign-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
