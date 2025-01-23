const nodemailer = require('nodemailer');

// Create reusable transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or any email service (e.g., Outlook, Yahoo, etc.)
    auth: {
        user: 'mofco06@gmail.com', // Replace with your email
        pass: 'yfry eqey iqdl evjf',   // App password (not your actual password)
    },
});

// Send Email Function
const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: 'mofco06@gmail.com',
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed.');
    }
};

module.exports = { sendMail };
