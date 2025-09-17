// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signup } from "../services/api";
// import "./Signup.css";

// function Signup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//     phn: "",
//     headline: "",
//     about: "",
//     experience: "",
//     certification: "",
//     skills: "",
//     education: [""],
//     urls: [""],
//     resume: null,
//     profilePhoto: null,
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     dob: "",
//     gender: "",
//     department: "",
//     yearOfStudy: "",
//     company: "",
//     position: "",
//   });

//   const handleChange = (e) => {
//     const { name, type, files, value } = e.target;
//     if (type === "file") {
//       setForm({ ...form, [name]: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // Education handlers
//   const handleEducationChange = (i, val) => {
//     const updated = [...form.education];
//     updated[i] = val;
//     setForm({ ...form, education: updated });
//   };
//   const addEducationField = () => setForm({ ...form, education: [...form.education, ""] });
//   const removeEducationField = (i) =>
//     setForm({ ...form, education: form.education.filter((_, idx) => idx !== i) });

//   // URL handlers
//   const handleUrlChange = (i, val) => {
//     const updated = [...form.urls];
//     updated[i] = val;
//     setForm({ ...form, urls: updated });
//   };
//   const addUrlField = () => setForm({ ...form, urls: [...form.urls, ""] });
//   const removeUrlField = (i) =>
//     setForm({ ...form, urls: form.urls.filter((_, idx) => idx !== i) });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!form.role) throw new Error("Role not selected");

//       const formData = new FormData();

//       // Locations as an array
//       const locations = [form.address, form.city, form.state, form.country].filter(Boolean);
//       locations.forEach((loc) => formData.append("locations[]", loc));

//       // Education & URLs
//       form.education.forEach((edu) => edu && formData.append("education[]", edu));
//       form.urls.forEach((url) => url && formData.append("urls[]", url));

//       // Experience, Certification, Skills (comma-separated -> array)
//       ["experience", "certification", "skills"].forEach((field) => {
//         if (form[field]) {
//           form[field]
//             .split(",")
//             .map((v) => v.trim())
//             .filter(Boolean)
//             .forEach((val) => formData.append(`${field}[]`, val));
//         }
//       });

//       // Single fields
//       [
//         "name",
//         "email",
//         "password",
//         "role",
//         "headline",
//         "about",
//         "phn",
//         "dob",
//         "gender",
//         "department",
//         "yearOfStudy",
//         "company",
//         "position",
//       ].forEach((field) => {
//         if (form[field]) formData.append(field, form[field]);
//       });

//       // Files
//       if (form.resume) formData.append("resume", form.resume);
//       if (form.profilePhoto) formData.append("profilePhoto", form.profilePhoto);

//       // API call
//       await signup(formData, form.role);
//       alert("Signup successful!");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="whole">
//       <nav className="navbar">
//         <div className="nav-logo">
//           <h2>The Alumni Society</h2>
//         </div>
//       </nav>

//       <div className="sign-container">
//         <div className="sign-box">
//           <h2 className="sign-title">Create an Account</h2>

//           <form onSubmit={handleSubmit} className="sign-form">
//             {/* Basic Info */}
//             <div className="form-row">
//               <input name="name" placeholder="Full Name" onChange={handleChange} required />
//               <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//             </div>
//             <div className="form-row">
//               <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//               <select name="role" value={form.role} onChange={handleChange} required>
//                 <option value="" disabled>Select Role</option>
//                 <option value="student">Student</option>
//                 <option value="alumni">Alumni</option>
//                 <option value="faculty">Faculty</option>
//                 <option value="recruiter">Recruiter</option>
//               </select>
//             </div>

//             {/* Common extra fields */}
//             <div className="form-row">
//               <input name="phn" placeholder="Phone" onChange={handleChange} />
//               <input name="dob" type="date" onChange={handleChange} />
//             </div>
//             <div className="form-row">
//               <select name="gender" value={form.gender} onChange={handleChange}>
//                 <option value="">Gender</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             </div>

//             {/* Location fields */}
//             <div className="form-row">
//               <input name="address" placeholder="Street / Address" onChange={handleChange} />
//               <input name="city" placeholder="City" onChange={handleChange} />
//             </div>
//             <div className="form-row">
//               <input name="state" placeholder="State" onChange={handleChange} />
//               <input name="country" placeholder="Country" onChange={handleChange} />
//             </div>

//             {/* Student / Alumni / Faculty fields */}
//             {(form.role === "student" || form.role === "alumni" || form.role === "faculty") && (
//               <>
//                 <div className="form-row">
//                   <input name="headline" placeholder="Headline" onChange={handleChange} />
//                   <input name="department" placeholder="Department/Branch" onChange={handleChange} />
//                 </div>
//                 <input name="yearOfStudy" placeholder="Year of Study" onChange={handleChange} />
//                 <textarea name="about" placeholder="About" onChange={handleChange} />
//                 <input name="experience" placeholder="Experience (comma separated)" onChange={handleChange} />

