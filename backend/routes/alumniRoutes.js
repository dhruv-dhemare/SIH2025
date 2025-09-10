const express = require("express");
const bcrypt = require("bcrypt");
const Alumni = require("../schema/alumni");
const Post = require("../schema/post");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const router = express.Router();

// 🔹 Signup
// 🔹 Signup with Auto-generated Username
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phn } = req.body;

    // check if email already exists
    const existing = await Alumni.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // find the last created alumni to generate next username
    const lastAlumni = await Alumni.findOne().sort({ createdAt: -1 });
    let nextNumber = 1;

    if (lastAlumni && lastAlumni.username) {
      const lastNum = parseInt(lastAlumni.username.replace("ALU", ""));
      if (!isNaN(lastNum)) {
        nextNumber = lastNum + 1;
      }
    }

    const newUsername = "ALU" + String(nextNumber).padStart(3, "0");

    // create alumni with generated username
    const alumni = new Alumni({
      name,
      username: newUsername,
      email,
      password,
      phn
    });

    await alumni.save();

    // generate JWT
    const token = generateToken({ id: alumni._id, email: alumni.email });

    res.status(201).json({
      message: "Signup successful",
      alumni,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const alumni = await Alumni.findOne({ username });
    if (!alumni) return res.status(404).json({ message: "User not found" });

    const isMatch = await alumni.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: alumni._id, email: alumni.email });
    res.json({ message: "Login successful", token, alumni });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Change Password
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

// 🔹 Update Profile
router.put("/update-profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    const alumni = await Alumni.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json({ message: "Profile updated", alumni });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Like a Post
router.post("/like/:postId", jwtAuthMiddleware, async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.user.id);
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(alumni._id)) {
      return res.status(400).json({ message: "Already liked" });
    }

    post.likes.push(alumni._id);
    alumni.likedPosts.push(post._id);

    await post.save();
    await alumni.save();

    res.json({ message: "Post liked", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Create a Post
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

// 🔹 Delete a Post
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

module.exports = router;
