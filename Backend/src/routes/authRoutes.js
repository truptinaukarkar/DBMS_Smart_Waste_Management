import express from 'express';
import { loginUser, registerUser, getUserById } from '../services/authService.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const user = await registerUser(name, email, password, role);
    
    return res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const response = await loginUser(email, password);
    
    return res.status(200).json({
      message: 'Login successful',
      user: response.user,
      token: response.token
    });
  } catch (error) {
    res.status(401).json({ error: error.message || 'Login failed' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = await updateUserProfile(req.user.userId, name, email);
    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