//                 {form.education.map((edu, i) => (
//                   <div key={i} className="form-row">
//                     <input
//                       value={edu}
//                       placeholder={`Education ${i + 1}`}
//                       onChange={(e) => handleEducationChange(i, e.target.value)}
//                     />
//                     {form.education.length > 1 && (
//                       <button type="button" onClick={() => removeEducationField(i)}>Remove</button>
//                     )}
//                   </div>
//                 ))}
//                 <button type="button" onClick={addEducationField}>+ Add Education</button>

//                 <input name="certification" placeholder="Certifications (comma separated)" onChange={handleChange} />
//                 <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />

//                 {form.urls.map((url, i) => (
//                   <div key={i} className="form-row">
//                     <input
//                       value={url}
//                       placeholder={`Portfolio / URL ${i + 1}`}
//                       onChange={(e) => handleUrlChange(i, e.target.value)}
//                     />
//                     {form.urls.length > 1 && (
//                       <button type="button" onClick={() => removeUrlField(i)}>Remove</button>
//                     )}
//                   </div>
//                 ))}
//                 <button type="button" onClick={addUrlField}>+ Add URL</button>

//                 {/* Resume label + input */}
//                 <label style={{ color: "#000000" ,marginBottom:"0px" }}>Upload Resume (PDF)</label>
//                 <input type="file" name="resume" accept="application/pdf" onChange={handleChange} />
//               </>
//             )}

//             {/* Recruiter fields */}
//             {form.role === "recruiter" && (
//               <>
//                 <div className="form-row">
//                   <input name="company" placeholder="Company Name" onChange={handleChange} />
//                   <input name="position" placeholder="Position / Title" onChange={handleChange} />
//                 </div>
//                 <textarea name="about" placeholder="About Company" onChange={handleChange} />
//                 {form.urls.map((url, i) => (
//                   <input
//                     key={i}
//                     value={url}
//                     placeholder={`Company / URL ${i + 1}`}
//                     onChange={(e) => handleUrlChange(i, e.target.value)}
//                   />
//                 ))}
//                 <button type="button" onClick={addUrlField}>+ Add URL</button>
//               </>
//             )}

//             {/* Profile photo for everyone */}
//             <label style={{ color: "#000000",marginBottom:"0px" }}>Profile Photo (optional)</label>
//             <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} />

//             <button type="submit" className="sign-btn">Sign Up</button>
//           </form>

