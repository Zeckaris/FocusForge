import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register
// Body: { name, username, password }
router.post('/register', register);

// POST /api/auth/login
// Body: { username, password }
router.post('/login', login);

export default router;