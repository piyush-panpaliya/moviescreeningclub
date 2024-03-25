import express from "express";
import mongoose from 'mongoose';
import { User, Volunteer, Admin } from './userModel.js';
import QR from './userModel.js';
//import User from './userModel.js';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from "dotenv";
config({ path: "../screening/.env" });
const app = express();
import { createServer } from 'http';
const https = createServer(app);
app.use(cors());

mongoose.connect('mongodb+srv://aryanjain:qwertyuiop@msccluster.as7t56y.mongodb.net/?retryWrites=true&w=majority&appName=msccluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

const PORT = 8000;

app.use(bodyParser.json());

app.post('/saveQR', (req, res) => {
  const { email, paymentId } = req.body;
  const newQR= new QR({email,paymentId});
  newQR.save()
    .then(savedQR => {
      console.log('QR details saved:', savedQR);
      res.status(200).json(savedQR);
    })
    .catch(error => {
      console.error('Error saving QR:', error);
      res.status(500).json({ error: 'Error saving QR' });
    });
});

app.post('/send-email', (req, res) => {
  const { email, paymentId, Qr } = req.body;

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Using environment variables for email and password
      pass: process.env.PASSWORD
    }
  });
  // Email content 
  var qrcode=Qr;
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Payment Successful',
    text: `Your payment was successful. Payment ID: ${paymentId}`,
    attachments:[
      {
        filename:'Qr.jpg',
        content: qrcode.split("base64,")[1],
        encoding:'base64'
      }
    ]
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


app.post('/signup',(req, res) => {
  console.log('pahunch rha h')
  const { name, phoneNumber,designation, email, password } = req.body;
  const newUser = new User({name,phoneNumber,designation,email,password});
  newUser.save()
    .then(savedUser => {
      console.log('User details saved:', savedUser);
      res.status(200).json(savedUser);
    })
    .catch(error => {
      console.error('Error saving User:', error);
      res.status(500).json({ error: 'Error saving User' });
    });
    })

app.post('/checkPayment', async (req, res) => {
  try {
    const payment_Id = req.body.paymentId;

    // Query the database to check if the payment ID exists
    const payment = await QR.findOne({ paymentId: payment_Id });

    if (payment) {
      // Payment ID exists in the database
      res.json({ exists: true });
    } else {
      // Payment ID does not exist in the database
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 