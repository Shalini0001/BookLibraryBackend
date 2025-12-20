import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ['ACTIVE', 'EXPIRED'],
    default: 'ACTIVE'
  }
});

export default mongoose.model('Subscription', subscriptionSchema);
