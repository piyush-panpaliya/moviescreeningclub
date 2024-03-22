/*import express from "express";
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from "dotenv";
config({ path: "../screening/.env" });
const app = express();
app.use(cors());
const PORT = 8000;
console.log(process.env.EMAIL)
// Middleware
app.use(bodyParser.json());
// POST endpoint for sending emails
app.post('/send-email', (req, res) => {
  const { email, paymentId } = req.body;

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Using environment variables for email and password
      pass: process.env.PASSWORD
    }
  });
  console.log(email);
  console.log(paymentId);
  // Email content 
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Payment Successful',
    text: `Your payment was successful. Payment ID: ${paymentId}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); */

// server.js

import express from "express";
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from "dotenv";
import QRCode from 'qrcode';

config({ path: "../screening/.env" });

const app = express();
app.use(cors());
const PORT = 8000;

// Middleware
app.use(bodyParser.json());

// POST endpoint for sending emails
app.post('/send-email', async (req, res) => {
  const { email, paymentId } = req.body;

  // Generate QR code
  const qrCode = await generateQRCode(paymentId);

  // Send email with QR code attachment
  try {
    const info = await sendEmailWithQRCode(email, qrCode);
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

// Function to generate QR code
const generateQRCode = async (text) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

// Function to send email with QR code attachment
const sendEmailWithQRCode = async (email, qrCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Payment Successful',
    html: `<p>Your payment was successful. Please find the QR code attached:</p><br/><img src="data:image/png;base64,${qrCode}"/>`
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

