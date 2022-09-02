import express from 'express';
import { UserMiddleware } from '../../middleware/user/userMiddle';
import { CmentService } from '../../service/post/cmentService';
const router = express.Router();

// create comment
router.post('/:postId', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, CmentService.create);
// delete comment
router.delete(
    '/:postId/:commentId',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    CmentService.delete,
);

export default router;
