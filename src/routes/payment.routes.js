import express from 'express';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js'; // Added to get fcmToken
import authMiddleware from '../middlewares/auth.middleware.js';
import admin from '../config/firebase.js'; // Added for notifications

const router = express.Router();

// 1. Create Order (Simulated)
router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const mockOrder = {
      id: "order_mock_" + Math.random().toString(36).substr(2, 9),
      entity: "order",
      amount: 9900,
      currency: "INR",
      receipt: "receipt_123",
      status: "created"
    };
    res.json(mockOrder);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed", error });
  }
});

// 2. Verify Payment (Simulated)
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30); // Requirement #6: 30 days logic

    // Create record in Database
    const newSubscription = await Subscription.create({
      userId: req.userId,
      startDate,
      endDate,
      status: 'ACTIVE'
    });

    // --- REQUIREMENT #8: SEND NOTIFICATION ---
    const user = await User.findById(req.userId);
    if (user?.fcmToken) {
      try {
        await admin.messaging().send({
          token: user.fcmToken,
          notification: {
            title: 'Subscription Active! 📚',
            body: 'Congratulations! Your 30-day premium access is now active.'
          },
          // Optional: data payload helps frontend navigation
          data: {
            screen: 'Home'
          }
        });
        console.log("Activation Notification Sent");
      } catch (fcmError) {
        console.error("FCM Send Error:", fcmError);
      }
    }

    res.json({ 
      success: true, 
      message: 'Subscription activated (Mock Mode)',
      subscription: newSubscription 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Verification failed" });
  }
});

// 3. Get Subscription Status
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.userId }).sort({ createdAt: -1 });
    if (!subscription) {
      return res.json({ status: 'NOT_PURCHASED' });
    }
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: "Error fetching status", error });
  }
});

export default router;