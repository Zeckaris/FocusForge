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