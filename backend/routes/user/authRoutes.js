// routes/authRoutes.js
const express = require('express')
const authController = require('@/controllers/user/auth.controller')
const router = express.Router()

router.post('/signup', authController.signup)
module.exports = router
