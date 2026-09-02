import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './models/index.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', portfolioRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API Backend is healthy & connected to PostgreSQL' });
});

// Start Express server immediately
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Express Backend running on http://localhost:${PORT}`);
  testConnection();
});
