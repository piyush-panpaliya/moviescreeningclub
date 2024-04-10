const QR = require('../models/qr.Model');

exports.check= async (req, res) => {
  try {
    const paymentId = req.body.paymentId;

    // Query the database to check if the payment ID exists
    const payment = await QR.findOne({ paymentId });

    if (!payment) {
      res.json({ exists: false });
    } else {
      const currentDate = new Date();
      const validityDate = new Date(payment.validitydate);

      if (currentDate > validityDate) {
        res.json({ exists: true, validityPassed: true });
      } else {
        if (payment.used) {
          res.json({ exists: true, validityPassed: false, alreadyScanned: true });
        } else {
          payment.used = true;
          await payment.save();
          res.json({ exists: true, validityPassed: false, alreadyScanned: false });
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};