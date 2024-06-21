// routes/authRoutes.js
const express = require('express')
const { login, update } = require('@/controllers/user/login.controller')
const router = express.Router()

router.post('/login', login)
router.post('/update', update)
module.exports = router
