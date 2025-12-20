import express from 'express';
import Subscription from '../models/Subscription.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// 1. Create Order (Simulated)
router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    // Instead of calling Razorpay, we create a fake order object
    // that looks exactly like what Razorpay would return.
    const mockOrder = {
      id: "order_mock_" + Math.random().toString(36).substr(2, 9),
      entity: "order",
      amount: 9900,
      currency: "INR",
      receipt: "receipt_123",
      status: "created"
    };
    
    console.log("Mock Order Created:", mockOrder.id);
    res.json(mockOrder);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed", error });
  }
});

// 2. Verify Payment (Simulated)
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    // In Mock mode, we don't check the signature (HMAC) 
    // because we don't have a Secret Key to check it against.
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30); // 30 days logic

    const newSubscription = await Subscription.create({
      userId: req.userId,
      startDate,
      endDate,
      status: 'ACTIVE'
    });

    res.json({ 
      success: true, 
      message: 'Subscription activated (Mock Mode)',
      subscription: newSubscription 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Verification failed" });
  }
});

export default router;

// import express from 'express';
// import razorpay from '../config/razorpay.js';
// import Subscription from '../models/Subscription.js';
// import User from '../models/User.js';
// import authMiddleware from '../middlewares/auth.middleware.js';
// import crypto from 'node:crypto'; // Built-in Node.js module

// const router = express.Router();

// // 1. Create Order
// router.post('/create-order', authMiddleware, async (req, res) => {
//   try {
//     const options = {
//       amount: 9900, // ₹99 in paise
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Order creation failed", error });
//   }
// });

// // 2. Verify Payment & Activate Subscription
// router.post('/verify', authMiddleware, async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   // STEP A: Security Check (HMAC Verification)
//   const body = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSignature = crypto
//     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(body.toString())
//     .digest('hex');

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     // STEP B: Update Subscription Logic
//     const startDate = new Date();
//     const endDate = new Date();
//     endDate.setDate(startDate.getDate() + 30);

//     // Create record in Subscription collection
//     await Subscription.create({
//       userId: req.userId,
//       startDate,
//       endDate,
//       status: 'ACTIVE'
//     });

//     // OPTIONAL: Also update User model if you need to cache status there
//     // await User.findByIdAndUpdate(req.userId, { subscriptionStatus: 'ACTIVE' });

//     res.json({ success: true, message: 'Subscription activated' });
//   } else {
//     res.status(400).json({ success: false, message: 'Invalid payment signature' });
//   }
// });

// export default router;
