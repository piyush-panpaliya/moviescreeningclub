// routes/authRoutes.js
const express = require('express');
const loginController = require('../controllers/login.controller');
const router = express.Router();

router.post('/login', loginController.login);
router.post('/update',loginController.update);
module.exports = router;