import express from 'express';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/firebase-login', async (req, res) => {
  const { firebaseUid, phone, flow } = req.body;

  try {
    let user = await User.findOne({ firebaseUid });

    // If user exists and is fully registered, but they are trying to "Sign Up"
    if (user && user.username && flow === 'signup') {
      // return res.status(400).json({ 
      //   message: 'This phone number is already registered. Please login instead.' 
      // });
      return res.status(200).json({
        isNewUser: false,
        user,
        token: generateToken(user._id),
        message: "Already registered"
      });
    }

    if (!user) {
      user = await User.create({ firebaseUid, phone });
      return res.json({ token: generateToken(user._id), user, isNewUser: true });
    }

    const isProfileIncomplete = !user.username;
    return res.json({
      token: generateToken(user._id),
      user,
      isNewUser: isProfileIncomplete
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;