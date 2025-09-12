import React, { useState } from "react";
import { signup } from "../services/api";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    headline: "",
    about: "",
    experience: "",
    certification: "",
    skills: "",
    education: [""],
    urls: [""],
    resume: null,
  });

  // Handle normal input changes
  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ---------- Education ----------
  const handleEducationChange = (index, value) => {
    const updated = [...form.education];
    updated[index] = value;
    setForm({ ...form, education: updated });
  };
  const addEducationField = () => {
    setForm({ ...form, education: [...form.education, ""] });
  };
  const removeEducationField = (index) => {
    const updated = form.education.filter((_, i) => i !== index);
    setForm({ ...form, education: updated });
  };

  // ---------- URLs ----------
  const handleUrlChange = (index, value) => {
    const updated = [...form.urls];
    updated[index] = value;
    setForm({ ...form, urls: updated });
  };
  const addUrlField = () => {
    setForm({ ...form, urls: [...form.urls, ""] });
  };
  const removeUrlField = (index) => {
    const updated = form.urls.filter((_, i) => i !== index);
    setForm({ ...form, urls: updated });
  };

  // ---------- Form Submission ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, val]) => {
        if (key === "education") {
          val.forEach((edu, i) => formData.append(`education[${i}]`, edu));
        } else if (key === "urls") {
          val.forEach((url, i) => formData.append(`urls[${i}]`, url));
        } else {
          formData.append(key, val);
        }
      });

      const res = await signup(formData); // API should accept FormData
      alert("Signup successful!");
      console.log(res);
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
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password & Role */}
          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="" disabled>
                Select Role
              </option>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="recruitor">Recruitor</option>
            </select>
          </div>

          {(form.role === "student" || form.role === "alumni") && (
            <>
              {/* Phone & Headline */}
              <div className="form-row">
                <input name="phone" placeholder="Phone" onChange={handleChange} />
                <input name="headline" placeholder="Headline" onChange={handleChange} />
              </div>

              {/* About */}
              <textarea name="about" placeholder="About" onChange={handleChange} />

              {/* Experience */}
              <div className="form-row">
                <input name="experience" placeholder="Experience" onChange={handleChange} />
              </div>

              {/* ---------- Education Fields ---------- */}
              {form.education.map((edu, index) => (
                <div key={index} className="form-row edu-row">
                  <input
                    value={edu}
                    placeholder={`Education ${index + 1}`}
                    onChange={(e) => handleEducationChange(index, e.target.value)}
                  />
                  {form.education.length > 1 && (
                    <button
                      type="button"
                      className="remove-edu-btn"
                      onClick={() => removeEducationField(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-edu-btn" onClick={addEducationField}>
                + Add Education
              </button>

              {/* Certification & Skills */}
              <div className="form-row">
                <input
                  name="certification"
                  placeholder="Certification"
                  onChange={handleChange}
                />
                <input name="skills" placeholder="Skills" onChange={handleChange} />
              </div>

              {/* ---------- URLs Fields ---------- */}
              {form.urls.map((url, index) => (
                <div key={index} className="form-row edu-row">
                  <input
                    value={url}
                    placeholder={`Portfolio / URL ${index + 1}`}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                  />
                  {form.urls.length > 1 && (
                    <button
                      type="button"
                      className="remove-edu-btn"
                      onClick={() => removeUrlField(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-edu-btn" onClick={addUrlField}>
                + Add URL
              </button>

              {/* Resume Upload */}
              <div className="form-row">
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {form.role === "recruitor" && (
            <>
              <div className="form-row">
                <input name="phone" placeholder="Phone" onChange={handleChange} />
                <input name="headline" placeholder="Headline" onChange={handleChange} />
              </div>

              <textarea name="about" placeholder="About" onChange={handleChange} />
              <input name="urls" placeholder="Company / URLs" onChange={handleChange} />
            </>
          )}

          <button type="submit" className="sign-btn">
            Sign Up
          </button>
        </form>

        <p className="sign-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
