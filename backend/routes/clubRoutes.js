const express = require("express");
const Club = require("../schema/club");
const EventPost = require("../schema/eventPost");
const Post = require("../schema/post");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const router = express.Router();

// 1🔹 Signup (with auto-generated Club IDs)
// 🔹 Club Signup Route
const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // 16-character App Password
  },
});

/* ---------- Club Signup ---------- */
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      phn,
      email,
      password,
      headline,
      about,
      urls = [],
      events = [],
      locations = [],
    } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // 2️⃣ Check for duplicate email
    const existingEmail = await Club.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "Email already exists." });
    }

    // 3️⃣ Generate unique username (CLB001, CLB002…)
    const count = await Club.countDocuments();
    const username = `CLB${String(count + 1).padStart(3, "0")}`;

    // 4️⃣ Create club (password hashed in schema pre-save)
    const club = new Club({
      name: name.trim(),
      username,
      phn,
      email: email.trim(),
      password,
      headline,
      about,
      urls,
      events,
      locations,
    });

    const savedClub = await club.save();

    // 5️⃣ Generate JWT
    const token = generateToken({ id: savedClub._id, role: "club" });

    // 6️⃣ Remove password before sending response
    const { password: _, ...clubData } = savedClub.toObject();

    // 7️⃣ Send welcome email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: savedClub.email,
        subject: "Welcome to Alumni Portal - Club Account Details",
        text: `Hello ${savedClub.name},

Your club account has been created successfully.

Login details:
Username: ${savedClub.username}
Email: ${savedClub.email}

Keep this information safe.

Thank you,
Team Alumni Portal`,
      });
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
      return res.status(201).json({
        message: "Club signup successful (email sending failed).",
        club: clubData,
        token,
      });
    }

    res.status(201).json({
      message: "Club signup successful, email sent.",
      club: clubData,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup." });
  }
});



// 2🔹 Login (no signup)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const club = await Club.findOne({ username });
    if (!club) return res.status(404).json({ message: "Club not found" });

    const isMatch = await club.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: club._id, email: club.email });
    res.json({ message: "Login successful", token, club });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3🔹 Change Password
router.put("/change-password", jwtAuthMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const club = await Club.findById(req.user.id);
    if (!club) return res.status(404).json({ message: "Club not found" });

    const isMatch = await club.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    club.password = newPassword;
    await club.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4🔹 Update Profile
router.put("/update-profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    const club = await Club.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json({ message: "Profile updated", club });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5🔹 Add Event Post
router.post("/event-post", jwtAuthMiddleware, async (req, res) => {
  try {
    const { tag, title, description, photo } = req.body;

    const eventPost = new EventPost({
      tag,
      title,
      description,
      photo,
      club: req.user.id
    });
    await eventPost.save();

    const club = await Club.findById(req.user.id);
    club.events.push(eventPost._id);
    await club.save();

    res.status(201).json({ message: "Event post created", eventPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6🔹 Delete Event Post
router.delete("/event-post/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const eventPost = await EventPost.findById(req.params.id);
    if (!eventPost) return res.status(404).json({ message: "Event post not found" });

    if (eventPost.club.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await eventPost.deleteOne();

    const club = await Club.findById(req.user.id);
    club.events = club.events.filter((e) => e.toString() !== req.params.id);
    await club.save();

    res.json({ message: "Event post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7🔹 Like an Event Post
router.post("/like/event/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const eventPost = await EventPost.findById(req.params.id);
    if (!eventPost) return res.status(404).json({ message: "Event post not found" });

    eventPost.likes += 1;
    await eventPost.save();

    res.json({ message: "Event post liked", eventPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//8. like a post
router.post("/like/post/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (!Post) return res.status(404).json({ message: "Event post not found" });
    Post.likes += 1;
    await Post.save();
    const user = await User.findById(req.user.id);
    user.likedPosts.push(Post._id);
    await user.save();
    res.json({ message: "Post liked", Post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});

module.exports = router;
