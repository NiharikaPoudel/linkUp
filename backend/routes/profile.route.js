import { Router } from 'express';
const router = Router();
import { 
    getUserProfile, 
    updateUserProfile, 
    addSkill, 
    removeSkill 
} from '../controllers/profile.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

// Get user profile (public access for viewing, auth required for own profile)
router.get('/:id?', getUserProfile);

// Update user profile (requires authentication)
router.patch('/update', authMiddleware, updateUserProfile);

// Add skill to profile (requires authentication)
router.post('/skills/add', authMiddleware, addSkill);

// Remove skill from profile (requires authentication)
router.delete('/skills/remove', authMiddleware, removeSkill);

export default router;
