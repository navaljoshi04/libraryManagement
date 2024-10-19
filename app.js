
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import borrowRoutes from './routes/borrowRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/borrow', borrowRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
