const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const clubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true },
    phn: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    headline: { type: String },
    about: { type: String },
    urls: { type: [String], default: [] },
    events: { type: [String], default: [] },
    locations: { type: [String], default: [] }
}, { timestamps: true });

clubSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

clubSchema.methods.comparePassword = async function (pw) {
    return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('Club', clubSchema);