//           <p className="sign-footer">
//             Already have an account? <a href="/login">Login</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, parseResume } from "../services/api";
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

  // New state for resume preview and parsing
  const [resumePreview, setResumePreview] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeFileType, setResumeFileType] = useState("");
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [resumeParsed, setResumeParsed] = useState(false);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      if (name === "resume") {
        handleResumeUpload(files[0]);
      } else {
        setForm({ ...form, [name]: files[0] });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle resume upload with preview
  const handleResumeUpload = (file) => {
    if (!file) return;

    // Validate file type - updated to match your pipeline
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid file format: PDF, DOCX, JPG, JPEG, or PNG');
      return;
    }

    // Set file info
    setForm({ ...form, resume: file });
    setResumeFileName(file.name);
    setResumeFileType(file.type);
    setResumeParsed(false);

    // Create preview based on file type
    if (file.type.startsWith('image/')) {
      // For images, create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setResumePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDF/DOC files, just show file info
      setResumePreview(null);
    }
  };

  // Remove uploaded resume
  const removeResume = () => {
    setForm({ ...form, resume: null });
    setResumePreview(null);
    setResumeFileName("");
    setResumeFileType("");
    setResumeParsed(false);
    // Reset the file input
    const resumeInput = document.querySelector('input[name="resume"]');
    if (resumeInput) resumeInput.value = '';
  };

  // Parse resume function
  const parseResumeHandler = async () => {
    if (!form.resume) {
      alert('Please upload a resume first');
      return;
    }

    setIsParsingResume(true);
    try {
      console.log('🔍 Starting resume parsing...');
      console.log('📄 File details:', {
        name: form.resume.name,
        type: form.resume.type,
        size: form.resume.size
      });

      // Test server connection first
      try {
        const healthCheck = await fetch('http://localhost:8000/health');
        console.log('🏥 Health check status:', healthCheck.status);
        if (healthCheck.ok) {
          const healthData = await healthCheck.json();
          console.log('✅ Server is running:', healthData);
        }
      } catch (healthError) {
        console.error('❌ Server health check failed:', healthError);
        throw new Error('Cannot connect to server. Please make sure the backend is running on port 8000.');
      }

      // Use the parseResume function from api.js
      const result = await parseResume(form.resume);
      
      console.log('🎉 Parsing result:', result);
      
      if (result.status !== 'ok') {
        throw new Error(result.message || 'Failed to parse resume');
      }

      const parsedData = result.resume_parsed;
      
      if (!parsedData) {
        throw new Error('No parsed data received from server');
      }

      console.log('📊 Parsed data:', parsedData);
      
      // Auto-fill form fields with parsed data from your pipeline
      setForm(prevForm => ({
        ...prevForm,
        name: parsedData.personal_info?.name || prevForm.name,
        email: parsedData.personal_info?.emails?.[0] || prevForm.email,
        phn: parsedData.personal_info?.phones?.[0] || prevForm.phn,
        headline: parsedData.personal_info?.organizations?.[0] || prevForm.headline,
        about: parsedData.projects?.[0] || prevForm.about, // Using first project as about
        experience: parsedData.experience ? parsedData.experience.join(', ') : prevForm.experience,
        skills: parsedData.skills ? parsedData.skills.join(', ') : prevForm.skills,
        certification: parsedData.achievements ? parsedData.achievements.join(', ') : prevForm.certification,
        education: parsedData.education && parsedData.education.length > 0 ? parsedData.education : prevForm.education,
        // Extract locations for address fields
        address: parsedData.personal_info?.locations?.[0] || prevForm.address,
        city: parsedData.personal_info?.locations?.[1] || prevForm.city,
        state: parsedData.personal_info?.locations?.[2] || prevForm.state,
        country: parsedData.personal_info?.locations?.[3] || prevForm.country,
      }));

      setResumeParsed(true);
      alert('✅ Resume parsed successfully! Please review and update the auto-filled information.');
    } catch (error) {
      console.error('❌ Resume parsing error:', error);
      alert(`❌ Failed to parse resume: ${error.message}\n\nPlease check:\n1. Backend is running on port 8000\n2. File is a valid PDF/DOCX/Image\n3. Check browser console for details`);
    } finally {
      setIsParsingResume(false);
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

      // Add resume parsing status
      formData.append("resumeParsed", resumeParsed);

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
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
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
              <input name="phn" placeholder="Phone" value={form.phn} onChange={handleChange} />
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
                  <input name="headline" placeholder="Headline" value={form.headline} onChange={handleChange} />
                  <input name="department" placeholder="Department/Branch" onChange={handleChange} />
                </div>
                <input name="yearOfStudy" placeholder="Year of Study" onChange={handleChange} />
                <textarea name="about" placeholder="About" value={form.about} onChange={handleChange} />
                <input name="experience" placeholder="Experience (comma separated)" value={form.experience} onChange={handleChange} />

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

                <input name="certification" placeholder="Certifications (comma separated)" value={form.certification} onChange={handleChange} />
                <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} />

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

                {/* Resume upload section with preview */}
                <div className="resume-upload-section">
                  <label style={{ color: "#000000", marginBottom: "8px", display: "block" }}>
                    Upload Resume (PDF, DOCX, JPG, PNG)
                  </label>
                  
                  <input 
                    type="file" 
                    name="resume" 
                    accept=".pdf,.docx,.jpg,.jpeg,.png" 
                    onChange={handleChange}
                    style={{ marginBottom: "10px" }}
                  />

                  {/* Resume Preview and Controls */}
                  {form.resume && (
                    <div className="resume-preview-container" style={{ 
                      border: "1px solid #ddd", 
                      padding: "15px", 
                      borderRadius: "8px", 
                      marginBottom: "15px",
                      backgroundColor: "#f9f9f9"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <div>
                          <strong>Uploaded File:</strong> {resumeFileName}
                          {resumeParsed && <span style={{ color: "green", marginLeft: "10px" }}>✓ Parsed</span>}
                        </div>
                        <button 
                          type="button" 
                          onClick={removeResume}
                          style={{ 
                            background: "red", 
                            color: "white", 
                            border: "none", 
                            borderRadius: "50%", 
                            width: "25px", 
                            height: "25px",
                            cursor: "pointer",
                            fontSize: "14px"
                          }}
                        >
                          ×
                        </button>
                      </div>

                      {/* Image Preview */}
                      {resumePreview && resumeFileType.startsWith('image/') && (
                        <div style={{ marginBottom: "10px" }}>
                          <img 
                            src={resumePreview} 
                            alt="Resume Preview" 
                            style={{ 
                              maxWidth: "100%", 
                              maxHeight: "300px", 
                              border: "1px solid #ccc",
                              borderRadius: "4px"
                            }}
                          />
                        </div>
                      )}

                      {/* File Info for non-images */}
                      {!resumeFileType.startsWith('image/') && (
                        <div style={{ marginBottom: "10px", padding: "10px", backgroundColor: "#fff", borderRadius: "4px" }}>
                          <p style={{ margin: "0", color: "#666" }}>
                            📄 {resumeFileType.includes('pdf') ? 'PDF Document' : 'Word Document'}
                          </p>
                          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#888" }}>
                            File size: {(form.resume.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      )}

                      {/* Parse Resume Button */}
                      <button 
                        type="button" 
                        onClick={parseResumeHandler}
                        disabled={isParsingResume}
                        style={{
                          backgroundColor: resumeParsed ? "#28a745" : "#007bff",
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          cursor: isParsingResume ? "not-allowed" : "pointer",
                          fontSize: "14px"
                        }}
                      >
                        {isParsingResume ? "Parsing..." : resumeParsed ? "✓ Resume Parsed" : "Parse Resume & Auto-fill"}
                      </button>
                    </div>
                  )}
                </div>
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
            <label style={{ color: "#000000", marginBottom: "0px" }}>Profile Photo (optional)</label>
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