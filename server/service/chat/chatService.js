import { Op } from 'sequelize';
import Chat from '../../models/chat/chat';
import Read from '../../models/chat/read';
import RoomUser from '../../models/chat/roomUser';
import { FailureData, SuccessData } from '../../util/resultData';

export class ChatService {
    // send
    static async sendMessage(req, res, next) {
        try {
            // 메시지 전송
            const chat = await Chat.create({
                content: req.body.content,
                RoomId: req.body.RoomId,
                UserId: req.user.id,
            });

            // 현재 방에 존재하는 유저 탐색
            const roomUser = await RoomUser.findAll({
                where: { RoomId: req.body.RoomId },
            });

            // 해당 유저들 Id 값으로 안 읽음 메시지 생성
            for await (const user of roomUser) {
                if (req.user.id !== user.RoomUserId) {
                    await Read.create({
                        UserId: user.RoomUserId,
                        RoomId: req.body.RoomId,
                        ChatId: chat.id,
                    });
                }
            }

            // 해당 안읽음 메시지 길이 반환
            const read = await Read.findAll({
                where: { ChatId: chat.id },
            });

            // 채팅내용과 해당 메시지 길이 응답
            const fullChat = {
                chat: chat,
                read: read.length,
            };

            res.status(201).json(SuccessData(fullChat));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // list chat

    // recive
    static async reciveMEssage(req, res, next) {
        try {
            const chatid = req.params.chatId;
            // 받은 채팅의 채팅 내용과, 내 user값을 비교하여 안 읽음 메시지 탐색
            const chat = await Read.findOne({
                where: { ChatId: chatid, UserId: req.user.id },
            });

            // 만약 안읽음 메세지가 없다면 실패 응답
            if (!chat) {
                return res.status(201).json(FailureData('이미 읽은 메시지 입니다'));
            }
            // 만약 안읽음 메세지가 있다면 읽음 처리
            await Read.destroy({
                where: { ChatId: chatid, UserId: req.user.id },
            });

            // 읽은 채팅 메시지 고유번호를 응답
            res.status(201).json(SuccessData(chatid));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // read Message
    static async readMessage(req, res, next) {
        try {
            const RoomId = req.params.roomId;

            // 내가 안 읽은 메시지 탐색
            const noneReadChat = await Read.findAll({
                where: {
                    RoomId: RoomId,
                    UserId: req.user.id,
                },
                attributes: ['ChatId'],
            });

            if (noneReadChat.length <= 0) {
                res.status(400).json(FailureData('읽지 않은 메시지가 없습니다'));
            }

            // 내가 안 읽은 메시지 삭제(읽음)
            await Read.destroy({
                where: { RoomId: RoomId, UserId: req.user.id },
            });

            // 각 메시지별 채팅 고유번호 전달
            res.status(200).json(SuccessData(noneReadChat));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // delete
    static async deleteMessage(req, res, next) {
        try {
            const ChatId = req.params.chatId;
            // 요청된 채팅 고유번호 탐색
            const chat = await Chat.findOne({ where: { id: ChatId } });

            // 채팅이 존재하지 않다면 실패 응답
            if (!chat) {
                res.status(200).json(FailureData('존재하지 않는 메시지입니다'));
            }

            // 채팅이 존재한다면 안읽음 메시지 전부 삭제
            await Read.destroy({ where: { ChatId: ChatId } });
            // 채팅이 존재한다면 채팅 메시지 삭제
            await Chat.destroy({ where: { id: ChatId } });
            // 삭제 이후 삭제된 채팅 고유반환값 응답
            res.status(200).json(SuccessData({ ChatId: ChatId }));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}
