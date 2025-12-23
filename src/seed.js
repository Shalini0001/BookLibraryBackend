import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js'; // Points to your existing model

dotenv.config();

const books = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    image: 'https://www.womantowomanmentoring.org/wp-content/uploads/atomic-habits-cover@8x.png',
    description: `No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits and break bad ones.`
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    image: 'https://m.media-amazon.com/images/I/61zt25yYrCL.jpg',
    description: `Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time.`
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    image: 'https://images-cdn.ubuy.co.in/66288ea1a006406b0b219f14-rich-dad-poor-dad-was-die-reichen-ihren.jpg',
    description: `The primary theme of Rich Dad Poor Dad is how to use money as a tool for wealth development. It destroys the myth that the rich are born rich.`
  },
  {
    title: 'Think Like a Monk',
    author: 'Jay Shetty',
    image: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982134488/think-like-a-monk-9781982134488_hr.jpg',
    description: `Jay Shetty distills the timeless wisdom he learned as a monk into practical steps anyone can take every day to live a less anxious, more meaningful life.`
  }
];

const seedDB = async () => {
  try {
    // Make sure your .env file has MONGO_URI
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
    
    await Book.deleteMany({}); 
    await Book.insertMany(books);
    
    console.log("Database Seeded! 📚");
    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

seedDB();