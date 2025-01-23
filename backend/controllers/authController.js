const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Your User model
const { sendMail } = require('../services/mailService');

// Register User
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const verificationToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;
        await sendMail(
            email,
            'Verify Your Email',
            `Click the link to verify your email: ${verificationLink}`
        );

        res.status(200).json({ message: 'User registered. Verify your email to log in.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during registration.' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, message: 'Login successful.' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};


// Verify Email
exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOneAndUpdate(
            { email: decoded.email },
            { isVerified: true },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ message: 'Invalid token.' });
        }

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid or expired token.' });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const resetToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        await sendMail(
            email,
            'Reset Your Password',
            `Click the link to reset your password: ${resetLink}`
        );

        res.status(200).json({ message: 'Password reset link sent.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending reset link.' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate(
            { email: decoded.email },
            { password: hashedPassword },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid or expired token.' });
    }
};
