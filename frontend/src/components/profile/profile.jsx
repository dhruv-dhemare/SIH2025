import { useState, useRef } from "react";
import "./Profile.css";

function Profile() {
  // profile pic
  const [profilePic, setProfilePic] = useState(null);
  const [isPicModalOpen, setIsPicModalOpen] = useState(false);

  // form data
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  // education, experience, skills, certifications
  const [educations, setEducations] = useState([]);
  const [eduInput, setEduInput] = useState({
    institution: "",
    level: "",
    year: "",
    grade: "",
  });

  const [expInput, setExpInput] = useState({
    role: "",
    company: "",
    fromMonth: "",
    fromYear: "",
    toMonth: "",
    toYear: "",
    description: "",
  });
  

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [experiences, setExperiences] = useState([]);

  const [certs, setCerts] = useState([]);

  // view/edit toggle
  const [saved, setSaved] = useState(false);

  // refs for file inputs (in modal & sidebar)
  const picInputRef = useRef(null);
  const sidebarPicInputRef = useRef(null);
  const certInputRef = useRef(null);

  /* ---------- Profile picture handlers ---------- */
  const handleOpenPicModal = () => setIsPicModalOpen(true);
  const handleClosePicModal = () => setIsPicModalOpen(false);

  function handlePicUploadFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfilePic({ url, name: file.name, file });
    // close modal automatically after upload
    setIsPicModalOpen(false);
  }

  const handlePicUploadChange = (e) => {
    const f = e.target.files && e.target.files[0];
    handlePicUploadFile(f);
  };

  const handleSidebarPicUpload = (e) => {
    handlePicUploadChange(e);
  };

  const handleDeletePic = () => {
    setProfilePic(null);
  };

  /* ---------- Education handlers ---------- */
  const addEducation = () => {
    const { institution, level, year } = eduInput;
    if (!institution || !level || !year) return;
    setEducations((s) => [...s, eduInput]);
    setEduInput({ institution: "", level: "", year: "", grade: "" });
  };
  const removeEducation = (i) =>
    setEducations((s) => s.filter((_, idx) => idx !== i));

  /* ---------- Experience handlers ---------- */
  const addExperience = () => {
    const { role, company, fromMonth, fromYear } = expInput;
    if (!role || !company || !fromMonth || !fromYear) return;
  
    setExperiences((s) => [...s, expInput]);
    setExpInput({
      role: "",
      company: "",
      fromMonth: "",
      fromYear: "",
      toMonth: "",
      toYear: "",
      description: "",
    });
  };
  
  const removeExperience = (i) =>
    setExperiences((s) => s.filter((_, idx) => idx !== i));

  /* ---------- Skills handlers ---------- */
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (!skills.includes(trimmed)) setSkills((s) => [...s, trimmed]);
    setSkillInput("");
  };
  const removeSkill = (i) => setSkills((s) => s.filter((_, idx) => idx !== i));

  /* ---------- Certifications handlers ---------- */
  const handleCertFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newCerts = files.map((f) => ({
      name: f.name,
      type: f.type,
      url: URL.createObjectURL(f),
      file: f,
      id: Math.random().toString(36).slice(2, 9),
    }));
    setCerts((s) => [...s, ...newCerts]);
    // reset input to allow re-upload of same file if needed
    if (certInputRef.current) certInputRef.current.value = "";
  };
  const removeCert = (id) => setCerts((s) => s.filter((c) => c.id !== id));

  /* ---------- Save / Edit handlers ---------- */
  const handleSaveProfile = () => {
    // optionally: validate required fields
    setSaved(true);
  };
  const handleEditProfile = () => setSaved(false);

  /* ---------- Helper UI small components ---------- */
  const PicModal = () => {
    if (!isPicModalOpen) return null;
    return (
      <div className="modal-overlay" onClick={handleClosePicModal}>
        <div
          className="modal"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="modal-header">
            <h3>Profile photo</h3>
            <button className="modal-close" onClick={handleClosePicModal}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-pic-preview">
              {profilePic ? (
                <img src={profilePic.url} alt="profile preview" />
              ) : (
                <div className="modal-placeholder">👤</div>
              )}
            </div>

            <div className="modal-actions">
              <label className="modal-upload">
                <input
                  ref={picInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePicUploadChange}
                />
                Update photo
              </label>

              {profilePic && (
                <button
                  className="modal-delete"
                  onClick={() => {
                    handleDeletePic();
                    handleClosePicModal();
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PicModal />

      <div className="profile-container">
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <div
            className="profile-pic"
            role="button"
            onClick={handleOpenPicModal}
            title="Click to change profile photo"
          >
            {profilePic ? (
              <>
                <img src={profilePic.url} alt="Profile" />
                <button className="delete-btn" onClick={handleDeletePic}>
                  ✕
                </button>
              </>
            ) : (
              <>
                <span className="placeholder-icon">👤</span>
              </>
            )}
          </div>

          {/* only show small upload input if no pic */}
          {!profilePic && (
            <div className="upload-btn">
              <input
                ref={sidebarPicInputRef}
                type="file"
                accept="image/*"
                onChange={handleSidebarPicUpload}
              />
            </div>
          )}

          {/* quick summary on sidebar (read-only preview) */}
          <div className="sidebar-summary">
            <div className="side-name">{name || "Your Name"}</div>
            <div className="side-about">{about ? about.slice(0, 120) : ""}</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="profile-main">
          <h1 className="profile-title">Profile</h1>

          {!saved ? (
            /* ========== EDIT MODE ========== */
            <>
              {/* NAME */}
              <div className="profile-field">
                <label>Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              {/* ABOUT */}
              <div className="profile-field">
                <label>About</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Write a short intro"
                />
              </div>

              {/* EDUCATION */}
              <div className="profile-field">
                <label>Education</label>

                <div className="edu-inputs">
                  {/* Institution free text (user requested global list optional) */}
                  <input
                    value={eduInput.institution}
                    onChange={(e) =>
                      setEduInput({ ...eduInput, institution: e.target.value })
                    }
                    placeholder="Institution (e.g. school/university name)"
                  />
                  <input
                    value={eduInput.level}
                    onChange={(e) =>
                      setEduInput({ ...eduInput, level: e.target.value })
                    }
                    placeholder="Level (e.g. B.Tech / High School)"
                  />
                  <input
                    value={eduInput.year}
                    onChange={(e) =>
                      setEduInput({ ...eduInput, year: e.target.value })
                    }
                    placeholder="Year (e.g. 2024)"
                  />
                  <input
                    value={eduInput.grade}
                    onChange={(e) =>
                      setEduInput({ ...eduInput, grade: e.target.value })
                    }
                    placeholder="Grade (CGPA / % / Grade)"
                  />
                  <button className="btn" onClick={addEducation}>
                    + Add
                  </button>
                </div>

                <div className="edu-list">
                  {educations.map((edu, i) => (
                    <div className="edu-item" key={i}>
                      <div className="edu-year">{edu.year}</div>
                      <div className="edu-details">
                        <div className="edu-main">
                          <strong>{edu.level}</strong> · {edu.institution}
                        </div>
                        <div className="edu-sub">Grade: {edu.grade || "N/A"}</div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeEducation(i)}
                        title="Remove education"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXPERIENCE */}
                <div className="profile-field">
                <label>Experience</label>

                {/* Input fields */}
                <div className="edu-inputs">
                    <input
                    value={expInput.role || ""}
                    onChange={(e) => setExpInput({ ...expInput, role: e.target.value })}
                    placeholder="Role (e.g. Intern / SDE)"
                    />
                    <input
                    value={expInput.company || ""}
                    onChange={(e) => setExpInput({ ...expInput, company: e.target.value })}
                    placeholder="Company"
                    />

                    <select
                    value={expInput.fromMonth || ""}
                    onChange={(e) =>
                        setExpInput({ ...expInput, fromMonth: e.target.value })
                    }
                    >
                    <option value="">From (Month)</option>
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(
                        (m) => <option key={m} value={m}>{m}</option>
                    )}
                    </select>
                    <input
                    type="number"
                    value={expInput.fromYear || ""}
                    onChange={(e) =>
                        setExpInput({ ...expInput, fromYear: e.target.value })
                    }
                    placeholder="From (Year)"
                    />

                    <select
                    value={expInput.toMonth || ""}
                    onChange={(e) =>
                        setExpInput({ ...expInput, toMonth: e.target.value })
                    }
                    >
                    <option value="">To (Month)</option>
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(
                        (m) => <option key={m} value={m}>{m}</option>
                    )}
                    </select>
                    <input
                    type="number"
                    value={expInput.toYear || ""}
                    onChange={(e) =>
                        setExpInput({ ...expInput, toYear: e.target.value })
                    }
                    placeholder="To (Year or Present)"
                    />
                </div>

                {/* Role description */}
                <textarea
                    value={expInput.description || ""}
                    onChange={(e) =>
                    setExpInput({ ...expInput, description: e.target.value })
                    }
                    placeholder="Brief description of your role"
                />

                {/* Add button */}
                <button className="btn" onClick={addExperience}>
                    + Add
                </button>

                {/* List of experiences */}
                <div className="edu-list">
                    {experiences.map((exp, i) => (
                    <div className="edu-item" key={i}>
                        <div className="edu-year">
                        {exp.fromMonth} {exp.fromYear} – {exp.toMonth || ""} {exp.toYear || "Present"}
                        </div>
                        <div className="edu-details">
                        <div className="edu-main">
                            <strong>{exp.role}</strong> · {exp.company}
                        </div>
                        {exp.description && <div className="edu-sub">{exp.description}</div>}
                        </div>
                        <button className="remove-btn" onClick={() => removeExperience(i)}>
                        ✕
                        </button>
                    </div>
                    ))}
                </div>
                </div>


              {/* SKILLS */}
              <div className="profile-field">
                <label>Skills</label>
                <div className="skill-inputs">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Type a skill and press Enter or click Add"
                  />
                  <button className="btn" onClick={addSkill}>
                    + Add
                  </button>
                </div>

                <div className="skill-list">
                  {skills.map((s, i) => (
                    <span className="skill-tag" key={i}>
                      {s}
                      <button onClick={() => removeSkill(i)}>✕</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* CERTIFICATES */}
              <div className="profile-field">
                <label>Certifications (JPG / PNG / PDF)</label>
                <div className="edu-inputs">
                  <input
                    ref={certInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    multiple
                    onChange={handleCertFiles}
                  />
                </div>

                <div className="cert-list">
                  {certs.map((c) => (
                    <div className="cert-item" key={c.id}>
                      <a href={c.url} target="_blank" rel="noreferrer">
                        {c.type.includes("pdf") ? (
                          <span className="cert-icon">📄</span>
                        ) : (
                          <img src={c.url} alt={c.name} className="cert-thumb" />
                        )}
                      </a>
                      <div className="cert-meta">
                        <div className="cert-name">{c.name}</div>
                        <div className="cert-actions">
                          <a href={c.url} download={c.name} className="cert-download">
                            Download
                          </a>
                          <button onClick={() => removeCert(c.id)} className="remove-btn">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 8 }}>
                <button className="save-btn btn" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </>
          ) : (
            /* ========== VIEW / SAVED MODE ========== */
            <>
              <div className="saved-top">
                <div className="saved-left">
                  <div className="saved-name">{name || "Your Name"}</div>
                  <div className="saved-about">{about || "-"}</div>
                </div>
                <div className="saved-actions">
                  <button className="btn" onClick={handleEditProfile}>
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="saved-section">
                <h3>Education</h3>
                {educations.length ? (
                  educations.map((edu, i) => (
                    <div className="edu-item" key={i}>
                      <div className="edu-year">{edu.year}</div>
                      <div className="edu-details">
                        <div className="edu-main">
                          <strong>{edu.level}</strong> · {edu.institution}
                        </div>
                        <div className="edu-sub">Grade: {edu.grade || "N/A"}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="muted">No education added yet.</p>
                )}
              </div>

              <div className="saved-section">
                <h3>Experience</h3>
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <div className="edu-item" key={i}>
                      <div className="edu-year">
                        {exp.from}–{exp.to || "Present"}
                      </div>
                      <div className="edu-details">
                        <div className="edu-main">
                          <strong>{exp.role}</strong> · {exp.company}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="muted">No experience added yet.</p>
                )}
              </div>

              <div className="saved-section">
                <h3>Skills</h3>
                {skills.length ? (
                  <div className="skill-list">
                    {skills.map((s, i) => (
                      <span className="skill-tag" key={i}>
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="muted">No skills added yet.</p>
                )}
              </div>

              <div className="saved-section">
                <h3>Certifications</h3>
                {certs.length ? (
                  certs.map((c) => (
                    <div className="cert-item" key={c.id}>
                      <a href={c.url} target="_blank" rel="noreferrer">
                        {c.type.includes("pdf") ? (
                          <span className="cert-icon">📄</span>
                        ) : (
                          <img src={c.url} alt={c.name} className="cert-thumb" />
                        )}
                      </a>
                      <div className="cert-meta">
                        <div className="cert-name">{c.name}</div>
                        <div className="cert-actions">
                          <a href={c.url} download={c.name} className="cert-download">
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="muted">No certifications uploaded.</p>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Profile;





