const express = require('express')
const router = express.Router()
const {
	fetchUsers,
	updateUserType,
	userType
} = require('@/controllers/user/user.controller')

router.get('/fetchusers', fetchUsers)
router.post('/updateUserType', updateUserType)
router.get('/:email', userType)
module.exports = router
