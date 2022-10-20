import express from 'express';
import { UserMiddleware } from '../../middleware/user/userMiddle';
import { RoomService } from '../../service/chat/roomService';

const router = express.Router();

router.post('/', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, RoomService.create);
router.get('/', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, RoomService.readList);
router.get('/:roomId', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, RoomService.readInfo);
router.delete('/', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, RoomService.delete);

export default router;
