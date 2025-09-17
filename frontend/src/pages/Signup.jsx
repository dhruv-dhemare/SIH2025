import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

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
    dob: "",
    gender: "",
    department: "",
    yearOfStudy: "",
    company: "",
    position: "",
  });

  // Handle input changes including resume parsing
  const handleChange = async (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file" && name === "resume" && form.role !== "recruiter") {
      const file = files[0];
      setForm({ ...form, resume: file });

      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/parse-resume", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Failed to parse resume");

        const data = await res.json();
        if (data.status === "ok") {
          const parsed = data.resume_parsed;

          setForm((prev) => ({
            ...prev,
            name: parsed.personal_info?.name || prev.name,
            email: parsed.personal_info?.emails?.[0] || prev.email,
            phn: parsed.personal_info?.phones?.[0] || prev.phn,

            education:
              parsed.education?.map(
                (edu) =>
                  `${edu.institution || ""}${
                    edu.degree ? ", " + edu.degree : ""
                  }${edu.major ? ", " + edu.major : ""}${
                    edu.gpa ? " (GPA: " + edu.gpa + ")" : ""
                  }${
                    edu.percentage ? " (Percentage: " + edu.percentage + ")" : ""
                  }${edu.location ? " - " + edu.location : ""}`
              ) || prev.education,

            skills: parsed.skills?.join(", ") || prev.skills,

            experience:
              (
                [...(parsed.experience || []), ...(parsed.internships || [])]
                  .map((exp) => {
                    const title = exp.title || exp.role || "";
                    const org = exp.organization ? ` at ${exp.organization}` : "";
                    const start = exp.start_date || exp.year || "";
                    const end =
                      exp.end_date ||
                      (parsed.experience.includes(exp) ? "Present" : "");
                    return `${title}${org}${
                      start || end ? `   ${start} - ${end || ""}  ` : ""
                    }`;
                  })
                  .filter(Boolean)
              ).join(", ") || prev.experience,

            projects:
              (parsed.projects?.map(
                (p) =>
                  `${p.name}${
                    p.technologies ? " (" + p.technologies.join(", ") + ")" : ""
                  }`
              ) || []).join(", ") || prev.projects,

            certification:
              (parsed.certifications?.map((c) =>
                typeof c === "string"
                  ? c
                  : `${c.name}${c.organization ? " - " + c.organization : ""}${
                      c.instructor ? " (Instructor: " + c.instructor + ")" : ""
                    }`
              ) || []).join(", ") || prev.certification,

            achievements:
              (parsed.achievements?.map((a) =>
                typeof a === "string"
                  ? a
                  : `${a.name}${a.organization ? " - " + a.organization : ""}`
              ) || []).join(", ") || prev.achievements,

            extracurricular:
              (parsed.extracurricular?.map((ex) =>
                typeof ex === "string"
                  ? ex
                  : `${ex.activity}${
                      ex.details ? " (" + ex.details + ")" : ""
                    }`
              ) || []).join(", ") || prev.extracurricular,
          }));
        }
      } catch (err) {
        console.error(err);
        alert("Error parsing resume");
      } finally {
        setLoading(false);
      }
    } else if (type === "file") {
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
  const addEducationField = () =>
    setForm({ ...form, education: [...form.education, ""] });
  const removeEducationField = (i) =>
    setForm({
      ...form,
      education: form.education.filter((_, idx) => idx !== i),
    });

  // URL handlers
  const handleUrlChange = (i, val) => {
    const updated = [...form.urls];
    updated[i] = val;
    setForm({ ...form, urls: updated });
  };
  const addUrlField = () => setForm({ ...form, urls: [...form.urls, ""] });
  const removeUrlField = (i) =>
    setForm({ ...form, urls: form.urls.filter((_, idx) => idx !== i) });

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.role) throw new Error("Role not selected");

      const formData = new FormData();

      const locations = [
        form.address,
        form.city,
        form.state,
        form.country,
      ].filter(Boolean);
      locations.forEach((loc) => formData.append("locations[]", loc));

      form.education.forEach(
        (edu) => edu && formData.append("education[]", edu)
      );
      form.urls.forEach((url) => url && formData.append("urls[]", url));

      [
        "experience",
        "certification",
        "skills",
        "projects",
        "achievements",
        "extracurricular",
      ].forEach((field) => {
        if (form[field]) {
          form[field]
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
            .forEach((val) => formData.append(`${field}[]`, val));
        }
      });

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

      if (form.resume) formData.append("resume", form.resume);
      if (form.profilePhoto) formData.append("profilePhoto", form.profilePhoto);

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
      {/* Loader overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              border: "8px solid #e0e0e0",
              borderTop: "8px solid #045233",
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>
            {`@keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }`}
          </style>
        </div>
      )}

      <nav className="navbar" height="10vh">
        <div className="nav-logo">
          <h2>The Alumni Society</h2>
        </div>
      </nav>

      <div className="sign-container">
        <div className="sign-box">
          <h2 className="sign-title">Create an Account</h2>

          <form onSubmit={handleSubmit} className="sign-form">
            <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="faculty">Faculty</option>
                <option value="recruiter">Recruiter</option>
              </select>
              {/* Resume upload (not for recruiters) */}
            {form.role !== "recruiter" && form.role !== "" && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "#000", marginBottom: "0px" }}>
                  Upload Resume (PDF)
                </label>
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  onChange={handleChange}
                />

                {showTooltip && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      background: "#fff9c4",
                      border: "1px solid #fbc02d",
                      borderRadius: "6px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    💡 Upload your resume here. Most fields will be auto-filled
                    with your details.
                    <div style={{ textAlign: "right", marginTop: "5px" }}>
                      <button
                        type="button"
                        onClick={() => setShowTooltip(false)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#333",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Got it
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="form-row">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              
            </div>

            <div className="form-row">
              <input
                name="phn"
                placeholder="Phone"
                value={form.phn}
                onChange={handleChange}
              />
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
              />
            </div>

            

            <div className="form-row">
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-row">
              <input
                name="address"
                placeholder="Street / Address"
                value={form.address}
                onChange={handleChange}
              />
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
              />
              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
              />
            </div>

            {(form.role === "student" ||
              form.role === "alumni" ||
              form.role === "faculty") && (
              <>
                <div className="form-row">
                  <input
                    name="headline"
                    placeholder="Headline"
                    value={form.headline}
                    onChange={handleChange}
                  />
                  <input
                    name="department"
                    placeholder="Department/Branch"
                    value={form.department}
                    onChange={handleChange}
                  />
                </div>
                <input
                  name="yearOfStudy"
                  placeholder="Year of Study"
                  value={form.yearOfStudy}
                  onChange={handleChange}
                />
                <textarea
                  name="about"
                  placeholder="About"
                  value={form.about}
                  onChange={handleChange}
                />
                <input
                  name="experience"
                  placeholder="Experience (comma separated)"
                  value={form.experience}
                  onChange={handleChange}
                />
                <input
                  name="certification"
                  placeholder="Certifications (comma separated)"
                  value={form.certification}
                  onChange={handleChange}
                />
                <input
                  name="skills"
                  placeholder="Skills (comma separated)"
                  value={form.skills}
                  onChange={handleChange}
                />

                {form.education.map((edu, i) => (
                  <div key={i} className="form-row">
                    <input
                      value={edu}
                      placeholder={`Education ${i + 1}`}
                      onChange={(e) =>
                        handleEducationChange(i, e.target.value)
                      }
                    />
                    {form.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducationField(i)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addEducationField}>
                  + Add Education
                </button>

                {form.urls.map((url, i) => (
                  <div key={i} className="form-row">
                    <input
                      value={url}
                      placeholder={`Portfolio / URL ${i + 1}`}
                      onChange={(e) => handleUrlChange(i, e.target.value)}
                    />
                    {form.urls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeUrlField(i)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addUrlField}>
                  + Add URL
                </button>
              </>
            )}

            {form.role === "recruiter" && (
              <>
                <div className="form-row">
                  <input
                    name="company"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={handleChange}
                  />
                  <input
                    name="position"
                    placeholder="Position / Title"
                    value={form.position}
                    onChange={handleChange}
                  />
                </div>
                <textarea
                  name="about"
                  placeholder="About Company"
                  value={form.about}
                  onChange={handleChange}
                />
                {form.urls.map((url, i) => (
                  <input
                    key={i}
                    value={url}
                    placeholder={`Company / URL ${i + 1}`}
                    onChange={(e) => handleUrlChange(i, e.target.value)}
                  />
                ))}
                <button type="button" onClick={addUrlField}>
                  + Add URL
                </button>
              </>
            )}

            <label style={{ color: "#000", marginBottom: "0px" }}>
              Profile Photo (optional)
            </label>
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
            />

            <button type="submit" className="sign-btn">
              Sign Up
            </button>
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
