import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const BASE_URL = "http://localhost:8000";
const API = axios.create({ baseURL: BASE_URL });

// ------------------------
// MOCK BACKEND FOR TESTING
// ------------------------
if (process.env.NODE_ENV === "development") {
  const mock = new MockAdapter(API, { delayResponse: 500 });

  mock.onPost(/\/signup\/?/).reply((config) => {
    const data = config.data instanceof FormData
      ? Object.fromEntries(config.data.entries())
      : JSON.parse(config.data);
    console.log("Mock Signup called with:", data);
    return [200, { status: "ok", message: "Signup successful", user: data }];
  });

  mock.onPost(/\/login\/?/).reply((config) => {
    const data = JSON.parse(config.data);
    console.log("Mock Login called with:", data);
    if (data.email === "test@example.com" && data.password === "Password@123") {
      return [200, { message: "Login successful", user: { name: "Test User", role: "student" } }];
    } else {
      return [401, { message: "Invalid credentials" }];
    }
  });

  mock.onPost(/\/parse-resume\/?/).reply((config) => {
    console.log("Mock Upload Resume called");
    return [200, { status: "ok", message: "Resume uploaded successfully", resume_parsed: { name: "John Doe" } }];
  });
}

// ------------------------
// REAL API CALLS
// ------------------------
export const signup = async (form) => {
  const data = { name: form.name, email: form.email, password: form.password, role: form.role };
  const res = await API.post("/signup/", data);
  return res.data;
};

export const login = async (form) => {
  const res = await API.post("/login/", { email: form.email, password: form.password });
  return res.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await API.post("/parse-resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export default API;
