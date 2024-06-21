const express = require('express')
const paymentController = require('@/controllers/payment.controller')
const router = express.Router()

router.post('/checkPayment', paymentController.check)
router.post('/tempPayment', paymentController.saveTempPayment)
router.get('/membershipData', paymentController.getMembershipData)
router.put('/confirmMembership/:id', paymentController.confirmMembership)
router.delete('/deleteMembership/:id', paymentController.deleteMembership)
module.exports = router
