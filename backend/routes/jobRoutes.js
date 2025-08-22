import express from 'express';
import { getJobs, createJob } from '../controllers/jobController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/',getJobs);
router.post('/',protect,admin,createJob);
export default router;
