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

// import React, { useState } from "react";
// import { signup, uploadResume } from "../services/api";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
//   const [resume, setResume] = useState(null);
//   const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // Handle file selection
//   const handleResumeChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setResume(file);
//       // Show PDF preview or filename
//       if (file.type === "application/pdf") {
//         setResumePreviewUrl(URL.createObjectURL(file));
//       } else {
//         setResumePreviewUrl(null);
//       }
//     }
//   };

//   const validateForm = () => {
//     const emailRegex = /\S+@\S+\.\S+/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

//     if (!form.name.trim()) { setError("Full name is required"); return false; }
//     if (!emailRegex.test(form.email)) { setError("Invalid email address"); return false; }
//     if (!passwordRegex.test(form.password)) {
//       setError("Password must be at least 8 chars with uppercase, lowercase, number, and special char"); 
//       return false; 
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       // Signup user
//       await signup(form);

//       // Optionally upload resume
//       if (resume) {
//         setUploading(true);
//         const formData = new FormData();
//         formData.append("file", resume);
//         await uploadResume(formData);
//         alert("Resume uploaded successfully!");
//         setUploading(false);
//       }

//       alert("Signup successful!");
//       navigate("/");
//     } catch (err) {
//       setError(err.message || "Signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box animate__animated animate__fadeInDown">
//         <h2 className="auth-title">Create Your AlmaMatter Account</h2>
//         {error && <p className="auth-error">{error}</p>}

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
//           <select name="role" value={form.role} onChange={handleChange}>
//             <option value="student">Student</option>
//             <option value="alumni">Alumni</option>
//             <option value="recruitor">Recruitor</option>
//             <option value="college-admin">College Administrator</option>
//           </select>

//           <p style={{ color: "#ffd700", fontSize: "0.9rem" }}>Set your profile by uploading your resume (optional)</p>
//           <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />

//           {/* Show PDF preview if applicable */}
//           {resumePreviewUrl && (
//             <div className="resume-preview">
//               <iframe src={resumePreviewUrl} title="Resume Preview" width="100%" height="200px" style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.4)" }} />
//             </div>
//           )}
//           {resume && !resumePreviewUrl && <p>Selected file: {resume.name}</p>}

//           <button type="submit" className="auth-btn" disabled={loading || uploading}>
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="auth-footer">
//           Already have an account? <Link to="/login">Login here</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;






//above one Apoorv's working code
import React, { useState } from "react";
import { signup, uploadResume } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const isDocFile = (f) => ["doc", "docx"].includes(f.name.split(".").pop().toLowerCase());

 const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

  setFile(selectedFile);

  if (selectedFile.type.startsWith("image/") || selectedFile.type === "application/pdf") {
    setPreview(URL.createObjectURL(selectedFile));
  } else if (isDocFile(selectedFile)) {
    setPreview(selectedFile.name); // DOC/DOCX preview is just filename
  } else {
    setFile(null);
    setPreview(null);
    setError("Unsupported file type");
  }
};


  const removeFile = () => {
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  };

  const validateForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!form.name.trim()) { setError("Full name is required"); return false; }
    if (!emailRegex.test(form.email)) { setError("Invalid email address"); return false; }
    if (!passwordRegex.test(form.password)) { setError("Password must be 8+ chars with uppercase, lowercase, number & special char"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  if (!validateForm()) return;

  setLoadingSignup(true);
  setLoadingUpload(false);

  try {
    // 1️⃣ Signup user
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("role", form.role);

    if (file) formData.append("file", file);

    const signupRes = await fetch("http://localhost:8000/signup", {
      method: "POST",
      body: formData
    }).then(res => res.json());

    if (signupRes.status !== "ok") {
      setError(signupRes.message || "Signup failed");
      setLoadingSignup(false);
      return;
    }

    // 2️⃣ Call parse-resume route separately if file exists
    let parsedResume = null;
    if (file) {
      setLoadingUpload(true);
      const parseData = new FormData();
      parseData.append("file", file);

      const parseRes = await fetch("http://localhost:8000/parse-resume", {
        method: "POST",
        body: parseData
      }).then(res => res.json());

      if (parseRes.status === "ok") {
        parsedResume = parseRes.resume_parsed;
        console.log("Parsed Resume:", parsedResume);
      } else {
        console.warn("Resume parsing failed:", parseRes.message);
      }
      setLoadingUpload(false);
    }

    // Optional: store parsedResume in context/state if needed

    alert("Signup successful!");
    navigate("/login");

  } catch (err) {
    console.error(err);
    setError(err.message || "Signup failed");
  } finally {
    setLoadingSignup(false);
    setLoadingUpload(false);
  }
};



  return (
    <div className="auth-container">
      <div className="auth-box animate__animated animate__fadeInDown">
        <h2 className="auth-title">Create Your AlmaMatter Account</h2>
        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
            <option value="recruitor">Recruitor</option>
            <option value="college-admin">College Administrator</option>
          </select>

          <p style={{ color: "#ffd700", fontSize: "0.9rem" }}>
            Optionally upload a resume/image. Upload only one file at a time.
          </p>

          <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={handleFileChange} disabled={file !== null} />

          {preview && (
  <div className="file-preview" style={{ position: "relative", marginTop: "10px" }}>
    {file.type.startsWith("image/") && (
      <img src={preview} alt="Preview" style={{ maxHeight: "200px", width: "auto" }} />
    )}
    {file.type === "application/pdf" && (
      <iframe src={preview} width="100%" height="200px" title="PDF Preview"></iframe>
    )}
    {isDocFile(file) && <p>{preview}</p>} {/* Just filename for DOC/DOCX */}
    <button
      type="button"
      className="remove-btn"
      onClick={removeFile}
      style={{
        position: "absolute",
        top: "-10px",
        right: "-10px",
        background: "#ff6b6b",
        border: "none",
        borderRadius: "50%",
        width: "25px",
        height: "25px",
        color: "#fff",
        cursor: "pointer"
      }}
    >
      ✖
    </button>
  </div>
)}


          <button type="submit" className="auth-btn" disabled={loadingSignup || loadingUpload}>
            {loadingSignup ? "Signing Up..." : loadingUpload ? "Uploading Resume..." : "Sign Up"}
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
