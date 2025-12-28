import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        if (!name || !username || !password) {
            return res.status(400).json({ error: 'Name, username, and password are required' });
        }

        console.log('Attempting to register user:', { name, username });

        const user = new User({ name, username, password });
        await user.save();

        console.log('User registered successfully:', username);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation failed', details: err.message });
        }
        res.status(500).json({ error: 'Server error during registration' });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Use process.env.JWT_SECRET directly — loaded by dotenv in index.js
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,  // <-- directly from env, no const
            { expiresIn: '7d' }
        );

        res.json({
            token,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
};