const express = require('express')
const router = express.Router()

const votepagerouter = require('@/routes/voteroute')
const membershipRouter = require('@/routes/user/memberships.route')
const userRouter = require('@/routes/user/user.route')
const authRouter = require('@/routes/user/auth.route')
const otpRouter = require('@/routes/user/otp.route')
const SeatMapRouter = require('@/routes/seatmap.route')
const movieRouter = require('@/routes/movies.route')
const qrRouter = require('@/routes/qr.route')
const metricsRouter = require('@/routes/metrics.route')
const orderRouter = require('@/routes/food/order.route')
const foodRouter = require('@/routes/food/food.route')

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/otp', otpRouter)

router.use('/QR', qrRouter)
router.use('/movie', movieRouter)
router.use('/seatmap', SeatMapRouter)
router.use('/membership', membershipRouter)
router.use('/vote', votepagerouter)
router.use('/metrics', metricsRouter)
router.use('/order', orderRouter)
router.use('/food', foodRouter)

module.exports = router
