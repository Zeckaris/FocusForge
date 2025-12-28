import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to request (we only need userId for goals)
        req.user = { userId: decoded.userId };

        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ error: 'Not authorized, invalid token' });
    }
};