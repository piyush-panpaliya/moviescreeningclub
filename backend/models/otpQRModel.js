const mongoose = require('mongoose');

const otpQRSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("OTPQR", otpQRSchema);
