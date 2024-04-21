const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpQRcontroller');

router.post('/saveOTP', otpController.saveOTP);
router.post('/sendEmail', otpController.sendEmail);

module.exports = router;
