import express from 'express';
import { getUserHistory, deleteGeneration, clearHistory } from '../controllers/historyController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All history routes are protected
router.get('/', verifyToken, getUserHistory);
router.delete('/:id', verifyToken, deleteGeneration);
router.delete('/', verifyToken, clearHistory);

export default router;
