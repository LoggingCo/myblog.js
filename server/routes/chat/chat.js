import express from 'express';
import { UserMiddleware } from '../../middleware/user/userMiddle';
import { ChatService } from '../../service/chat/chatService';
const router = express.Router();

router.post('/send', UserMiddleware.jwtAuth, UserMiddleware.isLoggedIn, ChatService.sendMessage);

router.delete(
    '/recieve/:chatId',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    ChatService.reciveMEssage,
);
router.delete(
    '/read/:roomId',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    ChatService.readMessage,
);

router.get('/list/:roomId');

router.delete(
    '/:chatId',
    UserMiddleware.jwtAuth,
    UserMiddleware.isLoggedIn,
    ChatService.deleteMessage,
);

export default router;
