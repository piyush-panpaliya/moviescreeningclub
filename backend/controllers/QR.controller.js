const QR = require('../models/qr.Model');
const nodemailer= require( "nodemailer");
const moment = require('moment');

exports.addQR= (req, res) => {
  const { email, paymentId, validity, memtype } = req.body;
  const newQR = new QR({ email, paymentId, validity, memtype });
  newQR.save()
    .then((savedQR) => {
      console.log("QR details saved:", savedQR);
      res.status(200).json(savedQR);
    })
    .catch((error) => {
      console.error("Error saving QR:", error);
      res.status(500).json({ error: "Error saving QR" });
    });
};

exports.sendQR= (req, res) => {
  const { email, membership, paymentId, qrCodes } = req.body;

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Using environment variables for email and password
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Payment Successful",
    text: `Your payment was successful for ${membership} membership`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
};

exports.getValidQRs = async (req, res) => {
  const { email } = req.params;
  try {
    const today = new Date();
    const validQRs = [];
    const allQRs = await QR.find({ email: email });

    allQRs.forEach((qr) => {
      // Extract date components from validitydate string
      const parts = qr.validitydate.split('-');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
      const year = parseInt(parts[2], 10);
      
      // Construct Date object
      const validityDate = new Date(year, month, day);

      // Check if validity date is after current date
      if (validityDate > today) {
        validQRs.push(qr);
      }
    });
    res.status(200).json({ qrCodes: validQRs });
  } catch (error) {
    console.error('Error fetching valid QR codes:', error);
    res.status(500).json({ error: 'Error fetching valid QR codes' });
  }
};

exports.markQRUsed = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { date, showtime } = req.body; // Retrieve date and showtime from request body

    // Find the QR object based on the paymentId
    const qr = await QR.findOne({ paymentId });

    // If QR object not found, return 404 Not Found error
    if (!qr) {
      return res.status(404).json({ error: 'QR not found' });
    }

    // Parse date and showtime to construct expiration time
    const expirationTime = moment(`${date} ${showtime}`, 'DD-MM-YYYY hh:mm A').add({ hours: 8, minutes: 30 });
    console.log(expirationTime);
    // Update the 'used' field of the QR object
    qr.used = true;

    // Set the expiration date for the QR
    qr.expirationDate = expirationTime;
    console.log(expirationTime);

    // Save the updated QR object back to the database
    await qr.save();

    // Respond with success message and showtime & date
    res.status(200).json({ 
      message: 'QR marked as used successfully', 
      showtime: showtime, 
      date: date 
    });
  } catch (error) {
    console.error('Error marking QR as used:', error);
    res.status(500).json({ error: 'Error marking QR as used' });
  }
};


exports.isQRUsed = async (req, res) => {
  const paymentId = req.params.paymentId;

  try {
    // Find the QR data based on paymentId
    const qrData = await QR.findOne({ paymentId });

    if (!qrData) {
      // If QR data does not exist for the given paymentId, send 404 Not Found
      return res.status(404).json({ error: 'QR data not found' });
    }

    // Check if the validity date is after the current date
    // const currentDate = new Date();
    // const validityDate = new Date(qrData.validitydate);

    // if (validityDate.toISOString() <= currentDate.toISOString()) {
    // // If the validity date is not after the current date, send a 400 error response
    // return res.status(400).json({ error: 'QR data has expired' });
    // }

    // Check if the QR data is used
    if (qrData.used) {
      // If QR data is already used, send a message indicating that it's used
      return res.status(400).json({ message: 'QR data already used' });
    }

    // If QR data exists, is valid, and not used, send the QR data
    res.json(200);
  } catch (error) {
    // If there's an error, send 500 Internal Server Error
    console.error('Error fetching QR data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.areallQRUsed = async (req, res) => {
  const { email } = req.params;
  try {
    const today = new Date();
    const validQRs = [];
    const allQRs = await QR.find({ email: email });

    allQRs.forEach((qr) => {
      // Extract date components from validitydate string
      const parts = qr.validitydate.split('-');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
      const year = parseInt(parts[2], 10);
      
      // Construct Date object
      const validityDate = new Date(year, month, day);

      // Check if validity date is after current date
      if (validityDate > today) {
        validQRs.push(qr);
      }
    });
    const allUsed = validQRs.every(qr => qr.used);
    if (allUsed) {
      // If all valid QRs are used, return success response
      console.log('All valid QRs are already used');
      res.status(200).json({ message: 'All valid QRs are already used' });
    } else {
      // If any valid QRs are not used, return 200 status with a custom message
      console.log('All valid QRs are not already used');
      res.status(200).json({ message: 'Some valid QRs are not used yet' });
    }
  } catch (error) {
    console.error('Error fetching valid QR codes:', error);
    res.status(500).json({ error: 'Error fetching valid QR codes' });
  }
};



exports.sendEmail = async (req, res) => {
  const { email, seatNumber} = req.body;

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
      text: `Your seat has been successfully booked. Seat Number: ${seatNumber}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
