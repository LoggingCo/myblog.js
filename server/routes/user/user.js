import express from 'express';
import { UserMiddleware } from '../../middleware/user/userMiddle.js';
import { UserService } from '../../service/user/userService.js';

const router = express.Router();

router.post('/login', UserMiddleware.isNotLoggedIn, UserService.login);
router.post('/sign', UserMiddleware.isNotLoggedIn, UserService.sign);
router.post('/logout', UserMiddleware.isLoggedIn, UserService.logout);

export default router;
