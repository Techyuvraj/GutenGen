import express from 'express';
import { generateBlocks } from '../controllers/openaiController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect this route so only logged-in users can generate
router.post('/generate', verifyToken, generateBlocks);

export default router;
