// routes/authRoutes.js
const express = require('express')
const { signup } = require('@/controllers/user/auth.controller')
const router = express.Router()

router.post('/signup', signup)
module.exports = router
