import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// ------------------------
// MOCK BACKEND FOR TESTING
// ------------------------
const mock = new MockAdapter(API, { delayResponse: 500 }); // 0.5s delay

// Mock signup endpoint
mock.onPost("/auth/signup").reply((config) => {
  const data = JSON.parse(config.data);
  console.log("Signup called with:", data);
  return [200, { message: "Signup successful", user: data }];
});

// Mock login endpoint
mock.onPost("/auth/login").reply((config) => {
  const data = JSON.parse(config.data);
  console.log("Login called with:", data);
  if (data.email === "test@example.com" && data.password === "Password@123") {
    return [200, { message: "Login successful", user: { name: "Test User", role: "student" } }];
  } else {
    return [401, { message: "Invalid credentials" }];
  }
});

export const signup = (data) => API.post("/auth/signup", data).then((r) => r.data);
export const login = (data) => API.post("/auth/login", data).then((r) => r.data);

export default API;
