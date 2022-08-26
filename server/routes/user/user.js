import express from 'express';
import { UserService } from '../../service/user/userService.js';

const router = express.Router();

router.post('/login', UserService.prototype.login);
router.post('/sign');

export default router;
