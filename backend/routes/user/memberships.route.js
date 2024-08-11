const express = require('express')
const router = express.Router()
const {
  saveMembership,
  checkMembership,
  suspendMembership,
  requestMembership
} = require('@/controllers/user/memberships.controller')
const { verifyJWTWithRole } = require('@/middleware')

router.post('/redirect', saveMembership)
router.post('/request', verifyJWTWithRole('standard'), requestMembership)
router.get('/check', verifyJWTWithRole('standard'), checkMembership)
// router.put('/suspend/:id', verifyJWTWithRole('standard'), suspendMembership)
module.exports = router
