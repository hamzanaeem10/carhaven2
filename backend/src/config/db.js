import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/carhaven';
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  console.log('MongoDB connected');
};
