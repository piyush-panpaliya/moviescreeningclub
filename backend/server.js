import express from "express";
import mongoose from 'mongoose';
import User from './userModel.js';
import http from 'http';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from "dotenv";
config({ path: "../screening/.env" });
const app = express();
import { createServer } from 'http';
const https = createServer(app);
app.use(cors());

mongoose.connect('mongodb+srv://aryanjain:qwertyuiop@msccluster.as7t56y.mongodb.net/?retryWrites=true&w=majority&appName=msccluster')

const PORT = 8000;

app.use(bodyParser.json());

app.post('/save-user', (req, res) => {
  const { email, paymentId } = req.body;
  const newUser = new User({email, paymentId});
  newUser.save()
    .then(savedUser => {
      console.log('User saved:', savedUser);
      res.status(200).json(savedUser);
    })
    .catch(error => {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Error saving user' });
    });
});

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
}); 