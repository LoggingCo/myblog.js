import express from 'express';
import { ImageMiddle, PostMiddle } from '../../middleware/post/imageMiddle';
import { UserMiddleware } from '../../middleware/user/userMiddle';
import { PostService } from '../../service/post/postService';
const router = express.Router();

router.post(
    '/',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    ImageMiddle.upload.array('image'),
    PostService.create,
);

router.get('/', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, PostService.readMain);
router.get('/:blogCode', PostService.readBlog);

router.put(
    '/:postId',
    UserMiddleware.jwtAuth,
    ImageMiddle.upload.array('image'),
    UserMiddleware.isLoggedIn,
    PostService.update,
);

router.delete('/:postId', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, PostService.delete);

export default router;
