import app from './app.js';
import mongoose from 'mongoose';

const port = 3000;

// Simple route to check server
app.get('/', (_req, res) => {
  res.send("Hello Swikriti, This is the Homepage.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started at PORT: ${port}`);
});

// MongoDB connection URI
const uri = "mongodb+srv://Niharika:test123@professional.7v8cnfk.mongodb.net/?retryWrites=true&w=majority&appName=Professional";

// Connect to MongoDB
async function run() {
  try {
    await mongoose.connect(uri);
    // Optional ping to confirm connection
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);
