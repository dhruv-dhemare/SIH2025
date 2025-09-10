const express = require("express");
const Recruiter = require("../schema/recruiter");
const Post = require("../schema/post");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

const router = express.Router();

// ✅ Signup
// 🔹 Recruiter Signup with Auto-generated Username
router.post("/signup", async (req, res) => {
  try {
    const { name, phn, email, password, headline, about, urls = [], posts = [], locations = [] } = req.body;

    // Check if email already exists
    const existing = await Recruiter.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // 🔹 Auto-generate username (REC001, REC002, ...)
    const count = await Recruiter.countDocuments();
    const newUsername = `REC${String(count + 1).padStart(3, "0")}`;

    const recruiter = new Recruiter({
      name,
      username: newUsername, // auto-generated
      phn,
      email,
      password, // will be hashed automatically by pre-save hook
      headline,
      about,
      urls,
      posts,
      locations
    });

    await recruiter.save();

    // Generate JWT token
    const token = generateToken({ id: recruiter._id, email: recruiter.email });

    res.status(201).json({ message: "Recruiter signup successful", recruiter, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const recruiter = await Recruiter.findOne({ username });
    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });

    const isMatch = await recruiter.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: recruiter._id, email: recruiter.email });
    res.json({ message: "Login successful", token, recruiter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Change Password
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

// ✅ Update Profile
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

// ✅ Create Post and update recruiter
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


// ✅ Like Post
router.post("/like/:postId", jwtAuthMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.likes += 1;
    await post.save();

    res.json({ message: "Post liked successfully", likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Post
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
