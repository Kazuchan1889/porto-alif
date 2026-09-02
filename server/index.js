import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './models/index.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploads and public assets
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use(express.static(path.join(__dirname, '../public')));

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
