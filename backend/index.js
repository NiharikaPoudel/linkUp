import app from './app.js';
import mongoose from 'mongoose';

const port = 3000;

const uri = "mongodb+srv://Niharika:test123@professional.7v8cnfk.mongodb.net/?retryWrites=true&w=majority&appName=Professional";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
run().catch(console.dir);

// Start server
app.listen(port, () => {
  console.log(`Server started at PORT: ${port}`);
});
