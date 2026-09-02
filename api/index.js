import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import portfolioRoutes from '../server/routes/portfolioRoutes.js';
import { sequelize, testConnection } from '../server/models/index.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'X-Requested-With']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Routes mounted on both /api and /
app.use('/api', portfolioRoutes);
app.use('/', portfolioRoutes);

// Detailed Health Check with live DB test
const healthHandler = async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: 'ok',
      database: 'connected',
      dbUrlConfigured: Boolean(process.env.DATABASE_URL),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: err.message,
      dbUrlConfigured: Boolean(process.env.DATABASE_URL),
      timestamp: new Date().toISOString()
    });
  }
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Root fallback
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API Backend Root - Supabase PostgreSQL' });
});

// Vercel Serverless Function Handler
export default function handler(req, res) {
  return app(req, res);
}
