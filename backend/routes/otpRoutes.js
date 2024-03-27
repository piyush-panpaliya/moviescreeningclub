import express from 'express';
import sendOTP from '../controllers/otpController.js'; // Adjust the file extension as necessary

const router = express.Router();

router.post('/send-otp', sendOTP);

export default router;