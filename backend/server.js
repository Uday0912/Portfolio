const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const emailConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);
if (!emailConfigured) {
  console.warn('⚠️  EMAIL_USER / EMAIL_PASSWORD not set. Contact form will return 503 until configured.');
} else {
  console.log('✅ Environment variables loaded');
  console.log(`📧 Email: ${process.env.EMAIL_USER}`);
}

function withTimeout(promise, ms, label) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`${label} (timeout after ${ms}ms)`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

// Configure nodemailer
const transporter = emailConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true').toLowerCase() === 'true',
      auth: {
        user: process.env.EMAIL_USER.trim(),
        pass: process.env.EMAIL_PASSWORD.trim(),
      },
      connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT_MS || 10000),
      greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT_MS || 10000),
      socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT_MS || 15000),
    })
  : null;

if (transporter) {
  transporter.verify((error) => {
    if (error) {
      console.error('❌ Email verification failed:', error.message);
    } else {
      console.log('✅ Email server ready!');
    }
  });
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    if (!transporter) {
      return res.status(503).json({
        success: false,
        error: 'Email service not configured',
        details: 'Set EMAIL_USER and EMAIL_PASSWORD in backend .env, then restart the server.',
      });
    }

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

    await withTimeout(
      transporter.sendMail(mailOptions),
      Number(process.env.SENDMAIL_TIMEOUT_MS || 20000),
      'Failed to send email (connection timeout)'
    );

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

    await withTimeout(
      transporter.sendMail(confirmationEmail),
      Number(process.env.SENDMAIL_TIMEOUT_MS || 20000),
      'Failed to send confirmation email (connection timeout)'
    );

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
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
