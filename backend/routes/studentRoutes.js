const express = require('express');
const router = express.Router();
const Student = require('../schema/student');
const Post = require('../schema/post');        // Post collection
const EventPost = require('../schema/eventPost');  // EventPost collection
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// 1. SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;

    // Count existing students
    const count = await Student.countDocuments();
    const username = `STD${String(count + 1).padStart(3, '0')}`; // STD001, STD002 ...

    // Attach auto-generated username
    data.username = username;

    const newUser = new Student(data);
    const response = await newUser.save();

    console.log("User registered:", response.username);

    const payload = { id: response._id, role: "student" };
    const token = generateToken(payload);

    res.status(200).json({ user: response, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Invalid Data" });
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

// LIKE POST
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

// LIKE EVENT
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