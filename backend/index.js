//initialization
import app from './app.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

// MongoDB connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb+srv://Niharika:test123@professional.7v8cnfk.mongodb.net/?retryWrites=true&w=majority&appName=Professional";
    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.get('/', (_req, res) => {
    res.send("This is the Homepage.");
});

// Starting the server
app.listen(port, () => {
    console.log(`Server started at Port: ${port}`);
});