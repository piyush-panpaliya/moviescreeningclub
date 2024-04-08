const express = require('express');
const router = express.Router();
const MembershipController = require('../controllers/membershipsController');

router.get('/:email', MembershipController.fetchMembershipsByEmail);
router.post('/saveusermem', MembershipController.saveusermem);
module.exports = router;