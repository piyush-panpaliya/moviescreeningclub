const QR = require('../models/qr.Model');
const moment = require('moment');

exports.check = async (req, res) => {
  try {
    const paymentId = req.body.paymentId;

    // Query the database to check if the payment ID exists
    const payment = await QR.findOne({ paymentId });

    if (!payment) {
      res.json({ exists: false });
    } else {
      const currentDate = moment();
      const validityDate = moment(payment.validitydate, 'DD-MM-YYYY');

      if (currentDate.isAfter(validityDate)) {
        res.json({ exists: true, validityPassed: true });
      } else {
        if (payment.used) {
          res.json({ exists: true, validityPassed: false, alreadyScanned: true });
        } else {
          payment.used = true;
          await payment.save();
          res.json({ exists: true, validityPassed: false, alreadyScanned: false, email: payment.email });
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
