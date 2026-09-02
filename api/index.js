import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import portfolioRoutes from '../server/routes/portfolioRoutes.js';
import { sequelize } from '../server/models/index.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'X-Requested-With', 'Expires']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Set no-cache on all responses
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

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

// API Routes mounted on both /api and /
app.use('/api', portfolioRoutes);
app.use('/', portfolioRoutes);

// Global error handler for uncaught exceptions in route handlers
app.use((err, req, res, next) => {
  console.error('Unhandled server error in API:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for unmatched API routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'API route not found', 
    path: req.url,
    method: req.method,
    message: 'Portfolio API Backend - Supabase PostgreSQL'
  });
});

// Export Express app directly for Vercel Serverless Function & local servers
export default app;
