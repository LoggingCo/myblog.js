import { Op, Sequelize } from 'sequelize';
import Blog from '../../models/blog/blog';
import Chat from '../../models/chat/chat';
import Read from '../../models/chat/read';
import Room from '../../models/chat/room';
import RoomUser from '../../models/chat/roomUser';
import User from '../../models/user/user';
import { BlodCodeUser } from '../../util/blogCodeUser';
import { FailureData, SuccessData } from '../../util/resultData.js';

export class RoomService {
    // room Create
    static async create(req, res, next) {
        try {
            // 요청된 방코드로 방 생성
            const room = await Room.create({
                roomCode: req.body.roomCode,
                roomType: 0,
            });

            // 생성된 방에 나 자신 추가
            await RoomUser.create({
                RoomUserId: req.user.id,
                RoomId: room.id,
            });

            // 요청된 블로그코드로 유저 탐색
            const user = await BlodCodeUser(req.body.blogcode);

            // 생성된 방에 해당 유저 추가
            await RoomUser.create({
                RoomUserId: user.id,
                RoomId: room.id,
            });

            // 해당 방에 존재하는 모든 유저들의 값과 방 정보 반환
            const fullRoom = await RoomUser.findAll({
                where: { RoomId: room.id },
                include: [
                    {
                        model: User,
                        attributes: ['nickName', 'img'],
                        include: [{ model: Blog, attributes: ['blogcode'] }],
                    },
                ],
            });

            // 다른 튜플로 존재하는 유저들의 정보를 한 곳에 모을 배열 생성
            const roomUser = [];

            // 해당 방에 있는 모든 유저들의 정보 배열에 삽입
            for await (const room of fullRoom) {
                roomUser.push(room.User);
            }
            // 해당 방의 id, roomCode, 그리고 모든 유저들의 정보를 응답
            const fullRoomInfo = {
                RoomId: room.id,
                RoomCode: room.roomCode,
                User: roomUser,
            };
            res.status(200).json(SuccessData(fullRoomInfo));
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    // room info read
    static async readInfo(req, res, next) {
        try {
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // room List read
    static async readList(req, res, next) {
        try {
            // 내가 속해있는 방 번호 찾기
            // 단 이때 정렬은 채팅이 만들어진 순이어야함

            const myRooms = await RoomUser.findAll({
                attributes: [],
                include: [
                    {
                        model: Room,
                        attributes: ['id', 'roomCode'],
                        include: [
                            {
                                model: Chat,
                                attributes: ['id', 'content', 'createdAt'],
                                separate: true,
                                required: true,
                                order: [['createdAt', 'DESC']],
                            },
                        ],
                    },
                ],
                where: { RoomUserId: req.user.id },
                order: [[Sequelize.col('Room.Chats.createdAt'), 'DESC']],
            });

            res.status(200).json(SuccessData(myRooms));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // room delete
    static async delete(req, res, next) {
        try {
            const RoomId = req.params.RoomdId;
            const room = await Room.findOne({ where: { id: RoomId } });
            if (!room) {
                return res.status(200).json(FailureData('방이 존재하지 않습니다.'));
            }

            await RoomUser.destroy({ where: { RoomId: RoomId, RoomUserId: req.user.id } });
            const roomUser = await RoomUser.findOne({ where: { RoomId: RoomId } });
            if (!roomUser) {
                await Room.destroy({ where: { id: RoomId } });
            }
            res.status(200).json(SuccessData({ RoomId: RoomId }));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // room add User
    static async addUser(req, res, next) {}
}
