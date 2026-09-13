import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

/* =========================================================
   CORS
   ========================================================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* =========================================================
   BODY PARSING
   ========================================================= */

app.use(
  express.json({
    limit: '20mb',
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '20mb',
  })
);

/* =========================================================
   ROOT ROUTE
   ========================================================= */

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'JOBORA AI Career Intelligence API',
    message: 'Welcome to the JOBORA backend API',
  });
});

/* =========================================================
   HEALTH CHECK
   ========================================================= */

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'JOBORA AI Career Intelligence API',
    openRouterConfigured: Boolean(
      process.env.OPENROUTER_API_KEY &&
        process.env.OPENROUTER_API_KEY.trim() !== ''
    ),
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   API ROUTES
   ========================================================= */

app.use('/api/auth', authRoutes);

app.use('/api/resume', resumeRoutes);

app.use('/api/careers', careersRoutes);

app.use('/api/skills', skillsRoutes);

app.use('/api/morph', morphRoutes);

app.use('/api/jobs', jobsRoutes);

app.use('/api/interview', interviewRoutes);

app.use('/api/copilot', copilotRoutes);

app.use('/api/profile', profileRoutes);

/* =========================================================
   404 HANDLER
   ========================================================= */

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: `API route not found: ${req.method} ${req.originalUrl}`,
    });
  }

  next();
});

/* =========================================================
   GLOBAL ERROR HANDLER
   ========================================================= */

app.use(errorHandler);

/* =========================================================
   LOCAL DEVELOPMENT SERVER
   ========================================================= */

/*
  Vercel handles the server automatically.

  When running locally:
      npm start

  Express will start normally on PORT 5000.

  When deployed to Vercel:
      Vercel imports the Express app through api/index.js
      and handles the server automatically.
*/

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log('');
    console.log('==========================================');
    console.log('🚀 JOBORA AI SERVER');
    console.log('==========================================');
    console.log(`🌐 Server: http://localhost:${PORT}`);
    console.log(`💚 Health: http://localhost:${PORT}/api/health`);
    console.log(
      `🔑 OpenRouter: ${
        process.env.OPENROUTER_API_KEY
          ? 'Configured - Live AI enabled'
          : 'Not Set - Demo / Fallback Mode'
      }`
    );
    console.log('==========================================');
    console.log('');
  });
}

/* =========================================================
   EXPORT APP FOR VERCEL
   ========================================================= */

export default app;