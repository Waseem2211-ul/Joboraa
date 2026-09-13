import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import careersRoutes from './routes/careers.routes.js';
import skillsRoutes from './routes/skills.routes.js';
import morphRoutes from './routes/morph.routes.js';
import jobsRoutes from './routes/jobs.routes.js';
import interviewRoutes from './routes/interview.routes.js';
import copilotRoutes from './routes/copilot.routes.js';
import profileRoutes from './routes/profile.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Cross-Origin
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health / Status check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'JOBORA AI Career Intelligence API',
    openRouterConfigured: !!(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim() !== ''),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/morph', morphRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/copilot', copilotRoutes);
app.use('/api/profile', profileRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 JOBORA Server running on http://localhost:${PORT}`);
  console.log(`🔑 OpenRouter Key: ${process.env.OPENROUTER_API_KEY ? 'Configured (Live AI enabled)' : 'Not Set (Demo / Fallback Mode active)'}`);
});
