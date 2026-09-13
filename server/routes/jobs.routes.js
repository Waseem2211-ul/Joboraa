import express from 'express';
import { handleGetJobs, handleMatchJobs } from '../controllers/jobs.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', handleGetJobs);
router.post('/match', optionalAuth, handleMatchJobs);

export default router;
