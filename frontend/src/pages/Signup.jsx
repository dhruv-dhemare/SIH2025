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
    profilePhoto: null,
    address: "",
    city: "",
    state: "",
    country: "",
    dob: "",
    gender: "",
    department: "",
    yearOfStudy: "",
    company: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Education handlers
  const handleEducationChange = (i, val) => {
    const updated = [...form.education];
    updated[i] = val;
    setForm({ ...form, education: updated });
  };
  const addEducationField = () => setForm({ ...form, education: [...form.education, ""] });
  const removeEducationField = (i) =>
    setForm({ ...form, education: form.education.filter((_, idx) => idx !== i) });

  // URL handlers
  const handleUrlChange = (i, val) => {
    const updated = [...form.urls];
    updated[i] = val;
    setForm({ ...form, urls: updated });
  };
  const addUrlField = () => setForm({ ...form, urls: [...form.urls, ""] });
  const removeUrlField = (i) =>
    setForm({ ...form, urls: form.urls.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.role) throw new Error("Role not selected");

      const formData = new FormData();

      // Locations as an array
      const locations = [form.address, form.city, form.state, form.country].filter(Boolean);
      locations.forEach((loc) => formData.append("locations[]", loc));

      // Education & URLs
      form.education.forEach((edu) => edu && formData.append("education[]", edu));
      form.urls.forEach((url) => url && formData.append("urls[]", url));

      // Experience, Certification, Skills (comma-separated -> array)
      ["experience", "certification", "skills"].forEach((field) => {
        if (form[field]) {
          form[field]
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
            .forEach((val) => formData.append(`${field}[]`, val));
        }
      });

      // Single fields
      [
        "name",
        "email",
        "password",
        "role",
        "headline",
        "about",
        "phn",
        "dob",
        "gender",
        "department",
        "yearOfStudy",
        "company",
        "position",
      ].forEach((field) => {
        if (form[field]) formData.append(field, form[field]);
      });

      // Files
      if (form.resume) formData.append("resume", form.resume);
      if (form.profilePhoto) formData.append("profilePhoto", form.profilePhoto);

      // API call
      await signup(formData, form.role);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.message || "Signup failed");
    }
  };

  return (
    <div className="whole">
      <nav className="navbar">
        <div className="nav-logo">
          <h2>The Alumni Society</h2>
        </div>
      </nav>

      <div className="sign-container">
        <div className="sign-box">
          <h2 className="sign-title">Create an Account</h2>

          <form onSubmit={handleSubmit} className="sign-form">
            {/* Basic Info */}
            <div className="form-row">
              <input name="name" placeholder="Full Name" onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
              <select name="role" value={form.role} onChange={handleChange} required>
                <option value="" disabled>Select Role</option>
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="faculty">Faculty</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            {/* Common extra fields */}
            <div className="form-row">
              <input name="phn" placeholder="Phone" onChange={handleChange} />
              <input name="dob" type="date" onChange={handleChange} />
            </div>
            <div className="form-row">
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Location fields */}
            <div className="form-row">
              <input name="address" placeholder="Street / Address" onChange={handleChange} />
              <input name="city" placeholder="City" onChange={handleChange} />
            </div>
            <div className="form-row">
              <input name="state" placeholder="State" onChange={handleChange} />
              <input name="country" placeholder="Country" onChange={handleChange} />
            </div>

            {/* Student / Alumni / Faculty fields */}
            {(form.role === "student" || form.role === "alumni" || form.role === "faculty") && (
              <>
                <div className="form-row">
                  <input name="headline" placeholder="Headline" onChange={handleChange} />
                  <input name="department" placeholder="Department/Branch" onChange={handleChange} />
                </div>
                <input name="yearOfStudy" placeholder="Year of Study" onChange={handleChange} />
                <textarea name="about" placeholder="About" onChange={handleChange} />
                <input name="experience" placeholder="Experience (comma separated)" onChange={handleChange} />

                {form.education.map((edu, i) => (
                  <div key={i} className="form-row">
                    <input
                      value={edu}
                      placeholder={`Education ${i + 1}`}
                      onChange={(e) => handleEducationChange(i, e.target.value)}
                    />
                    {form.education.length > 1 && (
                      <button type="button" onClick={() => removeEducationField(i)}>Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addEducationField}>+ Add Education</button>

                <input name="certification" placeholder="Certifications (comma separated)" onChange={handleChange} />
                <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />

                {form.urls.map((url, i) => (
                  <div key={i} className="form-row">
                    <input
                      value={url}
                      placeholder={`Portfolio / URL ${i + 1}`}
                      onChange={(e) => handleUrlChange(i, e.target.value)}
                    />
                    {form.urls.length > 1 && (
                      <button type="button" onClick={() => removeUrlField(i)}>Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addUrlField}>+ Add URL</button>

                {/* Resume label + input */}
                <label style={{ color: "#000000" ,marginBottom:"0px" }}>Upload Resume (PDF)</label>
                <input type="file" name="resume" accept="application/pdf" onChange={handleChange} />
              </>
            )}

            {/* Recruiter fields */}
            {form.role === "recruiter" && (
              <>
                <div className="form-row">
                  <input name="company" placeholder="Company Name" onChange={handleChange} />
                  <input name="position" placeholder="Position / Title" onChange={handleChange} />
                </div>
                <textarea name="about" placeholder="About Company" onChange={handleChange} />
                {form.urls.map((url, i) => (
                  <input
                    key={i}
                    value={url}
                    placeholder={`Company / URL ${i + 1}`}
                    onChange={(e) => handleUrlChange(i, e.target.value)}
                  />
                ))}
                <button type="button" onClick={addUrlField}>+ Add URL</button>
              </>
            )}

            {/* Profile photo for everyone */}
            <label style={{ color: "#000000",marginBottom:"0px" }}>Profile Photo (optional)</label>
            <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} />

            <button type="submit" className="sign-btn">Sign Up</button>
          </form>

          <p className="sign-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
