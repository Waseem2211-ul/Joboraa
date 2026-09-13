import express from 'express';
import { handleGetProfile, handleUpdateProfile, handleResetProfile } from '../controllers/profile.controller.js';
import { optionalAuth, requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', optionalAuth, handleGetProfile);
router.put('/', requireAuth, handleUpdateProfile);
router.post('/reset', optionalAuth, handleResetProfile);

export default router;
