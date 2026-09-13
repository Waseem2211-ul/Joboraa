import express from 'express';
import { handleAnalyzeResume } from '../controllers/resume.controller.js';
import { upload } from '../middleware/upload.middleware.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/analyze', optionalAuth, upload.single('resumeFile'), handleAnalyzeResume);

export default router;
