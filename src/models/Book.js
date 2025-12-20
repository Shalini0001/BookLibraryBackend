import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String
});

export default mongoose.model('Book', bookSchema);
