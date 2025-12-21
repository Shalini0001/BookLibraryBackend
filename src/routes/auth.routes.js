import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/firebase-login', async (req, res) => {
  const { firebaseUid, email, phone } = req.body;

  let user = await User.findOne({ firebaseUid });
  if (!user) {
    user = await User.create({ firebaseUid, email, phone });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token });
});

export default router;
