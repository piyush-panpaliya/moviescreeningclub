const OTPQR = require('../models/otpQRModel');
const nodemailer = require('nodemailer');

exports.saveOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const newOTPQR = new OTPQR({ email, otp });
    await newOTPQR.save();
    res.status(201).json({ message: 'OTP saved successfully' });
  } catch (error) {
    console.error('Error saving OTP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.sendEmail = async (req, res) => {
  const { email, seatNumber, otp } = req.body;

  try {
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
      subject: 'Seat Booking Confirmation',
      text: `Your seat has been successfully booked. Seat Number: ${seatNumber}. OTP: ${otp}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
