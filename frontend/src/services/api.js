import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Dynamic signup function
export const signup = (data, role) => {
  let endpoint;

  switch (role) {
    case "student":
      endpoint = "/student/signup";
      break;
    case "alumni":
      endpoint = "/alumni/signup";
      break;
    case "recruitor":
      endpoint = "/recruiter/signup";
      break;
    case "faculty":
      endpoint = "/teacher/signup";
      break;
    default:
      throw new Error("Invalid role selected");
  }

  const config =
    role === "student" || role === "alumni"
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

  return API.post(endpoint, data, config).then((r) => r.data);
};

// Login function with dynamic endpoint
export const login = async (username, password) => {
  if (!username || !password) throw new Error("Username and password required");

  const prefix = username.slice(0, 3).toUpperCase();
  let endpoint = "";

  switch (prefix) {
    case "REC":
      endpoint = "/recruiter/login";
      break;
    case "ALU":
      endpoint = "/alumni/login";
      break;
    case "CLB":
      endpoint = "/club/login";
      break;
    case "ADM":
      endpoint = "/admin/login";
      break;
    case "STD":
      endpoint = "/student/login";
      break;
    case "FAC":
      endpoint = "/teacher/login";
      break;
    default:
      throw new Error("Invalid username prefix");
  }

  const res = await API.post(endpoint, { username, password });
  return res.data;
};

export default API;
