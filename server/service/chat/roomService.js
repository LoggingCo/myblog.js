import Blog from '../../models/blog/blog';
import Room from '../../models/chat/room';
import User from '../../models/user/user';
import { SuccessData } from '../../util/successData';

export class RoomService {
    // room Create
    static async create(req, res, next) {
        try {
            const blog = await Blog.findOne({
                where: { blogcode: req.body.blogcode },
            });
            const user = await User.findOne({
                where: { id: blog.UserId },
            });

            const room = await Room.create({
                roomCode: req.body.roomCode,
                roomType: req.body.roomType,
            });
            await user.addRoomIdx(room.id);
            await room.addUserIdx(req.user.id);
            await room.addUserIdx(user.id);

            const fullRoom = await Room.findOne({
                where: { id: room.id },
                include: [
                    {
                        model: User,
                        as: 'userIdx',
                        attributes: ['nickName', 'img'],
                        include: [{ model: Blog, attributes: ['blogcode'] }],
                    },
                ],
            });
            res.status(200).json(SuccessData(fullRoom));
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    // room addUser
    // update
    static async addUser(req, res, next) {
        try {
            const room = await Room.findOne({ where: { roomCode: req.body.roomCode } });

            if (req.body.user.length > 1) {
                req.body.user.map(async (v) => {
                    const blog = await Blog.findOne({
                        where: { blogcode: v.blogcode },
                    });
                    const user = await User.findOne({
                        where: { id: blog.UserId },
                    });
                    await room.addUserIdx(user.id);
                    await user.addRoomIdx(room.id);
                });
            } else {
                const blog = await Blog.findOne({
                    where: { blogcode: req.body.user[0].blogcode },
                });
                const user = await User.findOne({
                    where: { id: blog.UserId },
                });
                await room.addUserIdx(user.id);
                await user.addRoomIdx(room.id);
            }

            const fullRoom = await Room.findOne({
                where: { id: room.id },
                include: [
                    {
                        model: User,
                        as: 'userIdx',
                        attributes: ['nickName', 'img'],
                        include: [{ model: Blog, attributes: ['blogcode'] }],
                    },
                ],
            });

            if (fullRoom.userIdx.length > 2) {
                await Room.update(
                    {
                        roomType: 1,
                    },
                    { where: { id: room.id } },
                );
            }

            const data = await Room.findOne({
                where: { id: room.id },
                include: [
                    {
                        model: User,
                        as: 'userIdx',
                        attributes: ['nickName', 'img'],
                        include: [{ model: Blog, attributes: ['blogcode'] }],
                    },
                ],
            });

            res.status(200).json(SuccessData(data));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // room read
    static async read(req, res, next) {
        const fullRoom = await User.findOne({
            where: { id: req.user.id },
            attributes: ['nickName', 'img'],
            include: [
                { model: Blog, attributes: ['blogcode'] },
                {
                    model: Room,
                    as: 'roomIdx',
                    include: [
                        {
                            model: User,
                            as: 'userIdx',
                            attributes: ['nickName', 'img'],
                            include: [{ model: Blog, attributes: ['blogcode'] }],
                        },
                    ],
                },
            ],
        });
        console.log(fullRoom.roomIdx);
        res.status(200).json(SuccessData(fullRoom.roomIdx));

        try {
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // room delete
    static delete(req, res, next) {}
}
