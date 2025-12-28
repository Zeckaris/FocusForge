import express from 'express';
import { createGoal, getActiveGoal } from '../controllers/goalController.js';

const router = express.Router();

// POST /api/goals - Create new goal (protected)
router.post('/', createGoal);

// GET /api/goals/active - Get user's active goal (protected)
router.get('/active', getActiveGoal);

export default router;