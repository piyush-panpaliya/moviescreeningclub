const express = require('express');
const paymentController = require('../controllers/payment.controller');
const router = express.Router();

router.post('/checkPayment', paymentController.check);
router.post('/tempPayment', paymentController.temp);
module.exports = router;