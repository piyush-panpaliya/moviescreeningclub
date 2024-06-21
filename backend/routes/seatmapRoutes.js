const express = require('express')
const router = express.Router()
const {
	seatOccupancy,
	seatassign
} = require('@/controllers/seatmap.controller')

router.get('/seatmap/:showtimeId/seats', seatOccupancy)
router.put('/seatmap/:showtimeId/:seat', seatassign)
module.exports = router
