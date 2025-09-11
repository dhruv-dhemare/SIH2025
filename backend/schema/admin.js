const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const collegeAdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true },
    phn: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    headline: { type: String },
    about: { type: String },
    urls: { type: [String], default: [] },
    posts: { type: [String], default: [] },
    events: { type: [String], default: [] },
    locations: { type: [String], default: [] },
    // Likes
        likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        likedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
}, { timestamps: true });

collegeAdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

collegeAdminSchema.methods.comparePassword = async function (pw) {
    return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('Admin', collegeAdminSchema);
