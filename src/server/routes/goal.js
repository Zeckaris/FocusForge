import express from 'express';
import { createGoal, getActiveGoal, updateMilestone, getCompletedGoals } from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protection to all goal routes
router.use(protect);

// POST /api/goals - Create new goal
router.post('/', createGoal);

// GET /api/goals/active - Get user's active goal
router.get('/active', getActiveGoal);

// PUT /api/goals/:goalId/milestone/:milestoneIndex - Mark milestone as done
router.put('/:goalId/milestone/:milestoneIndex', updateMilestone);

// GET /api/goals/completed - Get user's completed goals
router.get('/completed', getCompletedGoals);

export default router;