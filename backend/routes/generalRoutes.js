const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// Import all Mongoose models
const Student   = require("../schema/student");
const Teacher   = require("../schema/teacher");
const Recruiter = require("../schema/recruiter");
const Club      = require("../schema/club");
const Alumni    = require("../schema/alumni");
const Admin     = require("../schema/admin");

// Keep models in an array for easy iteration
const MODELS = [
  { name: "student",   model: Student },
  { name: "teacher",   model: Teacher },
  { name: "recruiter", model: Recruiter },
  { name: "club",      model: Club },
  { name: "alumni",    model: Alumni },
  { name: "admin",     model: Admin },
];

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.user; // id should come from your JWT payload
    let foundUser = null;
    let role = null;

    // Search each collection until a match is found
    for (const entry of MODELS) {
      const user = await entry.model.findById(id).lean();
      if (user) {
        foundUser = user;
        role = entry.name;
        break;
      }
    }

    if (!foundUser) {
      return res.status(404).json({ message: "User not found in any collection" });
    }

    res.status(200).json({
      role, 
      user: foundUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const tokenBlacklist = new Set();

router.post("/logout", jwtAuthMiddleware, (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    tokenBlacklist.add(token);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const checkBlacklist = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token && tokenBlacklist.has(token)) {
    return res.status(401).json({ message: "Token is invalid (logged out)" });
  }
  next();
};
router.use(jwtAuthMiddleware, checkBlacklist);


module.exports = { router, tokenBlacklist };
