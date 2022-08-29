import express from 'express';
import { PostMiddle } from '../../middleware/post/postMiddle';
import { UserMiddleware } from '../../middleware/user/userMiddle';
import { PostService } from '../../service/post/postService';
const router = express.Router();

router.post(
    '/',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    PostMiddle.upload.array('image'),
    PostService.create,
);

router.get('/', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, PostService.read);
router.get('/:blogCode', PostService.readBlog);

router.put('/');
router.delete('/');

export default router;
