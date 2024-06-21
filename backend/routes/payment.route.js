const express = require('express')
const {
	check,
	saveTempPayment,
	getMembershipData,
	confirmMembership,
	deleteMembership
} = require('@/controllers/payment.controller')
const router = express.Router()

router.post('/checkPayment', check)
router.post('/tempPayment', saveTempPayment)
router.get('/membershipData', getMembershipData)
router.put('/confirmMembership/:id', confirmMembership)
router.delete('/deleteMembership/:id', deleteMembership)
module.exports = router
