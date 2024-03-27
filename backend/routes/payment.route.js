const express = require('express');
const paymentController = require('../controllers/payment.controller');
const router = express.Router();

router.post('/checkPayment', paymentController.check);
module.exports = router;