import express from 'express';
import { Multer } from '../../middleware/multer';
import { UserMiddleware } from '../../middleware/user/userMiddle';
import { ImageService } from '../../service/post/imageService';
const router = express.Router();

// post delete image
router.delete(
    '/:postId/:imageId',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    ImageService.deletePost,
);

export default router;
