import { Router } from 'express' ;
const router =Router();

import { getUserList, searchUserList } from '../controllers/user.controller.js' ;
import { authMiddleware } from '../middleware/auth.middleware.js' ;

router.get("/list",authMiddleware,getUserList);
router.get('/search/:name', authMiddleware, searchUserList);
//for API call

export default router;