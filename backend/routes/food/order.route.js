const express = require('express')
const router = express.Router()
const {
  createOrder,
  getOrders,
  confirmOrder,
  verifyOtp
} = require('@/controllers/food/order.controller')
const { verifyJWTWithRole } = require('@/middleware')

router.post('/', verifyJWTWithRole(), createOrder)
router.post('/redirect', confirmOrder)
router.get('/', verifyJWTWithRole(), getOrders)
router.post('/verify', verifyJWTWithRole('ticketvolunteer'), verifyOtp)

module.exports = router
