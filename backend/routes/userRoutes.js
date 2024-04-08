const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/fetchusers', UserController.fetchUsers);
router.post('/updateUserType', UserController.updateUserType);
router.get('/:email', UserController.userType);
module.exports = router;