const express = require('express')
const router = express.Router()
const {
	fetchMembershipsByEmail,
	saveusermem,
	checkMembership,
	suspendMembership
} = require('@/controllers/user/memberships.controller')

router.get('/:email', fetchMembershipsByEmail)
router.post('/saveusermem', saveusermem)
router.get('/checkMembership/:email', checkMembership)
router.put('/suspend', suspendMembership)
module.exports = router
