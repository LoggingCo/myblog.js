import express from 'express';
import { Multer } from '../../middleware/multer.js';
import { UserMiddleware } from '../../middleware/user/userMiddle.js';
import { ImageService } from '../../service/post/imageService.js';
import { UserService } from '../../service/user/userService.js';

const router = express.Router();

// user login
router.post('/login', UserMiddleware.isNotLoggedIn, UserService.login);
// user signUp
router.post('/sign', UserMiddleware.isNotLoggedIn, UserService.sign);
// user logout
router.post('/logout', UserMiddleware.isLoggedIn, UserService.logout);

// user pofile image
router.put(
    '/profile',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    Multer.uploadProfile.array('image'),
    UserService.updateProfile,
);

// user profile image delete
router.delete(
    '/profile',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    UserService.deleteProfile,
);

export default router;
