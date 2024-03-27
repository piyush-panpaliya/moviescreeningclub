import express from 'express';
import signup from '../controllers/authController.js'; // Adjust the file extension as necessary
const router = express.Router();

router.post('/sign-up', signup);
export default router;
