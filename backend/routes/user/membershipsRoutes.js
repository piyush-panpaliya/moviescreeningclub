const express = require('express')
const router = express.Router()
const MembershipController = require('@/controllers/user/memberships.controller')

router.get('/:email', MembershipController.fetchMembershipsByEmail)
router.post('/saveusermem', MembershipController.saveusermem)
router.get('/checkMembership/:email', MembershipController.checkMembership)
router.put('/suspend', MembershipController.suspendMembership)
module.exports = router
