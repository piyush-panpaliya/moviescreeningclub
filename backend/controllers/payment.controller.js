const QR = require('../models/qr.Model');
const moment = require('moment');

exports.check = async (req, res) => {
  try {
    const paymentId = req.body.paymentId;
    const payment = await QR.findOne({ paymentId });

    if (!payment) {
      res.json({ exists: false });
    } else {
      const currentDate = moment();
      const validityDate = moment(payment.validitydate, 'DD-MM-YYYY');

      if (currentDate.isAfter(validityDate)) {
        res.json({ exists: true, validityPassed: true,seatbooked:true, verified: false });
      }
      else if(!payment.used){
        res.json({ exists: true, validityPassed: false,seatbooked:false,verified: false });
      }
      else if(payment.verified){
        res.json({ exists: true, validityPassed: false,seatbooked:true,verified:true });
      }
      else {
          payment.verified = true;
          await payment.save();
          const expirationDate = new Date(payment.expirationDate);
          expirationDate.setHours(expirationDate.getHours() - 3);
          const formattedDate = `${expirationDate.getDate()}/${expirationDate.getMonth() + 1}/${expirationDate.getFullYear()}`;
          const formattedTime = `${String(expirationDate.getHours()).padStart(2, '0')}:${String(expirationDate.getMinutes()).padStart(2, '0')}`;
          res.json({ exists: true, validityPassed: false, seatbooked:true, verified:false, email: payment.email, showdate: formattedDate, showtime: formattedTime });
        }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
