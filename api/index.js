import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import portfolioRoutes from '../server/routes/portfolioRoutes.js';
import { testConnection } from '../server/models/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Routes (mounted on both /api and / for Vercel serverless compatibility)
app.use('/api', portfolioRoutes);
app.use('/', portfolioRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vercel Serverless Portfolio API is live and connected to PostgreSQL' });
});
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vercel Serverless Portfolio API is live and connected to PostgreSQL' });
});

// Root fallback
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API Backend Root - Supabase PostgreSQL' });
});

export default app;
