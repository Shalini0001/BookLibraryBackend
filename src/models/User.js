import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUid: String,
  email: String,
  phone: String,
  fcmToken: String
});

export default mongoose.model('User', userSchema);
