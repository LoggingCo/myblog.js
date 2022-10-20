import express, { query } from 'express';
import { Multer } from '../../middleware/multer';
import { UserMiddleware } from '../../middleware/user/userMiddle';
import { PostService } from '../../service/post/postService';
const router = express.Router();

// create post
router.post(
    '/',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    Multer.uploadPost.array('image'),
    PostService.create,
);

// read main post
router.get('/', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, PostService.readMain);

// read blog post
router.get('/:blogCode', PostService.readBlog);

// update post
router.put(
    '/:postId',
    UserMiddleware.jwtAuth,
    Multer.uploadPost.array('image'),
    UserMiddleware.isLoggedIn,
    PostService.update,
);

// delete post
router.delete('/:postId', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, PostService.delete);

export default router;
