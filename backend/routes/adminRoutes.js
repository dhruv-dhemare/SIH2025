const express = require('express');
const router = express.Router();
const Admin = require('../schema/admin');
const Post = require('../schema/post');        // Post collection
const EventPost = require('../schema/eventPost');  // EventPost collection
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// ------------------ 1. ADMIN SIGNUP (auto username ADMxxx) ------------------
const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    if (!data.password) return res.status(400).json({ error: "Password required" });
    if (!data.email) return res.status(400).json({ error: "Email required" });

    // Auto-generate unique username
    const count = await Admin.countDocuments();
    data.username = `ADM${String(count + 1).padStart(3, "0")}`;

    const admin = new Admin(data);
    await admin.save();  // password gets hashed by pre-save hook

    const token = generateToken({ id: admin._id, role: "admin" });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: admin.email,
        subject: "Welcome Admin - Your Account Details",
        text: `Hello ${admin.name},

Your admin account has been created successfully.

Login details:
Username: ${admin.username}
Email: ${admin.email}

Keep this information safe.

Thank you,
Team Alumni Portal`,
      });
    } catch (mailErr) {
      console.error("Email failed:", mailErr);
      // still return success; email failure is non-fatal
    }

    res.status(201).json({
      message: "Admin signup successful",
      admin: {
        id: admin._id,
        name: admin.name,
        username: admin.username,
        email: admin.email
      },
      token,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) { // duplicate key error
      return res.status(409).json({ error: "Email or username already exists" });
    }
    res.status(500).json({ error: "Server Error" });
  }
});


// ------------------ 2. LOGIN ------------------
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = generateToken({ id: admin._id, role: 'admin' });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Server Error' });
  }
});

// ------------------ 3. CHANGE PASSWORD ------------------
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.user.id);

    if (!(await admin.comparePassword(currentPassword))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    admin.password = newPassword; // hashed via pre-save hook
    await admin.save();

    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Server Error' });
  }
});



// ------------------ 5. CREATE POST ------------------
router.post('/post', jwtAuthMiddleware, async (req, res) => {
  try {
    console.log("===== POST REQUEST RECEIVED =====");
    console.log("Request body:", req.body);
    console.log("User from JWT:", req.user);

    // Find user based on role
    let user;
    let userType;
    const prefix = req.user.role === 'admin' ? 'ADM' : req.user.username?.substring(0,3);

    switch (prefix) {
      case 'ADM':
        user = await Admin.findById(req.user.id);
        userType = 'College Administrator';
        break;
      case 'ALU':
        user = await Alumni.findById(req.user.id);
        userType = 'Alumni';
        break;
      case 'FAC':
        user = await Faculty.findById(req.user.id);
        userType = 'Faculty';
        break;
      case 'REC':
        user = await Recruiter.findById(req.user.id);
        userType = 'Recruiter';
        break;
      default:
        return res.status(400).json({ error: "Invalid user prefix" });
    }

    if (!user) {
      console.log("User not found!");
      return res.status(404).json({ err: "User not found" });
    }
    console.log(`${userType} found:`, user.username);

    const postData = {
      ...req.body,
      author: user._id,
      userType: userType,
      createdAt: new Date()
    };
    console.log("Post data to be saved:", postData);

    const post = await Post.create(postData);
    console.log("Post created with ID:", post._id);

    // Add reference in user.posts
    user.posts.push(post._id);
    await user.save();
    console.log("Post ID added to user's posts array");

    res.status(201).json({ post });

  } catch (err) {
    console.error("Error in /post route:", err);
    res.status(500).json({ err: 'Server Error' });
  }
});



// ------------------ 6. DELETE POST ------------------
router.delete('/post/:postId', jwtAuthMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ err: "Post not found" });
    }

    // Find the user attempting deletion
    const user = await Admin.findById(req.user.id); // assuming only admins are allowed for ADMXXX check
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    const prefix = user.username.substring(0, 3);

    // Authorization check: either author OR admin
    if (post.author.toString() !== user._id.toString() && prefix !== "ADM") {
      return res.status(403).json({ err: "You are not authorized to delete this post" });
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    // Remove reference from the original author's posts array
    await Admin.findByIdAndUpdate(post.author, { $pull: { posts: postId } });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error in /post DELETE route:", err);
    res.status(500).json({ err: 'Server Error' });
  }
});



// ------------------ 7. LIKE POST ------------------
router.post('/like/post/:postId', jwtAuthMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const admin = await Admin.findById(req.user.id);
    const postId = req.params.postId;
    admin.likedPosts.push(postId);
    await admin.save();
    post.likes += 1;
    await post.save();

    res.status(200).json({ likes: post.likes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Server Error' });
  }
});



// ------------------ 8. CREATE EVENT ------------------
router.post('/event', jwtAuthMiddleware, async (req, res) => {
  try {
    const user = await Admin.findById(req.user.id); // can be Admin or Club
    if (!user) return res.status(404).json({ err: "User not found" });

    // Authorization check: only ADMXXX or CLBXXX can create
    const prefix = user.username.substring(0, 3);
    if (prefix !== "ADM" && prefix !== "CLB") {
      return res.status(403).json({ err: "You are not authorized to create an event" });
    }

    const userType = prefix === "ADM" ? "College Administrator" : "Club";

    const eventData = {
      ...req.body,
      author: user._id,
      userType: userType,
      createdAt: new Date()
    };

    const event = await EventPost.create(eventData);

    // Add reference in user's events array
    if (!user.events) user.events = [];
    user.events.push(event._id);
    await user.save();

    res.status(201).json({ event });
  } catch (err) {
    console.error("Error in /event route:", err);
    res.status(500).json({ err: 'Server Error' });
  }
});

// ------------------ 9. DELETE EVENT ------------------
router.delete('/event/:eventId', jwtAuthMiddleware, async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event
    const event = await EventPost.findById(eventId);
    if (!event) {
      return res.status(404).json({ err: "Event not found" });
    }

    // Find the user attempting deletion
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    const prefix = user.username.substring(0, 3);

    // Authorization check: either author OR admin
    if (event.author.toString() !== user._id.toString() && prefix !== "ADM") {
      return res.status(403).json({ err: "You are not authorized to delete this event" });
    }

    // Delete the event
    await EventPost.findByIdAndDelete(eventId);

    // Remove reference from user's events array
    await Admin.findByIdAndUpdate(event.author, { $pull: { events: eventId } });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error in /event DELETE route:", err);
    res.status(500).json({ err: 'Server Error' });
  }
});



// ------------------ 10. LIKE EVENT ------------------
router.post('/like/event/:eventId', jwtAuthMiddleware, async (req, res) => {
  try {
    const event = await EventPost.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const user = await Admin.findById(req.user.id);
    const eventId = req.params.eventId;
    user.likedEvents.push(eventId);
    await user.save();
    event.likes += 1;
    await event.save();

    res.status(200).json({ likes: event.likes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Server Error' });
  }
});

// ------------------ 11. GET ADMIN PROFILE ------------------
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password'); // exclude password
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ admin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Server Error' });
  }
});

module.exports = router;
