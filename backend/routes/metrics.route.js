const express = require('express')
const router = express.Router()
const { getMonthlyMetrics } = require('@/controllers/metrics.controller')
const { verifyJWTWithRole } = require('@/middleware')

router.get('/:year/:month', verifyJWTWithRole('admin'), getMonthlyMetrics)

module.exports = router
