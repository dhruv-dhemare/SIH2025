import axios from "axios";

// Single API instance pointing to your resume parsing backend (port 8000)
const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Your main backend with everything integrated
});

// ---------- SIGNUP ----------
export const signup = (data, role) => {
  let endpoint;
  switch (role) {
    case "student":
      endpoint = "/api/student/signup";
      break;
    case "alumni":
      endpoint = "/api/alumni/signup";
      break;
    case "recruiter":
      endpoint = "/api/recruiter/signup";
      break;
    case "faculty":
      endpoint = "/api/teacher/signup";
      break;
    default:
      throw new Error("Invalid role selected");
  }
  const config =
    role === "student" || role === "alumni" || role === "faculty"
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
  return API.post(endpoint, data, config).then((r) => r.data);
};

// ---------- LOGIN ----------
export const login = async (username, password) => {
  if (!username || !password) throw new Error("Username and password required");
  const prefix = username.slice(0, 3).toUpperCase();
  let endpoint = "";
  switch (prefix) {
    case "REC":
      endpoint = "/api/recruiter/login";
      break;
    case "ALU":
      endpoint = "/api/alumni/login";
      break;
    case "CLB":
      endpoint = "/api/club/login";
      break;
    case "ADM":
      endpoint = "/api/admin/login";
      break;
    case "STD":
      endpoint = "/api/student/login";
      break;
    case "FAC":
      endpoint = "/api/teacher/login";
      break;
    default:
      throw new Error("Invalid username prefix");
  }
  const res = await API.post(endpoint, { username, password });
  return res.data;
};

// ---------- PROFILE ----------
export const getProfile = async (token) => {
  if (!token) throw new Error("Token is required to fetch profile");
  const res = await API.get("/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ---------- RESUME PARSE ----------
export const parseResume = async (file) => {
  if (!file) throw new Error("File is required for resume parsing");
  
  const formData = new FormData();
  formData.append("file", file);
  
  try {
    const res = await API.post("/parse-resume", formData, {
      headers: { 
        "Content-Type": "multipart/form-data" 
      },
      timeout: 60000, // 60 second timeout for file processing
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(`Resume parsing failed: ${error.response.data?.message || error.response.statusText}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response from server. Please check if the server is running on port 8000.");
    } else {
      // Something else happened
      throw new Error(`Resume parsing error: ${error.message}`);
    }
  }
};

export default API;