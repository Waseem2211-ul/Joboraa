import express from 'express';
import { handleAnalyzeSkillGap } from '../controllers/skills.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/analyze', optionalAuth, handleAnalyzeSkillGap);

export default router;
