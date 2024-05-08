const QR = require("../models/qr.Model");
const TempSchema=require('../models/tempModel');
const moment = require("moment");

exports.check = async (req, res) => {
  try {
    const paymentId = req.body.paymentId;
    const payment = await QR.findOne({ paymentId });

    if (!payment) {
      res.json({ exists: false });
    } else {
      const currentDate = moment();
      const validityDate = moment(payment.validitydate, "DD-MM-YYYY");

      if (currentDate.isAfter(validityDate)) {
        res.json({
          exists: true,
          validityPassed: true,
          seatbooked: true,
          verified: false,
        });
      } else if (!payment.used) {
        res.json({
          exists: true,
          validityPassed: false,
          seatbooked: false,
          verified: false,
        });
      } else if (payment.verified) {
        res.json({
          exists: true,
          validityPassed: false,
          seatbooked: true,
          verified: true,
        });
      } else {
        payment.verified = true;
        await payment.save();
        const expirationDate = new Date(payment.expirationDate);
        expirationDate.setHours(expirationDate.getHours() - 8);
        expirationDate.setMinutes(expirationDate.getMinutes() - 30);
        
        const formattedDate = `${expirationDate.getDate()}/${expirationDate.getMonth() + 1}/${expirationDate.getFullYear()}`;
        const formattedTime = `${String(expirationDate.getHours()).padStart(2, '0')}:${String(expirationDate.getMinutes()).padStart(2, '0')}`;
        

        res.json({
          exists: true,
          validityPassed: false,
          seatbooked: true,
          verified: false,
          email: payment.email,
          seat: payment.seatnumber,
          name: payment.name,
          showdate: formattedDate,
          showtime: formattedTime,
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.saveTempPayment = async (req, res) => {
  try {
    const temp = new TempSchema({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      designation: req.body.designation,
      email: req.body.email,
      usertype: req.body.usertype,
      transactionId: req.body.transactionId
    });

    await temp.save();

    res.status(201).json({ message: 'Information saved successfully' });
  } catch (error) {
    console.error('Error saving information:', error);
    res.status(500).json({ message: 'An error occurred while saving information' });
  }
};