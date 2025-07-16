import express from 'express';
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import dotenv from 'dotenv';

const app = express();
//helps read json data
app.use(express.json());
dotenv.config();
app.use('/api/auth',authRoutes);//Prefix all routes with /api 
app.use('/api/user',userRoutes)

export default app;