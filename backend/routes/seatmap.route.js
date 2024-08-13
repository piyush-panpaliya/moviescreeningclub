const express = require('express')
const router = express.Router()
const {
  seatOccupancy,
  seatAssign,
  freepasses
} = require('@/controllers/seatmap.controller')
const { verifyJWTWithRole } = require('@/middleware')

router.get('/:showtimeId', verifyJWTWithRole(), seatOccupancy)
router.put('/:showtimeId', verifyJWTWithRole(), seatAssign)
router.get('/freepasses/:showtimeId', verifyJWTWithRole(), freepasses)
module.exports = router
