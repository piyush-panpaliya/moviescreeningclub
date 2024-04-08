const otpGenerator = require( 'otp-generator');
const OTP = require('../models/otp.Model');
const User = require('../models/userModel');

exports.userOTP=async (req, res) => {

  const { email} = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ error: "User already exists please login" });
      
    }
    res.status(200).json({ message: "User not found" });
  }
  catch(error){
    console.error("Error during fetch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.userOTP1=async (req, res) => {

  const { email} = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "Userfound" });
      
    }
    res.status(401).json({ error: "User not found please signup" });
  }
  catch(error){
    console.error("Error during fetch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    // await sendVerificationEmail(email.otp);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again later.',
    });
  }
};