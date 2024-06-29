const express = require('express')
const {
  userOTP,
  userOTP1,
  sendOTP,
  sendOTPforgot
} = require('@/controllers/user/otp.controller')
const router = express.Router()
router.post('/user-otp', userOTP)
router.post('/user-otp1', userOTP1)
router.post('/send-otp', sendOTP)
router.post('/send-otp-forgot', sendOTPforgot)
module.exports = router
