import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String },
  phone: { type: String },
  fcmToken: { type: String },
  // ADD THESE FIELDS:
  username: { type: String },
  dob: { type: String },
  isProfileComplete: { type: Boolean, default: false }
}, { timestamps: true }); // Timestamps are helpful for tracking signup dates

export default mongoose.model('User', userSchema);