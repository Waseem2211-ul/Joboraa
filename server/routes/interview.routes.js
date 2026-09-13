import express from 'express';
import { handleGenerateQuestion, handleEvaluateAnswer } from '../controllers/interview.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/question', optionalAuth, handleGenerateQuestion);
router.post('/evaluate', optionalAuth, handleEvaluateAnswer);

export default router;
