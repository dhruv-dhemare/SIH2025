const express = require("express");
const bcrypt = require("bcrypt");
const Recruiter = require("../schema/recruiter");
const { jwtAuthMiddleware,generateToken } = require("../jwt");
const nodemailer = require("nodemailer");

const router = express.Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// -------------------- Recruiter Signup --------------------
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phn,
      headline,
      about,
      urls = [],
      posts = [],
      locations = [],
    } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // ✅ Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // ✅ Validate URLs (optional)
    for (const url of urls) {
      if (url && !validator.isURL(url)) {
        return res.status(400).json({ error: `Invalid URL: ${url}` });
      }
    }

    // ✅ Check if email already exists
    const existing = await Recruiter.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already exists." });

    // ✅ Auto-generate username safely (REC001, REC002...)
    const lastRecruiter = await Recruiter.findOne().sort({ createdAt: -1 });
    let nextNumber = 1;
    if (lastRecruiter && lastRecruiter.username) {
      const lastNum = parseInt(lastRecruiter.username.replace("REC", ""));
      if (!isNaN(lastNum)) nextNumber = lastNum + 1;
    }
    const username = `REC${String(nextNumber).padStart(3, "0")}`;

    // ✅ Create recruiter instance (password will be hashed automatically)
    const recruiter = new Recruiter({
      name,
      username,
      email,
      password,
      phn,
      headline,
      about,
      urls,
      posts,
      locations,
    });

    const savedRecruiter = await recruiter.save();

    // ✅ Generate JWT
    const token = generateToken({ id: savedRecruiter._id, role: "recruiter" });

    // ✅ Send welcome email (non-blocking)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: savedRecruiter.email,
        subject: "Welcome! Your Recruiter Account Details",
        text: `Hello ${savedRecruiter.name},

Your recruiter account has been created successfully.
Your login username is: ${savedRecruiter.username}
Your email: ${savedRecruiter.email}

Keep this information safe.

Thank you,
Team Alumni Portal`,
      });
    } catch (emailErr) {
      console.error("Failed to send email:", emailErr);
    }

    // ✅ Respond without password
    const { password: pw, ...recruiterData } = savedRecruiter.toObject();
    res.status(201).json({
      message: "Recruiter signup successful",
      recruiter: recruiterData,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed." });
  }
});


// 2✅ Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await Recruiter.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    console.log("Password match?", isMatch);

    if (!isMatch) return res.status(401).json({ error: "Invalid username or password" });

    const token = generateToken({ id: user._id, role: "recruiter" }); // correct role

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});


// 3✅ Change Password
router.put("/change-password", jwtAuthMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const recruiter = await Recruiter.findById(req.user.id);

    const isMatch = await recruiter.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    recruiter.password = newPassword; // will be hashed by pre-save hook
    await recruiter.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4✅ Update Profile
router.put("/update-profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const { headline, about, urls, locations } = req.body;
    const recruiter = await Recruiter.findByIdAndUpdate(
      req.user.id,
      { headline, about, urls, locations },
      { new: true }
    );
    res.json({ message: "Profile updated successfully", recruiter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5✅ Create Post and update recruiter
router.post("/post", jwtAuthMiddleware, async (req, res) => {
  try {
    const { tag, title, description, photo } = req.body;

    const newPost = new Post({
      tag,
      title,
      description,
      photo,
      author: req.user.id,
      userType: "Recruiter"
    });

    await newPost.save();

    // Add post ID to recruiter.posts array
    await Recruiter.findByIdAndUpdate(
      req.user.id,
      { $push: { posts: newPost._id } },
      { new: true }
    );

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 6✅ Like Post
router.post("/like/post/:postId", jwtAuthMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const postId = req.params.postId;
    const user = await Student.findById(req.user.id);

    user.likedPost.push(postId);
    await user.save();
    post.likes += 1;
    await post.save();

    res.json({ message: "Post liked successfully", likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7.Like Event
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

// 8.✅ Delete Post
router.delete("/post/:postId", jwtAuthMiddleware, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.postId, author: req.user.id });
    if (!post) return res.status(404).json({ message: "Post not found or not authorized" });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
