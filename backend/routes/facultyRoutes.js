const express = require("express");
const bcrypt = require("bcrypt");
const Teacher = require("../schema/teacher");
const Post = require("../schema/post");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const router = express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");

const upload = multer({ dest: "uploads/" });

/* -------- Nodemailer -------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // 16-character App Password
  },
});

/* -------- Faculty Signup -------- */
router.post("/signup", upload.single("resume"), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      headline,
      about,
      experience = [],
      education = [],
      certification = [],
      skills = [],
      urls = [],
    } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // 2️⃣ Check for existing email
    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already exists." });
    }

    // 3️⃣ Auto-generate username FAC001, FAC002…
    const count = await Teacher.countDocuments();
    const username = `FAC${String(count + 1).padStart(3, "0")}`;

    // 4️⃣ Create teacher (password hashed in schema pre-save)
    const teacher = new Teacher({
      name: name.trim(),
      username,
      email: email.trim(),
      password,
      phn: phone, // keep DB field consistent
      headline,
      about,
      experience,
      education,
      certification,
      skills,
      urls,
      resume: req.file ? req.file.path : undefined,
    });

    const savedTeacher = await teacher.save();

    // 5️⃣ Generate JWT
    const token = generateToken({ id: savedTeacher._id, role: "teacher" });

    // 6️⃣ Remove password before sending to client
    const { password: _, ...teacherData } = savedTeacher.toObject();

    // 7️⃣ Send welcome email (don’t block signup if it fails)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: savedTeacher.email,
        subject: "Welcome to Alumni Portal - Faculty Account Details",
        text: `Hello ${savedTeacher.name},

Your faculty account has been created successfully.

Login details:
Username: ${savedTeacher.username}
Email: ${savedTeacher.email}

Keep this information safe.

Thank you,
Team Alumni Portal`,
      });
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
      return res.status(201).json({
        message: "Faculty signup successful (email sending failed).",
        teacher: teacherData,
        token,
      });
    }

    // 8️⃣ Success response
    res.status(201).json({
      message: "Faculty signup successful, email sent.",
      teacher: teacherData,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup." });
  }
});

// -------------------- Login --------------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ message: "Username and password required" });

    const teacher = await Teacher.findOne({ username });
    if (!teacher) return res.status(404).json({ message: "User not found" });

    const isMatch = await teacher.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken({ id: teacher._id, email: teacher.email, role: "teacher" });
    res.json({ message: "Login successful", token, teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 3🔹 Change Password
router.put("/change-password", jwtAuthMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const teacher = await Teacher.findById(req.user.id);
    if (!teacher) return res.status(404).json({ message: "User not found" });

    const isMatch = await teacher.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    teacher.password = newPassword;
    await teacher.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4🔹 Update Profile
router.put("/update-profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    const teacher = await Teacher.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json({ message: "Profile updated", Teacher: teacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5🔹 Like a Post
router.post("/like/:postId", jwtAuthMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const teacher = await Teacher.findById(req.user.id);
    const postId = req.params.postId;
    teacher.likedPosts.push(postId);
    await teacher.save();
    post.likes += 1;
    await post.save();

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
      userType: "Faculty"
    });
    await post.save();

    const teacher = await Teacher.findById(req.user.id);
    teacher.posts.push(post._id);
    await teacher.save();

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

    const teacher = await Teacher.findById(req.user.id);
    teacher.posts = teacher.posts.filter((p) => p.toString() !== req.params.postId);
    await teacher.save();

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//8 .like an event post
router.post("/like/event/:eventId", jwtAuthMiddleware, async (req, res) => {
  try {
    const event = await EventPost.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" }); 
    const user = await Student.findById(req.user.id);
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
