import express from 'express';
import { handleMatchCareers } from '../controllers/careers.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/match', optionalAuth, handleMatchCareers);

export default router;
