import cron from 'node-cron';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import admin from '../config/firebase.js';

cron.schedule('0 0 * * *', async () => {
  const now = new Date();

  const expiredSubs = await Subscription.find({
    endDate: { $lt: now },
    status: 'ACTIVE'
  });

  for (const sub of expiredSubs) {
    sub.status = 'EXPIRED';
    await sub.save();

    const user = await User.findById(sub.userId);

    if (user?.fcmToken) {
      await admin.messaging().send({
        token: user.fcmToken,
        notification: {
          title: 'Subscription Expired',
          body: 'Your book subscription has expired'
        }
      });
    }
  }
});
