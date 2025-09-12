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

// POST /api/recruiter/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phn, headline, about, urls = [], posts = [], locations = [] } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // ✅ Check if email already exists
    const existing = await Recruiter.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already exists." });

    // ✅ Auto-generate username: REC001, REC002, ...
    const count = await Recruiter.countDocuments();
    const username = `REC${String(count + 1).padStart(3, "0")}`;

    // ✅ Create recruiter instance WITHOUT manual hashing
    const recruiter = new Recruiter({
      name,
      username,
      email,
      password, // schema will hash automatically
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

    // ✅ Send email
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

    res.status(201).json({
      message: "Recruiter signup successful",
      recruiter: savedRecruiter,
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
