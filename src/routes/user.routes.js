import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET user profile (Used by AuthContext to restore session)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE user profile (Used by RegisterUser screen)
router.post('/profile', authMiddleware, async (req, res) => {
  const { username, email, dob } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { username, email, dob, isProfileComplete: true },
      { new: true }
    );
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
});

export default router;