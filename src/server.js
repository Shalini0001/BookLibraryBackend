import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import userRoutes from './routes/user.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import notificationRoutes from './routes/notification.routes.js';

// Cron job
import './cron/subscription.cron.js';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/user', userRoutes);
app.use('/payment', paymentRoutes);
app.use('/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.send('Domato Backend is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);