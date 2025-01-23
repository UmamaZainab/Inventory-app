const express = require('express');
const {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
} = require('../controllers/authController'); // Adjust path if necessary

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Verify email route
router.get('/verify-email', verifyEmail);

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route
router.post('/reset-password', resetPassword);

module.exports = router;
