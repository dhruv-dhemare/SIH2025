const express = require('express');
const router = express.Router();
const Student = require('../schema/student');
const Post = require('../schema/post');        
const EventPost = require('../schema/eventPost');  
const { jwtAuthMiddleware, generateToken } = require('../jwt');
const nodemailer = require('nodemailer');
const multer = require('multer');
const validator = require('validator'); // <-- added

// -------------------- Multer setup --------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // store uploaded files in a common folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Accept multiple fields: resume and profilePhoto
const upload = multer({ storage });
const uploadFields = upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'profilePhoto', maxCount: 1 },
]);

// -------------------- Nodemailer setup --------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// -------------------- Student Signup --------------------
router.post("/signup", uploadFields, async (req, res) => {
  try {
    const data = req.body;

    // Attach file paths
    if (req.files) {
      if (req.files.resume) data.resume = req.files.resume[0].path;
      if (req.files.profilePhoto) data.profilePhoto = req.files.profilePhoto[0].path;
    }

    // Validate required fields
    if (!data.name || !data.email || !data.password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // Validate email format
    if (!validator.isEmail(data.email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Check if email already exists
    const existing = await Student.findOne({ email: data.email });
    if (existing) return res.status(409).json({ error: "Email already exists." });

    // Auto-generate username STD001, STD002, ...
    const lastStudent = await Student.findOne().sort({ createdAt: -1 });
    let nextNumber = 1;
    if (lastStudent && lastStudent.username) {
      const lastNum = parseInt(lastStudent.username.replace("STD", ""));
      if (!isNaN(lastNum)) nextNumber = lastNum + 1;
    }
    data.username = `STD${String(nextNumber).padStart(3, "0")}`;

    // Create student instance
    const student = new Student(data);
    const savedStudent = await student.save();

    // Generate JWT
    const token = generateToken({ id: savedStudent._id, role: "student" });

    // Send welcome email (non-blocking)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: savedStudent.email,
        subject: "Welcome to Alumni Portal! Your Student Account Details",
        text: `Hello ${savedStudent.name},

Your student account has been successfully created.
Your login username is: ${savedStudent.username}

Keep this username safe for future logins.

Thank you,
Team Alumni Portal`,
      });
    } catch (emailErr) {
      console.error("Failed to send email:", emailErr);
    }

    // Respond without password
    const { password, ...studentData } = savedStudent.toObject();
    res.status(201).json({ message: "Signup successful", student: studentData, token });

  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email or username already exists." });
    }
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