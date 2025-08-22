import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB Connected')).catch(err=>console.log(err));

app.use('/api/auth',authRoutes);
app.use('/api/jobs',jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
