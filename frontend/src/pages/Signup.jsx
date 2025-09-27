import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import { DotLottie } from "@lottiefiles/dotlottie-web";
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

  // Initialize DotLottie only when loader is visible
  useEffect(() => {
    if (loading) {
      const dotLottie = new DotLottie({
        autoplay: true,
        loop: true,
        canvas: document.querySelector("#dotlottie-canvas"),
        src: "https://lottie.host/2cd0f2f4-bdb8-4c39-8dd7-ff5efb9d993a/IjJ3oZ1g5l.lottie", // replace with your .lottie or .json file
      });
      return () => dotLottie.destroy(); // cleanup when loader unmounts
    }
  }, [loading]);

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
                  : `${ex.activity}${ex.details ? " (" + ex.details + ")" : ""}`
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
      {/* Lottie Loader Overlay */}
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
          <canvas id="dotlottie-canvas" width="300" height="300"></canvas>
        </div>
      )}

      <nav className="navbar" height="10vh">
        <div className="nav-logo">
          <h2>The Alumni Society</h2>
        </div>
      </nav>

      {/* --- Your existing form code remains unchanged --- */}
      {/* (I didn’t touch the form part to avoid breaking your fields/logic) */}
      {/* Copy-paste your form code here as-is */}

    </div>
  );
}

export default Signup;
