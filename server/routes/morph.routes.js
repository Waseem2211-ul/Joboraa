import express from 'express';
import { handleMorphResume } from '../controllers/morph.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', optionalAuth, handleMorphResume);

export default router;
