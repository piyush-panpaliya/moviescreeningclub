const express = require('express')
const {
	addQR,
	sendQR,
	getValidQRs,
	markQRUsed,
	isQRUsed,
	sendEmail,
	areallQRUsed
} = require('@/controllers/QR.controller')
const router = express.Router()

router.post('/saveQR', addQR)
router.post('/send-email', sendQR)
router.get('/:email', getValidQRs)
router.put('/markUsed/:paymentId/:seat', markQRUsed)
router.get('/qrData/:paymentId', isQRUsed)
router.post('/sendEmail', sendEmail)
router.post('/areallQRused/:email', areallQRUsed)
module.exports = router
