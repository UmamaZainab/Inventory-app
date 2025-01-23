const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false, // Tracks if the user's email is verified
    },
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

const User = mongoose.model('User', userSchema);
module.exports = User;
