const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const Alumni = require("../schema/alumni");
const { jwtAuthMiddleware,generateToken } = require("../jwt");
const nodemailer = require("nodemailer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// -------------------- Multer setup --------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/resumes";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

/* ---------- Nodemailer setup ---------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ---------- Signup Route ---------- */
router.post("/signup", upload.single("resume"), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phn,
      headline,
      about,
      experience = [],
      education = [],
      certification = [],
      skills = [],
      urls = [],
    } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const existing = await Alumni.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already exists." });
    }

    // Auto-generate username ALU001, ALU002...
    const count = await Alumni.countDocuments();
    const username = `ALU${String(count + 1).padStart(3, "0")}`;

    // Store only filename, not full path
    const resumeFile = req.file ? req.file.filename : null;

    // Create alumni (password hashed in schema pre-save)
    const alumni = new Alumni({
      name: name.trim(),
      username,
      email: email.trim(),
      password,
      phn,
      headline,
      about,
      experience,
      education,
      certification,
      skills,
      urls,
      resume: resumeFile,
    });

    const savedAlumni = await alumni.save();

    // Generate JWT
    const token = generateToken({ id: savedAlumni._id, role: "alumni" });

    // Remove password before sending response
    const { password: _, ...alumniData } = savedAlumni.toObject();

    // Send welcome email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: savedAlumni.email,
        subject: "Welcome to Alumni Portal!",
        text: `Hello ${savedAlumni.name},

Your alumni account has been created successfully.

Login details:
Username: ${savedAlumni.username}
Email: ${savedAlumni.email}

Keep this information safe.

Thank you,
Team Alumni Portal`,
      });
    } catch (emailErr) {
      console.error("Failed to send email:", emailErr);
      return res.status(201).json({
        message: "Signup successful (email sending failed)",
        alumni: alumniData,
        token,
      });
    }

    res.status(201).json({
      message: "Signup successful, email sent",
      alumni: alumniData,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed." });
  }
});

// -------------------- Login --------------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: "Username and password required" });

    const user = await Alumni.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid username or password" });

    const token = generateToken({ id: user._id, role: "alumni" });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});



// 3🔹 Change Password
router.put("/change-password", jwtAuthMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const alumni = await Alumni.findById(req.user.id);
    if (!alumni) return res.status(404).json({ message: "User not found" });

    const isMatch = await alumni.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    alumni.password = newPassword;
    await alumni.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4🔹 Update Profile
router.put("/update-profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    const alumni = await Alumni.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json({ message: "Profile updated", alumni });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5🔹 Like a Post
router.post("/like/:postId", jwtAuthMiddleware, async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.user.id);
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(alumni._id)) {
      return res.status(400).json({ message: "Already liked" });
    }

    post.likes +=1;
    alumni.likedPosts.push(post._id);

    await post.save();
    await alumni.save();

    res.json({ message: "Post liked", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6🔹 Create a Post
router.post("/post", jwtAuthMiddleware, async (req, res) => {
  try {
    const { tag, title, description, photo } = req.body;
    const post = new Post({
      tag,
      title,
      description,
      photo,
      author: req.user.id,
      userType: "Alumni"
    });
    await post.save();

    const alumni = await Alumni.findById(req.user.id);
    alumni.posts.push(post._id);
    await alumni.save();

    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7🔹 Delete a Post
router.delete("/post/:postId", jwtAuthMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();

    const alumni = await Alumni.findById(req.user.id);
    alumni.posts = alumni.posts.filter((p) => p.toString() !== req.params.postId);
    await alumni.save();

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//8 .like a event post
router.post("/like/event/:eventId", jwtAuthMiddleware, async (req, res) => {
  try {
    const event = await EventPost.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const user = await Alumni.findById(req.user.id);
    user.likedEvents.push(event._id);
    await user.save();
    event.likes += 1;
    await event.save();
    res.json({ message: "Event liked successfully", likes: event.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }   
});

module.exports = router;
