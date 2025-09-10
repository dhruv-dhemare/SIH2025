const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true },
    phn: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    headline: { type: String },
    about: { type: String },
    experience: { type: [String], default: [] },
    education: { type: [String], default: [] },
    certification: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    urls: { type: [String], default: [] },
    resume: { type: String },
    posts: { type: [String], default: [] },
    locations: { type: [String], default: [] }
}, { timestamps: true });

teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

teacherSchema.methods.comparePassword = async function (pw) {
    return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('Teacher', teacherSchema);
