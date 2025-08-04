import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS so frontend at localhost:5173 can access backend
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Simple root route
app.get('/', (_req, res) => {
  res.send("Hello Niharika, This is the Backend Homepage.");
});

// Login route (dummy check for now)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Replace with your real DB authentication logic later
  if (username === 'test' && password === '1234') {
    return res.json({ token: 'abc123', user: { name: 'Test User' } });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

export default app;
