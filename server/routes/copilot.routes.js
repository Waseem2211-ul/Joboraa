import express from 'express';
import { handleCopilotChat } from '../controllers/copilot.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', optionalAuth, handleCopilotChat);

export default router;
