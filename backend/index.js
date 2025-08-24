//initialization
import app from './app.js';
import mongoose from "mongoose";
import userRoutes from './routes/user.route.js';

app.use('/api/user', userRoutes);

const port = 3000;
//Routes
app.get('/', (_req, res) => {
    res.send("This is the Homepage.");
});

//strating the server in a port
app.listen(port, () => {
    console.log(`Server started at Port: ${port}`);
});

/*database connection code*/ 


const uri = "mongodb+srv://Niharika:test123@professional.7v8cnfk.mongodb.net/?retryWrites=true&w=majority&appName=Professional";;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);