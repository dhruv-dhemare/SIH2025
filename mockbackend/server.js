// server/index.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory users array
let users = [];

// Signup endpoint
app.post("/api/auth/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = { id: users.length + 1, name, email, password, role };
  users.push(newUser);
  return res.status(200).json({ message: "Signup successful", user: newUser });
});

// Login endpoint
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  return res.status(200).json({ message: "Login successful", user });
});

app.listen(PORT, () => {
  console.log(`Mock backend running on http://localhost:${PORT}`);
});
