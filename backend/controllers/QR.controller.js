const QR = require('../models/qr.Model');
const nodemailer= require( "nodemailer");

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
    text: `Your payment was successful. Membership: ${membership}`,
    attachments: qrCodes.map((qrCodeData, index) => ({
      filename: `QR_${index + 1}.jpg`,
      content: qrCodeData.split("base64,")[1],
      encoding: "base64",
    })),
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

