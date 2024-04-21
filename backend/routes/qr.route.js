const express = require('express');
const QRController = require('../controllers/QR.controller');
const router = express.Router();

router.post('/saveQR', QRController.addQR);
router.post('/send-email',QRController.sendQR);
router.get('/:email', QRController.getValidQRs);
module.exports = router;