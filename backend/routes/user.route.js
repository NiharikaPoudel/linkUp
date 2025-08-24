import { Router} from 'express';
const router = Router();
import { getUserList, getUserById } from '../controllers/user.controller.js';
import { deleteProfilePic, uploadProfilePic } from '../controllers/profile.picture.controller.js';
import { upload } from '../middleware/image-uploader.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js'; 

/*router.get("/list", checkToken, getUserList);
router.get("/search", checkToken, searchUsers);
router.get("/getUserByUsername",checkToken, getUserByUsername );
router.patch("/uploadProfilePic", checkToken, upload.single('image'), uploadProfilePic);*/
// GET all users
router.get('/', authMiddleware, getUserList);
//router.get("/user", getUserList);

// GET user by ID
router.get('/:id', authMiddleware, getUserById);


router.patch('/uploadProfilePic', authMiddleware, upload.single('image'), uploadProfilePic);
router .delete("deleteProfilepIC", authMiddleware, deleteProfilePic);
export default router;