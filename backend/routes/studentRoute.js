const express = require('express');
const router = express.Router();
const User = require('../schema/student');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);

        const response = await newUser.save();
        console.log("Data Saved");

        const payload = {
            id: response.id,
            role: response.role
        }

        const token = generateToken(payload);
        console.log("Token is:", token);

        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Invalid Data" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { aadhar, password } = req.body;
        const user = await User.findOne({ aadhar: aadhar });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid aadhar or password' });
        }

        const payload = {
            id: user.id,
            role: user.role
        }

        const token = generateToken(payload);
        console.log("Token is:", token);

        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Invalid Data" });
    }
});

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
});

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if (!(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        user.password = newPassword;
        await user.save();

        console.log('Password updated');
        res.status(200).json({ message: "Password updated" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
});

module.exports = router;
