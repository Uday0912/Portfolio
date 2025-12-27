const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error('❌ ERROR: Missing EMAIL_USER or EMAIL_PASSWORD in .env file');
  console.error('Please create a .env file with:');
  console.error('  EMAIL_USER=your-email@gmail.com');
  console.error('  EMAIL_PASSWORD=your-app-password');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log(`📧 Email: ${process.env.EMAIL_USER}`);

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER.trim(),
    pass: process.env.EMAIL_PASSWORD.trim(),
  },
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email verification failed:', error.message);
  } else {
    console.log('✅ Email server ready!');
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { from_name, reply_to, message } = req.body;

    // Validation
    if (!from_name || !reply_to || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your email
      replyTo: reply_to,
      subject: `New Contact Form Submission from ${from_name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${from_name}</p>
        <p><strong>Email:</strong> ${reply_to}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: reply_to,
      subject: 'We received your message',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${from_name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Parsha Uday</p>
      `,
    };

    await transporter.sendMail(confirmationEmail);

    res.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
