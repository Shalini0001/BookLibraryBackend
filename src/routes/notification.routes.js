import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/save-fcm-token', authMiddleware, async (req, res) => {
  const { fcmToken } = req.body;

  await User.findByIdAndUpdate(req.userId, { fcmToken });

  res.json({ message: 'FCM token saved' });
});

export default router;
