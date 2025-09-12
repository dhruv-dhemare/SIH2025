const express = require('express');
const router = express.Router();
const Student = require('../schema/student');
const Post = require('../schema/post');        // Post collection
const EventPost = require('../schema/eventPost');  // EventPost collection
const { jwtAuthMiddleware, generateToken } = require('../jwt');
const nodemailer = require('nodemailer');
const multer = require('multer');


// 1. SIGNUP
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to store uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS  // Gmail App Password
  }
});

// POST /api/student/signup
router.post('/signup', upload.single('resume'), async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;

    // Validate required fields
    if (!data.name || !data.email || !data.password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // Check if email already exists
    const existing = await Student.findOne({ email: data.email });
    if (existing) return res.status(409).json({ error: "Email already exists." });

    // Auto-generate username: STD001, STD002, ...
    const count = await Student.countDocuments();
    data.username = `STD${String(count + 1).padStart(3, '0')}`;

    // Save resume path if uploaded
    if (file) data.resume = file.path;

    // Create student (password will be hashed via schema pre-save hook)
    const student = new Student(data);
    const savedUser = await student.save();

    // Generate JWT token
    const token = generateToken({ id: savedUser._id, role: "student" });

    // Send email to student with their username
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: savedUser.email,
      subject: "Welcome to Alumni Portal! Your Account Details",
      text: `Hello ${savedUser.name},

Your account has been successfully created.
Your login username is: ${savedUser.username}

Keep this username safe for future logins.

Thank you,
Team Alumni Portal`
    });

    res.status(201).json({ user: savedUser, token });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ error: "Email or username already exists." });
    res.status(500).json({ error: "Signup failed." });
  }
});

// 2. LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Student.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const payload = { id: user._id, role: "student" };
    const token = generateToken(payload);

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Invalid Data" });
  }
});

// 3. GET PROFILE
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const user = await Student.findById(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

// 4. UPDATE PROFILE INFO
router.put('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const updatedUser = await Student.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

// 5. CHANGE PASSWORD
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await Student.findById(req.user.id);

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    user.password = newPassword; // will be hashed by pre-save hook
    await user.save();

    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

//6. LIKE POST
router.post('/like/post/:postId', jwtAuthMiddleware, async (req, res) => {
  try {
    const user = await Student.findById(req.user.id);
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (!user.likedPosts.includes(postId)) {
      user.likedPosts.push(postId);
      post.likes += 1; // Increment likes in the Post
      await user.save();
      await post.save();
    }

    res.status(200).json({ likedPosts: user.likedPosts, likes: post.likes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

// 7. LIKE EVENT
router.post('/like/event/:eventId', jwtAuthMiddleware, async (req, res) => {
  try {
    const user = await Student.findById(req.user.id);
    const eventId = req.params.eventId;
    const event = await EventPost.findById(eventId);

    if (!event) return res.status(404).json({ error: "Event not found" });

    if (!user.likedEvents.includes(eventId)) {
      user.likedEvents.push(eventId);
      event.likes += 1; // Increment likes in the EventPost
      await user.save();
      await event.save();
    }

    res.status(200).json({ likedEvents: user.likedEvents, likes: event.likes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

module.exports = router;