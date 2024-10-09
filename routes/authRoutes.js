import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

// Create an Express router for authentication routes
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;