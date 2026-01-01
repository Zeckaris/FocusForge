import Goal from '../models/Goal.js';
import jwt from 'jsonwebtoken';

// Helper to get userId from token (used in multiple places)
const getUserIdFromToken = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    } catch (err) {
        return null;
    }
};

// Create a new goal
export const createGoal = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
        }

        const { title, description, milestones } = req.body;

        if (!title || !milestones || milestones.length < 3 || milestones.length > 7) {
            return res.status(400).json({
                error: 'Title and 3–7 milestones are required',
            });
        }

        // Optional: Enforce one active goal per user
        const existingActive = await Goal.findOne({ userId, isActive: true });
        if (existingActive) {
            return res.status(400).json({ error: 'Only one active goal allowed at a time' });
        }

        const goal = new Goal({
            userId,
            title,
            description: description || '',
            milestones: milestones.map(text => ({ text })),
        });

        await goal.save();

        res.status(201).json({
            message: 'Goal created successfully',
            goal,
        });
    } catch (err) {
        console.error('Goal creation error:', err);
        res.status(500).json({ error: 'Server error during goal creation' });
    }
};

// Get active goal for user (for dashboard later)
export const getActiveGoal = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const goal = await Goal.findOne({ userId, isActive: true });
        if (!goal) {
            return res.status(404).json({ error: 'No active goal found' });
        }

        res.json(goal);
    } catch (err) {
        console.error('Get goal error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a specific milestone as done
export const updateMilestone = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { goalId, milestoneIndex } = req.params;
        const index = parseInt(milestoneIndex);

        const goal = await Goal.findOne({ _id: goalId, userId });
        if (!goal || !goal.isActive) {
            return res.status(404).json({ error: 'Active goal not found' });
        }

        if (index < 0 || index >= goal.milestones.length || goal.milestones[index].done) {
            return res.status(400).json({ error: 'Invalid milestone' });
        }

        // Mark milestone as done and record timestamp
        goal.milestones[index].done = true;
        goal.milestones[index].completedAt = new Date();

        // === CR-002: Streak Counter Logic Start ===
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day (ignore time)

        const lastDate = goal.lastActivityDate;
        if (lastDate) {
            const lastDay = new Date(lastDate);
            lastDay.setHours(0, 0, 0, 0);

            const diffDays = Math.floor((today - lastDay) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Consecutive day: increment streak
                goal.streak += 1;
            } else if (diffDays > 1) {
                // Gap of more than one day: reset streak to 1
                goal.streak = 1;
            }
            // else: same day → streak unchanged
        } else {
            // First milestone ever completed
            goal.streak = 1;
        }

        goal.lastActivityDate = today;
        // === CR-002: Streak Counter Logic End ===

        // Check if all milestones are completed
        const allDone = goal.milestones.every(m => m.done);
        if (allDone) {
            goal.isActive = false;
            goal.completedAt = new Date();
        }

        await goal.save();

        res.json(goal);
    } catch (err) {
        console.error('Update milestone error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all completed goals for the user
export const getCompletedGoals = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const goals = await Goal.find({ userId, isActive: false }).sort({ completedAt: -1 });

        res.json(goals);
    } catch (err) {
        console.error('Get completed goals error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
