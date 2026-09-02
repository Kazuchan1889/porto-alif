import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import portfolioRoutes from '../server/routes/portfolioRoutes.js';
import { testConnection } from '../server/models/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', portfolioRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vercel Serverless Portfolio API is live and connected to PostgreSQL' });
});

// Root fallback for /api
app.get('/api', (req, res) => {
  res.json({ message: 'Portfolio API Backend Root - Supabase PostgreSQL' });
});

export default app;
