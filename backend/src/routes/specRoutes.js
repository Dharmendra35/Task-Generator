import express from 'express';
import { generateSpecController, getRecentSpecs, updateSpec, deleteSpec } from '../controllers/specController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateSpecController);
router.get('/recent', protect, getRecentSpecs);
router.put('/:id', protect, updateSpec);
router.delete('/:id', protect, deleteSpec);

export default router;
